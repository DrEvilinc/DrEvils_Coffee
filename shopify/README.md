# Shopify: Eternal Halloween countdown

The Impact theme’s built-in countdown uses a **fixed** `expires-at` date and shows zeros after it passes. It does not loop yearly or show **THE BEAST HAS AWAKENED** on Halloween.

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

Install steps are in the header comment of the snippet. Roast variants are
created with `build_roast_variants_matrixify.py` (18 variants, `-LV/-FC/-MO`);
**each variant needs a real UPC in `Variant Barcode` before import** — the
script leaves them blank on purpose.

Until the variants are imported the snippet still works: grind pre-selects,
and the roast is recorded as a hidden `properties[Roast]` so the order says
what to roast.
