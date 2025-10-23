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
import { CategorySelector } from './components/CategorySelector';
import { Goals } from './components/Goals';
import { Achievements } from './components/Achievements';
import { PomodoroLog } from './components/PomodoroLog';
import { SmartBreak } from './components/SmartBreak';
import { useTimer } from './hooks/useTimer';
import { useSound } from './hooks/useSound';
import { useKeyboard } from './hooks/useKeyboard';
import { useLocalStorage } from './hooks/useLocalStorage';
import { DEFAULT_SETTINGS, ACHIEVEMENTS_DATA } from './utils/constants';
import { ExtendedStats, TaskCategory, PomodoroEntry } from './types';

function App() {
  const [settings, setSettings] = useLocalStorage('pomodoro-settings', DEFAULT_SETTINGS);
  const [stats, setStats] = useLocalStorage<ExtendedStats>('pomodoro-stats', {
    pomodorosToday: 0,
    totalFocusTime: 0,
    currentStreak: 0,
    cyclesCompleted: 0,
    lastCompletedDate: new Date().toISOString().split('T')[0],
    categoryStats: { work: 0, study: 0, code: 0, read: 0, design: 0, meeting: 0, other: 0 },
    pomodoroLog: [],
    goals: { dailyTarget: 8, weeklyTarget: 40 },
    achievements: ACHIEVEMENTS_DATA.map((a) => ({ ...a, unlocked: false })),
  });

  const [showSettings, setShowSettings] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSun, setShowSun] = useState(false);
  const [showCategorySelector, setShowCategorySelector] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory>('work');
  const [taskName, setTaskName] = useState('');
  const [showSmartBreak, setShowSmartBreak] = useState(false);
  const [currentPomodoroId, setCurrentPomodoroId] = useState<string | null>(null);

  const { play: playSound, setVolume } = useSound(settings.soundEnabled, settings.volume);

  // Migrate old stats data to new ExtendedStats format
  useEffect(() => {
    setStats((prev) => {
      let needsUpdate = false;
      const updated = { ...prev };

      // Add missing fields with defaults
      if (!updated.categoryStats) {
        updated.categoryStats = { work: 0, study: 0, code: 0, read: 0, design: 0, meeting: 0, other: 0 };
        needsUpdate = true;
      }
      if (!updated.pomodoroLog) {
        updated.pomodoroLog = [];
        needsUpdate = true;
      }
      if (!updated.goals) {
        updated.goals = { dailyTarget: 8, weeklyTarget: 40 };
        needsUpdate = true;
      }
      if (!updated.achievements) {
        updated.achievements = ACHIEVEMENTS_DATA.map((a) => ({ ...a, unlocked: false }));
        needsUpdate = true;
      }

      return needsUpdate ? updated : prev;
    });
  }, [setStats]);

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
    const now = new Date().toISOString();

    setStats((prev) => {
      const isNewDay = prev.lastCompletedDate !== today;

      // Complete the current pomodoro entry
      const updatedLog = prev.pomodoroLog.map((entry) =>
        entry.id === currentPomodoroId
          ? { ...entry, completed: true, endTime: now }
          : entry
      );

      // Update category stats
      const currentEntry = updatedLog.find((e) => e.id === currentPomodoroId);
      const updatedCategoryStats = { ...prev.categoryStats };
      if (currentEntry) {
        updatedCategoryStats[currentEntry.category] += settings.workDuration;
      }

      // Check and unlock achievements
      const newPomodoroCount = isNewDay ? 1 : prev.pomodorosToday + 1;
      const newTotalPomodoros = updatedLog.filter((e) => e.completed).length;
      const newStreak = isNewDay ? prev.currentStreak + 1 : prev.currentStreak;

      const updatedAchievements = prev.achievements.map((achievement) => {
        if (achievement.unlocked) return achievement;

        let shouldUnlock = false;
        if (achievement.id === 'first_pomodoro' && newTotalPomodoros >= 1) shouldUnlock = true;
        if (achievement.id === 'total_10' && newTotalPomodoros >= 10) shouldUnlock = true;
        if (achievement.id === 'total_50' && newTotalPomodoros >= 50) shouldUnlock = true;
        if (achievement.id === 'total_100' && newTotalPomodoros >= 100) shouldUnlock = true;
        if (achievement.id === 'total_500' && newTotalPomodoros >= 500) shouldUnlock = true;
        if (achievement.id === 'streak_3' && newStreak >= 3) shouldUnlock = true;
        if (achievement.id === 'streak_7' && newStreak >= 7) shouldUnlock = true;
        if (achievement.id === 'streak_30' && newStreak >= 30) shouldUnlock = true;

        return shouldUnlock ? { ...achievement, unlocked: true, unlockedAt: now } : achievement;
      });

      return {
        ...prev,
        pomodorosToday: newPomodoroCount,
        totalFocusTime: prev.totalFocusTime + settings.workDuration,
        currentStreak: newStreak,
        lastCompletedDate: today,
        categoryStats: updatedCategoryStats,
        pomodoroLog: updatedLog,
        achievements: updatedAchievements,
      };
    });

    // Show celebration
    setShowSun(true);
    setTimeout(() => setShowSun(false), 3000);

    // Reset current pomodoro
    setCurrentPomodoroId(null);
  }, [playSound, settings.workDuration, setStats, currentPomodoroId]);

  const handleBreakComplete = useCallback(() => {
    playSound();

    // Check if it's time for a long break (every 4 pomodoros)
    if (stats.pomodoroLog) {
      const completedPomodoros = stats.pomodoroLog.filter((e) => e.completed).length;
      if (completedPomodoros > 0 && completedPomodoros % 4 === 0) {
        setShowSmartBreak(true);
      }
    }
  }, [playSound, stats.pomodoroLog]);

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

  const handleStartWithCategory = useCallback(() => {
    // Create a new pomodoro entry
    const newEntry: PomodoroEntry = {
      id: Date.now().toString(),
      category: selectedCategory,
      taskName: taskName || undefined,
      startTime: new Date().toISOString(),
      endTime: '',
      duration: settings.workDuration,
      completed: false,
    };

    setStats((prev) => ({
      ...prev,
      pomodoroLog: [...prev.pomodoroLog, newEntry],
    }));

    setCurrentPomodoroId(newEntry.id);
    setShowCategorySelector(false);
    setTaskName('');
    start();
  }, [selectedCategory, taskName, settings.workDuration, setStats, start]);

  const handleExportCSV = useCallback(() => {
    if (!stats.pomodoroLog) return;

    const csv = [
      'Date,Time,Category,Task,Duration,Status',
      ...stats.pomodoroLog.map((entry) => {
        const date = new Date(entry.startTime).toLocaleDateString();
        const time = new Date(entry.startTime).toLocaleTimeString();
        return `${date},${time},${entry.category},"${entry.taskName || ''}",${entry.duration},${entry.completed ? 'Completed' : 'Cancelled'}`;
      }),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pomodoro-log-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  }, [stats.pomodoroLog]);

  const handleExportJSON = useCallback(() => {
    if (!stats.pomodoroLog) return;

    const json = JSON.stringify(stats.pomodoroLog, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pomodoro-log-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  }, [stats.pomodoroLog]);

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
      categoryStats: { work: 0, study: 0, code: 0, read: 0, design: 0, meeting: 0, other: 0 },
      pomodoroLog: [],
      goals: { dailyTarget: 8, weeklyTarget: 40 },
      achievements: ACHIEVEMENTS_DATA.map((a) => ({ ...a, unlocked: false })),
    });
  }, [setStats]);

  const toggleStartPause = useCallback(() => {
    if (status === 'running') {
      pause();
    } else if (status === 'idle' && mode === 'work') {
      // Show category selector before starting
      setShowCategorySelector(true);
    } else {
      start();
    }
  }, [status, mode, start, pause]);

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
            <Timer mode={mode} timeLeft={timeLeft} duration={totalDuration} language={settings.language} />
            <CycleIndicator currentCycle={currentCycle} totalCycles={totalCycles} mode={mode} language={settings.language} />
            <Controls
              mode={mode}
              status={status}
              onStart={start}
              onPause={pause}
              onReset={reset}
              onSettings={() => setShowSettings(true)}
              language={settings.language}
            />
            <KeyboardHints language={settings.language} />
          </div>

          {/* Category Selector */}
          {showCategorySelector && (
            <CategorySelector
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
              onStartWithCategory={handleStartWithCategory}
              taskName={taskName}
              onTaskNameChange={setTaskName}
            />
          )}

          {/* Smart Break Recommendation */}
          {showSmartBreak && (
            <SmartBreak
              isLongBreak={stats.pomodorosToday % 4 === 0}
              completedPomodoros={stats.pomodorosToday}
              onAccept={() => {
                setShowSmartBreak(false);
                start();
              }}
              onSkip={() => setShowSmartBreak(false)}
            />
          )}

          {/* Goals */}
          {stats.goals && stats.pomodoroLog && (
            <Goals
              goals={stats.goals}
              dailyCompleted={stats.pomodorosToday}
              weeklyCompleted={stats.pomodoroLog.filter((e) => {
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return e.completed && new Date(e.startTime) >= weekAgo;
              }).length}
            />
          )}

          {/* Stats */}
          <Stats stats={stats} onReset={handleResetStats} language={settings.language} />

          {/* Achievements */}
          {stats.achievements && <Achievements achievements={stats.achievements} />}

          {/* Pomodoro Log */}
          {stats.pomodoroLog && (
            <PomodoroLog
              entries={stats.pomodoroLog}
              onExportCSV={handleExportCSV}
              onExportJSON={handleExportJSON}
            />
          )}
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
        {showSun && <AnimatedSun show={showSun} language={settings.language} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
