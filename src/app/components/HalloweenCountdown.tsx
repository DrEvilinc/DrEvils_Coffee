import { useEffect, useState } from 'react';
import {
  getCountdownParts,
  getHalloweenCountdownTarget,
  isHalloweenDay,
  padCountdownUnit,
  type CountdownParts,
} from '../../utils/halloweenCountdown';

export const BEAST_AWAKENED_MESSAGE = 'THE BEAST HAS AWAKENED';

function CountdownUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center leading-none">
      <span className="text-white font-mono text-sm tabular-nums tracking-wider">{value}</span>
      <span className="text-zinc-500 font-mono text-[10px] tracking-widest mt-0.5">{label}</span>
    </div>
  );
}

export function useHalloweenCountdown() {
  const [parts, setParts] = useState<CountdownParts>(() => {
    const target = getHalloweenCountdownTarget();
    return target ? getCountdownParts(target) : { days: 0, hours: 0, minutes: 0, seconds: 0 };
  });
  const [awakened, setAwakened] = useState(() => isHalloweenDay());

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      if (isHalloweenDay(now)) {
        setAwakened(true);
        return;
      }
      setAwakened(false);
      const target = getHalloweenCountdownTarget(now);
      if (target) {
        setParts(getCountdownParts(target, now));
      }
    };

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return { parts, awakened };
}

export function HalloweenCountdownTimer({
  size = 'sm',
  className = '',
}: {
  size?: 'sm' | 'lg';
  className?: string;
}) {
  const { parts, awakened } = useHalloweenCountdown();
  const gap = size === 'lg' ? 'gap-2 md:gap-3' : 'gap-1.5 md:gap-2';
  const colonClass = size === 'lg' ? 'text-zinc-600 font-mono text-lg pb-4' : 'text-zinc-600 font-mono text-sm pb-3';

  if (awakened) {
    return (
      <p
        className={`text-white font-mono tracking-widest shrink-0 ${size === 'lg' ? 'text-sm md:text-base' : 'text-[10px] md:text-xs'} ${className}`}
        role="status"
        aria-live="polite"
      >
        {BEAST_AWAKENED_MESSAGE}
      </p>
    );
  }

  return (
    <div
      className={`flex items-center ${gap} shrink-0 ${className}`}
      role="timer"
      aria-live="polite"
      aria-label={`Countdown to Halloween: ${parts.days} days, ${parts.hours} hours, ${parts.minutes} minutes, ${parts.seconds} seconds`}
    >
      <CountdownUnit value={padCountdownUnit(parts.days)} label="DAY" />
      <span className={colonClass}>:</span>
      <CountdownUnit value={padCountdownUnit(parts.hours)} label="HRS" />
      <span className={colonClass}>:</span>
      <CountdownUnit value={padCountdownUnit(parts.minutes)} label="MIN" />
      <span className={colonClass}>:</span>
      <CountdownUnit value={padCountdownUnit(parts.seconds)} label="SEC" />
    </div>
  );
}
