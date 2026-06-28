import { motion } from 'framer-motion';
import { REEL_CONFIG } from '@/config';
import { useEffect, useState } from 'react';

export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1400),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center w-full bg-black/40 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Logo/Icon */}
      <motion.div 
        className="w-24 h-24 rounded-full border-2 flex items-center justify-center mb-8"
        style={{ 
          borderColor: REEL_CONFIG.style.accentColor,
          boxShadow: `0 0 30px ${REEL_CONFIG.style.accentColor}40`
        }}
        initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
        animate={phase >= 1 ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0.5, opacity: 0, rotate: -90 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <span 
          className="text-4xl font-bold text-glow"
          style={{ color: REEL_CONFIG.style.accentColor }}
        >
          {REEL_CONFIG.brand.logoText}
        </span>
      </motion.div>

      {/* Brand Name */}
      <motion.h2 
        className="text-4xl font-bold tracking-widest text-white uppercase mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {REEL_CONFIG.brand.name}
      </motion.h2>

      {/* Tagline */}
      <motion.p 
        className="text-xl text-white/70 tracking-wider font-light"
        initial={{ opacity: 0 }}
        animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {REEL_CONFIG.brand.tagline}
      </motion.p>
    </motion.div>
  );
}
