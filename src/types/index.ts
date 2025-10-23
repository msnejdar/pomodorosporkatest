export type TimerMode = 'work' | 'break';

export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed';

export interface TimerSettings {
  workDuration: number; // in minutes
  breakDuration: number; // in minutes
  cycles: number;
  volume: number; // 0-1
  soundEnabled: boolean;
  darkMode: boolean;
  language: 'en' | 'cs';
}

export interface TimerState {
  mode: TimerMode;
  status: TimerStatus;
  timeLeft: number; // in seconds
  currentCycle: number;
  totalCycles: number;
  settings: TimerSettings;
}

export interface Stats {
  pomodorosToday: number;
  totalFocusTime: number; // in minutes
  currentStreak: number; // consecutive days
  cyclesCompleted: number;
  lastCompletedDate: string; // ISO date string
}

export interface ConfettiConfig {
  particleCount: number;
  colors: string[];
  duration: number;
}

export interface SoundConfig {
  enabled: boolean;
  volume: number;
}

// Categories
export type TaskCategory = 'work' | 'study' | 'code' | 'read' | 'design' | 'meeting' | 'other';

export interface CategoryInfo {
  id: TaskCategory;
  name: string;
  icon: string;
  color: string;
}

export interface Task {
  category: TaskCategory;
  name?: string;
}

// Pomodoro Log
export interface PomodoroEntry {
  id: string;
  category: TaskCategory;
  taskName?: string;
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  duration: number; // in minutes
  completed: boolean;
  note?: string;
}

// Goals
export interface Goals {
  dailyTarget: number; // number of pomodoros
  weeklyTarget: number; // number of pomodoros
}

// Achievements
export type AchievementType =
  | 'first_pomodoro'
  | 'streak_3'
  | 'streak_7'
  | 'streak_30'
  | 'total_10'
  | 'total_50'
  | 'total_100'
  | 'total_500'
  | 'night_owl'
  | 'early_bird'
  | 'century';

export interface Achievement {
  id: AchievementType;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

// Extended Stats with categories
export interface ExtendedStats extends Stats {
  categoryStats: Record<TaskCategory, number>; // minutes per category
  pomodoroLog: PomodoroEntry[];
  goals: Goals;
  achievements: Achievement[];
}
