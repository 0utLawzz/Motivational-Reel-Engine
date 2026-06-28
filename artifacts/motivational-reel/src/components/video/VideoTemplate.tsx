import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { REEL_CONFIG } from '@/config';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';

export const SCENE_DURATIONS: Record<string, number> = {
  hook: REEL_CONFIG.timing.hook,
  main: REEL_CONFIG.timing.main,
  ending: REEL_CONFIG.timing.ending,
  author: REEL_CONFIG.timing.author,
  endCard: REEL_CONFIG.timing.endCard,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  hook: Scene1,
  main: Scene2,
  ending: Scene3,
  author: Scene4,
  endCard: Scene5,
};

const SCENE_START_SEC: Record<string, number> = (() => {
  const out: Record<string, number> = {};
  let cumulativeMs = 0;
  for (const [key, ms] of Object.entries(SCENE_DURATIONS)) {
    out[key] = cumulativeMs / 1000;
    cumulativeMs += ms;
  }
  return out;
})();

const AUDIO_SEEK_EPSILON_SEC = 0.18;

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  muted = false,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  muted?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentScene, currentSceneKey } = useVideoPlayer({ durations, loop });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '');
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const totalScenes = Object.keys(SCENE_DURATIONS).length;
  const progressPercent = ((sceneIndex + 1) / totalScenes) * 100;

  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    const targetTime = SCENE_START_SEC[baseSceneKey] ?? 0;
    if (Math.abs(audio.currentTime - targetTime) > AUDIO_SEEK_EPSILON_SEC) {
      audio.currentTime = targetTime;
    }
    audio.play().catch(() => {});
  }, [currentSceneKey, baseSceneKey, muted]);

  return (
    <div className="w-full h-screen overflow-hidden relative bg-[#050505] text-white flex justify-center">
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}audio/bg_music.mp3`}
        preload="auto"
        autoPlay
        muted={muted}
      />

      <div className="relative w-full h-full max-w-[56.25vh] overflow-hidden shadow-2xl flex flex-col">

        {/* Continuous Background Layer */}
        <div className="absolute inset-0 z-0 bg-[#050505]">
          <video
            src={`${import.meta.env.BASE_URL}videos/bg-particles.mp4`}
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
            autoPlay
            muted
            playsInline
            loop
          />

          <div className="absolute inset-0 bg-noise z-10" />

          <motion.div
            className="absolute -top-[20%] -left-[20%] w-[140%] h-[60%] rounded-[100%] opacity-[0.15] blur-[100px] pointer-events-none"
            style={{ background: `radial-gradient(circle, ${REEL_CONFIG.style.accentColor}, transparent 70%)` }}
            animate={{
              y: ['0%', '20%', '0%'],
              x: ['0%', '10%', '-10%', '0%'],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute -bottom-[10%] -right-[20%] w-[120%] h-[70%] rounded-[100%] opacity-[0.1] blur-[120px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, #FFFFFF, transparent 70%)' }}
            animate={{
              y: ['0%', '-30%', '0%'],
              x: ['0%', '-20%', '10%', '0%'],
              scale: [1, 1.1, 0.8, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />

          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: (i % 4) + 1 + 'px',
                height: (i % 4) + 1 + 'px',
                background: i % 2 === 0 ? REEL_CONFIG.style.accentColor : '#FFFFFF',
                left: `${(i * 6.67) % 100}%`,
                top: `${(i * 13.3) % 100}%`,
                opacity: 0.15 + (i % 5) * 0.07,
                boxShadow: `0 0 ${(i % 6) + 5}px ${REEL_CONFIG.style.accentColor}`,
              }}
              animate={{
                y: [0, -150 - i * 15],
                x: [0, (i % 2 === 0 ? 1 : -1) * (20 + i * 4)],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 12 + (i % 5) * 2,
                repeat: Infinity,
                ease: 'linear',
                delay: -(i * 1.3),
              }}
            />
          ))}
        </div>

        {/* Global Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-50">
          <motion.div
            className="h-full"
            style={{ backgroundColor: REEL_CONFIG.style.accentColor }}
            initial={{ width: `${(sceneIndex / totalScenes) * 100}%` }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>

        {/* Foreground Content */}
        <div className="relative z-20 flex-1 flex flex-col justify-center items-center px-8">
          <AnimatePresence mode="popLayout">
            {SceneComponent && <SceneComponent key={currentSceneKey} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
