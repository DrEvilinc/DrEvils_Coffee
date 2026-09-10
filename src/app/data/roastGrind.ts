/**
 * Dr. Evil's Coffee — roast tiers + grind model.
 *
 * ARCHITECTURE (catalog option A, locked 2026-09-10):
 *   Roast    = Shopify VARIANT, Option1 "Roast".
 *   Bag Size = Shopify VARIANT, Option2 "Bag Size" (8 oz / 12 oz / 1 lb / 2 lbs).
 *              6 lots x 3 roasts x 4 sizes = 72 variants, each with its own SKU
 *              (LAB-001-FC-12OZ) and UPC for RICS parity. Price varies by size only.
 *   Grind    = a cart LINE-ITEM PROPERTY. It is a fulfillment instruction, not a
 *              sellable unit. It prints on the pick ticket and doesn't multiply the catalog.
 *
 * The Shopify side is shopify/build_roast_variants_matrixify.py. Option values
 * here must match that script (and the live store) verbatim.
 *
 * Roast names are the LOCKED primary set from the on-camera hero script — these
 * are the same three words that appear as on-screen supers when Sean says
 * "You pick your roast." Do not drift them apart from the film.
 */

export type RoastId = "low-voltage" | "full-charge" | "maximum-overdrive";

export interface Roast {
  id: RoastId;
  /** Exact Shopify Option1 value. Must match the variant data verbatim. */
  optionValue: string;
  /** Plain-English tier, shown small under the brand name for first-time buyers. */
  plain: "Light" | "Standard" | "Dark";
  tasting: string;
  detail: string;
  /** 0-100, drives the roast-level meter in the UI. */
  intensity: number;
  /** SKU segment after the base SKU, e.g. LAB-001-LV-12OZ. */
  skuSuffix: string;
}

export const ROASTS: Roast[] = [
  {
    id: "low-voltage",
    optionValue: "Low Voltage",
    plain: "Light",
    tasting: "Bright · Floral · Citrus acidity",
    detail: "Pulled at first crack. The origin still does the talking.",
    intensity: 25,
    skuSuffix: "LV",
  },
  {
    id: "full-charge",
    optionValue: "Full Charge",
    plain: "Standard",
    tasting: "Balanced · Caramel · Cocoa",
    detail: "The control sample. Sweetness and body in equal measure.",
    intensity: 58,
    skuSuffix: "FC",
  },
  {
    id: "maximum-overdrive",
    optionValue: "Maximum Overdrive",
    plain: "Dark",
    tasting: "Bold · Smoke · Low acid",
    detail: "Taken to the edge of second crack. Not for the timid.",
    intensity: 92,
    skuSuffix: "MO",
  },
];

export type GrindId =
  | "whole-bean"
  | "extra-coarse"
  | "coarse"
  | "medium-coarse"
  | "medium"
  | "medium-fine"
  | "fine"
  | "extra-fine";

export interface Grind {
  id: GrindId;
  /** Exact string written to the cart line-item property. */
  label: string;
  /** Approximate particle size. Shown as the "spec" line — this is the lab flex. */
  microns: string;
  /** Brew methods this grind is dialed for. Drives the brew-first picker. */
  brews: string[];
  note: string;
}

export const GRINDS: Grind[] = [
  {
    id: "whole-bean",
    label: "Whole Bean",
    microns: "unground",
    brews: ["I grind my own"],
    note: "Sealed as roasted. Maximum shelf life.",
  },
  {
    id: "extra-coarse",
    label: "Extra Coarse",
    microns: "~1200 µm",
    brews: ["Cold Brew", "Cowboy / Campfire"],
    note: "Long steeps. Slow extraction, no bitterness.",
  },
  {
    id: "coarse",
    label: "Coarse",
    microns: "~900 µm",
    brews: ["French Press", "Percolator"],
    note: "Sea-salt texture. Full immersion.",
  },
  {
    id: "medium-coarse",
    label: "Medium-Coarse",
    microns: "~700 µm",
    brews: ["Chemex", "Clever Dripper"],
    note: "Thick filters need room to breathe.",
  },
  {
    id: "medium",
    label: "Medium",
    microns: "~600 µm",
    brews: ["Drip / Auto Brewer", "Flat-Bottom Pour Over"],
    note: "The everyday setting. Most home machines.",
  },
  {
    id: "medium-fine",
    label: "Medium-Fine",
    microns: "~450 µm",
    brews: ["Pour Over (V60)", "AeroPress"],
    note: "Table salt. Cone drippers and short immersions.",
  },
  {
    id: "fine",
    label: "Fine",
    microns: "~300 µm",
    brews: ["Espresso", "Moka Pot"],
    note: "Pressure extraction. Dialed for a 25-30s shot.",
  },
  {
    id: "extra-fine",
    label: "Extra Fine",
    microns: "~150 µm",
    brews: ["Turkish / Ibrik"],
    note: "Powder. Nearly flour.",
  },
];

/** Flattened brew-method list for the brew-first picker, in serving order. */
export const BREW_METHODS: { brew: string; grindId: GrindId }[] = GRINDS.flatMap(
  (g) => g.brews.map((brew) => ({ brew, grindId: g.id }))
);

export type BagId = "8oz" | "12oz" | "1lb" | "2lb";

export interface BagSize {
  id: BagId;
  /** Exact Shopify Option2 "Bag Size" value. Note "2 lbs", not "2 lb". */
  optionValue: string;
  /** Short label for the picker button. */
  label: string;
  skuSuffix: string;
  netGrams: number;
}

export const BAG_SIZES: BagSize[] = [
  { id: "8oz", optionValue: "8 oz", label: "8 oz", skuSuffix: "8OZ", netGrams: 227 },
  { id: "12oz", optionValue: "12 oz", label: "12 oz", skuSuffix: "12OZ", netGrams: 340 },
  { id: "1lb", optionValue: "1 lb", label: "1 lb", skuSuffix: "1LB", netGrams: 454 },
  { id: "2lb", optionValue: "2 lbs", label: "2 lb", skuSuffix: "2LB", netGrams: 907 },
];

export const DEFAULT_ROAST: RoastId = "full-charge";
export const DEFAULT_GRIND: GrindId = "whole-bean";
export const DEFAULT_BAG: BagId = "12oz";

export const getRoast = (id: RoastId) =>
  ROASTS.find((r) => r.id === id) ?? ROASTS[1];

export const getGrind = (id: GrindId) =>
  GRINDS.find((g) => g.id === id) ?? GRINDS[0];

export const getBag = (id: BagId) =>
  BAG_SIZES.find((b) => b.id === id) ?? BAG_SIZES[1];

/** Base SKU + roast + bag -> variant SKU, e.g. LAB-001-FC-12OZ. */
export const variantSku = (baseSku: string, roastId: RoastId, bagId: BagId) =>
  `${baseSku}-${getRoast(roastId).skuSuffix}-${getBag(bagId).skuSuffix}`;

/**
 * Pre-import bridge only. The live store still carries the legacy 3-value
 * "Grind size" option (Pour Over / Espresso / Whole Bean) until the option A
 * import runs, so map our 8 grinds to the nearest legacy variant. The exact
 * grind still travels as the "Grind" attribute. Delete this after the import.
 */
export const legacyGrindOption = (id: GrindId): string =>
  id === "whole-bean" ? "Whole Bean" : id === "fine" || id === "extra-fine" ? "Espresso" : "Pour Over";
