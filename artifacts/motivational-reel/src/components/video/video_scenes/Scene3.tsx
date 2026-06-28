import { motion } from 'framer-motion';
import { REEL_CONFIG } from '@/config';
import { useEffect, useState } from 'react';

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center w-full px-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(12px)" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Decorative accent line */}
      <motion.div 
        className="w-12 h-1 mb-8"
        style={{ backgroundColor: REEL_CONFIG.style.accentColor }}
        initial={{ width: 0, opacity: 0 }}
        animate={phase >= 1 ? { width: 48, opacity: 1 } : { width: 0, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      
      <h1 className="text-5xl font-medium tracking-wide text-white text-center leading-[1.3] text-glow-white">
        <motion.span
          className="inline-block"
          initial={{ opacity: 0, clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
          animate={phase >= 1 
            ? { opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" } 
            : { opacity: 0, clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }
          }
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {REEL_CONFIG.quote.ending}
        </motion.span>
      </h1>
      
      <motion.div 
        className="w-12 h-1 mt-8"
        style={{ backgroundColor: REEL_CONFIG.style.accentColor }}
        initial={{ width: 0, opacity: 0 }}
        animate={phase >= 1 ? { width: 48, opacity: 1 } : { width: 0, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      />
    </motion.div>
  );
}
