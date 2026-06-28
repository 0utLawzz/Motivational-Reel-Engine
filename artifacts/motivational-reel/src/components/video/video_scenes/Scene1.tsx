import { motion } from 'framer-motion';
import { REEL_CONFIG } from '@/config';
import { useEffect, useState } from 'react';

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 2500), // Start exit
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  // Split words for text animation
  const words = REEL_CONFIG.quote.hook.split(' ');

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center w-full px-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="text-center w-full">
        <h1 className="text-5xl font-bold tracking-tight text-white leading-[1.2] flex flex-wrap justify-center gap-x-3 gap-y-2">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block text-glow-white"
              initial={{ opacity: 0, y: 30, rotateX: -40, filter: "blur(10px)" }}
              animate={phase >= 1 
                ? { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" } 
                : { opacity: 0, y: 30, rotateX: -40, filter: "blur(10px)" }
              }
              transition={{ 
                duration: 1.2, 
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1]
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
