import { useMemo, useState } from "react";
import {
  ROASTS,
  GRINDS,
  BREW_METHODS,
  DEFAULT_ROAST,
  DEFAULT_GRIND,
  getGrind,
  getRoast,
  variantSku,
  type GrindId,
  type RoastId,
} from "../../data/roastGrind";

/**
 * Roast + grind customizer for a Dr. Evil's Coffee product page.
 *
 * Roast selects a real Shopify variant. Grind is returned as a cart line-item
 * property. The component is controlled-optional: pass value/onChange to lift
 * state, or let it manage its own.
 *
 * Brew-first is the default entry point ("what are you brewing on?") because
 * that is the question a customer can actually answer. Grind size is shown as
 * the resulting spec, with a manual override for people who know their number.
 */

export interface RoastGrindSelection {
  roastId: RoastId;
  grindId: GrindId;
  /** The brew method the customer clicked, if they used the brew-first path. */
  brewMethod?: string;
  /** Shopify variant GID for the chosen roast, when the map supplies one. */
  variantId?: string;
  /** Ready to spread into cartLinesAdd attributes. */
  attributes: { key: string; value: string }[];
}

interface Props {
  /** Base SKU without roast suffix, e.g. "LAB-001". */
  baseSku: string;
  /** Roast id -> Shopify variant GID. From the Storefront product query. */
  variantIdByRoast?: Partial<Record<RoastId, string>>;
  /** Roast ids that are out of stock. Rendered disabled rather than hidden. */
  unavailableRoasts?: RoastId[];
  defaultRoast?: RoastId;
  defaultGrind?: GrindId;
  onChange?: (selection: RoastGrindSelection) => void;
  className?: string;
}

const cx = (...parts: (string | false | undefined)[]) =>
  parts.filter(Boolean).join(" ");

export function RoastGrindPicker({
  baseSku,
  variantIdByRoast,
  unavailableRoasts = [],
  defaultRoast = DEFAULT_ROAST,
  defaultGrind = DEFAULT_GRIND,
  onChange,
  className,
}: Props) {
  const [roastId, setRoastId] = useState<RoastId>(defaultRoast);
  const [grindId, setGrindId] = useState<GrindId>(defaultGrind);
  const [brewMethod, setBrewMethod] = useState<string | undefined>(
    "I grind my own"
  );
  const [manualGrind, setManualGrind] = useState(false);

  const grind = getGrind(grindId);
  const roast = getRoast(roastId);

  const selection = useMemo<RoastGrindSelection>(() => {
    const attributes = [{ key: "Grind", value: grind.label }];
    if (brewMethod && brewMethod !== "I grind my own") {
      attributes.push({ key: "Brew Method", value: brewMethod });
    }
    return {
      roastId,
      grindId,
      brewMethod,
      variantId: variantIdByRoast?.[roastId],
      attributes,
    };
  }, [roastId, grindId, brewMethod, grind.label, variantIdByRoast]);

  const emit = (next: Partial<RoastGrindSelection>) => {
    onChange?.({ ...selection, ...next });
  };

  const pickRoast = (id: RoastId) => {
    if (unavailableRoasts.includes(id)) return;
    setRoastId(id);
    emit({ roastId: id, variantId: variantIdByRoast?.[id] });
  };

  const pickBrew = (brew: string, id: GrindId) => {
    setBrewMethod(brew);
    setGrindId(id);
    const attributes = [{ key: "Grind", value: getGrind(id).label }];
    if (brew !== "I grind my own") {
      attributes.push({ key: "Brew Method", value: brew });
    }
    emit({ grindId: id, brewMethod: brew, attributes });
  };

  const pickGrindDirect = (id: GrindId) => {
    setGrindId(id);
    setBrewMethod(undefined);
    emit({
      grindId: id,
      brewMethod: undefined,
      attributes: [{ key: "Grind", value: getGrind(id).label }],
    });
  };

  return (
    <div className={cx("space-y-8", className)}>
      {/* ------------------------------------------------------ ROAST */}
      <fieldset>
        <legend className="mb-3 flex w-full items-baseline justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">
            01 — Select roast
          </span>
          <span className="font-mono text-[11px] text-zinc-600">
            {variantSku(baseSku, roastId)}
          </span>
        </legend>

        <div className="grid gap-2 sm:grid-cols-3">
          {ROASTS.map((r) => {
            const active = r.id === roastId;
            const disabled = unavailableRoasts.includes(r.id);
            return (
              <button
                key={r.id}
                type="button"
                disabled={disabled}
                aria-pressed={active}
                onClick={() => pickRoast(r.id)}
                className={cx(
                  "group relative rounded-none border p-4 text-left transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/70",
                  disabled && "cursor-not-allowed opacity-40",
                  active
                    ? "border-red-500/80 bg-red-500/[0.07]"
                    : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
                )}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span
                    className={cx(
                      "text-sm font-semibold tracking-wide",
                      active ? "text-red-300" : "text-zinc-200"
                    )}
                  >
                    {r.optionValue}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    {r.plain}
                  </span>
                </div>

                <p className="mt-1 text-[11px] leading-relaxed text-zinc-400">
                  {r.tasting}
                </p>

                {/* roast-level meter */}
                <div
                  className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-zinc-800"
                  aria-hidden="true"
                >
                  <div
                    className={cx(
                      "h-full rounded-full transition-all",
                      active ? "bg-red-500" : "bg-zinc-600"
                    )}
                    style={{ width: `${r.intensity}%` }}
                  />
                </div>

                {disabled && (
                  <span className="mt-2 block font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    Out of stock
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
          {roast.detail}
        </p>
      </fieldset>

      {/* ------------------------------------------------------ GRIND */}
      <fieldset>
        <legend className="mb-3 flex w-full items-baseline justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">
            02 — {manualGrind ? "Select grind" : "What are you brewing on?"}
          </span>
          <button
            type="button"
            onClick={() => setManualGrind((v) => !v)}
            className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 underline-offset-4 hover:text-red-400 hover:underline"
          >
            {manualGrind ? "Pick by brewer" : "I know my grind"}
          </button>
        </legend>

        {!manualGrind ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {BREW_METHODS.map(({ brew, grindId: gid }) => {
              const active = brew === brewMethod;
              return (
                <button
                  key={brew}
                  type="button"
                  aria-pressed={active}
                  onClick={() => pickBrew(brew, gid)}
                  className={cx(
                    "rounded-none border px-3 py-2.5 text-left text-xs transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/70",
                    active
                      ? "border-red-500/80 bg-red-500/[0.07] text-red-300"
                      : "border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700"
                  )}
                >
                  {brew}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2">
            {GRINDS.map((g) => {
              const active = g.id === grindId;
              return (
                <button
                  key={g.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => pickGrindDirect(g.id)}
                  className={cx(
                    "rounded-none border px-3 py-2.5 text-left transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/70",
                    active
                      ? "border-red-500/80 bg-red-500/[0.07]"
                      : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
                  )}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span
                      className={cx(
                        "text-xs font-medium",
                        active ? "text-red-300" : "text-zinc-200"
                      )}
                    >
                      {g.label}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500">
                      {g.microns}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-zinc-500">{g.note}</p>
                </button>
              );
            })}
          </div>
        )}
      </fieldset>

      {/* ------------------------------------------------------ RECEIPT */}
      <div className="rounded-none border border-zinc-800 bg-zinc-950/80 p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Lab order
        </p>
        <dl className="mt-3 space-y-1.5 font-mono text-[11px]">
          <div className="flex justify-between gap-4">
            <dt className="text-zinc-500">Roast</dt>
            <dd className="text-zinc-200">{roast.optionValue}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-zinc-500">Grind</dt>
            <dd className="text-zinc-200">
              {grind.label}
              <span className="ml-2 text-zinc-500">{grind.microns}</span>
            </dd>
          </div>
          {brewMethod && brewMethod !== "I grind my own" && (
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Dialed for</dt>
              <dd className="text-zinc-200">{brewMethod}</dd>
            </div>
          )}
          <div className="flex justify-between gap-4 border-t border-zinc-800 pt-1.5">
            <dt className="text-zinc-500">SKU</dt>
            <dd className="text-zinc-400">{variantSku(baseSku, roastId)}</dd>
          </div>
        </dl>
        <p className="mt-3 text-[11px] leading-relaxed text-zinc-500">
          Roasted, ground and sealed to order. Nothing sits on a shelf.
        </p>
      </div>
    </div>
  );
}

export default RoastGrindPicker;
