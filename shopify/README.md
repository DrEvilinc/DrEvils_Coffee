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
