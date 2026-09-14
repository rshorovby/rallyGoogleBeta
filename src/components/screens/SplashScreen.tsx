import React from 'react';

interface SplashScreenProps {
  theme?: 'light' | 'dark';
  onEnterApp?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  theme = 'dark',
  onEnterApp,
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      onClick={onEnterApp}
      className={`relative w-full h-full flex flex-col items-center justify-between p-8 select-none cursor-pointer transition-colors duration-200 ${
        isDark ? 'bg-[#080C14] text-slate-100' : 'bg-[#F2F5F9] text-slate-900'
      }`}
    >
      <div className="w-full flex justify-end">
        <span
          className={`text-[11px] font-mono tracking-widest uppercase ${
            isDark ? 'text-slate-600' : 'text-slate-400'
          }`}
        >
          Tap to advance
        </span>
      </div>

      {/* Abstract Mark: Hardcourt Baseline Intersection & Coverage Ring */}
      <div className="flex flex-col items-center justify-center -mt-6">
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Court Precision Lines */}
          <svg
            width="144"
            height="144"
            viewBox="0 0 144 144"
            fill="none"
            className="overflow-visible"
          >
            {/* Outer court boundary subtle guide */}
            <rect
              x="12"
              y="12"
              width="120"
              height="120"
              rx="24"
              stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.05)'}
              strokeWidth="1"
            />

            {/* Baseline T & Service line geometry */}
            <line
              x1="72"
              y1="24"
              x2="72"
              y2="120"
              stroke={isDark ? 'rgba(37,99,235,0.35)' : 'rgba(29,78,216,0.25)'}
              strokeWidth="1.5"
            />
            <line
              x1="24"
              y1="72"
              x2="120"
              y2="72"
              stroke={isDark ? 'rgba(37,99,235,0.35)' : 'rgba(29,78,216,0.25)'}
              strokeWidth="1.5"
            />

            {/* Calibration Arc: Coverage Ring Geometry (No balls, no rackets) */}
            <circle
              cx="72"
              cy="72"
              r="44"
              stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.08)'}
              strokeWidth="4"
              strokeDasharray="4 6"
            />
            <circle
              cx="72"
              cy="72"
              r="44"
              stroke={isDark ? '#2563EB' : '#1D4ED8'}
              strokeWidth="4"
              strokeDasharray="276"
              strokeDashoffset="120"
              strokeLinecap="round"
            />

            {/* Optic Yellow 1% Accent marker at the impact vector intersection */}
            <circle
              cx="72"
              cy="28"
              r="3.5"
              fill={isDark ? '#D2FF1F' : '#9FD600'}
            />
          </svg>
        </div>

        <h1
          className={`text-2xl font-medium tracking-tight mt-6 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          RallyMind
        </h1>
        <p
          className={`text-xs tracking-wider uppercase mt-1 ${
            isDark ? 'text-slate-500' : 'text-slate-400'
          }`}
        >
          Hardcourt Biometrics
        </p>
      </div>

      <div className="w-full text-center pb-6">
        <span
          className={`text-[12px] font-medium tracking-tight ${
            isDark ? 'text-slate-500' : 'text-slate-400'
          }`}
        >
          iOS 26 HIG • Liquid Glass
        </span>
      </div>
    </div>
  );
};
