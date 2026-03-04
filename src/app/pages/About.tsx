import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
const founderPhoto = '/assets/images/founder.png';

export function About() {
  const { ref: sectionOneRef, inView: sectionOneInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: sectionTwoRef, inView: sectionTwoInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: sectionThreeRef, inView: sectionThreeInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
        {/* Background with dual image blend */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black z-10"></div>
          <div className="absolute inset-0 flex">
            <div className="w-1/2 h-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1761229660731-891484da5c35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdHJpY2FsJTIwc3RhZ2UlMjBsaWdodHMlMjBkYXJrfGVufDF8fHx8MTc3MTE0Mjg0MXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Theatrical lighting"
                className="w-full h-full object-cover opacity-5 grayscale"
              />
            </div>
            <div className="w-1/2 h-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1755183821434-b64790951df1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjByb2FzdGluZyUyMGVxdWlwbWVudCUyMGluZHVzdHJpYWx8ZW58MXx8fHwxNzcxMTQyODQyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Coffee roasting equipment"
                className="w-full h-full object-cover opacity-5 grayscale"
              />
            </div>
          </div>
        </div>

        <div className="relative z-20 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-zinc-600 text-xs tracking-[0.3em] mb-6 font-mono uppercase">
              Philosophy
            </p>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-white font-light mb-6 tracking-tight">
              About Dr. Evil's Coffee
            </h1>

            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-20 bg-zinc-700"></div>
              <div className="w-1.5 h-1.5 bg-zinc-700 rotate-45"></div>
              <div className="h-px w-20 bg-zinc-700"></div>
            </div>

            <p className="text-2xl md:text-3xl text-zinc-300 font-light max-w-3xl mx-auto">
              Dr. Evil's Coffee was not created to follow trends.
            </p>

            <p className="text-xl md:text-2xl text-zinc-400 font-light mt-4 max-w-3xl mx-auto">
              It was built from a lifetime spent inside precision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section One: The Legacy */}
      <section ref={sectionOneRef} className="py-10 px-6 bg-zinc-950">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={sectionOneInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-8 text-lg md:text-xl text-zinc-300 font-light leading-relaxed">
            <p>
              I grew up in a family business that manufactured illusions, costumes, stage effects, and theatrical experiences for a world-class operation. My grandfather performed under the name Dr. Evil — a persona built on control, craftsmanship, and the ability to command a room.
            </p>

            <p>
              Behind the spectacle was something far less glamorous: materials tested until they held, timing rehearsed until it was automatic, details refined until failure was no longer an option.
            </p>

            <div className="h-px bg-zinc-800"></div>

            <p className="text-zinc-400 text-xl md:text-2xl">
              That environment leaves a permanent imprint.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Section Two: The Parallel */}
      <section ref={sectionTwoRef} className="py-10 px-6 bg-black relative overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>

        <motion.div
          className="max-w-4xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={sectionTwoInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-8 text-lg md:text-xl text-zinc-300 font-light leading-relaxed">
            <p>
              Coffee, at its highest level, demands the same mindset. Heat must be managed with intention. Development must be measured, not guessed. Push too far and structure collapses. Pull too early and potential is abandoned on the drum.
            </p>

            <p className="text-zinc-400">
              There is no shortcut between green and great — only process, discipline, and the willingness to start over when the result doesn't meet the standard.
            </p>

            <div className="h-px bg-zinc-800"></div>

            <p className="text-2xl md:text-3xl text-white">
              Dr. Evil's Coffee carries the name forward not as performance, but as operating principle.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Section Three: The Philosophy */}
      <section ref={sectionThreeRef} className="py-10 px-6 bg-zinc-950">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={sectionThreeInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-8 text-lg md:text-xl text-zinc-300 font-light leading-relaxed">
            <div className="space-y-4">
              <p className="text-zinc-400">We don't chase hype cycles.</p>
              <p className="text-zinc-400">We don't design for noise.</p>
            </div>

            <div className="h-px bg-zinc-800"></div>

            <p className="text-2xl md:text-3xl text-white">
              We build coffees that hold attention — because that's the only kind worth making.
            </p>

            <div className="pt-12 flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Founder Photo */}
              <div className="flex-shrink-0">
                <div className="w-48 h-48 md:w-56 md:h-56 border border-zinc-800 overflow-hidden">
                  <img 
                    src={founderPhoto} 
                    alt="Sean Morris, Founder"
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
              </div>

              {/* Founder Info */}
              <div className="flex flex-col justify-center md:pt-4">
                <p className="text-zinc-500 font-mono text-base tracking-wider">
                  Sean Morris
                </p>
                <p className="text-zinc-600 font-light text-sm mt-1">
                  Founder
                </p>
                <p className="text-zinc-700 font-light text-sm mt-2">
                  Charlotte, North Carolina
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}