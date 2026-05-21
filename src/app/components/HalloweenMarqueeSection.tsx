import { ScrollingMarquee } from './ScrollingMarquee';

const MARQUEE_TOP =
  "DR. EVIL'S COFFEE · CHARLOTTE NC · EST. 1959 · THE NAME WAS EARNED · ROASTED TO ORDER · AWAKEN THE BEAST";

const MARQUEE_BOTTOM =
  'THE LAB · ROASTED FRESH · SINGLE ORIGIN · PRECISION PROCESS · NO SHORTCUTS · THE THIRD ACT';

export function HalloweenMarqueeSection() {
  return (
    <section className="bg-black" aria-label="Brand marquee">
      <ScrollingMarquee text={MARQUEE_TOP} direction="left" />
      <ScrollingMarquee text={MARQUEE_BOTTOM} direction="right" />
    </section>
  );
}
