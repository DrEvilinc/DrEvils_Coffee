import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
const vintageDrEvilPhoto = '/assets/images/vintage-dr-evil.png';

export function SpectacleSection() {
  const { ref, inView: isInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="min-h-screen bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Split Screen Content */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left: Historical Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-zinc-900 border border-zinc-800 overflow-hidden relative">
              {/* Vintage photo of Philip Morris */}
              <img 
                src={vintageDrEvilPhoto}
                alt="Philip Morris as Dr. Evil"
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white font-mono">
                <p className="text-xs text-zinc-400 mb-1">Archive</p>
                <p className="text-sm tracking-wider">PHILIP MORRIS</p>
                <p className="text-xs text-zinc-400">Master Illusionist</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Centered Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex items-center justify-center"
          >
            <div className="text-center space-y-8 py-12">
              <p className="text-2xl md:text-3xl lg:text-4xl text-white font-extralight tracking-wide leading-relaxed">
                Built on spectacle.<br />
                Refined by science.
              </p>
              <div className="h-px w-24 bg-zinc-700 mx-auto"></div>
              <p className="text-3xl md:text-4xl text-white font-light leading-relaxed mb-6">
                Good coffee is roasted.<br />
                Great coffee is engineered.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}