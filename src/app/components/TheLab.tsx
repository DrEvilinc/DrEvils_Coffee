import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Thermometer, Gauge, LineChart, Microscope, Coffee } from 'lucide-react';
const roestLabPhoto = '/assets/images/roest-lab.png';
const lamarzoccoPhoto = '/assets/images/lamarzocco.png';

const features = [
  {
    icon: Thermometer,
    title: "Thermal Control",
    description: "Temperature is managed across the full roast curve to maintain even development and prevent localized scorching. Each batch is logged against defined thermal targets.",
    detail: "The ROEST fluid-bed system delivers consistent convective heat application across the roast curve. This reduces temperature variance between beans and improves profile repeatability."
  },
  {
    icon: Gauge,
    title: "Real-Time Data Logging",
    description: "Temperature, airflow, and drum speed are sampled at 100Hz and recorded for each production run. Roast curves are archived for verification and repeatability.",
    detail: "Production data is captured at 100 measurements per second throughout the roast cycle. Each batch generates a complete thermal profile that is stored and can be referenced for quality control and replication."
  },
  {
    icon: LineChart,
    title: "Profile Consistency",
    description: "Validated roast profiles are reproduced within defined tolerance ranges to ensure stable extraction performance across batches.",
    detail: "Each roast profile is executed digitally with automated control over temperature curves, airflow patterns, and development timing. This removes manual variability and ensures consistent results batch after batch."
  },
  {
    icon: Microscope,
    title: "Controlled Batch Size",
    description: "Production is limited to 250g micro-batches to maintain tight thermal control and reduce profile drift.",
    detail: "Small batch roasting allows for precise heat distribution and faster response to temperature adjustments. This ensures every bean receives uniform thermal exposure throughout the roast cycle."
  }
];

export function TheLab() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeMachine, setActiveMachine] = useState<'roest' | 'lamarzocco'>('roest');

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

        {/* Machine Selector */}
        <motion.div
          className="flex justify-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <button
            onClick={() => setActiveMachine('roest')}
            className={`px-8 py-4 border font-mono text-sm tracking-wider transition-all ${
              activeMachine === 'roest'
                ? 'bg-white text-black border-white'
                : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600'
            }`}
          >
            ROEST PRODUCTION ROASTER
          </button>
          <button
            onClick={() => setActiveMachine('lamarzocco')}
            className={`px-8 py-4 border font-mono text-sm tracking-wider transition-all ${
              activeMachine === 'lamarzocco'
                ? 'bg-white text-black border-white'
                : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600'
            }`}
          >
            LA MARZOCCO LINEA MINI
          </button>
        </motion.div>

        {/* Machine Image & Description */}
        <motion.div
          className="mb-20"
          key={activeMachine}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            {/* Image */}
            <div className="relative aspect-square bg-zinc-900 border border-zinc-800 overflow-hidden">
              <img 
                src={activeMachine === 'roest' 
                  ? roestLabPhoto
                  : lamarzoccoPhoto
                }
                alt={activeMachine === 'roest' ? 'ROEST coffee roaster' : 'La Marzocco Linea Mini'}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
              
              {/* Data Overlay */}
              <div className="absolute bottom-8 left-8 font-mono">
                <div className="bg-black/80 border border-zinc-700 p-4 backdrop-blur-sm">
                  {activeMachine === 'roest' ? (
                    <>
                      <p className="text-zinc-500 text-xs mb-2">ACTIVE ROAST PROFILE</p>
                      <p className="text-white text-sm">ROEST-2401A • 210°C DROP</p>
                      <p className="text-zinc-400 text-xs mt-1">11:45 DURATION • 18.5% DEVELOPMENT</p>
                    </>
                  ) : (
                    <>
                      <p className="text-zinc-500 text-xs mb-2">EXTRACTION PARAMETERS</p>
                      <p className="text-white text-sm">93°C • 9 BAR PRESSURE</p>
                      <p className="text-zinc-400 text-xs mt-1">DUAL BOILER • PID CONTROL</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <div>
                <p className="text-zinc-600 text-xs tracking-widest mb-3 font-mono">
                  {activeMachine === 'roest' ? 'ROASTING TECHNOLOGY' : 'ESPRESSO TECHNOLOGY'}
                </p>
                <h3 className="text-3xl md:text-4xl text-white font-light mb-4">
                  {activeMachine === 'roest' ? 'ROEST Production Roaster' : 'La Marzocco Linea Mini'}
                </h3>
                <div className="h-px bg-zinc-800 mb-6"></div>
              </div>

              {activeMachine === 'roest' ? (
                <>
                  <p className="text-zinc-300 leading-relaxed mb-4">
                    We roast on a ROEST fluid-bed platform engineered for controlled small-batch production.
                  </p>
                  <p className="text-zinc-300 leading-relaxed mb-4">
                    Temperature, airflow, and drum speed are monitored in real time at 100Hz. Each roast is recorded and repeatable within ±1°C tolerance, allowing us to deliver stable profiles across espresso and filter programs.
                  </p>
                  <p className="text-zinc-300 leading-relaxed font-mono text-sm">
                    Roast development is measured, not estimated.
                  </p>

                  {/* Production Specifications */}
                  <div className="bg-zinc-900 border border-zinc-700 p-6 mt-6">
                    <p className="text-zinc-500 font-mono text-xs mb-4 tracking-widest">PRODUCTION SPECIFICATIONS</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-zinc-600 text-xs mb-1 font-mono">Batch Size</p>
                        <p className="text-white text-base">250g</p>
                      </div>
                      <div>
                        <p className="text-zinc-600 text-xs mb-1 font-mono">Thermal Accuracy</p>
                        <p className="text-white text-base">±1°C</p>
                      </div>
                      <div>
                        <p className="text-zinc-600 text-xs mb-1 font-mono">Data Sampling</p>
                        <p className="text-white text-base">100Hz</p>
                      </div>
                      <div>
                        <p className="text-zinc-600 text-xs mb-1 font-mono">Profile Repeatability</p>
                        <p className="text-white text-base">99.9%</p>
                      </div>
                    </div>
                  </div>

                  {/* Calibrated Roast Protocols */}
                  <div className="bg-zinc-900 border border-zinc-700 p-6 mt-6">
                    <p className="text-white font-mono text-sm mb-3 tracking-wide">CALIBRATED ROAST PROTOCOLS</p>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      We develop and maintain structured roast profiles engineered for espresso, filter, and multi-roaster integration. Profiles are refined through controlled testing and documented for repeatability across production runs.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-zinc-300 leading-relaxed mb-4">
                    Our extraction testing is conducted on a La Marzocco Linea Mini platform to ensure thermal stability and pressure consistency during profile calibration.
                  </p>
                  <p className="text-zinc-300 leading-relaxed mb-4">
                    Dual independent boilers with PID temperature control allow us to test espresso development under controlled conditions. The saturated group head maintains stable brew temperature shot after shot, ensuring repeatable extraction data during roast evaluation.
                  </p>
                  <p className="text-zinc-300 leading-relaxed mb-4">
                    We calibrate roast profiles in the same temperature and pressure ranges expected in professional café environments.
                  </p>
                  <p className="text-zinc-300 leading-relaxed font-mono text-sm">
                    Extraction is measured, not assumed.
                  </p>

                  {/* Extraction Specifications */}
                  <div className="bg-zinc-900 border border-zinc-700 p-6 mt-6">
                    <p className="text-zinc-500 font-mono text-xs mb-4 tracking-widest">EXTRACTION SPECIFICATIONS</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-zinc-600 text-xs mb-1 font-mono">Brew Temperature</p>
                        <p className="text-white text-base">93°C PID-Controlled</p>
                      </div>
                      <div>
                        <p className="text-zinc-600 text-xs mb-1 font-mono">Pressure</p>
                        <p className="text-white text-base">9 Bar</p>
                      </div>
                      <div>
                        <p className="text-zinc-600 text-xs mb-1 font-mono">Boiler System</p>
                        <p className="text-white text-base">Dual Independent</p>
                      </div>
                      <div>
                        <p className="text-zinc-600 text-xs mb-1 font-mono">Group Head</p>
                        <p className="text-white text-base">Saturated</p>
                      </div>
                    </div>
                  </div>

                  {/* Validation Statement */}
                  <div className="bg-zinc-900 border border-zinc-700 p-6 mt-6">
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      Every espresso profile is validated under controlled thermal and pressure conditions prior to release.
                    </p>
                  </div>
                </>
              )}

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-800">
                {activeMachine === 'roest' ? (
                  <>
                    <div>
                      <p className="text-zinc-600 text-xs mb-1 font-mono">BATCH SIZE</p>
                      <p className="text-white text-lg">250g</p>
                    </div>
                    <div>
                      <p className="text-zinc-600 text-xs mb-1 font-mono">PRECISION</p>
                      <p className="text-white text-lg">±1°C</p>
                    </div>
                    <div>
                      <p className="text-zinc-600 text-xs mb-1 font-mono">DATA RATE</p>
                      <p className="text-white text-lg">100Hz</p>
                    </div>
                    <div>
                      <p className="text-zinc-600 text-xs mb-1 font-mono">PROFILE CONTROL</p>
                      <p className="text-white text-lg">Digital</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-zinc-600 text-xs mb-1 font-mono">BREW TEMP</p>
                      <p className="text-white text-lg">93°C PID</p>
                    </div>
                    <div>
                      <p className="text-zinc-600 text-xs mb-1 font-mono">PRESSURE</p>
                      <p className="text-white text-lg">9 BAR</p>
                    </div>
                    <div>
                      <p className="text-zinc-600 text-xs mb-1 font-mono">BOILERS</p>
                      <p className="text-white text-lg">Dual</p>
                    </div>
                    <div>
                      <p className="text-zinc-600 text-xs mb-1 font-mono">GROUP HEAD</p>
                      <p className="text-white text-lg">Saturated</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Features - Only show for ROEST */}
        {activeMachine === 'roest' && (
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {/* Feature Tabs */}
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

            {/* Feature Detail */}
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

                {/* Specs */}
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-zinc-800">
                  <div>
                    <p className="text-zinc-600 text-xs mb-2 font-mono tracking-wider">BATCH SIZE</p>
                    <p className="text-white text-2xl font-mono font-light">250g</p>
                  </div>
                  <div>
                    <p className="text-zinc-600 text-xs mb-2 font-mono tracking-wider">PRECISION</p>
                    <p className="text-white text-2xl font-mono font-light">±1°C</p>
                  </div>
                  <div>
                    <p className="text-zinc-600 text-xs mb-2 font-mono tracking-wider">DATA RATE</p>
                    <p className="text-white text-2xl font-mono font-light">100Hz</p>
                  </div>
                  <div>
                    <p className="text-zinc-600 text-xs mb-2 font-mono tracking-wider">REPEATABILITY</p>
                    <p className="text-white text-2xl font-mono font-light">99.9%</p>
                  </div>
                </div>

                {/* Production Data Note */}
                <div className="pt-6 border-t border-zinc-800">
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    All production data is archived and available upon request for wholesale partners.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* La Marzocco Features */}
        {activeMachine === 'lamarzocco' && (
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-zinc-900 border border-zinc-800 p-8">
              <Coffee className="w-8 h-8 text-zinc-500 mb-4" />
              <h4 className="text-white text-lg font-mono mb-3">Dual Boiler System</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Independent brew and steam boilers allow simultaneous operation without temperature compromise. 
                Each boiler is PID-controlled for absolute thermal precision.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-8">
              <Thermometer className="w-8 h-8 text-zinc-500 mb-4" />
              <h4 className="text-white text-lg font-mono mb-3">Saturated Group Head</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                The same technology used in La Marzocco's commercial machines. 
                Thermally stable group maintains consistent temperature shot after shot.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-8">
              <Gauge className="w-8 h-8 text-zinc-500 mb-4" />
              <h4 className="text-white text-lg font-mono mb-3">Café-Level Performance</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Commercial-grade components in a compact form. 
                The Linea Mini delivers the same legendary extraction quality trusted by world-class baristas.
              </p>
            </div>
          </div>
        )}

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
            <p className="text-4xl md:text-5xl text-white font-light mb-2">100Hz</p>
            <p className="text-sm text-zinc-500 tracking-wide">Real-Time Monitoring</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl text-white font-light mb-2">±1°C</p>
            <p className="text-sm text-zinc-500 tracking-wide">Thermal Tolerance</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl text-white font-light mb-2">99.9%</p>
            <p className="text-sm text-zinc-500 tracking-wide">Profile Consistency</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}