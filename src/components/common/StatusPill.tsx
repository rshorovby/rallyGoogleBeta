import React from 'react';
import { Check, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { SupervisionStatus, SlotStatus } from '../../types';

interface SupervisionPillProps {
  status: SupervisionStatus;
  coachName?: string;
  theme?: 'light' | 'dark';
  compact?: boolean;
}

export const SupervisionPill: React.FC<SupervisionPillProps> = ({
  status,
  coachName,
  theme = 'dark',
  compact = false,
}) => {
  const isDark = theme === 'dark';

  if (status === 'coach_confirmed') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium tracking-tight whitespace-nowrap border ${
          isDark
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
        }`}
      >
        <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0 text-emerald-500" />
        <span>{compact ? 'Coach Verified' : coachName ? `Coach: ${coachName}` : 'Coach Verified'}</span>
      </span>
    );
  }

  if (status === 'ai_verified') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium tracking-tight whitespace-nowrap border ${
          isDark
            ? 'bg-blue-500/10 text-blue-300 border-blue-500/20'
            : 'bg-blue-50 text-blue-700 border-blue-200'
        }`}
      >
        <Sparkles className="w-3.5 h-3.5 flex-shrink-0 text-blue-500" />
        <span>AI Biometrics</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium tracking-tight whitespace-nowrap border ${
        isDark
          ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
          : 'bg-amber-50 text-amber-700 border-amber-200'
      }`}
    >
      <Clock className="w-3.5 h-3.5 flex-shrink-0 text-amber-500" />
      <span>Awaiting Coach</span>
    </span>
  );
};

interface SlotPillProps {
  status: SlotStatus;
  score?: number;
  theme?: 'light' | 'dark';
}

export const SlotPill: React.FC<SlotPillProps> = ({ status, score, theme = 'dark' }) => {
  const isDark = theme === 'dark';

  if (status === 'anchored') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-tight whitespace-nowrap border ${
          isDark
            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
            : 'bg-emerald-50 text-emerald-800 border-emerald-300'
        }`}
      >
        <Check className="w-3 h-3 text-emerald-500" />
        <span>Anchored</span>
        {score !== undefined && <span className="ml-0.5 tabular-nums font-bold">({score.toFixed(1)})</span>}
      </span>
    );
  }

  if (status === 'ai') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-tight whitespace-nowrap border ${
          isDark
            ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
            : 'bg-blue-50 text-blue-800 border-blue-300'
        }`}
      >
        <Sparkles className="w-3 h-3 text-blue-500" />
        <span>AI Analyzed</span>
        {score !== undefined && <span className="ml-0.5 tabular-nums font-bold">({score.toFixed(1)})</span>}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium tracking-tight whitespace-nowrap border ${
        isDark
          ? 'bg-white/5 text-slate-400 border-white/10'
          : 'bg-slate-100 text-slate-500 border-slate-200'
      }`}
    >
      <span>Open Slot</span>
    </span>
  );
};
