import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { LabReportCard } from './LabReportCard';

export function LabReportPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="min-h-screen bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-zinc-600 text-xs tracking-widest mb-4 font-mono">EVERY BATCH DOCUMENTED</p>
          <h2 className="text-5xl md:text-6xl text-white font-light mb-6">
            Production Log
          </h2>
          <div className="h-px w-32 bg-zinc-800 mx-auto mb-8"></div>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Each bag includes a printed Production Log documenting origin, roast timestamp, development ratio, and profile ID.
          </p>
          <p className="text-zinc-500 text-base max-w-3xl mx-auto font-light leading-relaxed mt-4">
            This record reflects the controlled parameters used during that batch's production.
          </p>
        </motion.div>

        {/* Card Display */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <LabReportCard />
        </motion.div>

        {/* Description */}
        <motion.div
          className="max-w-3xl mx-auto grid md:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div>
            <h3 className="text-xl text-white font-mono mb-4">DOCUMENTATION</h3>
            <p className="text-zinc-400 leading-relaxed">
              Each production run is logged with origin data, roast timestamp, profile ID, and development metrics. The card serves as both verification and traceability documentation.
            </p>
          </div>
          <div>
            <h3 className="text-xl text-white font-mono mb-4">VERIFICATION</h3>
            <p className="text-zinc-400 leading-relaxed">
              Thermal performance data and QR code provide access to the complete roast curve and production parameters. All batches are archived for quality control and repeatability confirmation.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}