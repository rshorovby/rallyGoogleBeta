import React from 'react';

interface SignInScreenProps {
  theme?: 'light' | 'dark';
  onSignIn: () => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({
  theme = 'dark',
  onSignIn,
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between p-8 select-none transition-colors duration-200 ${
        isDark ? 'bg-[#080C14] text-slate-100' : 'bg-[#F2F5F9] text-slate-900'
      }`}
    >
      {/* Top Subtle Brand Geometry */}
      <div className="pt-6">
        <div className="flex items-center gap-2">
          {/* Geometric mark: clean baseline intersection */}
          <div className="w-5 h-5 relative flex items-center justify-center">
            <div
              className={`w-full h-[1px] absolute ${
                isDark ? 'bg-white/20' : 'bg-slate-900/20'
              }`}
            />
            <div
              className={`h-full w-[1px] absolute ${
                isDark ? 'bg-white/20' : 'bg-slate-900/20'
              }`}
            />
            <div
              className="w-2 h-2 rounded-full z-10"
              style={{ backgroundColor: isDark ? '#D2FF1F' : '#9FD600' }}
            />
          </div>
          <span
            className={`text-xs font-semibold tracking-wider uppercase ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            RallyMind
          </span>
        </div>
      </div>

      {/* Center Statement: Empty, Calm & Confident */}
      <div className="my-auto max-w-[320px]">
        <h1
          className={`text-3xl font-semibold tracking-tight leading-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}
        >
          Technique coverage for competitive tennis.
        </h1>
        <p
          className={`text-[15px] font-normal leading-relaxed mt-4 ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          Sign in with Apple ensures your stroke video telemetry stays encrypted and bound only to this device.
        </p>
      </div>

      {/* Official Sign in with Apple button (Strictly authentic HIG specifications) */}
      <div className="pb-8 flex flex-col gap-3">
        <button
          id="btn-sign-in-with-apple"
          type="button"
          onClick={onSignIn}
          className={`w-full h-[52px] rounded-[14px] flex items-center justify-center gap-2.5 font-medium text-[16px] tracking-tight transition-all duration-150 active:scale-[0.98] ${
            isDark
              ? 'bg-white text-black hover:bg-slate-100 shadow-[0_4px_16px_rgba(255,255,255,0.1)]'
              : 'bg-black text-white hover:bg-slate-900 shadow-[0_4px_16px_rgba(0,0,0,0.12)]'
          }`}
        >
          {/* Authentic Apple Logo Silhouette */}
          <svg
            width="18"
            height="22"
            viewBox="0 0 170 170"
            fill="currentColor"
            className="flex-shrink-0 mb-0.5"
          >
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.7-11.72-13.98-6.19-9.5-11.09-20.73-14.71-33.68-3.61-12.96-5.42-25.26-5.42-36.91 0-14.56 3.6-26.68 10.8-36.36 7.2-9.67 16.51-14.63 27.93-14.88 4.79 0 10.36 1.34 16.71 4.02 6.36 2.68 10.39 4.08 12.09 4.2 1.9-.23 6.07-1.74 12.52-4.52 6.45-2.79 11.77-4.04 15.96-3.75 12.06.87 21.68 5.61 28.86 14.22-10.58 6.42-15.75 15.34-15.51 26.77.24 8.98 3.73 16.48 10.47 22.5 6.74 6.02 14.85 9.4 24.33 10.14-2.22 6.64-4.8 13.04-7.75 19.22zM119.22 33.61c0-7.39 2.68-14.37 8.04-20.94 5.36-6.57 11.96-10.74 19.8-12.51.52 1.32.78 2.69.78 4.12 0 7.39-2.79 14.47-8.37 21.24-5.58 6.77-12.37 10.87-20.37 12.3-.23-1.42-.35-2.83-.35-4.21z" />
          </svg>
          <span>Sign in with Apple</span>
        </button>

        <p
          className={`text-[11px] text-center tracking-tight ${
            isDark ? 'text-slate-600' : 'text-slate-400'
          }`}
        >
          No passwords • On-device biometrics
        </p>
      </div>
    </div>
  );
};
