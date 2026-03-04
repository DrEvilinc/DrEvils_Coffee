import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router';

export function FounderSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section ref={ref} className="py-32 bg-zinc-950 relative overflow-hidden">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-zinc-600 text-xs tracking-[0.3em] mb-4 font-mono uppercase text-center">
            Origin
          </p>
          <h2 className="text-4xl md:text-5xl text-white font-light tracking-tight text-center mb-6">
            The Founder
          </h2>
          <div className="h-px w-24 bg-zinc-700 mx-auto"></div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="space-y-10 text-base md:text-lg text-zinc-300 font-light leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-xl md:text-2xl text-white text-center">
            Dr. Evil's Coffee was not built to be trendy.
          </p>

          <p className="text-center text-zinc-300">
            It was built from a lifetime around craft.
          </p>

          <div className="h-px bg-zinc-800 max-w-md mx-auto"></div>

          <p className="text-zinc-300 max-w-2xl mx-auto">
            I grew up in a family that built illusions, costumes, and stage effects — work designed to hold attention under heat and scrutiny. Precision mattered. Detail mattered. Execution mattered.
          </p>

          <p className="text-zinc-400 max-w-2xl mx-auto">
            Coffee became an extension of that discipline.
          </p>

          <p className="text-zinc-400 max-w-2xl mx-auto">
            Not as a hobby — but as a study in structure, heat, timing, and restraint.
          </p>

          <div className="h-px bg-zinc-800 max-w-md mx-auto"></div>

          <p className="text-zinc-300 max-w-2xl mx-auto">
            Every lot in this collection was selected the same way we selected materials for stage work: for character, integrity, and performance under pressure.
          </p>

          <div className="space-y-4 text-zinc-400 max-w-2xl mx-auto">
            <p>This is not about hype.</p>
            <p>It's about intent.</p>
          </div>

          <div className="pt-8">
            <p className="text-zinc-500 font-mono text-sm tracking-wider text-center">
              — Sean Morris
            </p>
          </div>

          {/* CTA */}
          <div className="pt-12 text-center">
            <Link 
              to="/founder"
              className="inline-block border border-zinc-700 px-8 py-3 text-sm text-zinc-300 hover:bg-zinc-900 hover:border-zinc-600 transition-all duration-300 tracking-wider font-mono"
            >
              FULL STORY
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
