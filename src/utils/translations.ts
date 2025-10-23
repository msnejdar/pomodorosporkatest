export type Language = 'en' | 'cs';

export const translations = {
  en: {
    // Timer
    focusTime: 'Focus Time',
    breakTime: 'Break Time',

    // Controls
    start: 'Start',
    pause: 'Pause',
    reset: 'Reset',

    // Cycle
    of: 'of',
    cycles: 'cycles',

    // Stats
    pomodorosToday: 'Pomodoros Today',
    totalFocusTime: 'Total Focus Time',
    currentStreak: 'Current Streak',
    cyclesCompleted: 'Cycles Completed',
    resetStatistics: 'Reset Statistics',
    resetConfirm: 'Are you sure you want to reset all statistics? This cannot be undone.',

    // Settings
    settings: 'Settings',
    timerSettings: 'Timer Settings',
    workDuration: 'Work Duration (minutes)',
    breakDuration: 'Break Duration (minutes)',
    numberOfCycles: 'Number of Cycles',

    // Audio
    audio: 'Audio',
    volume: 'Volume',
    soundNotifications: 'Sound Notifications',

    // Appearance
    appearance: 'Appearance',
    darkMode: 'Dark Mode',
    language: 'Language',
    themeAdjusts: 'Theme colors automatically adjust based on timer mode (Work/Break)',

    // Danger Zone
    dangerZone: 'Danger Zone',
    resetWarning: 'This will reset all your statistics and cannot be undone.',

    // Keyboard Hints
    startPause: 'Start/Pause',

    // Celebration
    greatWork: 'Great work!',

    // Languages
    english: 'English',
    czech: 'Czech',
  },
  cs: {
    // Timer
    focusTime: 'Čas práce',
    breakTime: 'Přestávka',

    // Controls
    start: 'Start',
    pause: 'Pauza',
    reset: 'Reset',

    // Cycle
    of: 'z',
    cycles: 'cyklů',

    // Stats
    pomodorosToday: 'Pomodorů dnes',
    totalFocusTime: 'Celkový čas práce',
    currentStreak: 'Aktuální série',
    cyclesCompleted: 'Dokončených cyklů',
    resetStatistics: 'Resetovat statistiky',
    resetConfirm: 'Opravdu chcete resetovat všechny statistiky? Tuto akci nelze vrátit zpět.',

    // Settings
    settings: 'Nastavení',
    timerSettings: 'Nastavení timeru',
    workDuration: 'Délka práce (minuty)',
    breakDuration: 'Délka přestávky (minuty)',
    numberOfCycles: 'Počet cyklů',

    // Audio
    audio: 'Zvuk',
    volume: 'Hlasitost',
    soundNotifications: 'Zvukové notifikace',

    // Appearance
    appearance: 'Vzhled',
    darkMode: 'Tmavý režim',
    language: 'Jazyk',
    themeAdjusts: 'Barvy motivu se automaticky přizpůsobují podle režimu timeru (Práce/Přestávka)',

    // Danger Zone
    dangerZone: 'Nebezpečná zóna',
    resetWarning: 'Tímto resetujete všechny vaše statistiky. Tuto akci nelze vrátit zpět.',

    // Keyboard Hints
    startPause: 'Start/Pauza',

    // Celebration
    greatWork: 'Skvělá práce!',

    // Languages
    english: 'Angličtina',
    czech: 'Čeština',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
