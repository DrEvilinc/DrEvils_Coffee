import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
//import vintageDrEvilPhoto from 'public/assets/images/vintage-dr-evil.png';
const dressingRoomPhoto = '/assets/images/dressing-room.png';
//import morrisCostumesPhoto from 'public/assets/images/philip-morris.png';
//import modernLabPhoto from 'public/assets/images/roest-lab.png';

export function Legacy() {
  const { ref, inView: isInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="min-h-screen bg-black py-24 px-6" id="history">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <p className="text-zinc-600 text-xs tracking-[0.3em] mb-6 font-mono uppercase">OPERATIONAL LINEAGE</p>
          <h2 className="text-4xl md:text-5xl text-white font-light mb-12 tracking-wide">
            The Second Act: The Empire
          </h2>
        </div>

        {/* Two Column Layout: Image Left, Text Right */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-20">
          {/* Left: Historical Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="aspect-[4/5] bg-zinc-900 border border-zinc-800 overflow-hidden relative">
              <img 
                src={dressingRoomPhoto}
                alt="Philip Morris in his dressing room"
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white font-mono">
                <p className="text-xs text-zinc-400 mb-1">ARCHIVE</p>
                <p className="text-sm tracking-wider">PHILIP MORRIS</p>
                <p className="text-xs text-zinc-400">Dr. Evil on WBTV</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Story Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-2xl md:text-3xl text-zinc-400 font-light leading-relaxed">
              In 1965, Philip brought that same operational discipline off the road and into a basement on Kistler Avenue.
            </p>

            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
              What started as gorilla suits sewn by hand grew into Morris Costumes — the world's largest costume distributor.
            </p>

            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
              No outside capital. No shortcuts.
            </p>

            <p className="text-xl md:text-2xl text-white font-light leading-relaxed">
              Just structure, repetition, and an uncompromising standard applied to every product that left the building.
            </p>

            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed">
              By the time the distribution arm sold in 2021, the company had outgrown three locations, built a 300,000-square-foot warehouse, and spawned a Halloween retail franchise spanning the country.
            </p>
          </motion.div>
        </div>

        {/* The Third Act Section */}
        <div className="text-center mb-20 mt-32 pt-16 border-t border-zinc-800">
          <p className="text-zinc-600 text-xs tracking-[0.3em] mb-6 font-mono uppercase">OPERATIONAL LINEAGE</p>
          <h2 className="text-4xl md:text-5xl text-white font-light mb-12 tracking-wide">
            The Third Act: The Cup
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-8">
            <p className="text-2xl md:text-3xl text-zinc-400 font-light leading-relaxed">
              A legacy of American craftsmanship defined by discipline, precision, and controlled execution.
            </p>

            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
              Dr. Evil's Coffee Laboratory represents the third generation of that standard — now applied to thermal development and modern roasting.
            </p>

            <p className="text-2xl md:text-3xl text-zinc-400 font-light leading-relaxed">
              Craft evolves. Discipline endures.
            </p>
          </div>
        </div>

        {/* Modern Lab Image - Full Width Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <div className="flex justify-center items-center">
            {/* Centered Video */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative w-full max-w-5xl"
            >
              <div className="aspect-video bg-zinc-900 border border-zinc-800 overflow-hidden relative">
                {/* YouTube Video Embed - Philip Morris Ghost Shows */}
                <iframe 
                  src="https://www.youtube.com/embed/qbYbX3zeito?rel=0&modestbranding=1"
                  title="Philip Morris - Dr. Evil's Ghost Shows"
                  className="w-full h-full object-cover"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ border: 'none' }}
                ></iframe>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-6 left-6 text-white font-mono pointer-events-none">
                  <p className="text-xs text-zinc-400 mb-1">ARCHIVE</p>
                  <p className="text-sm tracking-wider">PHILIP MORRIS</p>
                  <p className="text-xs text-zinc-400">Dr. Evil's Ghost Shows</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Story Text */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Timeline */}
          {/* <div className="grid md:grid-cols-7 gap-6 mt-16 pt-16 border-t border-zinc-800">
            <div className="text-center">
              <p className="text-4xl text-white font-light mb-3">1957</p>
              <p className="text-sm text-zinc-400 tracking-wide">APPLIED PERFORMANCE ENGINEERING</p>
              <p className="text-xs text-zinc-600 mt-2">Foundations in Controlled Production</p>
            </div>
            <div className="text-center">
              <p className="text-4xl text-white font-light mb-3">1962</p>
              <p className="text-sm text-zinc-400 tracking-wide">NATIONAL CRAFT DISTRIBUTION</p>
              <p className="text-xs text-zinc-600 mt-2">Scalable Manufacturing Systems</p>
            </div>
            <div className="text-center">
              <p className="text-4xl text-white font-light mb-3">1967</p>
              <p className="text-sm text-zinc-400 tracking-wide">PRECISION FABRICATION</p>
              <p className="text-xs text-zinc-600 mt-2">Advanced Material Construction</p>
            </div>
            <div className="text-center">
              <p className="text-4xl text-white font-light mb-3">1991</p>
              <p className="text-sm text-zinc-400 tracking-wide">COMMERCIAL AIRBRUSH SYSTEMS</p>
              <p className="text-xs text-zinc-600 mt-2">Technical Process Innovation</p>
            </div>
            <div className="text-center">
              <p className="text-4xl text-white font-light mb-3">1999</p>
              <p className="text-sm text-zinc-400 tracking-wide">ENVIRONMENTAL EXPERIENCE DESIGN</p>
              <p className="text-xs text-zinc-600 mt-2">Atmosphere Architecture</p>
            </div>
            <div className="text-center">
              <p className="text-4xl text-white font-light mb-3">2000</p>
              <p className="text-sm text-zinc-400 tracking-wide">NATIONAL RETAIL INFRASTRUCTURE</p>
              <p className="text-xs text-zinc-600 mt-2">Operational Deployment at Scale</p>
            </div>
            <div className="text-center">
              <p className="text-4xl text-white font-light mb-3">2026</p>
              <p className="text-sm text-zinc-400 tracking-wide">COFFEE LABORATORY</p>
              <p className="text-xs text-zinc-600 mt-2">Thermal Systems Engineering</p>
            </div>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}