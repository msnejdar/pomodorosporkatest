import { motion } from 'framer-motion';
import { TaskCategory } from '../types';
import { CATEGORIES } from '../utils/constants';

interface CategorySelectorProps {
  selectedCategory: TaskCategory;
  onSelect: (category: TaskCategory) => void;
  onStartWithCategory: () => void;
  taskName: string;
  onTaskNameChange: (name: string) => void;
}

export function CategorySelector({
  selectedCategory,
  onSelect,
  onStartWithCategory,
  taskName,
  onTaskNameChange,
}: CategorySelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto mb-6"
    >
      <div
        className="p-6 rounded-2xl backdrop-blur-glass border-2"
        style={{
          backgroundColor: 'rgba(233, 216, 166, 0.6)',
          borderColor: '#0A9396',
        }}
      >
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#001219' }}>
          Select Task Category
        </h3>

        {/* Category Grid */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(cat.id)}
              className="p-4 rounded-xl border-2 transition-all"
              style={{
                backgroundColor:
                  selectedCategory === cat.id ? `${cat.color}20` : 'rgba(255,255,255,0.5)',
                borderColor: selectedCategory === cat.id ? cat.color : 'transparent',
              }}
            >
              <div className="text-3xl mb-1">{cat.icon}</div>
              <div className="text-xs font-medium" style={{ color: '#001219' }}>
                {cat.name}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Task Name Input */}
        <input
          type="text"
          placeholder="Task name (optional)..."
          value={taskName}
          onChange={(e) => onTaskNameChange(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border-2 mb-4 bg-white/50"
          style={{ borderColor: '#94D2BD', color: '#001219' }}
        />

        {/* Start Button */}
        <button
          onClick={onStartWithCategory}
          className="w-full py-3 rounded-xl font-semibold transition-all hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #005F73, #0A9396)',
            color: 'white',
          }}
        >
          Start Pomodoro
        </button>
      </div>
    </motion.div>
  );
}
