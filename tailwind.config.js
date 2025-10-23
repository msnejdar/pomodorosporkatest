/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'deep-blue': '#001219',
        'dark-teal': '#005F73',
        'teal': '#0A9396',
        'light-teal': '#94D2BD',
        'beige': '#E9D8A6',
        'gold': '#EE9B00',
        'dark-orange': '#CA6702',
        'rust': '#BB3E03',
        'dark-red': '#AE2012',
        'burgundy': '#9B2226',
      },
      backgroundImage: {
        'work-gradient': 'linear-gradient(135deg, #005F73, #0A9396, #94D2BD)',
        'break-gradient': 'linear-gradient(135deg, #EE9B00, #CA6702, #BB3E03)',
        'work-timer-gradient': 'linear-gradient(90deg, #005F73, #0A9396, #94D2BD)',
        'break-timer-gradient': 'linear-gradient(90deg, #EE9B00, #CA6702, #BB3E03, #AE2012)',
        'work-sky': 'linear-gradient(to bottom, #001219, #005F73, #0A9396, #94D2BD)',
        'break-sky': 'linear-gradient(to bottom, #94D2BD, #E9D8A6, #EE9B00)',
      },
      backdropBlur: {
        'glass': '20px',
        'glass-heavy': '30px',
      },
      boxShadow: {
        'glass-work': '0 8px 32px rgba(0, 95, 115, 0.15)',
        'glass-break': '0 8px 32px rgba(238, 155, 0, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
