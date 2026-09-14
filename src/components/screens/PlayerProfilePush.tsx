import React from 'react';
import { PlayerProfile, ThemeMode, AppLanguage } from '../../types';
import {
  TRANSLATIONS,
  LEVEL_LABELS,
  HAND_LABELS,
  FREQUENCY_LABELS,
  EXPERIENCE_LABELS,
  COACHING_LABELS,
  FOCUS_LABELS,
} from '../../data/translations';
import { ChevronLeft, Sparkles, CheckCircle2 } from 'lucide-react';

interface PlayerProfilePushProps {
  profile: PlayerProfile;
  theme: ThemeMode;
  language: AppLanguage;
  onBack: () => void;
  onFillProfile: () => void;
}

export const PlayerProfilePush: React.FC<PlayerProfilePushProps> = ({
  profile,
  theme,
  language,
  onBack,
  onFillProfile,
}) => {
  const isDark = theme === 'dark';
  const t = TRANSLATIONS[language];
  const tp = t.profilePush;

  const isFilled = profile.profileState === 'filled' && Boolean(profile.level);
  const isSkipped = profile.profileState === 'skipped';
  const isEmpty = profile.profileState === 'empty' || !profile.level;

  // Resolve localized field values
  const levelValue = profile.level ? LEVEL_LABELS[language][profile.level] : '—';
  const handValue = profile.profileHand
    ? HAND_LABELS[language][profile.profileHand]
    : profile.hand.toLowerCase().includes('left')
    ? HAND_LABELS[language].left
    : HAND_LABELS[language].right;
  const frequencyValue = profile.frequency
    ? FREQUENCY_LABELS[language][profile.frequency]
    : '—';
  const experienceValue = profile.experience
    ? EXPERIENCE_LABELS[language][profile.experience]
    : '—';
  const coachingValue = profile.coaching
    ? COACHING_LABELS[language][profile.coaching]
    : '—';
  const focusValue = profile.focus ? FOCUS_LABELS[language][profile.focus] : '—';

  // Injuries: empty string means "нет" / "none"
  const injuriesValue =
    profile.injuries && profile.injuries.trim().length > 0
      ? profile.injuries
      : isFilled
      ? tp.injuriesNone
      : '—';

  const rows = [
    { label: tp.level, value: levelValue },
    { label: tp.hand, value: handValue },
    { label: tp.frequency, value: frequencyValue },
    { label: tp.experience, value: experienceValue },
    { label: tp.coaching, value: coachingValue },
    { label: tp.focus, value: focusValue },
    { label: tp.injuries, value: injuriesValue },
  ];

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
          {tp.title}
        </span>

        <div className="w-12" />
      </div>

      {/* 7 Read-Only Fields Card */}
      <div
        className={`rounded-[20px] p-4 border divide-y ${
          isDark
            ? 'bg-[#0E1524] border-white/[0.08] divide-white/[0.05]'
            : 'bg-white border-slate-200 divide-slate-100 shadow-xs'
        }`}
      >
        {rows.map((row, idx) => (
          <div
            key={row.label}
            className={`flex items-center justify-between text-xs py-2.5 ${
              idx === 0 ? 'pt-1' : ''
            } ${idx === rows.length - 1 ? 'pb-1' : ''}`}
          >
            <span
              className={`font-medium ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {row.label}
            </span>
            <span
              className={`font-semibold text-right max-w-[210px] truncate ${
                isDark ? 'text-slate-100' : 'text-slate-900'
              } ${row.value === '—' ? 'text-slate-500 font-normal' : ''}`}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* Hint below card */}
      <p
        className={`text-[11px] px-2 mt-2 leading-relaxed ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}
      >
        {isFilled && tp.hintFilled}
        {isSkipped && tp.hintSkipped}
        {isEmpty && !isSkipped && tp.hintEmpty}
      </p>

      {/* CTA Button: Only shown if profile is NOT filled */}
      {!isFilled && (
        <div className="mt-6">
          <button
            id="btn-fill-profile-push"
            type="button"
            onClick={onFillProfile}
            className="w-full h-11 rounded-[16px] bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98"
          >
            <Sparkles className="w-4 h-4 text-[#D2FF1F]" />
            <span>{tp.fillCta}</span>
          </button>
        </div>
      )}

      {isFilled && (
        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-emerald-500 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{language === 'ru' ? 'Профиль активен' : 'Profile is active'}</span>
        </div>
      )}
    </div>
  );
};
