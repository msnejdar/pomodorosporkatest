# 🍅 Pomodoro Timer - Liquid Glass Design

Professional Pomodoro Timer with stunning **Liquid Glass Apple Style** design, featuring realistic SVG backgrounds and a complete 10-color palette.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![License](https://img.shields.io/badge/license-ISC-green)

## 🎨 Complete Color Palette

All **10 colors** are actively used throughout the application:

| Color | Hex Code | Usage |
|-------|----------|-------|
| ![#001219](https://via.placeholder.com/15/001219/001219.png) Deep Blue | `#001219` | Text, shadows, dark accents, bird silhouettes |
| ![#005F73](https://via.placeholder.com/15/005F73/005F73.png) Dark Teal | `#005F73` | Work timer gradient start, main buttons, headers |
| ![#0A9396](https://via.placeholder.com/15/0A9396/0A9396.png) Teal | `#0A9396` | Work timer middle, hover states, water, leaves |
| ![#94D2BD](https://via.placeholder.com/15/94D2BD/94D2BD.png) Light Teal | `#94D2BD` | Work timer end, sky, highlights |
| ![#E9D8A6](https://via.placeholder.com/15/E9D8A6/E9D8A6.png) Beige | `#E9D8A6` | Glass cards, beach sand, backgrounds |
| ![#EE9B00](https://via.placeholder.com/15/EE9B00/EE9B00.png) Gold | `#EE9B00` | Sun core, break timer start, main accents |
| ![#CA6702](https://via.placeholder.com/15/CA6702/CA6702.png) Dark Orange | `#CA6702` | Break timer middle, sunset, tree trunk |
| ![#BB3E03](https://via.placeholder.com/15/BB3E03/BB3E03.png) Rust | `#BB3E03` | Break timer end, warm accents, settings |
| ![#AE2012](https://via.placeholder.com/15/AE2012/AE2012.png) Dark Red | `#AE2012` | Confetti, danger zone, nature shadows |
| ![#9B2226](https://via.placeholder.com/15/9B2226/9B2226.png) Burgundy | `#9B2226` | Reset button, warnings, error states |

## ✨ Features

### Core Functionality
- ⏱️ **Customizable Timer** - Work duration (1-60 min), break duration (1-30 min)
- 🔄 **Cycle Tracking** - Set number of cycles (1-10) with visual progress indicators
- ⌨️ **Keyboard Shortcuts** - Space (start/pause), R (reset), S (settings)
- 💾 **Persistent Data** - Settings and statistics saved in localStorage
- 🔊 **Audio Notifications** - Sound alerts with volume control

### Visual Design
- 🪟 **Liquid Glass UI** - Frosted glass effects with backdrop blur
- 🏢 **Work Mode** - Office SVG illustration (monitor, coffee, books, desk plant)
- 🌴 **Break Mode** - Nature SVG illustration (sunset, beach, palms, ocean waves)
- 🎆 **Celebrations** - Confetti effects and animated sun on completion
- 🌈 **Multi-color Gradients** - Smooth color transitions in timers

### Statistics Tracking
- 📊 **4 Color-coded Stats Cards**:
  - Pomodoros Today (Teal gradient)
  - Total Focus Time (Gold gradient)
  - Current Streak (Rust gradient)
  - Cycles Completed (Light Teal gradient)

### Settings Panel
- ⚙️ Timer configuration
- 🔊 Audio settings with custom slider
- 🎨 Theme info
- ⚠️ Danger zone for stats reset

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd pomodorosporkatest

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## 📦 Tech Stack

- **React 18.3** - UI library
- **TypeScript 5.6** - Type safety
- **Vite 6.0** - Fast build tool
- **Framer Motion 11** - Smooth animations
- **Tailwind CSS 3.4** - Utility-first styling
- **Howler.js 2.2** - Audio management
- **Lucide React** - Beautiful icons

## 🎯 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist/` folder to Netlify via:
   - Drag & drop to [netlify.com/drop](https://app.netlify.com/drop)
   - Or use Netlify CLI

## 🎮 Usage

### Basic Controls
- Click **Start** to begin a work session
- Timer automatically switches between work and break modes
- Complete all cycles for a full celebration effect

### Keyboard Shortcuts
- `Space` - Start/Pause timer
- `R` - Reset timer
- `S` - Open settings
- `Esc` - Close settings panel

### Customization
1. Click the **Settings** button (or press `S`)
2. Adjust work duration, break duration, and cycles
3. Control audio volume and enable/disable sounds
4. Settings are automatically saved

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Background.tsx          # SVG backgrounds (office & nature)
│   ├── Timer.tsx               # Glass card with circular timer
│   ├── CycleIndicator.tsx      # Progress dots
│   ├── Controls.tsx            # 3 color-coded buttons
│   ├── Stats.tsx               # 4 statistics cards
│   ├── Confetti.tsx            # Celebration effects
│   ├── AnimatedSun.tsx         # Sun celebration animation
│   ├── Settings.tsx            # Slide-in panel
│   └── KeyboardHints.tsx       # Keyboard shortcuts display
├── hooks/
│   ├── useTimer.ts             # Timer logic with cycles
│   ├── useSound.ts             # Audio management
│   ├── useLocalStorage.ts     # Data persistence
│   └── useKeyboard.ts          # Keyboard shortcuts
├── types/
│   └── index.ts                # TypeScript definitions
├── utils/
│   └── constants.ts            # Colors, gradients, settings
├── App.tsx                     # Main app component
├── main.tsx                    # Entry point
└── index.css                   # Global styles
```

## 🎨 Design Philosophy

This Pomodoro Timer implements a **Liquid Glass Apple Style** design with:

1. **Glassmorphism** - Frosted glass cards with backdrop blur
2. **Color Harmony** - Complete 10-color palette used systematically
3. **SVG Artistry** - Hand-crafted office and nature scenes
4. **Smooth Animations** - Spring physics and organic transitions
5. **Visual Feedback** - Multi-color gradients indicate mode and state

## 🌟 Highlights

- ✅ **All 10 colors actively used** - No unused palette colors
- ✅ **Production-ready** - TypeScript strict mode, optimized build
- ✅ **Fully responsive** - Works on desktop and mobile
- ✅ **Accessible** - ARIA labels, keyboard navigation, focus states
- ✅ **Performance** - Code splitting, lazy loading, <200KB bundle

## 📝 License

ISC License - feel free to use for personal or commercial projects.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 🙏 Acknowledgments

- Color palette inspired by modern productivity apps
- SVG illustrations created with attention to detail
- Liquid glass design influenced by Apple's design language

---

**Made with ❤️ using React, TypeScript, and Tailwind CSS**

Enjoy your productive Pomodoro sessions! 🍅✨
