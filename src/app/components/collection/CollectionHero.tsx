import { motion } from 'motion/react';
// import { Button } from '../ui/button';

export function CollectionHero() {
  // const scrollToCollection = () => {
  //   document.getElementById('collection-grid')?.scrollIntoView({ behavior: 'smooth' });
  // };

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-6 pt-32 pb-8">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-zinc-500 text-xs tracking-[0.3em] mb-6 font-mono uppercase">
            Collection
          </p>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl text-white font-light mb-8 tracking-tight">
            Coffee Strands
          </h1>
          
          <p className="text-2xl md:text-3xl text-zinc-400 font-light mb-12">
            Volume I
          </p>

          <div className="space-y-4 text-lg md:text-xl text-zinc-300 font-light mb-2 max-w-2xl mx-auto leading-relaxed">
            <p>Each lot in this collection was selected for structure, elevation, and clarity of expression. No blends. No filler. No shortcuts.</p>
            <p className="pt-4">Only coffees that stand on their own.</p>
          </div>

          {/* <div className="mt-12 pt-12 border-t border-zinc-800 max-w-md mx-auto">
            <p className="text-zinc-600 text-xs tracking-[0.2em] font-mono uppercase">
              Limited Release • Direct Trade Lots • 2025 Arrival
            </p>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}