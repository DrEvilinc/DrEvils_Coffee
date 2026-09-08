# Dr. Evil's Coffee — Roast + Grind + Freshness: Shopify setup

This ties the marketing site (`drevil.coffee`) to the store (`shop.drevil.coffee`)
so a customer's **roast** and **grind** choices flow onto the order and become a
**production work order** telling you exactly what to set on the ROEST L200 and
Mahlkönig GH2. No variants explosion, no per-order guesswork.

## The architecture (how it fits together)

```
drevil.coffee (React)                 shop.drevil.coffee (Shopify)
─────────────────────                 ────────────────────────────
CoffeeCard → RoastGrindSelector       Product page snippet
  choose Light/House/Dark               roast-grind-options.liquid
  choose grind (Whole Bean default)     (same choices for direct buyers)
        │                                       │
        └── cart deep link ────────────────────▶│  line-item properties:
            /cart/{variantId}:1?                 │   "Roast Level", "Grind"
            properties[Roast Level]=…            ▼
            properties[Grind]=…            Order (properties on each line)
                                                 │
                                                 ▼
                                    Order Printer template
                                    order-printer-work-order.liquid
                                    → ROEST profile + drop temp delta
                                    → GH2 dial number
                                    → freshness card
```

Roast + Grind are modeled as **line-item properties on the single default
variant** — same price for any roast/grind, which is clean UX and zero variant
management. (If you later want a Dark upcharge or a grind fee, that becomes a
variant or a Shopify Function — flagged in the audit.)

## Steps

### 1. Reconnect the Shopify connector to the coffee store
The connector is currently pointed at Morris Costumes. Reconnect it and select
`shop.drevil.coffee` (or `vbgtfs-d1.myshopify.com`) so future automation can read
orders and confirm variant IDs.

### 2. Make sure each product's SKU is its LAB code
Set the variant SKU to `LAB-001` … `LAB-006`. The work order keys off SKU.

### 3. Capture each product's default variant ID → put it in the site
For each of the 6 products, grab the numeric **variant ID** (Admin product URL,
or Storefront). Paste it into `src/app/data/coffees.ts` → `variantId`. Example:

```ts
{ lab: 'LAB-001', /* … */ variantId: '44012345678901' },
```

Once filled, the site button becomes **"ADD CONFIGURED LOT TO CART"** and deep-
links a preconfigured cart. Until then it safely falls back to the product page.

### 4. Add the product-page options
Install `roast-grind-options.liquid` (see the header in that file). This gives
direct-on-Shopify buyers the same roast/grind choices.

### 5. Add the work-order print template
Install `order-printer-work-order.liquid` via **Order Printer**. Print it with
each order to get the ROEST + GH2 settings on paper (or PDF) at the roaster.

### 6. Calibrate the numbers (once)
The House drop temps, roast deltas, and GH2 dials are **starting points** in two
places that must stay in sync:
- `src/app/data/roasting.ts` (site + future automation)
- `shopify/order-printer-work-order.liquid` (print template)

Roast your table, dial your burrs, then overwrite both with your real numbers.

## Optional next step — kill the double-entry
Instead of maintaining numbers in two files, a Supabase Edge Function on the
`orders/create` webhook can generate the work order (and, later, write the RFID
payload) from `roasting.ts` alone, then email/Slack it to the roaster. This is the
clean "one source of truth" path and is RFID-ready. See the audit doc.
