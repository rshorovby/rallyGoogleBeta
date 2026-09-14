import React, { useState } from 'react';
import { PlayerProfile, ThemeMode, AppLanguage } from '../../types';
import { TRANSLATIONS } from '../../data/translations';
import { ChevronLeft, Copy, Check, ShieldCheck, KeyRound, Smartphone } from 'lucide-react';

interface LinkTelegramPushProps {
  profile: PlayerProfile;
  theme: ThemeMode;
  language: AppLanguage;
  onBack: () => void;
  onLinkSuccess: () => void;
}

export const LinkTelegramPush: React.FC<LinkTelegramPushProps> = ({
  profile,
  theme,
  language,
  onBack,
  onLinkSuccess,
}) => {
  const isDark = theme === 'dark';
  const t = TRANSLATIONS[language];
  const tt = t.telegramPush;

  const [botCode, setBotCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(true);

  const handleCopyAppCode = () => {
    navigator.clipboard?.writeText(profile.telegramAppCode.replace('-', ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!botCode.trim()) return;
    onLinkSuccess();
  };

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
          {tt.title}
        </span>

        <div className="w-12" />
      </div>

      <div className="space-y-4">
        {/* Method 1: Code from bot */}
        <div
          className={`rounded-[20px] p-4 border ${
            isDark ? 'bg-[#0E1524] border-white/[0.08]' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <KeyRound className="w-4 h-4 text-blue-500" />
            <h2 className="text-xs font-semibold uppercase tracking-wider">
              {tt.botCodeSection}
            </h2>
          </div>
          <p
            className={`text-xs mb-3 leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {tt.botCodeDesc}
          </p>

          <form onSubmit={handleLinkSubmit} className="space-y-3">
            <input
              id="input-telegram-bot-code"
              type="text"
              value={botCode}
              onChange={e => setBotCode(e.target.value.toUpperCase())}
              placeholder={tt.botCodePlaceholder}
              maxLength={10}
              className={`w-full h-11 px-3.5 rounded-[14px] text-center font-mono font-bold tracking-widest text-sm uppercase outline-none border transition-all ${
                isDark
                  ? 'bg-[#080C14] border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500'
              }`}
            />

            <button
              id="btn-submit-telegram-code"
              type="submit"
              disabled={!botCode.trim()}
              className={`w-full h-11 rounded-[16px] font-semibold text-xs flex items-center justify-center gap-1.5 transition-all ${
                botCode.trim()
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xs active:scale-98 cursor-pointer'
                  : 'bg-slate-500/20 text-slate-400 border border-white/5 cursor-not-allowed'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{tt.linkButton}</span>
            </button>
          </form>
        </div>

        {/* Divider with OR */}
        <div className="flex items-center gap-3 px-3">
          <div className="flex-1 h-[1px] bg-white/[0.08]" />
          <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
            {language === 'ru' ? 'ИЛИ' : 'OR'}
          </span>
          <div className="flex-1 h-[1px] bg-white/[0.08]" />
        </div>

        {/* Method 2: Code for bot */}
        <div
          className={`rounded-[20px] p-4 border ${
            isDark ? 'bg-[#0E1524] border-white/[0.08]' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <Smartphone className="w-4 h-4 text-blue-500" />
            <h2 className="text-xs font-semibold uppercase tracking-wider">
              {tt.appCodeSection}
            </h2>
          </div>
          <p
            className={`text-xs mb-3 leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {tt.appCodeDesc}
          </p>

          <div
            className={`p-3.5 rounded-[16px] border flex items-center justify-between mb-3 ${
              isDark ? 'bg-[#080C14] border-white/10' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-xl font-extrabold tracking-widest font-mono tabular-nums">
              {profile.telegramAppCode}
            </span>

            <button
              id="btn-copy-app-code"
              type="button"
              onClick={handleCopyAppCode}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5 transition-all active:scale-95 ${
                copied
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                  : isDark
                  ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{tt.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{tt.copyCode}</span>
                </>
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={onLinkSuccess}
            className="w-full text-center text-xs text-blue-500 hover:text-blue-400 font-medium py-1"
          >
            {language === 'ru' ? 'Подтвердить привязку' : 'Confirm Linked in Bot'}
          </button>
        </div>
      </div>
    </div>
  );
};
