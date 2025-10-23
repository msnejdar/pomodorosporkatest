import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFETTI_COLORS, ANIMATION } from '../utils/constants';

interface ConfettiProps {
  active: boolean;
  onComplete?: () => void;
}

export function Confetti({ active, onComplete }: ConfettiProps) {
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (active) {
      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Set timer to call onComplete after duration
      timerRef.current = window.setTimeout(() => {
        onComplete?.();
      }, ANIMATION.confettiDuration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [active, onComplete]);

  if (!active) return null;

  // Create particles array
  const particles = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: Math.random() * 8 + 4,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: Math.random() * 2 + 2,
  }));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              backgroundColor: particle.color,
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: '-10%',
            }}
            initial={{ y: -100, opacity: 1, rotate: 0 }}
            animate={{
              y: window.innerHeight + 100,
              opacity: [1, 1, 0],
              rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
              x: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              ease: 'linear',
            }}
          />
        ))}
      </div>
    </AnimatePresence>
  );
}
