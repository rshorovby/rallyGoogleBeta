import React from 'react';
import { Wifi } from 'lucide-react';

interface IPhoneFrameProps {
  children: React.ReactNode;
  theme?: 'light' | 'dark';
  dynamicIslandContent?: React.ReactNode;
}

export const IPhoneFrame: React.FC<IPhoneFrameProps> = ({
  children,
  theme = 'dark',
  dynamicIslandContent,
}) => {
  const isDark = theme === 'dark';

  return (
    <div className="relative mx-auto flex flex-col items-center justify-center p-2 sm:p-4">
      {/* Outer Titanium Chassis Frame */}
      <div
        className={`relative w-[385px] sm:w-[393px] h-[830px] rounded-[52px] p-[10px] shadow-2xl transition-all duration-300 border ${
          isDark
            ? 'bg-[#181C26] border-[#2C3446] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),inset_0_0_2px_1px_rgba(255,255,255,0.1)]'
            : 'bg-[#D6DCE5] border-[#B8C2D1] shadow-[0_25px_60px_-15px_rgba(15,23,42,0.25),inset_0_0_2px_1px_rgba(255,255,255,0.8)]'
        }`}
      >
        {/* Hardware side antenna bands & buttons cues */}
        <div className="absolute -left-[12px] top-[115px] w-[3px] h-[28px] bg-slate-500/40 rounded-l-sm" />
        <div className="absolute -left-[12px] top-[165px] w-[3px] h-[50px] bg-slate-500/40 rounded-l-sm" />
        <div className="absolute -left-[12px] top-[225px] w-[3px] h-[50px] bg-slate-500/40 rounded-l-sm" />
        <div className="absolute -right-[12px] top-[180px] w-[3px] h-[72px] bg-slate-500/40 rounded-r-sm" />

        {/* Inner OLED Display Bezel */}
        <div
          className={`relative w-full h-full rounded-[44px] overflow-hidden flex flex-col ${
            isDark ? 'bg-[#080C14] text-slate-100' : 'bg-[#F2F5F9] text-slate-900'
          }`}
        >
          {/* iOS Top Status Bar */}
          <div className="relative z-30 flex items-center justify-between px-7 pt-3.5 pb-1 select-none pointer-events-none">
            {/* 9:41 Time */}
            <span className="text-[14px] font-semibold tracking-tight tabular-nums pl-1">
              9:41
            </span>

            {/* Dynamic Island */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2.5 z-40">
              <div className="h-[30px] min-w-[110px] px-3 bg-black rounded-full flex items-center justify-between gap-2 shadow-sm border border-white/10 text-white">
                {dynamicIslandContent || (
                  <>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8] flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-[#D2FF1F]" />
                      </div>
                      <span className="text-[10px] font-medium text-slate-300">RallyMind</span>
                    </div>
                    {/* Camera dot & sensor */}
                    <div className="flex items-center gap-1.5 pl-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#121620] border border-white/10" />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Status Bar Right (Cellular, WiFi, Battery) */}
            <div className="flex items-center gap-1.5 pr-1">
              {/* Cellular Signal bars */}
              <div className="flex items-end gap-[1.5px] h-3">
                <div className="w-[3px] h-1.5 rounded-[0.5px] bg-current" />
                <div className="w-[3px] h-2 rounded-[0.5px] bg-current" />
                <div className="w-[3px] h-2.5 rounded-[0.5px] bg-current" />
                <div className="w-[3px] h-3 rounded-[0.5px] bg-current" />
              </div>

              {/* Wifi */}
              <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />

              {/* Battery Outline & Fill */}
              <div className="flex items-center">
                <div className="w-5 h-2.5 rounded-[3px] border border-current p-[1px] flex items-center">
                  <div className="w-3.5 h-full rounded-[1.5px] bg-current" />
                </div>
                <div className="w-[1px] h-1 bg-current rounded-r-xs ml-[1px]" />
              </div>
            </div>
          </div>

          {/* Screen Content Viewport */}
          <div className="relative flex-1 w-full overflow-hidden flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
