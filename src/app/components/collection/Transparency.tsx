import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

const principles = [
  'Single origin',
  'Roast-to-order',
  'Limited quantity',
  'Sourced for elevation and processing clarity',
];

const directTradeInfo = {
  title: 'Direct Sourcing',
  description: 'Prices negotiated directly with producers—eliminating intermediary fees. Pricing exceeds Fair Trade minimums and ensures compensation reaches those responsible for quality and cultivation.',
};

const commitments = [
  'No private labeling.',
  'No commodity blends.',
  'No shortcuts.',
];

export function Transparency() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section ref={ref} className="bg-black py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl text-white font-light mb-12">
            Transparency
          </h2>

          <div className="space-y-12">
            <div>
              <p className="text-zinc-400 text-lg font-light mb-8">
                All coffees are:
              </p>
              <ul className="space-y-4 text-zinc-300 text-base font-light">
                {principles.map((principle) => (
                  <li key={principle} className="flex items-center justify-center gap-3">
                    <span className="text-zinc-700">•</span>
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-px bg-zinc-800 max-w-md mx-auto"></div>

            <div className="max-w-2xl mx-auto">
              <h3 className="text-zinc-400 text-sm tracking-[0.2em] font-mono uppercase mb-4">
                {directTradeInfo.title}
              </h3>
              <p className="text-zinc-500 text-base font-light leading-relaxed">
                {directTradeInfo.description}
              </p>
            </div>

            <div className="h-px bg-zinc-800 max-w-md mx-auto"></div>

            <div className="space-y-4 text-zinc-500 text-lg font-light">
              {commitments.map((commitment) => (
                <p key={commitment}>{commitment}</p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}