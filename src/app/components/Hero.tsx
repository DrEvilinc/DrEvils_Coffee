import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

/**
 * HERO BACKGROUND
 * ───────────────
 * Drop your hero video in when it's ready. Set HERO_VIDEO to the file path(s)
 * and it renders a muted, looping, autoplaying background with the still image
 * as the poster/fallback (and the still is used on small screens to save data).
 *
 * Recommended export: 1920×1080 (or 2560×1440), H.264 .mp4 + VP9 .webm,
 * ~8–15s seamless loop, no audio, target < 6 MB. Put files in:
 *   /public/assets/videos/hero.mp4  and  /public/assets/videos/hero.webm
 */
const HERO_VIDEO = {
  mp4: '', // e.g. '/assets/videos/hero.mp4'  — leave '' to use the still image
  webm: '', // e.g. '/assets/videos/hero.webm'
};

// Still image used as poster + mobile fallback.
// Swap to compare: laboratory-illustration.png | brand-laboratory.png
const heroBackgroundImage = '/assets/images/hero/brand-laboratory.png';

export function Hero() {
  const hasVideo = Boolean(HERO_VIDEO.mp4 || HERO_VIDEO.webm);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background media */}
      <div className="absolute inset-0 z-0">
        {hasVideo ? (
          <video
            className="absolute inset-0 w-full h-full object-cover object-center opacity-50 hidden sm:block"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroBackgroundImage}
            aria-hidden="true"
          >
            {HERO_VIDEO.webm && <source src={HERO_VIDEO.webm} type="video/webm" />}
            {HERO_VIDEO.mp4 && <source src={HERO_VIDEO.mp4} type="video/mp4" />}
          </video>
        ) : null}

        {/* Still image: always rendered on mobile; on desktop it's the fallback
            underneath the video (and the poster while the video loads). */}
        <img
          src={heroBackgroundImage}
          alt="Dr. Evil's Coffee laboratory branding"
          className={`absolute inset-0 w-full h-full object-cover object-center opacity-50 ${
            hasVideo ? 'sm:hidden' : ''
          }`}
          loading="eager"
          // @ts-expect-error fetchpriority is valid HTML but not yet in React types
          fetchpriority="high"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/70 z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.5)_0%,transparent_70%)] z-10"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6">
        {/* Main Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white mb-6 tracking-tight leading-none">
            Dr. Evil's Coffee Laboratory
          </h1>
          <div className="flex items-center justify-center gap-4 my-8">
            <div className="h-px w-16 bg-zinc-700"></div>
            <div className="w-1 h-1 bg-zinc-700 rotate-45"></div>
            <div className="h-px w-16 bg-zinc-700"></div>
          </div>
          <h2 className="text-xl md:text-2xl text-zinc-400 font-light tracking-[0.2em] uppercase">
            American Precision Roasting House
          </h2>
        </motion.div>

        {/* Core Statements */}
        <motion.div
          className="max-w-2xl mx-auto mb-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-3">
            Small-batch production.
          </p>
          <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-3">
            Controlled thermal development.
          </p>
          <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed">
            Roasted to order.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Link to="/collection">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-zinc-200 font-mono text-xs tracking-[0.3em] px-16 py-7 h-auto border-2 border-white hover:border-zinc-300 transition-all"
            >
              AVAILABLE PROFILES
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-5 h-5 text-zinc-600" />
      </motion.div>
    </section>
  );
}
