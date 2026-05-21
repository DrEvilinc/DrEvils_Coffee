import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Thermometer, Gauge, LineChart, Microscope } from 'lucide-react';

const roestLabPhoto = '/assets/images/roest-lab.png';

const features = [
  {
    icon: Thermometer,
    title: "Thermal Control",
    description: "Temperature is managed across the full roast curve to maintain even development and prevent localized scorching. Each batch is logged against defined thermal targets.",
    detail: "The ROEST dual-platform system delivers consistent convective heat application across the full roast curve. Independent control of airflow, drum speed, and temperature reduces variance between beans and ensures profile repeatability batch after batch."
  },
  {
    icon: Gauge,
    title: "Real-Time Data Logging",
    description: "Temperature, airflow, and drum speed are monitored continuously across 18+ sensors and recorded for each production run. Roast curves are archived in ROEST Connect for verification and repeatability.",
    detail: "Production data is captured at 100 measurements per second throughout the roast cycle. Each batch generates a complete thermal profile that is stored and can be referenced for quality control and replication."
  },
  {
    icon: LineChart,
    title: "Profile Consistency",
    description: "Validated roast profiles are developed on the L200 Ultra and replicated on the P3000 production roaster. Automated between-batch protocols ensure stable extraction performance across every run.",
    detail: "Each roast profile is executed digitally with automated control over temperature curves, airflow patterns, and development timing. This removes manual variability and ensures consistent results batch after batch."
  },
  {
    icon: Microscope,
    title: "Controlled Batch Size",
    description: "Production scales from 200g precision sample batches on the L200 Ultra to full 3kg production runs on the P3000 — up to 25 kg per hour throughput from a tabletop footprint.",
    detail: "Small batch roasting allows for precise heat distribution and faster response to temperature adjustments. This ensures every bean receives uniform thermal exposure throughout the roast cycle."
  }
];

export function TheLab() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section ref={ref} className="min-h-screen bg-zinc-950 py-24 px-6" id="lab">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-zinc-600 text-xs tracking-widest mb-4 font-mono">CONTROLLED PRODUCTION</p>
          <h2 className="text-5xl md:text-6xl text-white font-light mb-6">
            Laboratory Equipment
          </h2>
          <div className="h-px w-32 bg-zinc-800 mx-auto mb-8"></div>
          <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Our roasting platform is built for consistency, repeatability, and measurable thermal development.
          </p>
          <p className="text-zinc-500 text-base max-w-3xl mx-auto font-light leading-relaxed mt-4">
            Every batch is logged, documented, and reproducible within defined tolerance ranges. Precision is not aesthetic — it is infrastructure.
          </p>
        </motion.div>

        {/* ROEST Roaster */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div className="relative aspect-square bg-zinc-900 border border-zinc-800 overflow-hidden">
              <img
                src={roestLabPhoto}
                alt="ROEST coffee roaster"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>

              <div className="absolute bottom-8 left-8 font-mono">
                <div className="bg-black/80 border border-zinc-700 p-4 backdrop-blur-sm">
                  <p className="text-zinc-500 text-xs mb-2">ACTIVE ROAST PROFILE</p>
                  <p className="text-white text-sm">ROEST-2401A • 210°C DROP</p>
                  <p className="text-zinc-400 text-xs mt-1">11:45 DURATION • 18.5% DEVELOPMENT</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-zinc-600 text-xs tracking-widest mb-3 font-mono">
                  ROASTING TECHNOLOGY
                </p>
                <h3 className="text-3xl md:text-4xl text-white font-light mb-4">
                  ROEST Production Roaster
                </h3>
                <div className="h-px bg-zinc-800 mb-6"></div>
              </div>

              <p className="text-zinc-300 leading-relaxed mb-4">
                We roast on a dual ROEST platform — the L200 Ultra for precision sample development and the P3000 automated production roaster for scaled output. Convection heating ensures even development with zero scorching risk. Bean, air, drum, inlet, and pressure are monitored across 18+ sensors simultaneously. Every roast is logged, repeatable, and built to replicate batch after batch. Roast development is measured, not estimated.
              </p>

              <div className="bg-zinc-900 border border-zinc-700 p-6 mt-6">
                <p className="text-zinc-500 font-mono text-xs mb-4 tracking-widest">PRODUCTION SPECIFICATIONS</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-zinc-600 text-xs mb-1 font-mono">Batch Size</p>
                    <p className="text-white text-base">200g – 3kg</p>
                  </div>
                  <div>
                    <p className="text-zinc-600 text-xs mb-1 font-mono">Throughput</p>
                    <p className="text-white text-base">Up to 25 kg/hr</p>
                  </div>
                  <div>
                    <p className="text-zinc-600 text-xs mb-1 font-mono">Sensor Array</p>
                    <p className="text-white text-base">18+ sensors</p>
                  </div>
                  <div>
                    <p className="text-zinc-600 text-xs mb-1 font-mono">Profile Control</p>
                    <p className="text-white text-base">Fully automated</p>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-700 p-6 mt-6">
                <p className="text-white font-mono text-sm mb-3 tracking-wide">CALIBRATED ROAST PROTOCOLS</p>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  We develop profiles on the L200 Ultra and scale them to the P3000 production roaster. Profiles are engineered for espresso, filter, and multi-roaster consistency — refined through controlled testing and documented for repeatability across every production run.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-800">
                <div>
                  <p className="text-zinc-600 text-xs mb-1 font-mono">BATCH SIZE</p>
                  <p className="text-white text-lg">200g – 3kg</p>
                </div>
                <div>
                  <p className="text-zinc-600 text-xs mb-1 font-mono">PRECISION</p>
                  <p className="text-white text-lg">18+ sensors</p>
                </div>
                <div>
                  <p className="text-zinc-600 text-xs mb-1 font-mono">DATA RATE</p>
                  <p className="text-white text-lg">Continuous</p>
                </div>
                <div>
                  <p className="text-zinc-600 text-xs mb-1 font-mono">PROFILE CONTROL</p>
                  <p className="text-white text-lg">Digital</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Features */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeFeature === index;

              return (
                <motion.button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`w-full text-left p-6 border transition-all ${
                    isActive
                      ? 'bg-white border-white'
                      : 'bg-black border-zinc-800 hover:border-zinc-600'
                  }`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <Icon className={`w-6 h-6 mt-1 flex-shrink-0 ${isActive ? 'text-black' : 'text-zinc-500'}`} />
                    <div>
                      <h3 className={`text-lg font-mono mb-2 ${isActive ? 'text-black' : 'text-white'}`}>
                        {feature.title}
                      </h3>
                      <p className={`text-sm ${isActive ? 'text-zinc-800' : 'text-zinc-400'}`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            key={activeFeature}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-900 border border-zinc-800 p-8"
          >
            <div className="space-y-6">
              <div>
                <p className="text-zinc-600 text-xs tracking-widest mb-3 font-mono">TECHNICAL DETAIL</p>
                <h3 className="text-2xl text-white font-light mb-4">{features[activeFeature].title}</h3>
                <div className="h-px bg-zinc-800 mb-6"></div>
              </div>

              <p className="text-zinc-300 text-base leading-relaxed">
                {features[activeFeature].detail}
              </p>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-zinc-800">
                <div>
                  <p className="text-zinc-600 text-xs mb-2 font-mono tracking-wider">BATCH SIZE</p>
                  <p className="text-white text-2xl font-mono font-light">200g – 3kg</p>
                </div>
                <div>
                  <p className="text-zinc-600 text-xs mb-2 font-mono tracking-wider">PRECISION</p>
                  <p className="text-white text-2xl font-mono font-light">18+ sensors</p>
                </div>
                <div>
                  <p className="text-zinc-600 text-xs mb-2 font-mono tracking-wider">DATA RATE</p>
                  <p className="text-white text-2xl font-mono font-light">Continuous</p>
                </div>
                <div>
                  <p className="text-zinc-600 text-xs mb-2 font-mono tracking-wider">REPEATABILITY</p>
                  <p className="text-white text-2xl font-mono font-light">Automated</p>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-800">
                <p className="text-zinc-500 text-xs leading-relaxed">
                  All production data is archived and available upon request for wholesale partners.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-20 border-t border-zinc-800"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center">
            <p className="text-sm text-zinc-600 tracking-widest mb-3 font-mono">CONTROLLED PRODUCTION</p>
            <p className="text-zinc-400 text-sm">Platform</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl text-white font-light mb-2">25 kg/hr</p>
            <p className="text-sm text-zinc-500 tracking-wide">Max Throughput</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl text-white font-light mb-2">18+ Sensors</p>
            <p className="text-sm text-zinc-500 tracking-wide">Per Production Run</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl text-white font-light mb-2">3kg</p>
            <p className="text-sm text-zinc-500 tracking-wide">True Batch Capacity</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
