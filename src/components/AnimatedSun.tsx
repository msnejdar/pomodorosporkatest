import { motion } from 'framer-motion';
import { COLORS } from '../utils/constants';
import { useTranslation } from '../hooks/useTranslation';
import { Language } from '../utils/translations';

interface AnimatedSunProps {
  show: boolean;
  language?: Language;
}

export function AnimatedSun({ show, language = 'en' }: AnimatedSunProps) {
  const { t } = useTranslation(language);

  if (!show) return null;

  const rayCount = 16;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-40"
    >
      <div className="relative">
        {/* Animated Sun SVG */}
        <svg width="200" height="200" viewBox="0 0 200 200" className="animate-spin-slow">
          <defs>
            {/* Sun gradient */}
            <radialGradient id="celebrationSunGradient">
              <stop offset="0%" stopColor={COLORS.gold} />
              <stop offset="40%" stopColor={COLORS.darkOrange} />
              <stop offset="70%" stopColor={COLORS.rust} />
              <stop offset="100%" stopColor={COLORS.darkRed} stopOpacity="0.6" />
            </radialGradient>

            {/* Glow filter */}
            <filter id="sunGlow">
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Sun rays */}
          {[...Array(rayCount)].map((_, i) => {
            const angle = (i * 360) / rayCount;
            const x1 = 100 + Math.cos((angle * Math.PI) / 180) * 50;
            const y1 = 100 + Math.sin((angle * Math.PI) / 180) * 50;
            const x2 = 100 + Math.cos((angle * Math.PI) / 180) * 85;
            const y2 = 100 + Math.sin((angle * Math.PI) / 180) * 85;

            return (
              <motion.line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={i % 2 === 0 ? COLORS.gold : COLORS.darkOrange}
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ opacity: 0, strokeWidth: 0 }}
                animate={{ opacity: 0.9, strokeWidth: 4 }}
                transition={{ delay: i * 0.02, duration: 0.3 }}
              />
            );
          })}

          {/* Outer ring */}
          <motion.circle
            cx="100"
            cy="100"
            r="45"
            fill="none"
            stroke={COLORS.rust}
            strokeWidth="2"
            opacity="0.4"
            initial={{ r: 0, opacity: 0 }}
            animate={{ r: 45, opacity: 0.4 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />

          {/* Middle ring */}
          <motion.circle
            cx="100"
            cy="100"
            r="35"
            fill={COLORS.darkOrange}
            initial={{ r: 0, opacity: 0 }}
            animate={{ r: 35, opacity: 0.8 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          />

          {/* Sun core */}
          <motion.circle
            cx="100"
            cy="100"
            r="30"
            fill="url(#celebrationSunGradient)"
            filter="url(#sunGlow)"
            initial={{ r: 0 }}
            animate={{ r: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />

          {/* Inner highlight */}
          <motion.circle
            cx="90"
            cy="90"
            r="10"
            fill={COLORS.beige}
            opacity="0.6"
            initial={{ r: 0, opacity: 0 }}
            animate={{ r: 10, opacity: 0.6 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          />
        </svg>

        {/* Pulsing scale animation */}
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg width="200" height="200" viewBox="0 0 200 200">
            {/* Outer glow ring */}
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke={COLORS.darkRed}
              strokeWidth="2"
              opacity="0.3"
            />
          </svg>
        </motion.div>

        {/* Celebration message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
        >
          <div
            className="text-2xl font-bold"
            style={{
              background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.darkRed})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t('greatWork')} 🎉
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </motion.div>
  );
}
