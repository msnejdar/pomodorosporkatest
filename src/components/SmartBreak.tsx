import { motion } from 'framer-motion';
import { Coffee, Sparkles } from 'lucide-react';
import { COLORS, BREAK_ACTIVITIES } from '../utils/constants';

interface SmartBreakProps {
  isLongBreak: boolean;
  completedPomodoros: number;
  onAccept: () => void;
  onSkip: () => void;
}

export function SmartBreak({
  isLongBreak,
  completedPomodoros,
  onAccept,
  onSkip,
}: SmartBreakProps) {
  // Get random activity suggestion
  const activities = isLongBreak ? BREAK_ACTIVITIES.long : BREAK_ACTIVITIES.short;
  const randomActivity = activities[Math.floor(Math.random() * activities.length)];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto mt-6"
    >
      <div
        className="p-6 rounded-2xl backdrop-blur-glass border-2 text-center"
        style={{
          backgroundColor: 'rgba(233, 216, 166, 0.9)',
          borderColor: isLongBreak ? COLORS.gold : COLORS.teal,
        }}
      >
        {/* Icon and Title */}
        <div className="flex items-center justify-center gap-2 mb-3">
          {isLongBreak ? (
            <Sparkles size={28} style={{ color: COLORS.gold }} />
          ) : (
            <Coffee size={28} style={{ color: COLORS.teal }} />
          )}
          <h3
            className="text-2xl font-bold"
            style={{ color: isLongBreak ? COLORS.gold : COLORS.darkTeal }}
          >
            {isLongBreak ? 'Long Break Time!' : 'Break Time!'}
          </h3>
        </div>

        {/* Congrats Message */}
        <p className="text-base mb-4" style={{ color: COLORS.deepBlue }}>
          {isLongBreak
            ? `Amazing! You've completed ${completedPomodoros} pomodoros. Take a longer break to recharge.`
            : `Great work! Take a short break to refresh.`}
        </p>

        {/* Break Duration */}
        <div
          className="text-4xl font-bold mb-4"
          style={{ color: isLongBreak ? COLORS.darkOrange : COLORS.teal }}
        >
          {isLongBreak ? '15 min' : '5 min'}
        </div>

        {/* Activity Suggestion */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-xl mb-6"
          style={{
            backgroundColor: isLongBreak
              ? 'rgba(238, 155, 0, 0.2)'
              : 'rgba(10, 147, 150, 0.2)',
            borderLeft: `4px solid ${isLongBreak ? COLORS.gold : COLORS.teal}`,
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">{randomActivity.icon}</span>
            <div className="text-left">
              <div
                className="text-xs font-semibold mb-1"
                style={{ color: COLORS.deepBlue, opacity: 0.7 }}
              >
                Suggested Activity:
              </div>
              <div className="font-semibold" style={{ color: COLORS.deepBlue }}>
                {randomActivity.text}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAccept}
            className="flex-1 py-3 rounded-xl font-semibold text-white"
            style={{
              background: isLongBreak
                ? `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.darkOrange})`
                : `linear-gradient(135deg, ${COLORS.darkTeal}, ${COLORS.teal})`,
            }}
          >
            Start Break
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSkip}
            className="px-6 py-3 rounded-xl font-semibold border-2"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              borderColor: COLORS.deepBlue,
              color: COLORS.deepBlue,
            }}
          >
            Skip
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
