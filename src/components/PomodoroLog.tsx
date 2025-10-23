import { motion } from 'framer-motion';
import { Calendar, Download, FileJson } from 'lucide-react';
import { PomodoroEntry, TaskCategory } from '../types';
import { COLORS, CATEGORIES } from '../utils/constants';

interface PomodoroLogProps {
  entries: PomodoroEntry[];
  onExportCSV: () => void;
  onExportJSON: () => void;
}

export function PomodoroLog({ entries, onExportCSV, onExportJSON }: PomodoroLogProps) {
  // Group entries by date
  const groupedByDate = entries.reduce((acc, entry) => {
    const date = new Date(entry.startTime).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry);
    return acc;
  }, {} as Record<string, PomodoroEntry[]>);

  const dates = Object.keys(groupedByDate).sort((a, b) =>
    new Date(b).getTime() - new Date(a).getTime()
  );

  const getCategoryInfo = (category: TaskCategory) => {
    return CATEGORIES.find((cat) => cat.id === category) || CATEGORIES[6];
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl backdrop-blur-glass border-2"
        style={{
          backgroundColor: 'rgba(233, 216, 166, 0.6)',
          borderColor: COLORS.teal,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={24} style={{ color: COLORS.teal }} />
            <h3 className="text-xl font-semibold" style={{ color: COLORS.deepBlue }}>
              Pomodoro Log ({entries.length})
            </h3>
          </div>

          {/* Export Buttons */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExportCSV}
              className="px-3 py-1.5 rounded-lg border-2 text-xs font-semibold flex items-center gap-1"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                borderColor: COLORS.darkTeal,
                color: COLORS.deepBlue,
              }}
            >
              <Download size={14} />
              CSV
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExportJSON}
              className="px-3 py-1.5 rounded-lg border-2 text-xs font-semibold flex items-center gap-1"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                borderColor: COLORS.darkTeal,
                color: COLORS.deepBlue,
              }}
            >
              <FileJson size={14} />
              JSON
            </motion.button>
          </div>
        </div>

        {/* Entries List */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {entries.length === 0 ? (
            <div
              className="text-center py-8"
              style={{ color: COLORS.deepBlue, opacity: 0.5 }}
            >
              No pomodoros completed yet. Start your first session!
            </div>
          ) : (
            dates.map((date) => (
              <div key={date}>
                {/* Date Header */}
                <div
                  className="text-sm font-semibold mb-2 sticky top-0 py-1"
                  style={{
                    color: COLORS.darkTeal,
                    backgroundColor: 'rgba(233, 216, 166, 0.9)',
                  }}
                >
                  {date}
                </div>

                {/* Entries for this date */}
                <div className="space-y-2">
                  {groupedByDate[date].map((entry) => {
                    const category = getCategoryInfo(entry.category);
                    const startTime = new Date(entry.startTime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    });

                    return (
                      <motion.div
                        key={entry.id}
                        whileHover={{ scale: 1.02 }}
                        className="p-3 rounded-xl border-2 backdrop-blur-glass"
                        style={{
                          backgroundColor: `${category.color}15`,
                          borderColor: category.color,
                        }}
                      >
                        <div className="flex items-center justify-between">
                          {/* Left: Category and Task Name */}
                          <div className="flex items-center gap-2 flex-1">
                            <span className="text-2xl">{category.icon}</span>
                            <div>
                              <div
                                className="font-semibold text-sm"
                                style={{ color: COLORS.deepBlue }}
                              >
                                {entry.taskName || category.name}
                              </div>
                              <div
                                className="text-xs"
                                style={{ color: COLORS.deepBlue, opacity: 0.6 }}
                              >
                                {startTime} • {entry.duration} min
                              </div>
                            </div>
                          </div>

                          {/* Right: Completion Status */}
                          <div
                            className="text-xs font-semibold px-2 py-1 rounded"
                            style={{
                              backgroundColor: entry.completed
                                ? `${COLORS.teal}30`
                                : `${COLORS.burgundy}30`,
                              color: entry.completed ? COLORS.teal : COLORS.burgundy,
                            }}
                          >
                            {entry.completed ? '✓ Done' : '✗ Cancelled'}
                          </div>
                        </div>

                        {/* Note (if exists) */}
                        {entry.note && (
                          <div
                            className="mt-2 text-xs italic pl-9"
                            style={{ color: COLORS.deepBlue, opacity: 0.7 }}
                          >
                            "{entry.note}"
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
