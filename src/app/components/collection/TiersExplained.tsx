import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

const tiers = [
  {
    tier: 'A TIER',
    label: 'Precision',
    description: 'High elevation. Washed. Clarity-driven. Floral lift.',
  },
  {
    tier: 'S TIER',
    label: 'Structure',
    description: 'Density. Honey or depth-driven washed lots. Espresso capable.',
  },
  {
    tier: 'FOUNDATION',
    label: 'Foundation Series',
    description: 'Balanced, versatile, anchor coffees.',
  },
  {
    tier: 'X TIER',
    label: 'Wild',
    description: 'Rustic origins. Natural process. Historic character.',
  },
];

export function TiersExplained() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section ref={ref} className="bg-zinc-950 py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-white font-light mb-4">
            The Tiers Explained
          </h2>
          <div className="h-px w-32 bg-zinc-700 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.tier}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border border-zinc-800 p-6"
            >
              <div className="mb-4">
                <p className="text-white text-lg font-mono tracking-widest mb-2">
                  {tier.tier}
                </p>
                <p className="text-zinc-500 text-sm font-mono">
                  {tier.label}
                </p>
              </div>
              <div className="h-px bg-zinc-800 mb-4"></div>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                {tier.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
