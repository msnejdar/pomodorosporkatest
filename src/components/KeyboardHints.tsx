import { motion } from 'framer-motion';
import { COLORS } from '../utils/constants';

export function KeyboardHints() {
  const hints = [
    { key: 'Space', action: 'Start/Pause' },
    { key: 'R', action: 'Reset' },
    { key: 'S', action: 'Settings' },
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
