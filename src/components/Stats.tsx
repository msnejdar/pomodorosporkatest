import { motion } from 'framer-motion';
import { CheckCircle, Clock, Flame, Repeat } from 'lucide-react';
import { Stats as StatsType } from '../types';
import { COLORS } from '../utils/constants';
import { useTranslation } from '../hooks/useTranslation';
import { Language } from '../utils/translations';

interface StatsProps {
  stats: StatsType;
  onReset: () => void;
  language?: Language;
}

export function Stats({ stats, onReset, language = 'en' }: StatsProps) {
  const { t } = useTranslation(language);

  const statCards = [
    {
      icon: CheckCircle,
      label: t('pomodorosToday'),
      value: stats.pomodorosToday,
      borderColor: COLORS.darkTeal,
      iconColor: COLORS.teal,
      gradient: `linear-gradient(135deg, ${COLORS.darkTeal}, ${COLORS.teal})`,
    },
    {
      icon: Clock,
      label: t('totalFocusTime'),
      value: `${stats.totalFocusTime}m`,
      borderColor: COLORS.gold,
      iconColor: COLORS.darkOrange,
      gradient: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.darkOrange})`,
    },
    {
      icon: Flame,
      label: t('currentStreak'),
      value: `${stats.currentStreak}d`,
      borderColor: COLORS.rust,
      iconColor: COLORS.darkRed,
      gradient: `linear-gradient(135deg, ${COLORS.rust}, ${COLORS.darkRed})`,
    },
    {
      icon: Repeat,
      label: t('cyclesCompleted'),
      value: stats.cyclesCompleted,
      borderColor: COLORS.lightTeal,
      iconColor: COLORS.teal,
      gradient: `linear-gradient(135deg, ${COLORS.lightTeal}, ${COLORS.teal})`,
    },
  ];

  return (
    <div className="mt-8 w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative p-4 rounded-2xl border-2 backdrop-blur-glass"
            style={{
              backgroundColor: `${COLORS.beige}99`,
              borderColor: card.borderColor,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <card.icon size={24} style={{ color: card.iconColor }} />

              <motion.div
                className="text-3xl font-bold"
                style={{
                  background: card.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                key={card.value}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {card.value}
              </motion.div>

              <div
                className="text-xs text-center font-medium"
                style={{ color: COLORS.deepBlue }}
              >
                {card.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Reset stats button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 flex justify-center"
      >
        <button
          onClick={() => {
            if (window.confirm(t('resetConfirm'))) {
              onReset();
            }
          }}
          className="group px-4 py-2 rounded-xl border backdrop-blur-glass text-sm font-medium transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: `${COLORS.burgundy}10`,
            borderColor: `${COLORS.burgundy}40`,
            color: COLORS.burgundy,
          }}
        >
          {t('resetStatistics')}
        </button>
      </motion.div>
    </div>
  );
}
