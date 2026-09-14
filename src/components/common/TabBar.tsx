import React from 'react';
import { TabId } from '../../types';
import { Clock, User } from 'lucide-react';

interface TabBarProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  theme?: 'light' | 'dark';
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onSelectTab, theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <nav
      aria-label="Bottom Navigation"
      className={`w-full border-t select-none transition-colors duration-200 ${
        isDark
          ? 'bg-[#0B101D]/85 backdrop-blur-2xl border-white/[0.08] text-slate-400'
          : 'bg-[#FFFFFF]/90 backdrop-blur-2xl border-slate-200/80 text-slate-500'
      }`}
    >
      <div className="flex items-center justify-around px-4 pt-2.5 pb-1">
        {/* Tab 1: Home (Главная) with permissible SF Symbol Tennis Racket geometry */}
        <button
          id="tab-home"
          type="button"
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all duration-150 ${
            activeTab === 'home'
              ? isDark
                ? 'text-white'
                : 'text-blue-700'
              : 'hover:text-slate-300'
          }`}
        >
          <div className="relative">
            {/* SF Symbol tennis.racket geometric depiction */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={activeTab === 'home' ? 2.2 : 1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-150"
            >
              {/* Racket Head Oval */}
              <ellipse cx="14" cy="9" rx="6" ry="7" transform="rotate(30 14 9)" />
              {/* String grid geometry */}
              <line x1="12" y1="4.5" x2="16" y2="13.5" strokeWidth="1" strokeDasharray="1 1.5" />
              <line x1="8.5" y1="10" x2="19.5" y2="8" strokeWidth="1" strokeDasharray="1 1.5" />
              {/* Throat & Handle */}
              <path d="M10.5 14.5L5 20" />
              <path d="M3.5 21.5L5 20" />
            </svg>
            {activeTab === 'home' && (
              <span
                className="absolute -top-0.5 -right-1 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: isDark ? '#D2FF1F' : '#9FD600' }}
              />
            )}
          </div>
          <span className="text-[11px] font-medium tracking-tight mt-1">Home</span>
        </button>

        {/* Tab 2: History (История) */}
        <button
          id="tab-history"
          type="button"
          onClick={() => onSelectTab('history')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all duration-150 ${
            activeTab === 'history'
              ? isDark
                ? 'text-white'
                : 'text-blue-700'
              : 'hover:text-slate-300'
          }`}
        >
          <div className="relative">
            <Clock
              className="w-[21px] h-[21px]"
              strokeWidth={activeTab === 'history' ? 2.2 : 1.75}
            />
            {activeTab === 'history' && (
              <span
                className="absolute -top-0.5 -right-1 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: isDark ? '#D2FF1F' : '#9FD600' }}
              />
            )}
          </div>
          <span className="text-[11px] font-medium tracking-tight mt-1">History</span>
        </button>

        {/* Tab 3: Account (Аккаунт) */}
        <button
          id="tab-account"
          type="button"
          onClick={() => onSelectTab('account')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all duration-150 ${
            activeTab === 'account'
              ? isDark
                ? 'text-white'
                : 'text-blue-700'
              : 'hover:text-slate-300'
          }`}
        >
          <div className="relative">
            <User
              className="w-[21px] h-[21px]"
              strokeWidth={activeTab === 'account' ? 2.2 : 1.75}
            />
            {activeTab === 'account' && (
              <span
                className="absolute -top-0.5 -right-1 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: isDark ? '#D2FF1F' : '#9FD600' }}
              />
            )}
          </div>
          <span className="text-[11px] font-medium tracking-tight mt-1">Account</span>
        </button>
      </div>

      {/* iOS Home Indicator Safe Area Bottom Spacing */}
      <div className="w-full flex justify-center pb-2 pt-0.5">
        <div
          className={`w-32 h-1 rounded-full ${
            isDark ? 'bg-white/25' : 'bg-slate-900/20'
          }`}
        />
      </div>
    </nav>
  );
};
