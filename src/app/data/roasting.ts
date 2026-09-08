/**
 * roasting.ts — Dr. Evil's Coffee fulfillment brain.
 *
 * Turns a customer's order (bean + roast level + grind) into the EXACT settings
 * to change on the ROEST L200 and the Mahlkönig GH2, plus freshness guidance.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW THIS WORKS
 *  - Each bean has a saved "House" profile in ROEST Connect (the standard).
 *  - A Light or Dark order does NOT need a new profile — it is expressed as a
 *    DELTA from House (drop temperature + development time). The work order tells
 *    you the exact change to make.
 *  - Grind maps a friendly brew method to a starting GH2 dial number. Whole Bean
 *    means no grind at all (the default — big for the true coffee lovers).
 *
 * ⚠️  CALIBRATION: The numbers below are sensible, defensible STARTING POINTS
 *     derived from each bean's density/process/elevation and standard specialty
 *     targets for a 150–200 g L200 batch. Roast to your cupping table, then
 *     overwrite the House targets here with YOUR saved-profile numbers and the
 *     GH2 dial with YOUR burr calibration. Everything is centralized in this one
 *     file on purpose.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type RoastLevel = 'light' | 'house' | 'dark';

export const ROAST_LABELS: Record<RoastLevel, string> = {
  light: 'Light Roast',
  house: 'House Roast',
  dark: 'Dark Roast',
};

/** The saved ROEST "House" profile target per bean (BT = bean-temp probe, °C). */
export interface HouseProfile {
  /** ROEST Connect saved-profile name to load. */
  profileName: string;
  /** Approx. first-crack time (mm:ss) for reference. */
  firstCrack: string;
  /** House drop bean temp (°C). */
  dropC: number;
  /** House total roast time (mm:ss). */
  totalTime: string;
  /** House development-time ratio (% of total after first crack). */
  dtrPct: number;
}

/**
 * Per-bean House profiles. Keyed by LAB code.
 * These vary by process + density + elevation. TUNE to your saved profiles.
 */
export const HOUSE_PROFILES: Record<string, HouseProfile> = {
  'LAB-001': { profileName: 'LAB-001 Aponte Honey — House', firstCrack: '9:00', dropC: 209, totalTime: '10:45', dtrPct: 20 },
  'LAB-002': { profileName: 'LAB-002 Peru Huabal — House',   firstCrack: '8:45', dropC: 207, totalTime: '10:15', dtrPct: 19 },
  'LAB-003': { profileName: 'LAB-003 Ethiopia Gera — House',  firstCrack: '8:30', dropC: 204, totalTime: '9:45',  dtrPct: 17 },
  'LAB-004': { profileName: 'LAB-004 Yemen Haimi — House',    firstCrack: '9:15', dropC: 213, totalTime: '11:15', dtrPct: 22 },
  'LAB-005': { profileName: 'LAB-005 Chiroso — House',        firstCrack: '8:30', dropC: 203, totalTime: '9:30',  dtrPct: 16 },
  'LAB-006': { profileName: 'LAB-006 Buesaco — House',        firstCrack: '9:00', dropC: 210, totalTime: '10:45', dtrPct: 20 },
};

/** How Light / Dark differ from the House profile. Applied as a delta. */
export interface RoastDelta {
  /** Change to the drop bean temp, °C (negative = drop earlier/lighter). */
  dropDeltaC: number;
  /** Change to total time, seconds (negative = end sooner). */
  timeDeltaSec: number;
  /** Change to development-time ratio, percentage points. */
  dtrDeltaPct: number;
  /** One-line roaster instruction. */
  instruction: string;
}

export const ROAST_DELTAS: Record<RoastLevel, RoastDelta> = {
  light: {
    dropDeltaC: -6,
    timeDeltaSec: -45,
    dtrDeltaPct: -3,
    instruction: 'Drop ~6°C earlier and cut ~45s sooner. Shorter development — preserve acidity & aromatics.',
  },
  house: {
    dropDeltaC: 0,
    timeDeltaSec: 0,
    dtrDeltaPct: 0,
    instruction: 'Run the saved House profile as-is. No change.',
  },
  dark: {
    dropDeltaC: +6,
    timeDeltaSec: +50,
    dtrDeltaPct: +3,
    instruction: 'Extend ~50s and drop ~6°C later. Longer development — build caramelization & body. Watch for 2nd crack on X-tier lots.',
  },
};

/* ── Grind: friendly brew method → GH2 starting dial + micron target ───────── */

export interface GrindOption {
  /** Machine-safe key used in URLs / order properties. */
  key: string;
  /** Customer-facing label. */
  label: string;
  /** GH2 starting dial number (0–17). null = no grind (whole bean). */
  gh2: number | null;
  /** Approx. particle target (microns) for reference. */
  microns: string;
  /** Short helper shown under the option. */
  hint: string;
}

/**
 * GH2 range is ~90–1110µm across a ~0–17 dial. These are STARTING dials —
 * calibrate to your burrs and confirm with a sieve/eye. Whole Bean = no grind.
 */
export const GRIND_OPTIONS: GrindOption[] = [
  { key: 'whole-bean',   label: 'Whole Bean',        gh2: null, microns: '—',          hint: 'Grind fresh yourself. Keeps longest. Recommended for true coffee lovers.' },
  { key: 'espresso',     label: 'Espresso',          gh2: 2,    microns: '~250 µm',    hint: 'Pump/lever machines. Dial to taste from here.' },
  { key: 'moka-pot',     label: 'Moka Pot',          gh2: 4,    microns: '~330 µm',    hint: 'Stovetop / Bialetti.' },
  { key: 'aeropress',    label: 'Aeropress',         gh2: 6,    microns: '~450 µm',    hint: 'Standard Aeropress recipe.' },
  { key: 'pour-over',    label: 'Pour Over (V60)',   gh2: 8,    microns: '~550 µm',    hint: 'Cone drippers — Hario V60, Kalita.' },
  { key: 'drip',         label: 'Drip / Auto',       gh2: 10,   microns: '~700 µm',    hint: 'Automatic drip machines.' },
  { key: 'chemex',       label: 'Chemex',            gh2: 11,   microns: '~800 µm',    hint: 'Thick-filter, slower flow.' },
  { key: 'french-press', label: 'French Press',      gh2: 15,   microns: '~1000 µm',   hint: 'Full immersion.' },
  { key: 'cold-brew',    label: 'Cold Brew',         gh2: 17,   microns: '~1100 µm',   hint: 'Long steep, coarsest.' },
];

export function grindByKey(key: string): GrindOption {
  return GRIND_OPTIONS.find((g) => g.key === key) ?? GRIND_OPTIONS[0];
}

/* ── Freshness: rest → peak → best-by, by roast level ─────────────────────── */

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
export const FRESHNESS: Record<RoastLevel, FreshnessWindow> = {
  light: { restDays: 7, peakStart: 10, peakEnd: 35, bestByDays: 90 },
  house: { restDays: 4, peakStart: 7,  peakEnd: 30, bestByDays: 75 },
  dark:  { restDays: 3, peakStart: 5,  peakEnd: 21, bestByDays: 60 },
};

const DAY = 86_400_000;
const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

/**
 * Customer-facing freshness note. If a roast date is supplied it returns real
 * dates; otherwise it returns relative-day guidance for the product page.
 * NOTE: the fields here (lot, roastDate, roast, window) are exactly what a future
 * RFID bag tag would encode — this is the RFID-ready data model.
 */
export function freshnessNote(roast: RoastLevel, roastDate?: Date): string {
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

/* ── Work order: the "seamless on our end" packing-slip brain ──────────────── */

const addSeconds = (mmss: string, sec: number): string => {
  const [m, s] = mmss.split(':').map(Number);
  const total = Math.max(0, m * 60 + s + sec);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
};

export interface WorkOrder {
  lab: string;
  roastLabel: string;
  grindLabel: string;
  roest: {
    profile: string;
    action: string;
    targetDropC: number;
    targetDropF: number;
    targetTime: string;
    targetDtrPct: number;
  };
  grind: {
    gh2: number | null;
    microns: string;
    action: string;
  };
  freshness: string;
}

/** Build the full production work order for one line item. */
export function buildWorkOrder(
  lab: string,
  roast: RoastLevel,
  grindKey: string,
  roastDate?: Date,
): WorkOrder {
  const house = HOUSE_PROFILES[lab];
  const delta = ROAST_DELTAS[roast];
  const grind = grindByKey(grindKey);

  const targetDropC = house ? house.dropC + delta.dropDeltaC : 0;
  const targetTime = house ? addSeconds(house.totalTime, delta.timeDeltaSec) : '—';
  const targetDtr = house ? house.dtrPct + delta.dtrDeltaPct : 0;

  return {
    lab,
    roastLabel: ROAST_LABELS[roast],
    grindLabel: grind.label,
    roest: {
      profile: house?.profileName ?? `${lab} — House`,
      action: delta.instruction,
      targetDropC,
      targetDropF: Math.round((targetDropC * 9) / 5 + 32),
      targetTime,
      targetDtrPct: targetDtr,
    },
    grind: {
      gh2: grind.gh2,
      microns: grind.microns,
      action:
        grind.gh2 === null
          ? 'WHOLE BEAN — do not grind. Bag as-is.'
          : `Set GH2 to ${grind.gh2} (${grind.microns}) for ${grind.label}. Purge ~5g, then grind.`,
    },
    freshness: freshnessNote(roast, roastDate),
  };
}
