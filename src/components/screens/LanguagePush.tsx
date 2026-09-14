import React from 'react';
import { ThemeMode, AppLanguage } from '../../types';
import { TRANSLATIONS } from '../../data/translations';
import { ChevronLeft, Check } from 'lucide-react';

interface LanguagePushProps {
  theme: ThemeMode;
  language: AppLanguage;
  onBack: () => void;
  onSelectLanguage: (lang: AppLanguage) => void;
}

export const LanguagePush: React.FC<LanguagePushProps> = ({
  theme,
  language,
  onBack,
  onSelectLanguage,
}) => {
  const isDark = theme === 'dark';
  const t = TRANSLATIONS[language];
  const tl = t.languagePush;

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
          {tl.title}
        </span>

        <div className="w-12" />
      </div>

      {/* Language Options Card */}
      <div
        className={`rounded-[20px] p-1.5 border divide-y ${
          isDark
            ? 'bg-[#0E1524] border-white/[0.08] divide-white/[0.04]'
            : 'bg-white border-slate-200 divide-slate-100 shadow-xs'
        }`}
      >
        {/* Russian Row */}
        <button
          id="btn-lang-ru"
          type="button"
          onClick={() => onSelectLanguage('ru')}
          className={`w-full px-3.5 py-3 rounded-[14px] flex items-center justify-between transition-colors ${
            language === 'ru'
              ? isDark
                ? 'bg-white/[0.04]'
                : 'bg-slate-50'
              : 'hover:bg-white/[0.02]'
          }`}
        >
          <span
            className={`text-xs font-semibold ${
              language === 'ru'
                ? isDark
                  ? 'text-white'
                  : 'text-slate-900'
                : 'text-slate-400'
            }`}
          >
            {tl.russian}
          </span>
          {language === 'ru' && <Check className="w-4 h-4 text-blue-500" />}
        </button>

        {/* English Row */}
        <button
          id="btn-lang-en"
          type="button"
          onClick={() => onSelectLanguage('en')}
          className={`w-full px-3.5 py-3 rounded-[14px] flex items-center justify-between transition-colors ${
            language === 'en'
              ? isDark
                ? 'bg-white/[0.04]'
                : 'bg-slate-50'
              : 'hover:bg-white/[0.02]'
          }`}
        >
          <span
            className={`text-xs font-semibold ${
              language === 'en'
                ? isDark
                  ? 'text-white'
                  : 'text-slate-900'
                : 'text-slate-400'
            }`}
          >
            {tl.english}
          </span>
          {language === 'en' && <Check className="w-4 h-4 text-blue-500" />}
        </button>
      </div>

      <p
        className={`text-[11px] px-2 mt-2 leading-relaxed ${
          isDark ? 'text-slate-500' : 'text-slate-400'
        }`}
      >
        {language === 'ru'
          ? 'Локальная настройка языка интерфейса.'
          : 'Local interface language override.'}
      </p>
    </div>
  );
};
