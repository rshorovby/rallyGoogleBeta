import React, { useState } from 'react';
import { PlayerProfile, ThemeMode, AppLanguage } from '../../types';
import { TRANSLATIONS, LEVEL_LABELS } from '../../data/translations';
import { ChevronRight, LogOut, Trash2, CheckCircle, ShieldAlert } from 'lucide-react';

interface AccountScreenProps {
  profile: PlayerProfile;
  theme: ThemeMode;
  language: AppLanguage;
  onToggleTheme: (newTheme: ThemeMode) => void;
  onToggleNotifications: () => void;
  onOpenProfile: () => void;
  onOpenLinkTelegram: () => void;
  onOpenLanguage: () => void;
  onOpenAbout: () => void;
  onSignOut: () => void;
  onDeleteAccount: () => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({
  profile,
  theme,
  language,
  onToggleTheme,
  onToggleNotifications,
  onOpenProfile,
  onOpenLinkTelegram,
  onOpenLanguage,
  onOpenAbout,
  onSignOut,
  onDeleteAccount,
}) => {
  const isDark = theme === 'dark';
  const t = TRANSLATIONS[language].account;

  // State for the native delete alert confirmation dialog
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  // Subtitle for Player Profile row:
  // if profile is filled (skipped=false and level is set): show the localized level label only
  // otherwise: «Не заполнен» / «Not filled»
  const isProfileFilled = profile.profileState === 'filled' && Boolean(profile.level);
  const profileSubtitle = isProfileFilled && profile.level
    ? LEVEL_LABELS[language][profile.level]
    : t.playerNotFilled;

  const currentLanguageLabel = language === 'ru' ? 'Русский' : 'English';

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar pb-24 px-5 pt-3 select-none">
      {/* Screen Title */}
      <header className="mb-4">
        <h1
          className={`text-2xl font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {t.title}
        </h1>
      </header>

      {/* SECTION 1: Player (Игрок) — One tappable row, not an inline key-value dump */}
      <section className="mb-4">
        <span
          className={`text-[11px] font-semibold uppercase tracking-wider block px-1 mb-1.5 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {t.sectionPlayer}
        </span>

        <div
          id="row-player-profile"
          onClick={onOpenProfile}
          className={`rounded-[20px] p-3.5 border flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] ${
            isDark
              ? 'bg-[#0E1524] border-white/[0.08] hover:bg-[#131C30]'
              : 'bg-white border-slate-200 hover:bg-slate-50 shadow-xs'
          }`}
        >
          <div className="flex flex-col">
            <span
              className={`text-xs font-semibold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {t.playerProfileTitle}
            </span>
            <span
              className={`text-[11px] mt-0.5 ${
                isProfileFilled
                  ? isDark
                    ? 'text-blue-400 font-medium'
                    : 'text-blue-600 font-medium'
                  : isDark
                  ? 'text-slate-500'
                  : 'text-slate-400'
              }`}
            >
              {profileSubtitle}
            </span>
          </div>

          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </section>

      {/* SECTION 2: Channels (Каналы) — Two rows in one card */}
      <section className="mb-4">
        <span
          className={`text-[11px] font-semibold uppercase tracking-wider block px-1 mb-1.5 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {t.sectionChannels}
        </span>

        <div
          className={`rounded-[20px] p-1 border divide-y ${
            isDark
              ? 'bg-[#0E1524] border-white/[0.08] divide-white/[0.04]'
              : 'bg-white border-slate-200 divide-slate-100 shadow-xs'
          }`}
        >
          {/* Row A: Telegram */}
          {profile.telegramLinked ? (
            <div
              id="row-telegram-linked"
              className="px-3 py-2.5 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span
                  className={`text-xs font-semibold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {t.telegramLinked}
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-500 font-medium uppercase tracking-wider">
                OK
              </span>
            </div>
          ) : (
            <div
              id="row-telegram-not-linked"
              onClick={onOpenLinkTelegram}
              className={`px-3 py-2.5 flex items-center justify-between cursor-pointer rounded-[14px] transition-colors ${
                isDark ? 'hover:bg-white/[0.03]' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex flex-col">
                <span
                  className={`text-xs font-semibold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {t.telegramNotLinked}
                </span>
                <span
                  className={`text-[11px] mt-0.5 ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {t.telegramSubtitleNotLinked}
                </span>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          )}

          {/* Row B: Push Notifications */}
          <div className="px-3 py-2.5 flex items-center justify-between">
            <span
              className={`text-xs font-semibold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {t.notificationsTitle}
            </span>

            {/* iOS Native Style Switch */}
            <button
              id="switch-notifications"
              type="button"
              role="switch"
              aria-checked={profile.notificationsEnabled}
              onClick={onToggleNotifications}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                profile.notificationsEnabled
                  ? 'bg-[#34C759]'
                  : isDark
                  ? 'bg-white/20'
                  : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  profile.notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: Appearance (Оформление) — Two rows in one card */}
      <section className="mb-4">
        <span
          className={`text-[11px] font-semibold uppercase tracking-wider block px-1 mb-1.5 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {t.sectionAppearance}
        </span>

        <div
          className={`rounded-[20px] p-1 border divide-y ${
            isDark
              ? 'bg-[#0E1524] border-white/[0.08] divide-white/[0.04]'
              : 'bg-white border-slate-200 divide-slate-100 shadow-xs'
          }`}
        >
          {/* Row A: Theme Segmented Control (Light | Dark only) */}
          <div className="px-3 py-2 flex items-center justify-between">
            <span
              className={`text-xs font-semibold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {t.themeTitle}
            </span>

            <div
              className={`p-0.5 rounded-[12px] border flex w-36 ${
                isDark
                  ? 'bg-[#080C14] border-white/10'
                  : 'bg-slate-100 border-slate-200'
              }`}
            >
              <button
                id="theme-light-btn"
                type="button"
                onClick={() => onToggleTheme('light')}
                className={`flex-1 h-7 rounded-[9px] text-[11px] font-semibold transition-all ${
                  !isDark
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.themeLight}
              </button>

              <button
                id="theme-dark-btn"
                type="button"
                onClick={() => onToggleTheme('dark')}
                className={`flex-1 h-7 rounded-[9px] text-[11px] font-semibold transition-all ${
                  isDark
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.themeDark}
              </button>
            </div>
          </div>

          {/* Row B: Language */}
          <div
            id="row-language"
            onClick={onOpenLanguage}
            className={`px-3 py-2.5 flex items-center justify-between cursor-pointer rounded-[14px] transition-colors ${
              isDark ? 'hover:bg-white/[0.03]' : 'hover:bg-slate-50'
            }`}
          >
            <span
              className={`text-xs font-semibold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {t.languageTitle}
            </span>

            <div className="flex items-center gap-1.5">
              <span
                className={`text-xs ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {currentLanguageLabel}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: App (Приложение) — One row + footnote */}
      <section className="mb-5">
        <span
          className={`text-[11px] font-semibold uppercase tracking-wider block px-1 mb-1.5 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {t.sectionApp}
        </span>

        <div
          id="row-about-app"
          onClick={onOpenAbout}
          className={`rounded-[20px] p-3.5 border flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] ${
            isDark
              ? 'bg-[#0E1524] border-white/[0.08] hover:bg-[#131C30]'
              : 'bg-white border-slate-200 hover:bg-slate-50 shadow-xs'
          }`}
        >
          <span
            className={`text-xs font-semibold ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {t.aboutTitle}
          </span>

          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Footnote under the card: «RallyMind 1.0» */}
        <p
          className={`text-[11px] font-mono px-2 mt-1.5 ${
            isDark ? 'text-slate-500' : 'text-slate-400'
          }`}
        >
          {t.versionFootnote}
        </p>
      </section>

      {/* SECTION 5: Session (Сессия) — Two full-width buttons */}
      <section className="pt-1 pb-4 space-y-2">
        <button
          id="btn-sign-out"
          type="button"
          onClick={onSignOut}
          className={`w-full h-11 rounded-[16px] border flex items-center justify-center gap-2 text-xs font-semibold transition-all active:scale-98 cursor-pointer ${
            isDark
              ? 'bg-[#101726] border-white/[0.08] text-slate-300 hover:bg-white/5'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
          }`}
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{t.signOut}</span>
        </button>

        <button
          id="btn-delete-account"
          type="button"
          onClick={() => setShowDeleteAlert(true)}
          className={`w-full h-11 rounded-[16px] border flex items-center justify-center gap-2 text-xs font-semibold transition-all active:scale-98 cursor-pointer ${
            isDark
              ? 'bg-rose-950/20 border-rose-900/30 text-rose-400 hover:bg-rose-950/30'
              : 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100 shadow-xs'
          }`}
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{t.deleteAccount}</span>
        </button>
      </section>

      {/* Native iOS-style Confirmation Alert for Delete Account */}
      {showDeleteAlert && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className={`w-full max-w-[270px] rounded-[18px] border overflow-hidden shadow-2xl text-center ${
              isDark
                ? 'bg-[#141C2E] border-white/10 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="p-4 pb-3">
              <h3 className="text-sm font-semibold mb-1">{t.deleteAlertTitle}</h3>
              <p
                className={`text-xs leading-tight ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {t.deleteAlertMessage}
              </p>
            </div>

            <div className="border-t border-white/10 flex divide-x divide-white/10">
              <button
                id="btn-delete-alert-cancel"
                type="button"
                onClick={() => setShowDeleteAlert(false)}
                className="flex-1 py-2.5 text-xs font-medium text-blue-500 hover:bg-white/5 active:opacity-70 transition-colors"
              >
                {t.deleteAlertCancel}
              </button>

              <button
                id="btn-delete-alert-confirm"
                type="button"
                onClick={() => {
                  setShowDeleteAlert(false);
                  onDeleteAccount();
                }}
                className="flex-1 py-2.5 text-xs font-bold text-rose-500 hover:bg-rose-500/10 active:opacity-70 transition-colors"
              >
                {t.deleteAlertConfirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
