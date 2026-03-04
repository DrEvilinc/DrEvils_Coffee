import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

export function Manifesto() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section ref={ref} className="bg-zinc-950 py-32 px-6">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="text-2xl md:text-3xl text-white font-light mb-12 leading-relaxed">
          We do not release coffee casually.
        </p>

        <div className="space-y-8 text-lg md:text-xl text-zinc-400 font-light leading-relaxed">
          <p>
            Each lot in this collection was selected for structure, elevation, and clarity of expression. 
            No blends. No filler. No shortcuts.
          </p>

          <p className="text-zinc-300">
            Only coffees that stand on their own.
          </p>

          <div className="pt-8 space-y-3 text-zinc-500">
            <p>Precision where it belongs.</p>
            <p>Density where it matters.</p>
            <p>Wildness where it's earned.</p>
          </div>

          <p className="text-xl text-white pt-8">
            This is Volume I.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
