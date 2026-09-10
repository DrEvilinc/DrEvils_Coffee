import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Loader2 } from 'lucide-react';
import { Coffee } from '../../data/coffees';
import {
  DEFAULT_GRIND,
  DEFAULT_ROAST,
  getGrind,
  getRoast,
  variantSku,
  type RoastId,
} from '../../data/roastGrind';
import {
  addToCart,
  fetchVariantsByRoast,
  goToCheckout,
  isStorefrontConfigured,
  type VariantInfo,
} from '../../lib/cart';
import { Button } from '../ui/button';
import { track, productParams } from '../../lib/analytics';
import { RoastGrindPicker, type RoastGrindSelection } from './RoastGrindPicker';

/**
 * Roast + grind configurator for one lot, plus the buy action.
 *
 * Two delivery paths, chosen at build time:
 *
 *   1. Storefront API (VITE_SHOPIFY_DOMAIN + VITE_SHOPIFY_STOREFRONT_TOKEN set):
 *      the roast variant is resolved live, grind rides as a line-item attribute,
 *      and the customer lands straight in Shopify checkout.
 *
 *   2. Deep link (no token): the customer is sent to the product page on
 *      shop.drevil.coffee with ?roast=&grind=&brew= — the theme snippet
 *      (shopify/snippets/roast-grind-picker.liquid) pre-selects both so the
 *      choice they made here is honoured there.
 *
 * Both paths carry the same three strings — the roast Option1 value and the
 * grind label must match the Shopify data verbatim.
 */

interface Props {
  coffee: Coffee;
}

type Status =
  | { kind: 'idle' }
  | { kind: 'adding' }
  | { kind: 'error'; message: string };

export function ConfigureLot({ coffee }: Props) {
  const storefront = isStorefrontConfigured();

  const [selection, setSelection] = useState<RoastGrindSelection>(() => {
    const grind = getGrind(DEFAULT_GRIND);
    return {
      roastId: DEFAULT_ROAST,
      grindId: DEFAULT_GRIND,
      brewMethod: 'I grind my own',
      attributes: [{ key: 'Grind', value: grind.label }],
    };
  });
  const [variants, setVariants] = useState<Record<string, VariantInfo> | null>(null);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  // Resolve the product's variants once, only when the Storefront path is on.
  useEffect(() => {
    if (!storefront) return;
    let cancelled = false;
    fetchVariantsByRoast(coffee.handle)
      .then((v) => {
        if (!cancelled) setVariants(v);
      })
      .catch(() => {
        // Fall back to the deep link silently — the customer can still buy.
        if (!cancelled) setVariants({});
      });
    return () => {
      cancelled = true;
    };
  }, [storefront, coffee.handle]);

  const roast = getRoast(selection.roastId);
  const grind = getGrind(selection.grindId);

  // Roast -> variant GID map for the picker (marks missing roasts unavailable).
  const variantIdByRoast = useMemo(() => {
    if (!variants) return undefined;
    const map: Partial<Record<RoastId, string>> = {};
    for (const r of ['low-voltage', 'full-charge', 'maximum-overdrive'] as RoastId[]) {
      const v = variants[getRoast(r).optionValue];
      if (v?.availableForSale) map[r] = v.id;
    }
    return map;
  }, [variants]);

  const unavailableRoasts = useMemo<RoastId[]>(() => {
    // Until the roast variants exist in Shopify, every roast maps to the single
    // base variant — nothing is "unavailable", the roast just travels as a note.
    if (!variants || Object.keys(variants).length === 0 || variants['']) return [];
    return (['low-voltage', 'full-charge', 'maximum-overdrive'] as RoastId[]).filter(
      (r) => !variantIdByRoast?.[r]
    );
  }, [variants, variantIdByRoast]);

  // The variant we will actually add: the roast variant if it exists, else the
  // product's single base variant (pre-import), else nothing -> deep link.
  const targetVariantId =
    variantIdByRoast?.[selection.roastId] ?? variants?.['']?.id ?? undefined;
  const roastIsVariant = Boolean(variantIdByRoast?.[selection.roastId]);

  const deepLink = useMemo(() => {
    const url = new URL(coffee.shopUrl);
    url.searchParams.set('roast', roast.optionValue);
    url.searchParams.set('grind', grind.label);
    if (selection.brewMethod && selection.brewMethod !== 'I grind my own') {
      url.searchParams.set('brew', selection.brewMethod);
    }
    url.searchParams.set('utm_source', 'drevil.coffee');
    url.searchParams.set('utm_medium', 'configurator');
    return url.toString();
  }, [coffee.shopUrl, roast.optionValue, grind.label, selection.brewMethod]);

  const canAddDirect = storefront && Boolean(targetVariantId);

  const handleAdd = async () => {
    if (!targetVariantId) return;
    setStatus({ kind: 'adding' });
    try {
      const attributes = [...selection.attributes];
      // Pre-import safety: if roast is not yet a variant, still record it so
      // the pick ticket knows what to roast.
      if (!roastIsVariant) attributes.push({ key: 'Roast', value: roast.optionValue });
      const cart = await addToCart([{ variantId: targetVariantId, quantity: 1, attributes }]);
      track('AddToCart', productParams(coffee.sku, { roast: roast.optionValue, grind: grind.label, num_items: 1 }));
      goToCheckout(cart);
    } catch (err) {
      setStatus({
        kind: 'error',
        message: err instanceof Error ? err.message : 'Could not add to cart.',
      });
    }
  };

  const skuLabel = roastIsVariant || !storefront
    ? variantSku(coffee.sku, selection.roastId)
    : coffee.sku;

  return (
    <div className="pt-8 border-t border-zinc-800 space-y-8">
      <RoastGrindPicker
        baseSku={coffee.sku}
        variantIdByRoast={variantIdByRoast}
        unavailableRoasts={unavailableRoasts}
        onChange={(s: RoastGrindSelection) => {
          if (s.roastId !== selection.roastId) {
            track('roast_selected', productParams(coffee.sku, { roast: getRoast(s.roastId).optionValue }));
          }
          if (s.grindId !== selection.grindId || s.brewMethod !== selection.brewMethod) {
            track('grind_selected', productParams(coffee.sku, { grind: getGrind(s.grindId).label, brew: s.brewMethod ?? '' }));
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
            <>ADD TO CART — {skuLabel}</>
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
              track('shop_click', productParams(coffee.sku, { roast: roast.optionValue, grind: grind.label }))
            }
          >
            SHOP THIS LOT — {skuLabel}
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
