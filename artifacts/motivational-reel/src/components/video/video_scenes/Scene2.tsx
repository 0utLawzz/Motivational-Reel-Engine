import { motion } from 'framer-motion';
import { REEL_CONFIG } from '@/config';
import { useEffect, useState } from 'react';

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 3500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const words = REEL_CONFIG.quote.main.split(' ');

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center w-full px-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -40, filter: "blur(8px)" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="text-center w-full">
        <h1 
          className="text-6xl font-bold tracking-tighter leading-[1.1] flex flex-wrap justify-center gap-x-4 gap-y-3"
          style={{ color: REEL_CONFIG.style.accentColor }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block text-glow"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(15px)" }}
              animate={phase >= 1 
                ? { opacity: 1, scale: 1, filter: "blur(0px)" } 
                : { opacity: 0, scale: 0.8, filter: "blur(15px)" }
              }
              transition={{ 
                duration: 1.4, 
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
      </div>
    </motion.div>
  );
}
