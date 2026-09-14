import React from 'react';
import { ThemeMode, AppLanguage } from '../../types';
import { TRANSLATIONS } from '../../data/translations';
import { ChevronLeft } from 'lucide-react';

interface AboutPushProps {
  theme: ThemeMode;
  language: AppLanguage;
  onBack: () => void;
}

export const AboutPush: React.FC<AboutPushProps> = ({ theme, language, onBack }) => {
  const isDark = theme === 'dark';
  const t = TRANSLATIONS[language];
  const ta = t.aboutPush;

  return (
    <div className="w-full h-full flex flex-col select-none overflow-y-auto no-scrollbar pb-24 px-5 pt-2">
      {/* iOS Navigation Bar */}
      <div className="flex items-center justify-between py-2 mb-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-blue-500 hover:text-blue-400 font-medium text-sm transition-colors active:opacity-70 -ml-1.5"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>{t.account.title}</span>
        </button>

        <span
          className={`text-sm font-semibold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {ta.title}
        </span>

        <div className="w-12" />
      </div>

      {/* App Branding & Version */}
      <div className="flex flex-col items-center justify-center my-6">
        <div className="w-16 h-16 rounded-[18px] bg-[#0E2752] border border-blue-500/40 flex items-center justify-center shadow-lg mb-3">
          <span className="w-4 h-4 rounded-full bg-[#D2FF1F]" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">{ta.appName}</h1>
        <span className="text-xs font-mono text-slate-500 mt-0.5">{ta.version}</span>
      </div>

      {/* About Description Card */}
      <div
        className={`rounded-[20px] p-4 border leading-relaxed text-xs ${
          isDark
            ? 'bg-[#0E1524] border-white/[0.08] text-slate-300'
            : 'bg-white border-slate-200 text-slate-700 shadow-xs'
        }`}
      >
        <p>{ta.body}</p>
      </div>

      {/* Footer copyright note */}
      <div className="mt-auto pt-8 pb-4 text-center">
        <span className="text-[11px] font-mono text-slate-500">
          RallyMind • iOS 26 HIG
        </span>
      </div>
    </div>
  );
};
