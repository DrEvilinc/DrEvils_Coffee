interface ScrollingMarqueeProps {
  text: string;
  direction?: 'left' | 'right';
}

export function ScrollingMarquee({ text, direction = 'left' }: ScrollingMarqueeProps) {
  const segment = `${text} · `;
  const track = segment.repeat(6);
  const animationClass =
    direction === 'right' ? 'animate-marquee-scroll-right' : 'animate-marquee-scroll-left';

  return (
    <div className="bg-zinc-950 border-y border-zinc-800 overflow-hidden py-3">
      <div className={`flex w-max ${animationClass} hover:[animation-play-state:paused]`}>
        <p className="text-zinc-400 font-mono text-xs md:text-sm tracking-[0.25em] uppercase whitespace-nowrap px-4">
          {track}
        </p>
        <p className="text-zinc-400 font-mono text-xs md:text-sm tracking-[0.25em] uppercase whitespace-nowrap px-4" aria-hidden="true">
          {track}
        </p>
      </div>
    </div>
  );
}
