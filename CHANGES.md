# Changes — feat/customizer-seo-hero

Branch adds the roast/grind/freshness customizer, video-ready hero, and SEO
primitives. Builds clean (`npm run build` ✓, 2161 modules).

## New files
- `src/app/data/roasting.ts` — fulfillment brain: House profiles per bean,
  Light/House/Dark deltas, GH2 grind map, freshness windows, `buildWorkOrder()`.
- `src/app/lib/cart.ts` — Shopify cart-permalink deep link carrying roast + grind
  as line-item properties (falls back to product page until `variantId` is set).
- `src/app/components/collection/RoastGrindSelector.tsx` — the customer selector
  (Light/House/Dark + brew-method grind with Whole Bean default + live freshness).
- `src/app/hooks/useDocumentMeta.ts` — per-route title/description/canonical.
- `public/robots.txt`, `public/sitemap.xml` — were 404 on live.
- `shopify/roast-grind-options.liquid` — product-page options for direct buyers.
- `shopify/order-printer-work-order.liquid` — ROEST + GH2 work order per order.
- `shopify/SETUP.md` — how it all wires together + variant-ID capture.

## Changed files
- `src/app/data/coffees.ts` — **reordered LAB-001 → LAB-006 (was 005,001,006,003,
  002,004 — violated the standing rule)**; images moved onto each object so order
  can't break them; added `lab`, `image`, `nativeRoast`, `variantId` fields.
- `src/app/components/collection/CoffeeCard.tsx` — renders `RoastGrindSelector`
  instead of the single external "SHOP THIS LOT" button.
- `src/app/components/collection/CollectionGrid.tsx` — uses `coffee.image`.
- `src/app/components/Hero.tsx` — video-ready background (set `HERO_VIDEO`), image
  poster + mobile fallback, LCP hints.
- `index.html` — JSON-LD (Organization + WebSite + 6-product ItemList), canonical,
  robots meta, theme-color.
- `src/app/pages/{Home,Collection,About}.tsx` — per-route meta.

## To finish wiring (needs Shopify)
1. Reconnect connector to shop.drevil.coffee.
2. Set variant SKUs to LAB-001…006.
3. Paste each default `variantId` into `coffees.ts`.
4. Install the two Liquid files (see `shopify/SETUP.md`).
5. Calibrate roast/grind numbers to your table + burrs.

## Known follow-ups (from audit)
- Remove unused deps (`@mui/material`, `@mui/icons-material`, `react-slick`,
  `react-dnd*`) — not imported anywhere in app code.
- Code-split `/collection` + `/about` (bundle is 667 KB / 199 KB gzip).
- Add build-time prerender/SSG for full route crawlability (SPA today).
- Fix About founder image path (`/assets/images/founder.png` vs docs'
  `/assets/images/about/founder.png`).
