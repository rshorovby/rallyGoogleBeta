import React from 'react';
import { StrokeSegmentData, AnalysisRecord } from '../../types';
import { CoverageRing } from '../common/CoverageRing';
import { SlotPill } from '../common/StatusPill';
import {
  ChevronLeft,
  ShieldCheck,
  Zap,
  Camera,
  ScanEye,
  Clock,
  TrendingUp,
} from 'lucide-react';

interface SegmentScreenProps {
  segment: StrokeSegmentData;
  theme?: 'light' | 'dark';
  onBack: () => void;
  onOpenIntakeForSegment: () => void;
  onSelectAnalysis: (record: AnalysisRecord) => void;
  recentRecords: AnalysisRecord[];
}

export const SegmentScreen: React.FC<SegmentScreenProps> = ({
  segment,
  theme = 'dark',
  onBack,
  onOpenIntakeForSegment,
  onSelectAnalysis,
  recentRecords,
}) => {
  const isDark = theme === 'dark';

  // Filter records related to this stroke
  const segmentRecords = recentRecords.filter(r => r.stroke === segment.id);

  // Calculate angle completeness (familiarity for this specific stroke)
  const anglesCovered = segment.anglesCoveredCount || (segment.coveragePercent > 0 ? 1 : 0);
  const totalAngles = segment.totalAnglesRequired || 4;
  const familiarityPercent = Math.round((anglesCovered / totalAngles) * 100);

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar pb-24 px-5 pt-2 select-none">
      {/* Navigation Header */}
      <div className="flex items-center justify-between py-2 mb-2 select-none">
        <button
          id="btn-back-from-segment"
          type="button"
          onClick={onBack}
          className={`flex items-center gap-1 text-sm font-medium -ml-1.5 py-1 px-1.5 rounded-lg transition-colors ${
            isDark
              ? 'text-blue-400 hover:text-blue-300'
              : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Home</span>
        </button>

        <span
          className={`text-[11px] font-mono uppercase tracking-wider ${
            isDark ? 'text-slate-500' : 'text-slate-400'
          }`}
        >
          {segment.russianTitle}
        </span>
      </div>

      {/* Hero: Segment Title & Coverage */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span
            className={`text-xs font-semibold uppercase tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Сегмент техники
          </span>
          <h1
            className={`text-2xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {segment.title}
          </h1>
          <p
            className={`text-xs mt-0.5 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {segment.russianTitle} • {anglesCovered} из {totalAngles} ракурсов оцифровано
          </p>
        </div>

        <CoverageRing
          percentage={segment.coveragePercent}
          size={84}
          strokeWidth={7}
          theme={theme}
        />
      </div>

      {/* Primary Action: Record Stroke Button */}
      <button
        id="btn-record-segment-stroke"
        type="button"
        onClick={onOpenIntakeForSegment}
        className={`w-full h-[48px] rounded-[16px] flex items-center justify-center gap-2 font-semibold text-sm tracking-tight mb-4 transition-all active:scale-[0.99] border shadow-xs ${
          isDark
            ? 'bg-[#0E2752] border-blue-500/40 text-white hover:bg-[#123166]'
            : 'bg-[#1D4ED8] border-blue-600 text-white hover:bg-[#1E40AF]'
        }`}
      >
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: isDark ? '#D2FF1F' : '#D4FF00' }}
        />
        <span>Снять видео для {segment.russianTitle}</span>
      </button>

      {/* DEDICATED SEGMENT FOCUS CARD (AI + COACH APPROVED, STAYS TILL NEXT VIDEO) */}
      <div
        className={`p-4 rounded-[20px] border mb-4 relative overflow-hidden ${
          isDark
            ? 'bg-gradient-to-b from-[#111D36] to-[#0D1528] border-blue-500/35'
            : 'bg-gradient-to-b from-blue-50/70 to-white border-blue-200'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: isDark ? '#D2FF1F' : '#84CC16' }}
            />
            <span
              className={`text-[11px] font-bold uppercase tracking-wider ${
                isDark ? 'text-blue-300' : 'text-blue-700'
              }`}
            >
              Фокус этого сегмента
            </span>
          </div>

          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
              segment.currentFocus?.approvedByCoach
                ? isDark
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : isDark
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            <span>
              {segment.currentFocus?.approvedByCoach
                ? 'Апрув тренера ✓'
                : 'AI экспресс'}
            </span>
          </span>
        </div>

        {/* Focus Instruction */}
        <div
          className={`p-3 rounded-xl border text-[13px] font-bold leading-snug mb-2 ${
            isDark
              ? 'bg-blue-950/40 border-blue-500/30 text-white'
              : 'bg-blue-50/80 border-blue-200 text-blue-950'
          }`}
        >
          «
          {segment.currentFocus?.russianInstruction || segment.whatToFilmNext}
          »
        </div>

        {/* AI Rationale */}
        {segment.currentFocus?.aiRationale && (
          <p
            className={`text-xs mb-2 leading-relaxed flex items-start gap-1.5 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>{segment.currentFocus.aiRationale}</span>
          </p>
        )}

        {/* Lifetime rule note */}
        <div
          className={`flex items-center gap-1.5 text-[10px] pt-1 border-t ${
            isDark ? 'border-white/[0.06] text-blue-300' : 'border-blue-100 text-blue-700'
          }`}
        >
          <Clock className="w-3 h-3 flex-shrink-0" />
          <span>
            Фокус остается закрепленным до следующей загрузки видео этого удара. Далее ИИ решит закрепить его или сменить.
          </span>
        </div>
      </div>

      {/* TECHNIQUE FAMILIARITY & ANGLES BREAKDOWN */}
      <div
        className={`p-3.5 rounded-[18px] border mb-4 ${
          isDark
            ? 'bg-[#101726]/80 border-white/[0.08]'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <ScanEye className="w-3.5 h-3.5 text-emerald-400" />
            <span
              className={`text-[11px] font-semibold uppercase tracking-wider ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              Изученность удара ({familiarityPercent}%)
            </span>
          </div>
          <span
            className={`text-[10px] font-mono ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {anglesCovered}/4 ракурсов
          </span>
        </div>

        {/* Progress bar */}
        <div
          className={`w-full h-1.5 rounded-full overflow-hidden mb-2.5 ${
            isDark ? 'bg-white/10' : 'bg-slate-100'
          }`}
        >
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${familiarityPercent}%` }}
          />
        </div>

        <p
          className={`text-xs leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          Рекомендуемый следующий ракурс съемки:{' '}
          <strong className="text-blue-400 font-semibold">
            {segment.recommendedAngle}
          </strong>
        </p>
      </div>

      {/* Biomechanical Slots */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2 px-1">
          <h2
            className={`text-xs font-semibold uppercase tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Слоты биомеханики ({segment.slots.length})
          </h2>
          <span
            className={`text-[11px] ${
              isDark ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            Информационные
          </span>
        </div>

        <div className="space-y-2">
          {segment.slots.map(slot => (
            <div
              key={slot.id}
              className={`p-3 rounded-[16px] border select-none ${
                isDark
                  ? 'bg-[#0D1424] border-white/[0.06]'
                  : 'bg-slate-50/90 border-slate-200/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-semibold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {slot.name}
                </span>
                <SlotPill status={slot.status} score={slot.score} theme={theme} />
              </div>
              <div className="flex items-center justify-between mt-1 text-[11px]">
                <span
                  className={isDark ? 'text-slate-400' : 'text-slate-500'}
                >
                  {slot.metricLabel}
                </span>
                <span
                  className={`font-mono text-[10px] uppercase ${
                    isDark ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  {slot.status === 'anchored'
                    ? 'Апрув тренера'
                    : slot.status === 'ai'
                    ? 'AI Анализ'
                    : 'Открыт'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submissions for this Stroke */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <h2
            className={`text-xs font-semibold uppercase tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Видео и разборы этого удара
          </h2>
          <span
            className={`text-[11px] font-mono ${
              isDark ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            {segmentRecords.length} записей
          </span>
        </div>

        {segmentRecords.length === 0 ? (
          <div
            className={`p-4 rounded-[16px] border text-center text-xs ${
              isDark
                ? 'bg-[#0D1424] border-white/[0.06] text-slate-500'
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            Пока нет загруженных видео для этого удара. Снимите первое повторение!
          </div>
        ) : (
          <div className="space-y-2">
            {segmentRecords.map(record => (
              <button
                key={record.id}
                id={`record-item-${record.id}`}
                type="button"
                onClick={() => onSelectAnalysis(record)}
                className={`w-full p-3 rounded-[16px] border text-left flex items-center justify-between transition-all active:scale-[0.99] ${
                  isDark
                    ? 'bg-[#101728] border-white/[0.08] hover:border-blue-500/30'
                    : 'bg-white border-slate-200 hover:border-blue-300'
                }`}
              >
                <div>
                  <span
                    className={`text-xs font-bold block ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {record.primaryFocus}
                  </span>
                  <span
                    className={`text-[10px] ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {record.recordedAt} • {record.localVideoDuration}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                      isDark
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {record.overallScore} ★
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
