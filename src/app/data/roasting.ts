/**
 * roasting.ts — Dr. Evil's Coffee fulfillment brain.
 *
 * Turns an order line (lot + roast + grind) into the EXACT settings to change
 * on the ROEST and the Mahlkönig GH2, plus freshness guidance.
 *
 * VOCABULARY (locked 2026-09-09 — must match src/app/data/roastGrind.ts, the
 * on-screen supers in the hero film, and the Shopify "Roast" option values):
 *   Low Voltage (light) · Full Charge (standard) · Maximum Overdrive (dark)
 * Grind uses the same 8 labels as GRINDS in roastGrind.ts.
 *
 * HOW THIS WORKS
 *  - Each lot has a saved "Full Charge" profile in ROEST Connect (the standard).
 *  - Low Voltage / Maximum Overdrive are expressed as a DELTA from Full Charge
 *    (drop temperature + development time), so no extra profiles to maintain.
 *  - Grind maps a label to a starting GH2 dial number. Whole Bean = no grind.
 *
 * ⚠️  CALIBRATION: the numbers below are defensible STARTING POINTS derived from
 *     each bean's density / process / elevation and standard specialty targets
 *     for a 150–200 g batch. Roast to the cupping table, then overwrite with the
 *     saved-profile numbers and the burr calibration. Everything lives in this
 *     one file on purpose — shopify/order-printer-work-order.liquid mirrors it
 *     and must be updated together.
 */

import { GRINDS, getGrind, getRoast, type GrindId, type RoastId } from './roastGrind';

/* ── ROEST: "Full Charge" profile per lot ─────────────────────────────────── */

export interface HouseProfile {
  /** ROEST Connect saved-profile name to load. */
  profileName: string;
  /** Approx. first-crack time (mm:ss) for reference. */
  firstCrack: string;
  /** Full Charge drop bean temp (°C). */
  dropC: number;
  /** Full Charge total roast time (mm:ss). */
  totalTime: string;
  /** Development-time ratio (% of total after first crack). */
  dtrPct: number;
}

/** Keyed by base SKU. Order is LAB-001 → LAB-006, always. */
export const HOUSE_PROFILES: Record<string, HouseProfile> = {
  'LAB-001': { profileName: 'LAB-001 Aponte Honey — Full Charge', firstCrack: '9:00', dropC: 209, totalTime: '10:45', dtrPct: 20 },
  'LAB-002': { profileName: 'LAB-002 Peru Huabal — Full Charge',   firstCrack: '8:45', dropC: 207, totalTime: '10:15', dtrPct: 19 },
  'LAB-003': { profileName: 'LAB-003 Ethiopia Gera — Full Charge', firstCrack: '8:30', dropC: 204, totalTime: '9:45',  dtrPct: 17 },
  'LAB-004': { profileName: 'LAB-004 Yemen Haimi — Full Charge',   firstCrack: '9:15', dropC: 213, totalTime: '11:15', dtrPct: 22 },
  'LAB-005': { profileName: 'LAB-005 Chiroso — Full Charge',       firstCrack: '8:30', dropC: 203, totalTime: '9:30',  dtrPct: 16 },
  'LAB-006': { profileName: 'LAB-006 Buesaco — Full Charge',       firstCrack: '9:00', dropC: 210, totalTime: '10:45', dtrPct: 20 },
};

/* ── Roast deltas from Full Charge ────────────────────────────────────────── */

export interface RoastDelta {
  /** Change to the drop bean temp, °C (negative = drop earlier / lighter). */
  dropDeltaC: number;
  /** Change to total time, seconds (negative = end sooner). */
  timeDeltaSec: number;
  /** Change to development-time ratio, percentage points. */
  dtrDeltaPct: number;
  /** One-line roaster instruction. */
  instruction: string;
}

export const ROAST_DELTAS: Record<RoastId, RoastDelta> = {
  'low-voltage': {
    dropDeltaC: -6,
    timeDeltaSec: -45,
    dtrDeltaPct: -3,
    instruction:
      'LOW VOLTAGE — drop ~6°C earlier and cut ~45s sooner. Shorter development; preserve acidity and aromatics.',
  },
  'full-charge': {
    dropDeltaC: 0,
    timeDeltaSec: 0,
    dtrDeltaPct: 0,
    instruction: 'FULL CHARGE — run the saved profile as-is. No change.',
  },
  'maximum-overdrive': {
    dropDeltaC: +6,
    timeDeltaSec: +50,
    dtrDeltaPct: +3,
    instruction:
      'MAXIMUM OVERDRIVE — extend ~50s and drop ~6°C later. Longer development; build caramelization and body. Watch for 2nd crack on X-tier lots.',
  },
};

/* ── Grind: label → GH2 starting dial ─────────────────────────────────────── */

/**
 * GH2 range is ~90–1110 µm across a ~0–17 dial. Starting dials only —
 * calibrate to the burrs and confirm with a sieve. Whole Bean = no grind.
 * Keyed by GrindId so it cannot drift from the customer-facing labels.
 */
export const GH2_DIAL: Record<GrindId, number | null> = {
  'whole-bean': null,
  'extra-fine': 1,
  'fine': 3,
  'medium-fine': 6,
  'medium': 9,
  'medium-coarse': 10,
  'coarse': 13,
  'extra-coarse': 17,
};

export function gh2For(grindId: GrindId): { dial: number | null; microns: string; label: string } {
  const g = getGrind(grindId);
  return { dial: GH2_DIAL[grindId], microns: g.microns, label: g.label };
}

/* ── Freshness: rest → peak → best-by, by roast ───────────────────────────── */

export interface FreshnessWindow {
  /** Days to rest (degas) before it hits its stride. */
  restDays: number;
  /** Start of peak window (days after roast). */
  peakStart: number;
  /** End of peak window (days after roast). */
  peakEnd: number;
  /** Best-by for whole bean (days after roast). */
  bestByDays: number;
}

/** Whole-bean windows. Ground coffee should be brewed within ~14 days regardless. */
export const FRESHNESS: Record<RoastId, FreshnessWindow> = {
  'low-voltage':       { restDays: 7, peakStart: 10, peakEnd: 35, bestByDays: 90 },
  'full-charge':       { restDays: 4, peakStart: 7,  peakEnd: 30, bestByDays: 75 },
  'maximum-overdrive': { restDays: 3, peakStart: 5,  peakEnd: 21, bestByDays: 60 },
};

const DAY = 86_400_000;
const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

/**
 * Customer-facing freshness note. With a roast date it returns real dates;
 * without one, relative-day guidance for the product page.
 * The fields (lot, roastDate, roast, window) are exactly what a future RFID bag
 * tag would encode — this is the RFID-ready data model.
 */
export function freshnessNote(roast: RoastId, roastDate?: Date): string {
  const f = FRESHNESS[roast];
  if (roastDate) {
    const rest = new Date(roastDate.getTime() + f.restDays * DAY);
    const peakA = new Date(roastDate.getTime() + f.peakStart * DAY);
    const peakB = new Date(roastDate.getTime() + f.peakEnd * DAY);
    const best = new Date(roastDate.getTime() + f.bestByDays * DAY);
    return `Roasted ${fmtDate(roastDate)}. Rest until ${fmtDate(rest)} · Peak ${fmtDate(peakA)}–${fmtDate(peakB)} · Best by ${fmtDate(best)} (whole bean). If ground, brew within 2 weeks.`;
  }
  return `Rest ${f.restDays} days · Peak days ${f.peakStart}–${f.peakEnd} · Best within ${f.bestByDays} days (whole bean). Ground: brew within 2 weeks.`;
}

/* ── Work order ───────────────────────────────────────────────────────────── */

const addSeconds = (mmss: string, sec: number): string => {
  const [m, s] = mmss.split(':').map(Number);
  const total = Math.max(0, m * 60 + s + sec);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
};

/** LAB-001-FC → LAB-001. Tolerates the bare base SKU and lowercase. */
export const baseSku = (sku: string) => sku.trim().toUpperCase().split('-').slice(0, 2).join('-');

/** "Maximum Overdrive" / "maximum-overdrive" / "MO" → RoastId. Defaults to Full Charge. */
export function roastIdFrom(value: string | null | undefined): RoastId {
  const v = (value ?? '').toLowerCase();
  if (v.includes('low') || v === 'lv') return 'low-voltage';
  if (v.includes('max') || v.includes('overdrive') || v === 'mo') return 'maximum-overdrive';
  return 'full-charge';
}

/** "Medium-Fine" / "medium-fine" → GrindId. Defaults to Whole Bean. */
export function grindIdFrom(value: string | null | undefined): GrindId {
  const v = (value ?? '').toLowerCase().replace(/\s+/g, '-');
  return (GRINDS.find((g) => g.id === v || g.label.toLowerCase().replace(/\s+/g, '-') === v)?.id ??
    'whole-bean') as GrindId;
}

export interface WorkOrder {
  lab: string;
  roast: string;
  grind: string;
  roest: {
    profile: string;
    action: string;
    targetDropC: number;
    targetDropF: number;
    targetTime: string;
    targetDtrPct: number;
  };
  gh2: {
    dial: number | null;
    microns: string;
    action: string;
  };
  freshness: string;
}

/** Build the full production work order for one order line. */
export function buildWorkOrder(
  sku: string,
  roastId: RoastId,
  grindId: GrindId,
  roastDate?: Date
): WorkOrder {
  const lab = baseSku(sku);
  const house = HOUSE_PROFILES[lab];
  const delta = ROAST_DELTAS[roastId];
  const roast = getRoast(roastId);
  const grind = gh2For(grindId);

  const targetDropC = house ? house.dropC + delta.dropDeltaC : 0;
  const targetTime = house ? addSeconds(house.totalTime, delta.timeDeltaSec) : '—';
  const targetDtr = house ? house.dtrPct + delta.dtrDeltaPct : 0;

  return {
    lab,
    roast: roast.optionValue,
    grind: grind.label,
    roest: {
      profile: house?.profileName ?? `${lab} — Full Charge`,
      action: delta.instruction,
      targetDropC,
      targetDropF: Math.round((targetDropC * 9) / 5 + 32),
      targetTime,
      targetDtrPct: targetDtr,
    },
    gh2: {
      dial: grind.dial,
      microns: grind.microns,
      action:
        grind.dial === null
          ? 'WHOLE BEAN — do not grind. Bag as-is.'
          : `Set GH2 to ${grind.dial} (${grind.microns}) for ${grind.label}. Purge ~5 g, then grind.`,
    },
    freshness: freshnessNote(roastId, roastDate),
  };
}
