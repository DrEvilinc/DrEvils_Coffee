import { useEffect, useState } from 'react';
import {
  getCountdownParts,
  getNextHalloweenMidnight,
  padCountdownUnit,
  type CountdownParts,
} from '../../utils/halloweenCountdown';

function CountdownUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center leading-none">
      <span className="text-white font-mono text-sm tabular-nums tracking-wider">{value}</span>
      <span className="text-zinc-500 font-mono text-[10px] tracking-widest mt-0.5">{label}</span>
    </div>
  );
}

export function useHalloweenCountdown() {
  const [parts, setParts] = useState<CountdownParts>(() =>
    getCountdownParts(getNextHalloweenMidnight())
  );

  useEffect(() => {
    const tick = () => {
      setParts(getCountdownParts(getNextHalloweenMidnight()));
    };

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return parts;
}

export function HalloweenCountdownTimer({
  size = 'sm',
  className = '',
}: {
  size?: 'sm' | 'lg';
  className?: string;
}) {
  const parts = useHalloweenCountdown();
  const gap = size === 'lg' ? 'gap-2 md:gap-3' : 'gap-1.5 md:gap-2';
  const colonClass = size === 'lg' ? 'text-zinc-600 font-mono text-lg pb-4' : 'text-zinc-600 font-mono text-sm pb-3';

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
