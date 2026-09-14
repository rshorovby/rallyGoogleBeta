import React, { useState } from 'react';
import { X, Check, Copy, Sparkles, ShieldCheck } from 'lucide-react';

interface TelegramSyncModalProps {
  code: string;
  theme?: 'light' | 'dark';
  onClose: () => void;
  onLinkSuccess: () => void;
}

export const TelegramSyncModal: React.FC<TelegramSyncModalProps> = ({
  code,
  theme = 'dark',
  onClose,
  onLinkSuccess,
}) => {
  const isDark = theme === 'dark';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(code.replace('-', ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full rounded-t-[32px] p-6 pb-8 border-t shadow-2xl transition-all ${
          isDark
            ? 'bg-[#0E1524] border-white/10 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="flex items-center justify-between mb-4 select-none">
          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] font-mono tracking-widest uppercase ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Coach Link Channel
            </span>
          </div>

          <button
            id="btn-close-telegram-modal"
            type="button"
            onClick={onClose}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
              isDark
                ? 'bg-white/10 text-slate-300 hover:bg-white/20'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="text-left mb-5">
          <h2 className="text-xl font-bold tracking-tight">Sync via Telegram Code</h2>
          <p
            className={`text-xs mt-1 leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            No login or password exchange. Send this one-time six-digit code to{' '}
            <strong className={isDark ? 'text-blue-400' : 'text-blue-600'}>
              @RallyMindCoachBot
            </strong>{' '}
            to receive coach verification updates.
          </p>
        </div>

        {/* 6-Digit Code Display */}
        <div
          className={`p-4 rounded-[20px] border flex flex-col items-center justify-center mb-4 ${
            isDark
              ? 'bg-[#090E1A] border-white/10'
              : 'bg-slate-50 border-slate-200'
          }`}
        >
          <span
            className={`text-[11px] uppercase font-mono tracking-wider mb-1 ${
              isDark ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            One-Time Sync Code
          </span>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-extrabold tracking-widest font-mono tabular-nums">
              {code}
            </span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1">Valid for 15 minutes</span>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            id="btn-copy-telegram-code"
            type="button"
            onClick={handleCopy}
            className={`flex-1 h-11 rounded-[16px] border flex items-center justify-center gap-2 text-xs font-semibold transition-all active:scale-98 ${
              isDark
                ? 'bg-[#121B2D] border-white/10 text-slate-200 hover:bg-[#182338]'
                : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>

          <button
            id="btn-confirm-telegram-linked"
            type="button"
            onClick={onLinkSuccess}
            className="flex-1 h-11 rounded-[16px] bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-98"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Confirm Linked</span>
          </button>
        </div>

        <p
          className={`text-[11px] text-center font-mono ${
            isDark ? 'text-slate-500' : 'text-slate-400'
          }`}
        >
          Your personal Telegram handle is never stored on RallyMind servers.
        </p>
      </div>
    </div>
  );
};
