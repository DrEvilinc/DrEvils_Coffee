# Shopify: Eternal Halloween countdown

The live theme is **Prestige 11.x** (Maestrooo; theme id 187587756216 — not Impact). Its built-in countdown uses a **fixed** `expires-at` date and shows zeros after it passes. It does not loop yearly or show **THE BEAST HAS AWAKENED** on Halloween.

## Install on shop.drevil.coffee

1. **Shopify Admin** → **Online Store** → **Themes** → **Edit code**
2. **Assets** → **Add a new asset** → upload `halloween-countdown-eternal.js`
3. Open **layout/theme.liquid** and add before `</body>`:

```liquid
<script src="{{ 'halloween-countdown-eternal.js' | asset_url }}" defer></script>
```

4. **Save** and preview the storefront header countdown.

The script:

- Counts down to **October 31 at midnight** (local time), every year
- On **October 31 all day**, replaces the timer with **THE BEAST HAS AWAKENED**
- On **November 1**, automatically starts counting to next Halloween

You can remove or ignore the old **expiration date** in the theme editor Countdown section; this script overrides the timer behavior.

---

# Shopify: Roast + grind picker (`roast-grind-picker.liquid`)

Companion to the configurator on drevil.coffee/collection. Roast is a Shopify
**variant** (Option "Roast": Low Voltage / Full Charge / Maximum Overdrive);
grind is a **line-item property** ("Grind"). The site deep-links here as
`/products/<handle>?roast=…&grind=…&brew=…` and this snippet pre-selects both.

Install steps are in the header comment of the snippet. **Installed on the
live Prestige theme 2026-09-09** (snippet file + guarded render line in
`snippets/product-info.liquid`).

### Why it is dormant right now

The live LAB products (checked 2026-09-09 via `/products/<handle>.json`) are
NOT single-variant. Every one of them is

    Option1  Bag Size    8 oz / 12 oz / 1 lb / 2 lbs
    Option2  Grind size  Pour Over / Espresso / Whole Bean
    = 12 variants, all with SKU = null

The render line is wrapped in `{%- unless product.options contains 'Grind
size' -%}` so the picker does not appear next to the theme's own grind
dropdown. It switches on per product the moment that product is re-imported
without a "Grind size" option. Nothing else to touch in the theme.

### Catalog decision still open (blocks the roast import)

`build_roast_variants_matrixify.py` assumes one base variant per lot and
produces 18 variants (`-LV/-FC/-MO`). With four bag sizes live the honest
matrix is 6 lots × 3 roasts × 4 sizes = 72 variants / 72 UPCs, and the site
(`roastGrind.ts`, `ConfigureLot.tsx`, `cart.ts`) has no bag-size concept yet.
Pick one before importing anything:

- **A. Roast × Bag Size as variants, grind as property** (matches the film
  vocabulary and this snippet; 12 variants per lot, 72 UPCs total; drop the
  3-value "Grind size" option and let the 8-value property replace it).
- **B. Keep Bag Size × Grind size, add Roast as Option3** (36 variants per
  lot, 216 UPCs; snippet stays dormant, site needs a grind→variant map).
- **C. One bag size for launch** (18 variants / 18 UPCs as scripted).

**Each variant needs a real UPC in `Variant Barcode` before import** — the
script leaves them blank on purpose.

Once variants exist the snippet also honours `?roast=` by swapping to the
roast variant; before that it records the roast as a hidden
`properties[Roast]` so the order still says what to roast.

---

# Shopify: Order Printer work order (`order-printer-work-order.liquid`)

Per-line production sheet for the roaster: lot, roast, ROEST profile + target
drop temp, GH2 dial, brew method. Install: Settings → Apps → Order Printer →
Templates → Add template → paste the file. Reads roast from the "Roast" variant
option (or the `Roast` line-item property before the variants exist) and grind
from the `Grind` property. The numbers mirror `src/app/data/roasting.ts` —
calibrate both together.
