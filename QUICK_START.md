# ⚡ Quick Start Guide

Get your Pomodoro Timer running in under 2 minutes!

## 🚀 Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser to http://localhost:5173
```

That's it! The app is now running locally.

## 🎮 First Steps

1. **Start a Session**
   - Click the "Start" button or press `Space`
   - Default: 25 minutes work session

2. **Customize Settings**
   - Click the Settings icon or press `S`
   - Adjust work/break duration
   - Set number of cycles
   - Control volume

3. **Track Progress**
   - View statistics cards below the timer
   - See your daily pomodoros, total focus time, and streak

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Start/Pause timer |
| `R` | Reset timer |
| `S` | Open settings |
| `Esc` | Close settings panel |

## 🎨 What You'll See

### Work Mode (Office Theme)
- Teal/blue color scheme
- SVG office illustration (monitor, coffee, books)
- 25 minutes focus time (customizable)

### Break Mode (Nature Theme)
- Gold/orange color scheme
- SVG beach sunset scene (sun, waves, palms)
- 5 minutes break time (customizable)

### Celebrations 🎉
- Confetti animation after completing all cycles
- Animated sun effect
- Sound notification (if enabled)

## 📊 Color Palette Preview

The app uses **all 10 colors** from the palette:

```
Cool Tones (Work):
🔵 #001219 - Deep Blue
🔵 #005F73 - Dark Teal
🔵 #0A9396 - Teal
🔵 #94D2BD - Light Teal

Neutral:
⚪ #E9D8A6 - Beige

Warm Tones (Break):
🟠 #EE9B00 - Gold
🟠 #CA6702 - Dark Orange
🟠 #BB3E03 - Rust
🔴 #AE2012 - Dark Red
🔴 #9B2226 - Burgundy
```

## 🛠️ Build Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

## 📦 Project Structure

```
src/
├── components/      # React components
│   ├── Background.tsx
│   ├── Timer.tsx
│   ├── Controls.tsx
│   ├── Stats.tsx
│   ├── Settings.tsx
│   └── ...
├── hooks/          # Custom React hooks
├── types/          # TypeScript types
├── utils/          # Constants and utilities
└── App.tsx         # Main app
```

## 🌟 Features at a Glance

- ✅ Liquid glass UI design
- ✅ SVG background illustrations
- ✅ Customizable timer settings
- ✅ Cycle tracking with progress dots
- ✅ Statistics tracking (localStorage)
- ✅ Audio notifications
- ✅ Keyboard shortcuts
- ✅ Responsive design
- ✅ Complete 10-color palette
- ✅ Celebration effects

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill process on port 5173
kill -9 $(lsof -ti:5173)

# Or use different port
npm run dev -- --port 3000
```

### Dependencies issues
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build errors
```bash
# Clean build
rm -rf dist
npm run build
```

## 📚 More Information

- [Full README](README.md) - Complete documentation
- [Deployment Guide](DEPLOYMENT.md) - How to deploy
- [Color Usage](COLOR_USAGE.md) - Detailed color breakdown

## 💡 Pro Tips

1. **Customize for your workflow**: Adjust work/break durations in settings
2. **Track your productivity**: Check stats cards daily
3. **Use keyboard shortcuts**: Much faster than clicking
4. **Enable sound**: Get notified when sessions complete
5. **Complete cycles**: Unlock the full celebration effect!

---

**Ready to boost your productivity? Start a Pomodoro session now! 🍅⏱️**

Need help? Check the [README.md](README.md) for detailed documentation.
