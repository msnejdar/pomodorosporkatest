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
