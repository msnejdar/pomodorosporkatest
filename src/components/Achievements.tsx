import { motion } from 'framer-motion';
import { Trophy, Lock } from 'lucide-react';
import { Achievement } from '../types';
import { COLORS } from '../utils/constants';

interface AchievementsProps {
  achievements: Achievement[];
}

export function Achievements({ achievements }: AchievementsProps) {
  const unlocked = achievements.filter((a) => a.unlocked);

  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl backdrop-blur-glass border-2"
        style={{
          backgroundColor: 'rgba(233, 216, 166, 0.6)',
          borderColor: COLORS.gold,
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Trophy size={24} style={{ color: COLORS.gold }} />
          <h3 className="text-xl font-semibold" style={{ color: COLORS.deepBlue }}>
            Achievements ({unlocked.length}/{achievements.length})
          </h3>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              whileHover={{ scale: achievement.unlocked ? 1.05 : 1 }}
              className="p-4 rounded-xl border-2 transition-all relative"
              style={{
                backgroundColor: achievement.unlocked
                  ? 'rgba(238, 155, 0, 0.2)'
                  : 'rgba(255, 255, 255, 0.3)',
                borderColor: achievement.unlocked ? COLORS.gold : 'rgba(0, 18, 25, 0.1)',
                opacity: achievement.unlocked ? 1 : 0.5,
              }}
            >
              {/* Lock Icon for Locked Achievements */}
              {!achievement.unlocked && (
                <div className="absolute top-2 right-2">
                  <Lock size={14} style={{ color: COLORS.deepBlue, opacity: 0.5 }} />
                </div>
              )}

              {/* Achievement Icon */}
              <div className="text-3xl mb-2 text-center">{achievement.icon}</div>

              {/* Achievement Name */}
              <div
                className="text-xs font-semibold text-center mb-1"
                style={{ color: COLORS.deepBlue }}
              >
                {achievement.name}
              </div>

              {/* Achievement Description */}
              <div
                className="text-[10px] text-center"
                style={{ color: COLORS.deepBlue, opacity: 0.7 }}
              >
                {achievement.description}
              </div>

              {/* Unlocked Date */}
              {achievement.unlocked && achievement.unlockedAt && (
                <div
                  className="text-[9px] text-center mt-2"
                  style={{ color: COLORS.gold, fontWeight: 600 }}
                >
                  {new Date(achievement.unlockedAt).toLocaleDateString()}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(unlocked.length / achievements.length) * 100}%` }}
              transition={{ duration: 0.8 }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.darkOrange})`,
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
