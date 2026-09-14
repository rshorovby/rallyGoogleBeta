import React from 'react';
import { PlayerProfile, ThemeMode } from '../../types';
import { Shield, Sparkles, Sun, Moon, Info, LogOut, Trash2, Smartphone } from 'lucide-react';

interface AccountScreenProps {
  profile: PlayerProfile;
  theme: ThemeMode;
  onToggleTheme: (newTheme: ThemeMode) => void;
  onOpenTelegramCode: () => void;
  onSignOut: () => void;
  onDeleteAccount: () => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({
  profile,
  theme,
  onToggleTheme,
  onOpenTelegramCode,
  onSignOut,
  onDeleteAccount,
}) => {
  const isDark = theme === 'dark';

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar pb-24 px-5 pt-3 select-none">
      {/* Screen Title */}
      <header className="mb-4">
        <h1
          className={`text-2xl font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Account
        </h1>
        <span
          className={`text-xs ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          Encrypted on-device profile & telemetry settings
        </span>
      </header>

      {/* Group 1: Player (Игрок — строго Read-Only) */}
      <section className="mb-4">
        <div className="flex items-center justify-between px-1 mb-1.5">
          <span
            className={`text-[11px] font-semibold uppercase tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Player (Read-Only)
          </span>
          <span
            className={`text-[10px] font-mono ${
              isDark ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            Locked
          </span>
        </div>

        <div
          className={`rounded-[20px] p-3.5 border space-y-3 ${
            isDark ? 'bg-[#0E1524] border-white/[0.08]' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-xs">
            <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
              Athlete Identity
            </span>
            <span
              className={`font-semibold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {profile.name}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-white/[0.04]">
            <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
              Dominant Hand
            </span>
            <span
              className={`font-medium ${
                isDark ? 'text-slate-200' : 'text-slate-800'
              }`}
            >
              {profile.hand}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-white/[0.04]">
            <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
              Grip Calibration
            </span>
            <span
              className={`font-medium text-right max-w-[200px] truncate ${
                isDark ? 'text-slate-200' : 'text-slate-800'
              }`}
            >
              {profile.dominantGrip}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-white/[0.04]">
            <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
              Local Storage
            </span>
            <span
              className={`font-mono text-[11px] ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {profile.localDiskUsage}
            </span>
          </div>
        </div>
      </section>

      {/* Group 2: Channels (Каналы — Telegram код, не логин) */}
      <section className="mb-4">
        <span
          className={`text-[11px] font-semibold uppercase tracking-wider block px-1 mb-1.5 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          Channels & Coach Notifications
        </span>

        <div
          className={`rounded-[20px] p-3.5 border ${
            isDark ? 'bg-[#0E1524] border-white/[0.08]' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <span
                className={`text-xs font-semibold block ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Telegram Sync Code
              </span>
              <p
                className={`text-[11px] mt-0.5 leading-tight ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                One-time code to link external supervisor notifications. No password needed.
              </p>
            </div>

            <button
              id="btn-view-telegram-code"
              type="button"
              onClick={onOpenTelegramCode}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border flex-shrink-0 ml-3 transition-all active:scale-95 ${
                profile.telegramLinked
                  ? isDark
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : isDark
                  ? 'bg-blue-600/20 border-blue-500/40 text-blue-400'
                  : 'bg-blue-50 border-blue-200 text-blue-700'
              }`}
            >
              {profile.telegramLinked ? 'Linked' : 'Show Code'}
            </button>
          </div>
        </div>
      </section>

      {/* Group 3: Appearance (Оформление — строго Светлая | Тёмная, без системной) */}
      <section className="mb-4">
        <span
          className={`text-[11px] font-semibold uppercase tracking-wider block px-1 mb-1.5 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          Appearance
        </span>

        <div
          className={`rounded-[20px] p-1.5 border flex ${
            isDark ? 'bg-[#0E1524] border-white/[0.08]' : 'bg-white border-slate-200'
          }`}
        >
          {/* Light Toggle */}
          <button
            id="theme-light-btn"
            type="button"
            onClick={() => onToggleTheme('light')}
            className={`flex-1 h-9 rounded-[14px] flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
              !isDark
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Light</span>
          </button>

          {/* Dark Toggle */}
          <button
            id="theme-dark-btn"
            type="button"
            onClick={() => onToggleTheme('dark')}
            className={`flex-1 h-9 rounded-[14px] flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
              isDark
                ? 'bg-[#1D4ED8] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Dark</span>
          </button>
        </div>
        <p
          className={`text-[10px] px-2 mt-1 font-mono ${
            isDark ? 'text-slate-500' : 'text-slate-400'
          }`}
        >
          Strictly Light | Dark • System auto disabled by HIG spec
        </p>
      </section>

      {/* Group 4: About Application (О приложении) */}
      <section className="mb-4">
        <span
          className={`text-[11px] font-semibold uppercase tracking-wider block px-1 mb-1.5 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          About RallyMind
        </span>

        <div
          className={`rounded-[20px] p-3.5 border space-y-2 text-xs ${
            isDark ? 'bg-[#0E1524] border-white/[0.08]' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
              Design Specification
            </span>
            <span
              className={`font-medium ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              iOS 26 Liquid Glass
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
            <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
              Biometric Engine
            </span>
            <span
              className={`font-medium ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Hardcourt Geometric v2.4
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
            <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
              Video Storage Policy
            </span>
            <span className="font-medium text-emerald-400">
              Local Sandboxed Only
            </span>
          </div>
        </div>
      </section>

      {/* Group 5: Session (Сессия — Выйти и удалить аккаунт) */}
      <section className="pt-1 pb-4 space-y-2">
        <button
          id="btn-sign-out"
          type="button"
          onClick={onSignOut}
          className={`w-full h-11 rounded-[16px] border flex items-center justify-center gap-2 text-xs font-semibold transition-all active:scale-98 ${
            isDark
              ? 'bg-[#101726] border-white/[0.08] text-slate-300 hover:bg-white/5'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>

        <button
          id="btn-delete-account"
          type="button"
          onClick={onDeleteAccount}
          className={`w-full h-11 rounded-[16px] border flex items-center justify-center gap-2 text-xs font-semibold transition-all active:scale-98 ${
            isDark
              ? 'bg-rose-950/20 border-rose-900/30 text-rose-400 hover:bg-rose-950/30'
              : 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100'
          }`}
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete Account & Local Telemetry</span>
        </button>
      </section>
    </div>
  );
};
