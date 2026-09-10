import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

// Hero film: seamless ~12s loop cut from the R3 hero shoot (silent by design —
// browsers refuse to autoplay video that carries an audio track).
// Source of truth for these files: DrEvil_Coffee_Hero/hero_loop.{mp4,webm}.
const HERO_VIDEO = {
  webm: '/assets/videos/hero.webm',
  mp4: '/assets/videos/hero.mp4',
  poster: '/assets/videos/hero-poster.jpg',
};

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background film with grid overlay */}
      <div className="absolute inset-0 z-0">
        <video
          className="absolute inset-0 w-full h-full object-cover object-center opacity-60 motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_VIDEO.poster}
          aria-hidden="true"
        >
          <source src={HERO_VIDEO.webm} type="video/webm" />
          <source src={HERO_VIDEO.mp4} type="video/mp4" />
        </video>
        {/* Reduced-motion / no-video fallback: the first frame of the loop */}
        <img
          src={HERO_VIDEO.poster}
          alt="Dr. Evil's Coffee laboratory"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-60 hidden motion-reduce:block"
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
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-5 h-5 text-zinc-600" />
      </motion.div>
    </section>
  );
}