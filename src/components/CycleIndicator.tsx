import { motion } from 'framer-motion';
import { COLORS } from '../utils/constants';
import { TimerMode } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { Language } from '../utils/translations';

interface CycleIndicatorProps {
  currentCycle: number;
  totalCycles: number;
  mode: TimerMode;
  language?: Language;
}

export function CycleIndicator({ currentCycle, totalCycles, mode, language = 'en' }: CycleIndicatorProps) {
  const { t } = useTranslation(language);
  const isWork = mode === 'work';

  return (
    <div className="flex flex-col items-center gap-3 mt-6">
      {/* Text display */}
      <div className="flex items-center gap-2 text-lg font-medium">
        <span style={{ color: isWork ? COLORS.gold : COLORS.teal }}>
          {currentCycle}
        </span>
        <span style={{ color: COLORS.deepBlue }}>{t('of')}</span>
        <span style={{ color: COLORS.lightTeal }}>
          {totalCycles}
        </span>
        <span style={{ color: COLORS.deepBlue }}>{t('cycles')}</span>
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-3">
        {[...Array(totalCycles)].map((_, index) => {
          const cycleNum = index + 1;
          const isCompleted = cycleNum < currentCycle;
          const isCurrent = cycleNum === currentCycle;
          const isRemaining = cycleNum > currentCycle;

          let dotColor: string = COLORS.beige;
          if (isCompleted) dotColor = COLORS.teal;
          else if (isCurrent) dotColor = isWork ? COLORS.gold : COLORS.teal;

          return (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: index * 0.1,
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
              className="relative"
            >
              {/* Dot */}
              <motion.div
                className="rounded-full"
                style={{
                  width: isCurrent ? '16px' : '12px',
                  height: isCurrent ? '16px' : '12px',
                  backgroundColor: dotColor,
                  opacity: isRemaining ? 0.4 : 1,
                }}
                animate={
                  isCurrent
                    ? {
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.7, 1],
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Checkmark for completed */}
              {isCompleted && (
                <motion.svg
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute inset-0 w-3 h-3 m-auto"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 4L6 11L3 8"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
