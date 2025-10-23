import { motion } from 'framer-motion';
import { COLORS } from '../utils/constants';
import { useTranslation } from '../hooks/useTranslation';
import { Language } from '../utils/translations';

interface KeyboardHintsProps {
  language?: Language;
}

export function KeyboardHints({ language = 'en' }: KeyboardHintsProps) {
  const { t } = useTranslation(language);

  const hints = [
    { key: 'Space', action: t('startPause') },
    { key: 'R', action: t('reset') },
    { key: 'S', action: t('settings') },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="flex items-center justify-center gap-6 mt-6"
    >
      {hints.map(({ key, action }) => (
        <div key={key} className="flex items-center gap-2 text-sm">
          <kbd
            className="px-2 py-1 rounded font-mono font-semibold"
            style={{
              backgroundColor: `${COLORS.darkTeal}20`,
              color: COLORS.darkTeal,
              border: `1px solid ${COLORS.darkTeal}40`,
            }}
          >
            {key}
          </kbd>
          <span style={{ color: COLORS.deepBlue }} className="opacity-70">
            {action}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
