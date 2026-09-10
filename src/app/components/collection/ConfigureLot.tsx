import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Loader2 } from 'lucide-react';
import { Coffee } from '../../data/coffees';
import {
  BAG_SIZES,
  DEFAULT_BAG,
  DEFAULT_GRIND,
  DEFAULT_ROAST,
  ROASTS,
  getBag,
  getGrind,
  getRoast,
  legacyGrindOption,
  variantSku,
  type BagId,
  type RoastId,
} from '../../data/roastGrind';
import {
  addToCart,
  fetchVariants,
  goToCheckout,
  isStorefrontConfigured,
  resolveVariant,
  type VariantInfo,
} from '../../lib/cart';
import { Button } from '../ui/button';
import { track, productParams } from '../../lib/analytics';
import { RoastGrindPicker, type RoastGrindSelection } from './RoastGrindPicker';

/**
 * Roast + bag size + grind configurator for one lot, plus the buy action.
 *
 * Two delivery paths, chosen at build time:
 *
 *   1. Storefront API (VITE_SHOPIFY_DOMAIN + VITE_SHOPIFY_STOREFRONT_TOKEN set):
 *      the Roast x Bag Size variant is resolved live, grind rides as a line-item
 *      attribute, and the customer lands straight in Shopify checkout.
 *
 *   2. Deep link (no token): the customer is sent to the product page on
 *      shop.drevil.coffee with ?roast=&size=&grind=&brew=. The theme snippet
 *      (shopify/roast-grind-picker.liquid) swaps to that variant and pre-selects
 *      the grind.
 *
 * Every string on both paths (roast option, bag size option, grind label) must
 * match the Shopify data verbatim. See src/app/data/roastGrind.ts.
 */

interface Props {
  coffee: Coffee;
}

type Status =
  | { kind: 'idle' }
  | { kind: 'adding' }
  | { kind: 'error'; message: string };

const money = (p: VariantInfo['price']) => {
  if (!p) return undefined;
  const n = Number(p.amount);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: p.currencyCode || 'USD',
    maximumFractionDigits: Number.isInteger(n) ? 0 : 2,
  }).format(n);
};

export function ConfigureLot({ coffee }: Props) {
  const storefront = isStorefrontConfigured();

  const [selection, setSelection] = useState<RoastGrindSelection>(() => {
    const grind = getGrind(DEFAULT_GRIND);
    return {
      roastId: DEFAULT_ROAST,
      bagId: DEFAULT_BAG,
      grindId: DEFAULT_GRIND,
      brewMethod: 'I grind my own',
      attributes: [{ key: 'Grind', value: grind.label }],
    };
  });
  // null = not loaded (or no Storefront path); [] = load failed -> deep link.
  const [variants, setVariants] = useState<VariantInfo[] | null>(null);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  // Resolve the product's variants once, only when the Storefront path is on.
  useEffect(() => {
    if (!storefront) return;
    let cancelled = false;
    fetchVariants(coffee.handle)
      .then((v) => {
        if (!cancelled) setVariants(v);
      })
      .catch(() => {
        // Fall back to the deep link silently. The customer can still buy.
        if (!cancelled) setVariants([]);
      });
    return () => {
      cancelled = true;
    };
  }, [storefront, coffee.handle]);

  const roast = getRoast(selection.roastId);
  const bag = getBag(selection.bagId);
  const grind = getGrind(selection.grindId);
  const legacyGrind = legacyGrindOption(selection.grindId);

  const resolved = useMemo(
    () =>
      variants?.length
        ? resolveVariant(variants, { roast: roast.optionValue, bagSize: bag.optionValue, legacyGrind })
        : null,
    [variants, roast.optionValue, bag.optionValue, legacyGrind]
  );

  // Price per bag size (roast is price-neutral, so any roast's variant will do).
  const bagPrices = useMemo(() => {
    if (!variants?.length) return undefined;
    const out: Partial<Record<BagId, string>> = {};
    for (const b of BAG_SIZES) {
      const hit = resolveVariant(variants, { roast: roast.optionValue, bagSize: b.optionValue, legacyGrind });
      const label = money(hit?.variant.price ?? null);
      if (label) out[b.id] = label;
    }
    return out;
  }, [variants, roast.optionValue, legacyGrind]);

  // A roast is unavailable only once roast is a real variant and no variant of
  // that roast is sellable in the chosen size.
  const unavailableRoasts = useMemo<RoastId[]>(() => {
    if (!variants?.length || !variants.some((v) => 'roast' in v.options)) return [];
    return ROASTS.filter((r) => {
      const hit = resolveVariant(variants, { roast: r.optionValue, bagSize: bag.optionValue });
      return !hit?.variant.availableForSale;
    }).map((r) => r.id);
  }, [variants, bag.optionValue]);

  const target = resolved?.variant.availableForSale ? resolved : null;
  const roastIsVariant = Boolean(target?.roastIsVariant);

  const deepLink = useMemo(() => {
    const url = new URL(coffee.shopUrl);
    url.searchParams.set('roast', roast.optionValue);
    url.searchParams.set('size', bag.optionValue);
    url.searchParams.set('grind', grind.label);
    if (selection.brewMethod && selection.brewMethod !== 'I grind my own') {
      url.searchParams.set('brew', selection.brewMethod);
    }
    url.searchParams.set('utm_source', 'drevil.coffee');
    url.searchParams.set('utm_medium', 'configurator');
    return url.toString();
  }, [coffee.shopUrl, roast.optionValue, bag.optionValue, grind.label, selection.brewMethod]);

  const canAddDirect = storefront && Boolean(target);
  const sku = variantSku(coffee.sku, selection.roastId, selection.bagId);
  const eventParams = { roast: roast.optionValue, bag_size: bag.optionValue, grind: grind.label };

  const handleAdd = async () => {
    if (!target) return;
    setStatus({ kind: 'adding' });
    try {
      const attributes = [...selection.attributes];
      // Pre-import safety: if roast is not yet a variant, still record it so
      // the pick ticket knows what to roast.
      if (!roastIsVariant) attributes.push({ key: 'Roast', value: roast.optionValue });
      const cart = await addToCart([{ variantId: target.variant.id, quantity: 1, attributes }]);
      track('AddToCart', productParams(sku, { ...eventParams, num_items: 1 }));
      goToCheckout(cart);
    } catch (err) {
      setStatus({
        kind: 'error',
        message: err instanceof Error ? err.message : 'Could not add to cart.',
      });
    }
  };

  return (
    <div className="pt-8 border-t border-zinc-800 space-y-8">
      <RoastGrindPicker
        baseSku={coffee.sku}
        unavailableRoasts={unavailableRoasts}
        bagPrices={bagPrices}
        onChange={(s: RoastGrindSelection) => {
          const skuNext = variantSku(coffee.sku, s.roastId, s.bagId);
          if (s.roastId !== selection.roastId) {
            track('roast_selected', productParams(skuNext, { roast: getRoast(s.roastId).optionValue }));
          }
          if (s.bagId !== selection.bagId) {
            track('bag_size_selected', productParams(skuNext, { bag_size: getBag(s.bagId).optionValue }));
          }
          if (s.grindId !== selection.grindId || s.brewMethod !== selection.brewMethod) {
            track('grind_selected', productParams(skuNext, { grind: getGrind(s.grindId).label, brew: s.brewMethod ?? '' }));
          }
          setSelection(s);
          if (status.kind === 'error') setStatus({ kind: 'idle' });
        }}
      />

      {canAddDirect ? (
        <Button
          size="lg"
          type="button"
          disabled={status.kind === 'adding'}
          onClick={handleAdd}
          className="w-full bg-white text-black hover:bg-zinc-200 border-white hover:border-zinc-300 font-mono text-xs tracking-[0.25em] h-auto py-5"
        >
          {status.kind === 'adding' ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              SEALING YOUR ORDER
            </span>
          ) : (
            <>ADD TO CART — {sku}</>
          )}
        </Button>
      ) : (
        <Button
          size="lg"
          asChild
          className="w-full bg-white text-black hover:bg-zinc-200 border-white hover:border-zinc-300 font-mono text-xs tracking-[0.25em] h-auto py-5"
        >
          <a
            href={deepLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2"
            onClick={() =>
              track('shop_click', productParams(sku, eventParams))
            }
          >
            SHOP THIS LOT — {sku}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </Button>
      )}

      {status.kind === 'error' && (
        <p className="text-xs font-mono text-red-400 leading-relaxed">
          {status.message}{' '}
          <a href={deepLink} target="_blank" rel="noopener noreferrer" className="underline">
            Open in the lab shop instead
          </a>
          .
        </p>
      )}
    </div>
  );
}
