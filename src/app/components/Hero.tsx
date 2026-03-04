import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Grid Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-black z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1669561670027-5cea093d8c2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMG1hY3JvJTIwY2xvc2UlMjB1cHxlbnwxfHx8fDE3NzA2ODA4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Coffee beans macro"
          className="w-full h-full object-cover opacity-30"
        />
        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 z-20 opacity-10" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6">
        {/* Main Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white mb-6 tracking-tight leading-none">
            Dr. Evil's Coffee Laboratory
          </h1>
          <div className="flex items-center justify-center gap-4 my-8">
            <div className="h-px w-16 bg-zinc-700"></div>
            <div className="w-1 h-1 bg-zinc-700 rotate-45"></div>
            <div className="h-px w-16 bg-zinc-700"></div>
          </div>
          <h2 className="text-xl md:text-2xl text-zinc-400 font-light tracking-[0.2em] uppercase">
            American Precision Roasting House
          </h2>
        </motion.div>

        {/* Core Statements */}
        <motion.div
          className="max-w-2xl mx-auto mb-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-3">
            Small-batch production.
          </p>
          <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-3">
            Controlled thermal development.
          </p>
          <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed">
            Roasted to order.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Link to="/collection">
            <Button 
              size="lg"
              className="bg-white text-black hover:bg-zinc-200 font-mono text-xs tracking-[0.3em] px-16 py-7 h-auto border-2 border-white hover:border-zinc-300 transition-all"
            >
              AVAILABLE PROFILES
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-5 h-5 text-zinc-600" />
      </motion.div>
    </section>
  );
}