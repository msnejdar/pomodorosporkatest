import { motion } from 'framer-motion';
import { TimerMode } from '../types';
import { COLORS } from '../utils/constants';
import { useTranslation } from '../hooks/useTranslation';
import { Language } from '../utils/translations';

interface TimerProps {
  mode: TimerMode;
  timeLeft: number; // in seconds
  duration: number; // total duration in seconds
  language?: Language;
}

export function Timer({ mode, timeLeft, duration, language = 'en' }: TimerProps) {
  const { t } = useTranslation(language);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = duration > 0 ? (duration - timeLeft) / duration : 0;

  // SVG circle properties
  const size = 300;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - progress * circumference;

  // Colors based on mode
  const isWork = mode === 'work';
  const gradient = isWork
    ? `url(#workGradient)`
    : `url(#breakGradient)`;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="relative"
    >
      {/* Glass card container */}
      <div
        className={`
          relative p-10 rounded-[32px]
          border-2 backdrop-blur-glass
          ${isWork ? 'bg-beige/80 border-teal shadow-glass-work' : 'bg-beige/80 border-gold shadow-glass-break'}
        `}
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {/* SVG Timer Circle */}
        <div className="relative flex items-center justify-center">
          <svg width={size} height={size} className="transform -rotate-90">
            <defs>
              {/* Work mode gradient */}
              <linearGradient id="workGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={COLORS.darkTeal} />
                <stop offset="50%" stopColor={COLORS.teal} />
                <stop offset="100%" stopColor={COLORS.lightTeal} />
              </linearGradient>

              {/* Break mode gradient */}
              <linearGradient id="breakGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={COLORS.gold} />
                <stop offset="33%" stopColor={COLORS.darkOrange} />
                <stop offset="66%" stopColor={COLORS.rust} />
                <stop offset="100%" stopColor={COLORS.darkRed} />
              </linearGradient>

              {/* Glow filter */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={COLORS.beige}
              strokeWidth={strokeWidth}
              opacity="0.3"
            />

            {/* Decorative outer ring */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius + 8}
              fill="none"
              stroke={COLORS.deepBlue}
              strokeWidth="1"
              opacity="0.2"
            />

            {/* Progress circle */}
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={gradient}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              filter="url(#glow)"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />

            {/* Minute markers (12 positions) */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const markerRadius = radius + 12;
              const x = size / 2 + markerRadius * Math.cos(angle);
              const y = size / 2 + markerRadius * Math.sin(angle);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="2"
                  fill={isWork ? COLORS.darkTeal : COLORS.gold}
                  opacity="0.6"
                />
              );
            })}
          </svg>

          {/* Digital time display in center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              key={`${minutes}:${seconds}`}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-6xl font-extralight tracking-wider"
              style={{
                fontFamily: 'monospace',
                color: COLORS.deepBlue,
              }}
            >
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </motion.div>

            {/* Mode label */}
            <div className="mt-2 flex items-center gap-2">
              <span
                className="text-lg font-medium"
                style={{ color: isWork ? COLORS.darkTeal : COLORS.gold }}
              >
                {isWork ? t('focusTime') : t('breakTime')}
              </span>
              <span className="text-xl">
                {isWork ? '☕' : '🌴'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
