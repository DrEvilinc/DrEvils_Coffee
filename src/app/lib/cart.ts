import type { Coffee } from '../data/coffees';
import { ROAST_LABELS, grindByKey, type RoastLevel } from '../data/roasting';

const SHOP_BASE = 'https://shop.drevil.coffee';

/**
 * Build a Shopify cart-permalink deep link that carries the customer's roast +
 * grind selections through as line-item properties, so they land on the order
 * and drive the production work order.
 *
 *   https://shop.drevil.coffee/cart/{variantId}:1?properties[Roast Level]=House Roast&properties[Grind]=Whole Bean
 *
 * Requires the product's default variant ID (coffee.variantId). Until those are
 * filled in from Shopify, callers should fall back to coffee.shopUrl and let the
 * customer choose on the product page (see selectionReady()).
 */
export function buildCartPermalink(coffee: Coffee, roast: RoastLevel, grindKey: string): string {
  const grind = grindByKey(grindKey);
  if (!coffee.variantId) {
    // Fallback: send them to the product page (properties can't be preset there).
    return coffee.shopUrl;
  }
  const props: Record<string, string> = {
    'Roast Level': ROAST_LABELS[roast],
    Grind: grind.label,
  };
  const qs = Object.entries(props)
    .map(([k, v]) => `properties[${encodeURIComponent(k)}]=${encodeURIComponent(v)}`)
    .join('&');
  return `${SHOP_BASE}/cart/${coffee.variantId}:1?${qs}`;
}

/** True when we can deep-link straight to a preconfigured cart. */
export function selectionReady(coffee: Coffee): boolean {
  return Boolean(coffee.variantId);
}
