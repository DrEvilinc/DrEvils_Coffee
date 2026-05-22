import { BEAST_AWAKENED_MESSAGE, HalloweenCountdownTimer } from './HalloweenCountdown';
import { isHalloweenDay } from '../../utils/halloweenCountdown';

const SHOP_URL = 'https://shop.drevil.coffee';

/** Fixed announcement bar height — keep in sync with Navigation `top-*` offset */
export const HALLOWEEN_BANNER_OFFSET_CLASS = 'top-10';

export function HalloweenCountdownBanner() {
  const awakened = isHalloweenDay();

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-10 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto h-full px-4 md:px-6 flex items-center justify-between gap-4">
        <p className="text-white font-mono text-[10px] md:text-xs tracking-wider truncate">
          <span className="mr-1.5" aria-hidden="true">
            🎃
          </span>
          {awakened ? (
            <span>{BEAST_AWAKENED_MESSAGE}</span>
          ) : (
            <>
              <span className="hidden sm:inline">HALLOWEEN IS COMING. AWAKEN THE BEAST.</span>
              <span className="sm:hidden">AWAKEN THE BEAST.</span>
            </>
          )}
          <a
            href={SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 md:ml-3 underline underline-offset-2 hover:text-zinc-300 transition-colors"
          >
            SHOP THE LAB
          </a>
        </p>

        <HalloweenCountdownTimer />
      </div>
    </div>
  );
}
