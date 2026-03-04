import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
const philipMorrisPhoto = '/assets/images/philip-morris.png';

export function ThirdAct() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="first-act" ref={ref} className="py-32 bg-black relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 opacity-50"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-zinc-600 font-mono text-xs tracking-[0.3em] uppercase mb-6">
            Operational Lineage
          </div>
          <h2 className="text-4xl md:text-5xl text-white font-light tracking-wide mb-2">
            The First Act: The Stage
          </h2>
        </motion.div>

        {/* Two Column Layout: Text Left, Image Right */}
        <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-center">
          {/* Left: Story Content */}
          <motion.div
            className="md:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-2xl md:text-3xl text-zinc-400 font-light leading-relaxed">
              The stage was set long before the coffee.
            </p>

            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
              Born in 1935, Philip Morris built his first empire on discipline — hitchhiking at age 11 to apprentice under master illusionist Harry Blackstone Sr., then spending decades touring America's vaudeville circuits as Dr. Evil.
            </p>

            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
              Every spook show ran on timing. Every performance demanded precision.
            </p>

            <p className="text-xl md:text-2xl text-white font-light leading-relaxed">
              Standing-room-only crowds. $30,000 weeks.
            </p>

            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed">
              A character so iconic the family later had to sue Hollywood to prove they owned him.
            </p>
          </motion.div>

          {/* Right: Historical Photo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="md:col-span-3 flex items-center"
          >
            <div className="aspect-[4/5] bg-zinc-900 border border-zinc-800 overflow-hidden relative w-full">
              <img 
                src={philipMorrisPhoto}
                alt="Philip Morris in formal attire"
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white font-mono">
                <p className="text-xs text-zinc-400 mb-1">ARCHIVE</p>
                <p className="text-sm tracking-wider">PHILIP MORRIS</p>
                <p className="text-xs text-zinc-400">The Original Dr. Evil</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}