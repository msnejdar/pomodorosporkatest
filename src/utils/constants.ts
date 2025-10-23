// Complete 10-color palette - ALL colors must be used
export const COLORS = {
  deepBlue: '#001219',      // Text, shadows, dark accents
  darkTeal: '#005F73',      // Work timer start, main buttons, headers
  teal: '#0A9396',          // Work timer middle, hover states, active elements
  lightTeal: '#94D2BD',     // Work timer end, secondary text, sky/water
  beige: '#E9D8A6',         // Glass cards, neutral backgrounds, sand
  gold: '#EE9B00',          // Sun, break timer start, main accents
  darkOrange: '#CA6702',    // Break timer middle, sunset, wood
  rust: '#BB3E03',          // Break timer end, warm accents, settings
  darkRed: '#AE2012',       // Confetti, danger zone, nature shadows
  burgundy: '#9B2226',      // Reset button, warnings, error states
} as const;

// Gradient definitions for consistent usage
export const GRADIENTS = {
  // Timer gradients
  workTimer: `${COLORS.darkTeal}, ${COLORS.teal}, ${COLORS.lightTeal}`,
  breakTimer: `${COLORS.gold}, ${COLORS.darkOrange}, ${COLORS.rust}, ${COLORS.darkRed}`,

  // Button gradients
  workButton: `${COLORS.darkTeal} 0%, ${COLORS.teal} 100%`,
  breakButton: `${COLORS.gold} 0%, ${COLORS.darkOrange} 100%`,
  resetButton: `${COLORS.burgundy} 0%, ${COLORS.darkRed} 100%`,
  settingsButton: `${COLORS.rust} 0%, ${COLORS.darkOrange} 100%`,

  // Background gradients
  workSky: `${COLORS.deepBlue}, ${COLORS.darkTeal}, ${COLORS.teal}, ${COLORS.lightTeal}`,
  breakSky: `${COLORS.lightTeal}, ${COLORS.beige}, ${COLORS.gold}`,

  // Stats cards
  statsCard1: `${COLORS.darkTeal}, ${COLORS.teal}`,
  statsCard2: `${COLORS.gold}, ${COLORS.darkOrange}`,
  statsCard3: `${COLORS.rust}, ${COLORS.darkRed}`,
  statsCard4: `${COLORS.lightTeal}, ${COLORS.teal}`,

  // Text gradients
  celebrationText: `${COLORS.gold} 0%, ${COLORS.darkRed} 100%`,
};

// Confetti colors - all warm and cool colors
export const CONFETTI_COLORS = [
  COLORS.gold,
  COLORS.darkOrange,
  COLORS.rust,
  COLORS.darkRed,
  COLORS.burgundy,
  COLORS.teal,
  COLORS.lightTeal,
  COLORS.darkTeal,
];

// Dark mode colors - inverted palette for dark theme
export const DARK_COLORS = {
  deepBlue: '#E9D8A6',      // Light beige text on dark
  darkTeal: '#94D2BD',      // Light teal for headers
  teal: '#0A9396',          // Keep teal (works on dark)
  lightTeal: '#005F73',     // Darker teal for contrast
  beige: '#1A1A1A',         // Dark background instead of light
  gold: '#EE9B00',          // Keep gold (bright on dark)
  darkOrange: '#CA6702',    // Keep dark orange
  rust: '#BB3E03',          // Keep rust
  darkRed: '#AE2012',       // Keep dark red
  burgundy: '#9B2226',      // Keep burgundy
} as const;

// Default timer settings
export const DEFAULT_SETTINGS = {
  workDuration: 25, // minutes
  breakDuration: 5, // minutes
  cycles: 4,
  volume: 0.7,
  soundEnabled: true,
  darkMode: false,
  language: 'en' as 'en' | 'cs',
};

// Sound URLs (we'll use browser notification sound for now)
export const SOUNDS = {
  workComplete: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGm98OScTgwOUKzn77dhGwU7k9r0yoMsBAUpgczx3I4+CRZftuvsp1QUCkef4PK9bSIFK4DN8tmIOQcZaLvt5ZxPDBBQrOjxt2IcBTmT2vTJhC0EBCiAy/LajT8IFV+u7O2mUxMKSJ/g8r5uIwUrgc7y2Ik2Bxhou+3lnFAMEFCt6PK4YhwFOpPa9MmDLgQEJ4DN8tqNPwgVXq7s7qZTFApHn+Dyvmw',
  breakComplete: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGm98OScTgwOUKzn77dhGwU7k9r0yoMsBAUpgczx3I4+CRZftuvsp1QUCkef4PK9bSIFK4DN8tmIOQcZaLvt5ZxPDBBQrOjxt2IcBTmT2vTJhC0EBCiAy/LajT8IFV+u7O2mUxMKSJ/g8r5uIwUrgc7y2Ik2Bxhou+3lnFAMEFCt6PK4YhwFOpPa9MmDLgQEJ4DN8tqNPwgVXq7s7qZTFApHn+Dyvmw',
};

// Animation durations (ms)
export const ANIMATION = {
  confettiDuration: 4000,
  sunCelebration: 3000,
  buttonHover: 200,
  modeTransition: 500,
  slideIn: 300,
};

// Task Categories with colors and icons
export const CATEGORIES = [
  { id: 'work' as const, name: 'Work', icon: '💼', color: COLORS.darkTeal },
  { id: 'study' as const, name: 'Study', icon: '📚', color: COLORS.gold },
  { id: 'code' as const, name: 'Coding', icon: '💻', color: COLORS.teal },
  { id: 'read' as const, name: 'Reading', icon: '📖', color: COLORS.rust },
  { id: 'design' as const, name: 'Design', icon: '🎨', color: COLORS.lightTeal },
  { id: 'meeting' as const, name: 'Meeting', icon: '👥', color: COLORS.darkOrange },
  { id: 'other' as const, name: 'Other', icon: '📝', color: COLORS.burgundy },
];

// Default Goals
export const DEFAULT_GOALS = {
  dailyTarget: 8,
  weeklyTarget: 40,
};

// Break recommendations
export const BREAK_ACTIVITIES = {
  short: [
    { id: 'water', icon: '💧', text: 'Drink water' },
    { id: 'stretch', icon: '🤸', text: 'Stretch your body' },
    { id: 'eyes', icon: '👀', text: 'Rest your eyes' },
    { id: 'walk', icon: '🚶', text: 'Take a short walk' },
  ],
  long: [
    { id: 'exercise', icon: '🏃', text: 'Light exercise' },
    { id: 'snack', icon: '🍎', text: 'Healthy snack' },
    { id: 'meditation', icon: '🧘', text: 'Meditate' },
    { id: 'fresh_air', icon: '🌳', text: 'Get fresh air' },
  ],
};

// Achievement definitions
export const ACHIEVEMENTS_DATA = [
  {
    id: 'first_pomodoro' as const,
    name: 'First Steps',
    description: 'Complete your first pomodoro',
    icon: '🍅',
  },
  {
    id: 'total_10' as const,
    name: 'Getting Started',
    description: 'Complete 10 pomodoros',
    icon: '🎯',
  },
  {
    id: 'total_50' as const,
    name: 'Dedicated',
    description: 'Complete 50 pomodoros',
    icon: '⭐',
  },
  {
    id: 'total_100' as const,
    name: 'Century',
    description: 'Complete 100 pomodoros',
    icon: '💯',
  },
  {
    id: 'total_500' as const,
    name: 'Master',
    description: 'Complete 500 pomodoros',
    icon: '👑',
  },
  {
    id: 'streak_3' as const,
    name: 'Consistency',
    description: 'Work 3 days in a row',
    icon: '🔥',
  },
  {
    id: 'streak_7' as const,
    name: 'Week Warrior',
    description: 'Work 7 days in a row',
    icon: '💪',
  },
  {
    id: 'streak_30' as const,
    name: 'Monthly Master',
    description: 'Work 30 days in a row',
    icon: '🏆',
  },
  {
    id: 'early_bird' as const,
    name: 'Early Bird',
    description: 'Complete pomodoro before 8 AM',
    icon: '🌅',
  },
  {
    id: 'night_owl' as const,
    name: 'Night Owl',
    description: 'Complete pomodoro after 10 PM',
    icon: '🌙',
  },
];
