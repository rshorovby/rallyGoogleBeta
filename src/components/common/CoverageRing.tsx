import React from 'react';

interface CoverageRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  showDetails?: boolean;
  label?: string;
  theme?: 'light' | 'dark';
}

export const CoverageRing: React.FC<CoverageRingProps> = ({
  percentage,
  size = 140,
  strokeWidth = 10,
  showDetails = true,
  label = 'Coverage',
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const safePercent = Math.min(100, Math.max(0, percentage));
  const strokeDashoffset = circumference - (safePercent / 100) * circumference;

  // 6 court geometry ticks around the circle representing the 6 core technique pillars
  const ticks = Array.from({ length: 6 });

  return (
    <div className="relative flex flex-col items-center justify-center select-none" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
        aria-label={`Technique Coverage ${percentage}%`}
      >
        {/* Background Track with Court Geometry Tick Dividers */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.07)'}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* 6 Segment Pillar Marks */}
        {ticks.map((_, i) => {
          const angle = (i * 60 * Math.PI) / 180;
          const x1 = size / 2 + (radius - strokeWidth * 0.7) * Math.cos(angle);
          const y1 = size / 2 + (radius - strokeWidth * 0.7) * Math.sin(angle);
          const x2 = size / 2 + (radius + strokeWidth * 0.7) * Math.cos(angle);
          const y2 = size / 2 + (radius + strokeWidth * 0.7) * Math.sin(angle);

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(15, 23, 42, 0.18)'}
              strokeWidth={1.5}
            />
          );
        })}

        {/* Active Technique Coverage Arc */}
        {safePercent > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={isDark ? '#2563EB' : '#1D4ED8'} // Deep court-blue body
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        )}

        {/* Leading Tip Indicator: Optic Yellow (1% Accent strictly on key point) */}
        {safePercent > 0 && (
          <circle
            cx={size / 2 + radius * Math.cos(((safePercent / 100) * 360 * Math.PI) / 180)}
            cy={size / 2 + radius * Math.sin(((safePercent / 100) * 360 * Math.PI) / 180)}
            r={strokeWidth * 0.55}
            fill={isDark ? '#D2FF1F' : '#9FD600'}
            className="transition-all duration-700 ease-out shadow-sm"
          />
        )}
      </svg>

      {/* Numerical Gesture Center */}
      {showDetails && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="flex items-baseline">
            <span
              className={`text-3xl font-semibold tracking-tight tabular-nums ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {safePercent}
            </span>
            <span
              className={`text-sm font-medium ml-0.5 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              %
            </span>
          </div>
          <span
            className={`text-[11px] font-medium tracking-wide uppercase mt-0.5 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {label}
          </span>
        </div>
      )}
    </div>
  );
};
