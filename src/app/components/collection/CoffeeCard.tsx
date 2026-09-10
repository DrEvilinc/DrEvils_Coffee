import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Coffee } from '../../data/coffees';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Button } from '../ui/button';
import { ConfigureLot } from './ConfigureLot';
import { track, productParams } from '../../lib/analytics';

interface CoffeeCardProps {
  coffee: Coffee;
  image: string;
  index: number;
}

export function CoffeeCard({ coffee, image, index }: CoffeeCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-zinc-900 border border-zinc-800 overflow-hidden mb-6">
        <ImageWithFallback
          src={image}
          alt={`${coffee.origin} coffee farm`}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        
        {/* Tier Badge */}
        <div className="absolute top-6 left-6">
          <div className="bg-black/80 border border-zinc-700 px-3 py-1.5">
            <p className="text-white text-xs font-mono tracking-widest">
              {coffee.tier} TIER
            </p>
          </div>
        </div>

        {/* Organic Badge */}
        {coffee.organic && (
          <div className="absolute top-6 right-6">
            <div className="bg-black/80 border border-zinc-700 px-3 py-1.5">
              <p className="text-zinc-400 text-xs font-mono tracking-wider">
                ORGANIC
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Origin & Producer */}
        <div>
          <h3 className="text-xl md:text-2xl text-white font-light tracking-wide mb-1">
            {coffee.origin}
          </h3>
          <p className="text-zinc-500 text-sm font-mono tracking-wide">
            {coffee.producer}
          </p>
        </div>

        {/* Process Info */}
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-600 tracking-wider">
          {coffee.variety && <span>{coffee.variety}</span>}
          <span>•</span>
          <span>{coffee.process}</span>
          <span>•</span>
          <span>{coffee.elevation}</span>
        </div>

        {/* Tier Label */}
        <div className="pt-2 border-t border-zinc-800">
          <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase">
            {coffee.tier} TIER — {coffee.tierLabel}
          </p>
        </div>

        {/* Descriptor */}
        <p className="text-zinc-400 font-light leading-relaxed">
          {coffee.descriptor}
        </p>

        {/* Flavor Profile */}
        <div className="flex flex-wrap gap-2">
          {coffee.flavorProfile.map((flavor) => (
            <span
              key={flavor}
              className="text-xs text-zinc-500 font-mono border border-zinc-800 px-2 py-1"
            >
              {flavor}
            </span>
          ))}
        </div>

        {/* Description */}
        <div className="space-y-3 text-sm text-zinc-500 font-light leading-relaxed pt-4">
          {coffee.description.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800">
          <div>
            <p className="text-xs text-zinc-600 font-mono mb-1">FLAME</p>
            <p className="text-white font-mono">{coffee.flame}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-600 font-mono mb-1">CLARITY</p>
            <p className="text-white font-mono">{coffee.clarity}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-600 font-mono mb-1">LOT SIZE</p>
            <p className="text-white font-mono">{coffee.lotSize} bags</p>
          </div>
        </div>

        {/* Configure: roast + grind, then buy */}
        <Button
          size="lg"
          type="button"
          aria-expanded={open}
          aria-controls={`configure-${coffee.sku}`}
          onClick={() =>
            setOpen((v) => {
              if (!v) track('ViewContent', productParams(coffee.sku, { origin: coffee.origin }));
              return !v;
            })
          }
          className={
            open
              ? 'w-full mt-8 bg-black text-white hover:bg-zinc-900 border border-zinc-700 font-mono text-xs tracking-[0.25em] h-auto py-5'
              : 'w-full mt-8 bg-white text-black hover:bg-zinc-200 border-white hover:border-zinc-300 font-mono text-xs tracking-[0.25em] h-auto py-5'
          }
        >
          <span className="inline-flex items-center justify-center gap-2">
            {open ? 'CLOSE' : `CONFIGURE ${coffee.sku}`}
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
            />
          </span>
        </Button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={`configure-${coffee.sku}`}
              key="configure"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <ConfigureLot coffee={coffee} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
