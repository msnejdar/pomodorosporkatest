import { motion } from 'framer-motion';
import { COLORS } from '../utils/constants';
import { TimerMode } from '../types';

interface BackgroundProps {
  mode: TimerMode;
}

export function Background({ mode }: BackgroundProps) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        key={mode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
      >
        {mode === 'work' ? <WorkBackground /> : <BreakBackground />}
      </motion.div>
    </div>
  );
}

function WorkBackground() {
  return (
    <div className="relative w-full h-full">
      {/* Multi-layer gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${COLORS.deepBlue}, ${COLORS.darkTeal}, ${COLORS.teal}, ${COLORS.lightTeal})`,
        }}
      />

      {/* Office SVG Illustration */}
      <svg
        className="absolute bottom-0 left-0 w-full h-2/3 opacity-30"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Desk surface */}
        <rect x="0" y="600" width="1200" height="200" fill={COLORS.darkOrange} opacity="0.8" />
        <rect x="0" y="600" width="1200" height="10" fill={COLORS.rust} opacity="0.6" />

        {/* Window in background */}
        <rect x="800" y="300" width="300" height="250" fill={COLORS.lightTeal} opacity="0.4" rx="10" />
        <line x1="950" y1="300" x2="950" y2="550" stroke={COLORS.darkTeal} strokeWidth="4" />
        <line x1="800" y1="425" x2="1100" y2="425" stroke={COLORS.darkTeal} strokeWidth="4" />

        {/* Monitor */}
        <g transform="translate(450, 350)">
          {/* Monitor screen */}
          <rect x="0" y="0" width="300" height="200" fill={COLORS.darkTeal} rx="8" />
          <rect x="10" y="10" width="280" height="180" fill={COLORS.teal} rx="4" />
          {/* Monitor stand */}
          <rect x="130" y="200" width="40" height="60" fill={COLORS.deepBlue} />
          <rect x="100" y="260" width="100" height="10" fill={COLORS.deepBlue} />
        </g>

        {/* Coffee cup */}
        <g transform="translate(250, 480)">
          {/* Cup */}
          <ellipse cx="40" cy="100" rx="35" ry="10" fill={COLORS.lightTeal} />
          <rect x="5" y="60" width="70" height="40" fill={COLORS.lightTeal} rx="5" />
          <ellipse cx="40" cy="60" rx="35" ry="10" fill={COLORS.beige} />
          {/* Handle */}
          <path d="M 75 70 Q 95 80, 75 90" stroke={COLORS.lightTeal} strokeWidth="8" fill="none" />
          {/* Steam */}
          <path d="M 30 45 Q 35 30, 30 15" stroke={COLORS.beige} strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M 50 45 Q 55 25, 50 10" stroke={COLORS.beige} strokeWidth="2" fill="none" opacity="0.6" />
        </g>

        {/* Books stack */}
        <g transform="translate(850, 520)">
          <rect x="0" y="60" width="120" height="20" fill={COLORS.darkTeal} rx="2" />
          <rect x="0" y="40" width="120" height="20" fill={COLORS.teal} rx="2" />
          <rect x="0" y="20" width="120" height="20" fill={COLORS.burgundy} rx="2" />
          <rect x="0" y="0" width="120" height="20" fill={COLORS.darkTeal} rx="2" />
          {/* Book spines */}
          <line x1="0" y1="0" x2="0" y2="80" stroke={COLORS.deepBlue} strokeWidth="2" />
          <line x1="120" y1="0" x2="120" y2="80" stroke={COLORS.deepBlue} strokeWidth="2" />
        </g>

        {/* Desk plant */}
        <g transform="translate(100, 450)">
          {/* Pot */}
          <path d="M 40 140 L 30 170 L 70 170 L 60 140 Z" fill={COLORS.rust} />
          <ellipse cx="50" cy="140" rx="20" ry="8" fill={COLORS.darkOrange} />
          {/* Leaves */}
          <ellipse cx="50" cy="120" rx="15" ry="25" fill={COLORS.teal} transform="rotate(-20 50 120)" />
          <ellipse cx="50" cy="115" rx="18" ry="28" fill={COLORS.teal} transform="rotate(15 50 115)" />
          <ellipse cx="45" cy="110" rx="12" ry="22" fill={COLORS.lightTeal} transform="rotate(-35 45 110)" />
          <ellipse cx="55" cy="108" rx="14" ry="24" fill={COLORS.lightTeal} transform="rotate(30 55 108)" />
        </g>

        {/* Keyboard (simplified) */}
        <g transform="translate(400, 560)">
          <rect x="0" y="0" width="180" height="60" fill={COLORS.deepBlue} rx="4" opacity="0.7" />
          {/* Keys */}
          {[...Array(12)].map((_, i) => (
            <rect
              key={i}
              x={10 + (i % 6) * 28}
              y={10 + Math.floor(i / 6) * 22}
              width="20"
              height="16"
              fill={COLORS.lightTeal}
              rx="2"
              opacity="0.5"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

function BreakBackground() {
  return (
    <div className="relative w-full h-full">
      {/* Sunset sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${COLORS.lightTeal}, ${COLORS.beige} 40%, ${COLORS.gold} 70%, ${COLORS.darkOrange})`,
        }}
      />

      {/* Nature SVG Illustration */}
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Big sun */}
        <g transform="translate(900, 200)">
          <defs>
            <radialGradient id="sunGradient">
              <stop offset="0%" stopColor={COLORS.gold} />
              <stop offset="50%" stopColor={COLORS.darkOrange} />
              <stop offset="100%" stopColor={COLORS.rust} stopOpacity="0.6" />
            </radialGradient>
          </defs>
          {/* Sun rays */}
          {[...Array(16)].map((_, i) => {
            const angle = (i * 360) / 16;
            const x1 = Math.cos((angle * Math.PI) / 180) * 70;
            const y1 = Math.sin((angle * Math.PI) / 180) * 70;
            const x2 = Math.cos((angle * Math.PI) / 180) * 100;
            const y2 = Math.sin((angle * Math.PI) / 180) * 100;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={i % 2 === 0 ? COLORS.gold : COLORS.darkOrange}
                strokeWidth="4"
                opacity="0.8"
              />
            );
          })}
          {/* Sun core */}
          <circle cx="0" cy="0" r="60" fill="url(#sunGradient)" />
        </g>

        {/* Clouds */}
        <g opacity="0.6">
          <ellipse cx="200" cy="150" rx="60" ry="30" fill={COLORS.lightTeal} />
          <ellipse cx="240" cy="150" rx="70" ry="35" fill={COLORS.lightTeal} />
          <ellipse cx="180" cy="160" rx="50" ry="25" fill={COLORS.beige} />

          <ellipse cx="500" cy="100" rx="50" ry="25" fill={COLORS.lightTeal} />
          <ellipse cx="530" cy="100" rx="60" ry="30" fill={COLORS.lightTeal} />
        </g>

        {/* Ocean/water layers */}
        <path
          d="M 0 500 Q 300 480, 600 500 T 1200 500 L 1200 800 L 0 800 Z"
          fill={COLORS.teal}
          opacity="0.4"
        />
        <path
          d="M 0 550 Q 250 530, 500 550 T 1000 550 T 1200 550 L 1200 800 L 0 800 Z"
          fill={COLORS.darkTeal}
          opacity="0.5"
        />
        <path
          d="M 0 600 Q 200 580, 400 600 T 800 600 T 1200 600 L 1200 800 L 0 800 Z"
          fill={COLORS.deepBlue}
          opacity="0.6"
        />

        {/* Water highlights */}
        <ellipse cx="400" cy="520" rx="40" ry="8" fill={COLORS.lightTeal} opacity="0.4" />
        <ellipse cx="700" cy="560" rx="50" ry="10" fill={COLORS.lightTeal} opacity="0.3" />

        {/* Beach/sand */}
        <path
          d="M 0 650 Q 300 640, 600 650 L 600 800 L 0 800 Z"
          fill={COLORS.beige}
          opacity="0.7"
        />

        {/* Sand texture dots */}
        {[...Array(30)].map((_, i) => (
          <circle
            key={i}
            cx={Math.random() * 600}
            cy={650 + Math.random() * 100}
            r="2"
            fill={COLORS.darkOrange}
            opacity="0.2"
          />
        ))}

        {/* Palm trees */}
        <g transform="translate(150, 550)">
          {/* Trunk */}
          <path d="M 20 0 L 15 150 L 25 150 L 20 0 Z" fill={COLORS.darkOrange} />
          <path d="M 20 0 L 15 150 L 25 150 L 20 0 Z" fill={COLORS.rust} opacity="0.5" />
          <ellipse cx="20" cy="30" rx="12" ry="6" fill={COLORS.rust} />
          <ellipse cx="20" cy="70" rx="12" ry="6" fill={COLORS.rust} />
          <ellipse cx="20" cy="110" rx="12" ry="6" fill={COLORS.rust} />

          {/* Leaves */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 360) / 8 - 90;
            return (
              <ellipse
                key={i}
                cx="20"
                cy="0"
                rx="8"
                ry="40"
                fill={i % 2 === 0 ? COLORS.teal : COLORS.darkTeal}
                transform={`rotate(${angle} 20 0)`}
              />
            );
          })}
        </g>

        <g transform="translate(500, 580)">
          {/* Smaller palm trunk */}
          <path d="M 15 0 L 12 100 L 18 100 L 15 0 Z" fill={COLORS.darkOrange} />
          <ellipse cx="15" cy="40" rx="10" ry="5" fill={COLORS.rust} />
          <ellipse cx="15" cy="70" rx="10" ry="5" fill={COLORS.rust} />

          {/* Leaves */}
          {[...Array(6)].map((_, i) => {
            const angle = (i * 360) / 6 - 90;
            return (
              <ellipse
                key={i}
                cx="15"
                cy="0"
                rx="6"
                ry="30"
                fill={COLORS.teal}
                opacity="0.8"
                transform={`rotate(${angle} 15 0)`}
              />
            );
          })}
        </g>

        {/* Birds silhouettes */}
        <g opacity="0.5">
          <path d="M 300 200 Q 310 195, 320 200" stroke={COLORS.deepBlue} strokeWidth="2" fill="none" />
          <path d="M 320 200 Q 330 205, 340 200" stroke={COLORS.deepBlue} strokeWidth="2" fill="none" />

          <path d="M 600 250 Q 608 246, 616 250" stroke={COLORS.burgundy} strokeWidth="2" fill="none" />
          <path d="M 616 250 Q 624 254, 632 250" stroke={COLORS.burgundy} strokeWidth="2" fill="none" />

          <path d="M 800 180 Q 810 175, 820 180" stroke={COLORS.darkRed} strokeWidth="2" fill="none" />
          <path d="M 820 180 Q 830 185, 840 180" stroke={COLORS.darkRed} strokeWidth="2" fill="none" />
        </g>
      </svg>
    </div>
  );
}
