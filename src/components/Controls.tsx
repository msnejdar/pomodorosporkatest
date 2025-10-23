import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { TimerMode, TimerStatus } from '../types';
import { COLORS } from '../utils/constants';
import { useTranslation } from '../hooks/useTranslation';
import { Language } from '../utils/translations';

interface ControlsProps {
  mode: TimerMode;
  status: TimerStatus;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSettings: () => void;
  language?: Language;
}

export function Controls({ mode, status, onStart, onPause, onReset, onSettings, language = 'en' }: ControlsProps) {
  const { t } = useTranslation(language);
  const isRunning = status === 'running';
  const isWork = mode === 'work';

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      {/* Start/Pause Button */}
      <motion.button
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        onClick={isRunning ? onPause : onStart}
        className="group relative px-8 py-4 rounded-2xl border-2 backdrop-blur-glass transition-all duration-300"
        style={{
          backgroundColor: `${COLORS.beige}66`,
          borderColor: isWork ? COLORS.darkTeal : COLORS.gold,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div
          className="flex items-center gap-2 font-medium transition-all duration-300"
          style={{
            background: isWork
              ? `linear-gradient(135deg, ${COLORS.darkTeal}, ${COLORS.teal})`
              : `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.darkOrange})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {isRunning ? (
            <>
              <Pause size={20} style={{ color: isWork ? COLORS.teal : COLORS.darkOrange }} />
              <span>{t('pause')}</span>
            </>
          ) : (
            <>
              <Play size={20} style={{ color: isWork ? COLORS.darkTeal : COLORS.gold }} />
              <span>{t('start')}</span>
            </>
          )}
        </div>

        {/* Hover glow effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
          style={{
            backgroundColor: isWork ? `${COLORS.teal}30` : `${COLORS.gold}30`,
          }}
        />
      </motion.button>

      {/* Reset Button */}
      <motion.button
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="group relative px-8 py-4 rounded-2xl border-2 backdrop-blur-glass transition-all duration-300"
        style={{
          backgroundColor: `${COLORS.burgundy}1A`,
          borderColor: COLORS.burgundy,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div
          className="flex items-center gap-2 font-medium"
          style={{
            background: `linear-gradient(135deg, ${COLORS.darkRed}, ${COLORS.burgundy})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          <RotateCcw size={20} style={{ color: COLORS.darkRed }} />
          <span>{t('reset')}</span>
        </div>

        {/* Hover glow effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
          style={{
            backgroundColor: `${COLORS.darkRed}30`,
          }}
        />
      </motion.button>

      {/* Settings Button */}
      <motion.button
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSettings}
        className="group relative px-6 py-4 rounded-2xl border-2 backdrop-blur-glass transition-all duration-300"
        style={{
          backgroundColor: `${COLORS.beige}40`,
          borderColor: COLORS.rust,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <Settings size={20} style={{ color: COLORS.darkOrange }} />

        {/* Hover glow effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
          style={{
            backgroundColor: `${COLORS.darkOrange}30`,
          }}
        />
      </motion.button>
    </div>
  );
}
