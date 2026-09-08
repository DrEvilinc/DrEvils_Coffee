import { useState } from 'react';
import { ExternalLink, FlaskConical } from 'lucide-react';
import type { Coffee } from '../../data/coffees';
import {
  GRIND_OPTIONS,
  ROAST_LABELS,
  freshnessNote,
  type RoastLevel,
} from '../../data/roasting';
import { buildCartPermalink, selectionReady } from '../../lib/cart';
import { Button } from '../ui/button';

const ROASTS: RoastLevel[] = ['light', 'house', 'dark'];

interface Props {
  coffee: Coffee;
}

/**
 * Customer-facing configurator: pick Light / House / Dark and a grind (Whole Bean
 * default), see live freshness guidance, then deep-link to a preconfigured cart.
 */
export function RoastGrindSelector({ coffee }: Props) {
  const [roast, setRoast] = useState<RoastLevel>(coffee.nativeRoast);
  const [grindKey, setGrindKey] = useState<string>('whole-bean');

  const ready = selectionReady(coffee);
  const href = buildCartPermalink(coffee, roast, grindKey);

  return (
    <div className="mt-8 border-t border-zinc-800 pt-6 space-y-6">
      {/* Roast level */}
      <div>
        <p className="text-xs text-zinc-600 font-mono mb-3 tracking-widest uppercase">
          Roast Level
        </p>
        <div className="grid grid-cols-3 gap-2">
          {ROASTS.map((r) => {
            const active = roast === r;
            const isNative = coffee.nativeRoast === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() => setRoast(r)}
                aria-pressed={active}
                className={`relative border px-2 py-3 font-mono text-xs tracking-wider transition-colors ${
                  active
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
                }`}
              >
                {ROAST_LABELS[r].replace(' Roast', '')}
                {isNative && (
                  <span
                    className={`absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 text-[9px] tracking-widest border ${
                      active ? 'bg-black text-white border-black' : 'bg-black text-zinc-400 border-zinc-700'
                    }`}
                  >
                    ROASTER&apos;S PICK
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grind */}
      <div>
        <p className="text-xs text-zinc-600 font-mono mb-3 tracking-widest uppercase">
          Grind — Ground to order on the Mahlkönig GH2
        </p>
        <div className="grid grid-cols-3 gap-2">
          {GRIND_OPTIONS.map((g) => {
            const active = grindKey === g.key;
            return (
              <button
                key={g.key}
                type="button"
                onClick={() => setGrindKey(g.key)}
                aria-pressed={active}
                className={`border px-2 py-2.5 font-mono text-[11px] leading-tight tracking-wide transition-colors ${
                  active
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
                }`}
              >
                {g.label}
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-zinc-600 font-light mt-3 leading-relaxed">
          {GRIND_OPTIONS.find((g) => g.key === grindKey)?.hint}
        </p>
      </div>

      {/* Freshness */}
      <div className="flex items-start gap-2 border border-zinc-800 bg-zinc-950/60 p-3">
        <FlaskConical className="w-3.5 h-3.5 text-zinc-500 mt-0.5 shrink-0" />
        <p className="text-[11px] text-zinc-500 font-light leading-relaxed">
          <span className="text-zinc-400">Freshness — </span>
          {freshnessNote(roast)}
        </p>
      </div>

      {/* CTA */}
      <Button
        size="lg"
        asChild
        className="w-full bg-white text-black hover:bg-zinc-200 border-white hover:border-zinc-300 font-mono text-xs tracking-[0.25em] h-auto py-5"
      >
        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2">
          {ready ? 'ADD CONFIGURED LOT TO CART' : 'SHOP THIS LOT'}
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </Button>
      {!ready && (
        <p className="text-[10px] text-zinc-700 font-mono text-center tracking-wide">
          Confirm roast &amp; grind on the lab shop
        </p>
      )}
    </div>
  );
}
