import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Background } from './components/Background';
import { Timer } from './components/Timer';
import { CycleIndicator } from './components/CycleIndicator';
import { Controls } from './components/Controls';
import { Stats } from './components/Stats';
import { Settings } from './components/Settings';
import { Confetti } from './components/Confetti';
import { AnimatedSun } from './components/AnimatedSun';
import { KeyboardHints } from './components/KeyboardHints';
import { useTimer } from './hooks/useTimer';
import { useSound } from './hooks/useSound';
import { useKeyboard } from './hooks/useKeyboard';
import { useLocalStorage } from './hooks/useLocalStorage';
import { DEFAULT_SETTINGS } from './utils/constants';
import { Stats as StatsType } from './types';

function App() {
  const [settings, setSettings] = useLocalStorage('pomodoro-settings', DEFAULT_SETTINGS);
  const [stats, setStats] = useLocalStorage<StatsType>('pomodoro-stats', {
    pomodorosToday: 0,
    totalFocusTime: 0,
    currentStreak: 0,
    cyclesCompleted: 0,
    lastCompletedDate: new Date().toISOString().split('T')[0],
  });

  const [showSettings, setShowSettings] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSun, setShowSun] = useState(false);

  const { play: playSound, setVolume } = useSound(settings.soundEnabled, settings.volume);

  // Update sound volume when settings change
  useEffect(() => {
    setVolume(settings.volume);
  }, [settings.volume, setVolume]);

  // Check and update streak daily
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = new Date(stats.lastCompletedDate);
    const todayDate = new Date(today);
    const diffTime = todayDate.getTime() - lastDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Streak continues
    } else if (diffDays > 1) {
      // Streak broken, reset
      setStats((prev) => ({ ...prev, currentStreak: 0 }));
    }

    // Reset daily count if it's a new day
    if (stats.lastCompletedDate !== today && diffDays >= 1) {
      setStats((prev) => ({ ...prev, pomodorosToday: 0, lastCompletedDate: today }));
    }
  }, []);

  const handleWorkComplete = useCallback(() => {
    playSound();
    const today = new Date().toISOString().split('T')[0];

    setStats((prev) => {
      const isNewDay = prev.lastCompletedDate !== today;
      return {
        ...prev,
        pomodorosToday: isNewDay ? 1 : prev.pomodorosToday + 1,
        totalFocusTime: prev.totalFocusTime + settings.workDuration,
        currentStreak: isNewDay ? prev.currentStreak + 1 : prev.currentStreak,
        lastCompletedDate: today,
      };
    });

    // Show celebration
    setShowSun(true);
    setTimeout(() => setShowSun(false), 3000);
  }, [playSound, settings.workDuration, setStats]);

  const handleBreakComplete = useCallback(() => {
    playSound();
  }, [playSound]);

  const handleCycleComplete = useCallback(() => {
    playSound();
    setStats((prev) => ({
      ...prev,
      cyclesCompleted: prev.cyclesCompleted + 1,
    }));

    // Show big celebration
    setShowConfetti(true);
    setShowSun(true);
    setTimeout(() => {
      setShowConfetti(false);
      setShowSun(false);
    }, 4000);
  }, [playSound, setStats]);

  const {
    mode,
    status,
    timeLeft,
    currentCycle,
    totalCycles,
    start,
    pause,
    reset,
    updateSettings,
  } = useTimer(settings, handleWorkComplete, handleBreakComplete, handleCycleComplete);

  const handleUpdateSettings = useCallback(
    (newSettings: Partial<typeof settings>) => {
      const updated = { ...settings, ...newSettings };
      setSettings(updated);
      updateSettings(updated);
    },
    [settings, setSettings, updateSettings]
  );

  const handleResetStats = useCallback(() => {
    setStats({
      pomodorosToday: 0,
      totalFocusTime: 0,
      currentStreak: 0,
      cyclesCompleted: 0,
      lastCompletedDate: new Date().toISOString().split('T')[0],
    });
  }, [setStats]);

  const toggleStartPause = useCallback(() => {
    if (status === 'running') {
      pause();
    } else {
      start();
    }
  }, [status, start, pause]);

  // Keyboard shortcuts
  useKeyboard({
    onSpace: toggleStartPause,
    onR: reset,
    onS: () => setShowSettings((prev) => !prev),
    onEscape: () => setShowSettings(false),
  });

  const totalDuration = mode === 'work' ? settings.workDuration * 60 : settings.breakDuration * 60;

  // Apply dark mode class to document
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  return (
    <div className={`relative min-h-screen w-full overflow-hidden ${settings.darkMode ? 'dark bg-gray-900' : ''}`}>
      {/* Animated Background */}
      <Background mode={mode} darkMode={settings.darkMode} />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl mx-auto">
          {/* Timer */}
          <div className="flex flex-col items-center">
            <Timer mode={mode} timeLeft={timeLeft} duration={totalDuration} />
            <CycleIndicator currentCycle={currentCycle} totalCycles={totalCycles} mode={mode} />
            <Controls
              mode={mode}
              status={status}
              onStart={start}
              onPause={pause}
              onReset={reset}
              onSettings={() => setShowSettings(true)}
            />
            <KeyboardHints />
          </div>

          {/* Stats */}
          <Stats stats={stats} onReset={handleResetStats} />
        </div>
      </div>

      {/* Settings Panel */}
      <Settings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />

      {/* Celebrations */}
      <AnimatePresence>
        {showConfetti && <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />}
        {showSun && <AnimatedSun show={showSun} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
