import { useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Play } from 'lucide-react';
import { FILM, embedSrc, parseFilmUrl } from '../data/film';

/**
 * "The Film" — click-to-play embed of the full hero cut with sound.
 * Poster frame until clicked, then the YouTube/Vimeo player takes over.
 * Renders nothing until FILM.url is set (src/app/data/film.ts).
 */
export function FilmSection() {
  const embed = parseFilmUrl(FILM.url);
  const [playing, setPlaying] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  if (!embed) return null;

  return (
    <section id="the-film" ref={ref} className="bg-black py-24 md:py-32 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-zinc-600 font-mono text-xs tracking-[0.3em] uppercase mb-6">
            The Film
          </div>
          <h2 className="text-3xl md:text-5xl text-white font-light tracking-wide leading-tight">
            {FILM.title}
          </h2>
        </motion.div>

        <motion.div
          className="relative aspect-video bg-zinc-950 border border-zinc-800 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {playing ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={embedSrc(embed)}
              title={FILM.title}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play: ${FILM.title}`}
              className="group absolute inset-0 w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/70"
            >
              <img
                src={FILM.poster}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/70 bg-black/40 backdrop-blur-sm group-hover:bg-red-600/80 group-hover:border-red-500 transition-colors duration-300">
                  <Play className="w-8 h-8 md:w-9 md:h-9 text-white translate-x-0.5" fill="currentColor" />
                </span>
              </span>
              <span className="absolute bottom-5 left-6 font-mono text-[11px] tracking-[0.25em] uppercase text-zinc-300">
                0:24 · Sound on
              </span>
            </button>
          )}
        </motion.div>

        <p className="mt-5 text-center text-zinc-600 font-mono text-xs tracking-wider">
          {FILM.caption}
        </p>
      </div>
    </section>
  );
}
