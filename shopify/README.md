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

Companion to the configurator on drevil.coffee/collection. Roast and Bag Size
are Shopify **variants** (Option1 "Roast", Option2 "Bag Size"); grind is a
**line-item property** ("Grind"). The site deep-links here as
`/products/<handle>?roast=…&size=…&grind=…&brew=…` and this snippet applies all of them.

Install steps are in the header comment of the snippet. **Installed on the
live Prestige theme 2026-09-09** (snippet file + guarded render line in
`snippets/product-info.liquid`).

### Catalog: option A, locked 2026-09-10

    Option1  Roast     Low Voltage / Full Charge / Maximum Overdrive
    Option2  Bag Size  8 oz / 12 oz / 1 lb / 2 lbs
    = 12 variants per lot, 72 in total.  SKU  LAB-00X-<LV|FC|MO>-<8OZ|12OZ|1LB|2LB>
    Grind = line-item property "Grind" (8 values). NOT an option.

Until the import runs, every live LAB product is still the legacy shape
(Bag Size x Grind size, 12 variants, SKU null, weight 0). The render line in
`snippets/product-info.liquid` is wrapped in
`{%- unless product.options contains 'Grind size' -%}`, so this picker stays
dormant and never shows up next to the theme's own grind dropdown. It turns
on per product the moment the import removes "Grind size". There's nothing to edit in the theme.

### Import runbook (Matrixify)

`build_roast_variants_matrixify.py` reads `live_catalog_2026-09-10.json`
(ids, handles, live per-size prices). Pass `--fetch` to re-pull the prices first.

1. `python build_roast_variants_matrixify.py --only LAB-001 -o LAB-001_test.csv`
2. Matrixify → Import → the test file → check the preview: **1 product
   updated, 12 variants replaced**, with no product created or deleted.
3. Run it, then open the LAB-001 product page. You should see Roast + Bag Size dropdowns,
   the 8-grind picker showing, and `?roast=Maximum%20Overdrive&size=1%20lb&grind=Coarse`
   landing on MO / 1 lb with Coarse checked. Add to cart and the line shows `Grind: Coarse`.
4. Then the full file (`python build_roast_variants_matrixify.py`) for the other five.
5. UPCs: once there's a `SKU,UPC` map, run
   `python build_roast_variants_matrixify.py --barcodes upc.csv --barcodes-only`
   and import the `_BARCODES.csv` (it only updates barcodes and doesn't touch variants).

What the import does: `Command=UPDATE` matched by product ID (title, body,
images, SEO, tags and handle all stay put), `Variant Command=REPLACE` (the 12 legacy
variants are deleted and 12 new ones created, so old variant IDs / open carts die).
Prices carry over by size, and roast is price-neutral. Inventory policy is
`continue` (roasted to order). Weight = **net** coffee (0.5 / 0.75 / 1 / 2 lb).
It's live at 0 today, so weight-based shipping rates currently calculate as free.
Add the tare with `--tare-lb` once a filled bag has been weighed.

The snippet honours `?roast=` + `?size=` by swapping to the matching
Roast x Bag Size variant (a missing param keeps the page's current value). On
a product with no Roast option it records the roast as a hidden
`properties[Roast]` so the order still says what to roast.

---

# Shopify: Order Printer work order (`order-printer-work-order.liquid`)

Per-line production sheet for the roaster: lot, roast, ROEST profile + target
drop temp, GH2 dial, brew method. Install: Settings → Apps → Order Printer →
Templates → Add template → paste the file. Reads roast from the "Roast" variant
option (or the `Roast` line-item property before the variants exist) and grind
from the `Grind` property. The numbers mirror `src/app/data/roasting.ts` —
calibrate both together.
