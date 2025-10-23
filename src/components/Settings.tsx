import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX } from 'lucide-react';
import { TimerSettings } from '../types';
import { COLORS } from '../utils/constants';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: TimerSettings;
  onUpdateSettings: (settings: Partial<TimerSettings>) => void;
}

export function Settings({ isOpen, onClose, settings, onUpdateSettings }: SettingsProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          {/* Settings Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-50"
            style={{
              backgroundColor: `${COLORS.beige}E6`,
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              borderLeft: `2px solid ${COLORS.teal}`,
            }}
          >
            <div className="h-full overflow-y-auto p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2
                  className="text-2xl font-bold"
                  style={{ color: COLORS.deepBlue }}
                >
                  Settings
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-black/5 transition-colors"
                  style={{ color: COLORS.deepBlue }}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Timer Settings Section */}
              <section className="mb-8">
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ color: COLORS.darkTeal }}
                >
                  ⚙️ Timer Settings
                </h3>

                {/* Work Duration */}
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: COLORS.deepBlue }}
                  >
                    Work Duration (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={settings.workDuration}
                    onChange={(e) =>
                      onUpdateSettings({ workDuration: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-4 py-2 rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 transition-all"
                    style={{
                      borderColor: COLORS.teal,
                      color: COLORS.deepBlue,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = COLORS.darkTeal;
                      e.target.style.boxShadow = `0 0 0 3px ${COLORS.teal}33`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = COLORS.teal;
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Break Duration */}
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: COLORS.deepBlue }}
                  >
                    Break Duration (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={settings.breakDuration}
                    onChange={(e) =>
                      onUpdateSettings({ breakDuration: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-4 py-2 rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none transition-all"
                    style={{
                      borderColor: COLORS.gold,
                      color: COLORS.deepBlue,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = COLORS.darkOrange;
                      e.target.style.boxShadow = `0 0 0 3px ${COLORS.gold}33`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = COLORS.gold;
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Cycles */}
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: COLORS.deepBlue }}
                  >
                    Number of Cycles
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={settings.cycles}
                    onChange={(e) =>
                      onUpdateSettings({ cycles: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-4 py-2 rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none transition-all"
                    style={{
                      borderColor: COLORS.lightTeal,
                      color: COLORS.deepBlue,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = COLORS.teal;
                      e.target.style.boxShadow = `0 0 0 3px ${COLORS.lightTeal}33`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = COLORS.lightTeal;
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </section>

              {/* Audio Settings Section */}
              <section className="mb-8">
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ color: COLORS.darkOrange }}
                >
                  🔊 Audio
                </h3>

                {/* Volume Slider */}
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: COLORS.deepBlue }}
                  >
                    Volume
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={settings.volume}
                      onChange={(e) =>
                        onUpdateSettings({ volume: parseFloat(e.target.value) })
                      }
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, ${COLORS.gold} 0%, ${COLORS.darkOrange} ${settings.volume * 100}%, ${COLORS.beige} ${settings.volume * 100}%, ${COLORS.beige} 100%)`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-xs" style={{ color: COLORS.deepBlue }}>
                    <span>0%</span>
                    <span>{Math.round(settings.volume * 100)}%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Sound Toggle */}
                <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: `${COLORS.beige}80` }}>
                  <div className="flex items-center gap-3">
                    {settings.soundEnabled ? (
                      <Volume2 size={20} style={{ color: COLORS.teal }} />
                    ) : (
                      <VolumeX size={20} style={{ color: COLORS.burgundy }} />
                    )}
                    <span className="font-medium" style={{ color: COLORS.deepBlue }}>
                      Sound Notifications
                    </span>
                  </div>
                  <button
                    onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
                    className="relative w-14 h-8 rounded-full transition-colors duration-300"
                    style={{
                      backgroundColor: settings.soundEnabled ? COLORS.teal : COLORS.burgundy,
                    }}
                  >
                    <motion.div
                      className="absolute top-1 w-6 h-6 rounded-full"
                      style={{ backgroundColor: COLORS.beige }}
                      animate={{
                        left: settings.soundEnabled ? '28px' : '4px',
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>
              </section>

              {/* Appearance Section */}
              <section className="mb-8">
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ color: COLORS.rust }}
                >
                  🎨 Appearance
                </h3>
                <div
                  className="p-4 rounded-xl text-sm"
                  style={{ backgroundColor: `${COLORS.lightTeal}20`, color: COLORS.deepBlue }}
                >
                  Theme automatically adjusts based on timer mode (Work/Break)
                </div>
              </section>

              {/* Danger Zone */}
              <section className="mt-auto pt-8 border-t-2" style={{ borderColor: `${COLORS.darkRed}40` }}>
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ color: COLORS.darkRed }}
                >
                  ⚠️ Danger Zone
                </h3>
                <p className="text-sm mb-4" style={{ color: COLORS.deepBlue }}>
                  This will reset all your statistics and cannot be undone.
                </p>
              </section>
            </div>
          </motion.div>

          <style>{`
            input[type="range"]::-webkit-slider-thumb {
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: ${COLORS.rust};
              cursor: pointer;
              box-shadow: 0 2px 8px ${COLORS.rust}66;
              transition: all 0.2s;
            }

            input[type="range"]::-webkit-slider-thumb:hover {
              transform: scale(1.2);
              box-shadow: 0 2px 12px ${COLORS.darkRed}99;
            }

            input[type="range"]::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: ${COLORS.rust};
              cursor: pointer;
              border: none;
              box-shadow: 0 2px 8px ${COLORS.rust}66;
              transition: all 0.2s;
            }

            input[type="range"]::-moz-range-thumb:hover {
              transform: scale(1.2);
              box-shadow: 0 2px 12px ${COLORS.darkRed}99;
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}
