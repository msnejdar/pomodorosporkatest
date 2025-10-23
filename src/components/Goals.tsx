import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { Goals as GoalsType } from '../types';
import { COLORS } from '../utils/constants';

interface GoalsProps {
  goals: GoalsType;
  dailyCompleted: number;
  weeklyCompleted: number;
}

export function Goals({ goals, dailyCompleted, weeklyCompleted }: GoalsProps) {
  const dailyProgress = Math.min((dailyCompleted / goals.dailyTarget) * 100, 100);
  const weeklyProgress = Math.min((weeklyCompleted / goals.weeklyTarget) * 100, 100);

  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Daily Goal */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-4 rounded-2xl border-2 backdrop-blur-glass"
          style={{
            backgroundColor: 'rgba(233, 216, 166, 0.8)',
            borderColor: COLORS.gold,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Target size={20} style={{ color: COLORS.gold }} />
            <h3 className="font-semibold" style={{ color: COLORS.deepBlue }}>
              Daily Goal
            </h3>
          </div>
          <div className="text-2xl font-bold mb-2" style={{ color: COLORS.gold }}>
            {dailyCompleted} / {goals.dailyTarget}
          </div>
          {/* Progress Bar */}
          <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${dailyProgress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full rounded-full"
              style={{ backgroundColor: COLORS.gold }}
            />
          </div>
        </motion.div>

        {/* Weekly Goal */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-4 rounded-2xl border-2 backdrop-blur-glass"
          style={{
            backgroundColor: 'rgba(233, 216, 166, 0.8)',
            borderColor: COLORS.teal,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Target size={20} style={{ color: COLORS.teal }} />
            <h3 className="font-semibold" style={{ color: COLORS.deepBlue }}>
              Weekly Goal
            </h3>
          </div>
          <div className="text-2xl font-bold mb-2" style={{ color: COLORS.teal }}>
            {weeklyCompleted} / {goals.weeklyTarget}
          </div>
          {/* Progress Bar */}
          <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${weeklyProgress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full rounded-full"
              style={{ backgroundColor: COLORS.teal }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
