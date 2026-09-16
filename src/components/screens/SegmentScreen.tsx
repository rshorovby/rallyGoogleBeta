import React from 'react';
import { StrokeSegmentData, AnalysisRecord, AppLanguage } from '../../types';
import {
  ChevronLeft,
  ShieldCheck,
  Camera,
  Send,
  ScanEye,
  TrendingUp,
  Clock,
  Sparkles,
  ChevronRight,
  Check,
  HelpCircle,
} from 'lucide-react';

interface SegmentScreenProps {
  segment: StrokeSegmentData;
  theme?: 'light' | 'dark';
  language?: AppLanguage;
  onBack: () => void;
  onOpenIntakeForSegment: () => void;
  onSelectAnalysis: (record: AnalysisRecord) => void;
  recentRecords: AnalysisRecord[];
}

export const SegmentScreen: React.FC<SegmentScreenProps> = ({
  segment,
  theme = 'dark',
  language = 'ru',
  onBack,
  onOpenIntakeForSegment,
  onSelectAnalysis,
  recentRecords,
}) => {
  const isDark = theme === 'dark';
  const isRu = language !== 'en';

  // Filter records related to this stroke
  const segmentRecords = recentRecords.filter(r => r.stroke === segment.id);

  // 1. Calculate average score for this segment from scored slots
  const scoredSlots = segment.slots.filter(s => s.score !== undefined);
  const avgScore =
    scoredSlots.length > 0
      ? scoredSlots.reduce((sum, s) => sum + (s.score || 0), 0) / scoredSlots.length
      : null;
  const avgScoreStr = avgScore !== null ? avgScore.toFixed(1) : null;
  const scorePercent = avgScore !== null ? Math.round(avgScore * 10) : 0;

  // 2. Multi-angle familiarity for this stroke
  const anglesCovered = segment.anglesCoveredCount || (segment.coveragePercent > 0 ? 1 : 0);
  const totalAngles = segment.totalAnglesRequired || 4;
  const familiarityPercent = Math.round((anglesCovered / totalAngles) * 100);

  const isZeroState = segment.coveragePercent === 0 && scoredSlots.length === 0;

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar pb-24 px-5 pt-2 select-none">
      {/* 1. Clean Top Navigation Header */}
      <div className="flex items-center justify-between py-2 mb-2 select-none">
        <button
          id="btn-back-from-segment"
          type="button"
          onClick={onBack}
          className={`flex items-center gap-1 text-sm font-medium -ml-1.5 py-1 px-2 rounded-lg transition-colors ${
            isDark
              ? 'text-blue-400 hover:text-blue-300 hover:bg-white/[0.04]'
              : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{isRu ? 'Назад' : 'Back'}</span>
        </button>

        <span
          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
            isDark
              ? 'bg-white/[0.06] text-slate-300'
              : 'bg-slate-100 text-slate-700'
          }`}
        >
          {segment.title.split(' ')[0]}
        </span>
      </div>

      {/* 2. Stroke Title Header */}
      <div className="mb-3.5 px-0.5">
        <h1
          className={`text-xl font-bold tracking-tight leading-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {segment.russianTitle}
        </h1>
        <p
          className={`text-xs mt-0.5 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {segment.title}
        </p>
      </div>

      {/* 3. Dual Metrics Strip (Consistent with HomeScreen) */}
      <div
        className={`rounded-2xl p-3.5 mb-4 border transition-all ${
          isDark
            ? 'bg-[#0E1726]/90 border-white/[0.08]'
            : 'bg-white border-slate-200/90 shadow-xs'
        }`}
      >
        <div className="grid grid-cols-2 gap-3">
          {/* Metric 1: Segment Quality Score */}
          <div
            className={`p-2.5 rounded-xl border ${
              isDark ? 'bg-white/[0.02] border-white/[0.05]' : 'bg-slate-50 border-slate-200/60'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 truncate">
                <TrendingUp className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span
                  className={`text-[11px] font-semibold truncate ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  {isRu ? 'Оценка удара' : 'Score'}
                </span>
              </div>
              <span
                className={`font-mono text-xs font-bold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {avgScoreStr ? `${avgScoreStr} ★` : '—'}
              </span>
            </div>
            <div
              className={`w-full h-1.5 rounded-full overflow-hidden ${
                isDark ? 'bg-white/10' : 'bg-slate-200'
              }`}
            >
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-500"
                style={{ width: `${Math.max(scorePercent, 4)}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] mt-1 text-slate-400">
              <span>{avgScoreStr ? `${scorePercent}%` : isRu ? 'Калибровка' : 'Pending'}</span>
              <span>
                {avgScore && avgScore >= 8.0
                  ? isRu
                    ? 'Стабильный'
                    : 'Stable'
                  : isRu
                  ? 'В развитии'
                  : 'Developing'}
              </span>
            </div>
          </div>

          {/* Metric 2: Multi-Angle Familiarity */}
          <div
            className={`p-2.5 rounded-xl border ${
              isDark ? 'bg-white/[0.02] border-white/[0.05]' : 'bg-slate-50 border-slate-200/60'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 truncate">
                <ScanEye className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span
                  className={`text-[11px] font-semibold truncate ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  {isRu ? 'Изученность' : 'Familiarity'}
                </span>
              </div>
              <span
                className={`font-mono text-xs font-bold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {familiarityPercent}%
              </span>
            </div>
            <div
              className={`w-full h-1.5 rounded-full overflow-hidden ${
                isDark ? 'bg-white/10' : 'bg-slate-200'
              }`}
            >
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${Math.max(familiarityPercent, 4)}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] mt-1 text-slate-400">
              <span>
                {anglesCovered}/{totalAngles} {isRu ? 'рак.' : 'ang.'}
              </span>
              <span className="text-emerald-400 font-medium">
                {anglesCovered >= 3
                  ? isRu
                    ? '3D-Охват'
                    : '3D Mesh'
                  : isRu
                  ? 'Базовый'
                  : 'Basic'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Unified Training Focus Card (Integrated CTA, Coach/AI Badge) */}
      <section
        aria-label="Segment Court Focus"
        className={`rounded-2xl p-4 mb-4 border relative overflow-hidden transition-all ${
          isDark
            ? 'bg-gradient-to-b from-[#111C33] to-[#0E1626] border-blue-500/35 shadow-md'
            : 'bg-gradient-to-b from-blue-50/70 to-white border-blue-200/90 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: isDark ? '#D2FF1F' : '#84CC16' }}
            />
            <span
              className={`text-[11px] font-bold uppercase tracking-wider ${
                isDark ? 'text-blue-300' : 'text-blue-700'
              }`}
            >
              {isRu ? 'Фокус этого удара' : 'Stroke Court Focus'}
            </span>
          </div>

          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
              segment.currentFocus?.approvedByCoach
                ? isDark
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : isDark
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            <span>
              {segment.currentFocus?.approvedByCoach
                ? segment.currentFocus.coachName
                  ? segment.currentFocus.coachName.split(',')[0]
                  : isRu
                  ? 'Тренер ✓'
                  : 'Coach ✓'
                : isRu
                ? 'AI Фокус'
                : 'AI Focus'}
            </span>
          </span>
        </div>

        {/* Focus Instruction */}
        <div
          className={`p-3.5 rounded-xl mb-3 border ${
            isDark
              ? 'bg-[#0B111E]/80 border-white/[0.06]'
              : 'bg-white border-blue-100'
          }`}
        >
          <div
            className={`text-sm font-bold leading-snug mb-1.5 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            «
            {isRu
              ? segment.currentFocus?.russianInstruction || segment.whatToFilmNext
              : segment.currentFocus?.instruction || segment.whatToFilmNext}
            »
          </div>

          {segment.currentFocus?.aiRationale && (
            <p
              className={`text-xs mt-2 leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {segment.currentFocus.aiRationale}
            </p>
          )}

          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2.5 pt-2 border-t border-white/[0.05]">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 flex-shrink-0 text-blue-400" />
              <span>
                {isRu ? 'Закреплен до следующего видео' : 'Active until next video'}
              </span>
            </span>
            <span className="font-mono text-blue-400 font-medium">
              {anglesCovered}/4 {isRu ? 'рак.' : 'ang.'}
            </span>
          </div>
        </div>

        {/* Integrated CTA: Upload Video for this Stroke */}
        <button
          id="btn-record-segment-stroke"
          type="button"
          onClick={onOpenIntakeForSegment}
          className={`w-full h-11 rounded-xl flex items-center justify-between px-4 font-semibold text-xs transition-all active:scale-[0.98] border shadow-xs ${
            isDark
              ? 'bg-[#0E2752] border-blue-400/50 text-white hover:bg-[#13356D]'
              : 'bg-[#1D4ED8] border-blue-600 text-white hover:bg-[#1E40AF]'
          }`}
        >
          <div className="flex items-center gap-2">
            <Camera className="w-3.5 h-3.5 text-blue-300" />
            <span>
              {isRu
                ? `Отправить видео: ${segment.russianTitle}`
                : `Upload Video: ${segment.title.split(' ')[0]}`}
            </span>
          </div>
          <Send className="w-3.5 h-3.5 text-blue-200" />
        </button>
      </section>

      {/* 5. Recommended Filming Angle Card */}
      <div
        className={`p-3.5 rounded-2xl border mb-4 ${
          isDark
            ? 'bg-[#0E1726]/80 border-white/[0.06]'
            : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-blue-400" />
            <span
              className={`text-[11px] font-bold uppercase tracking-wider ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              {isRu ? 'Следующий ракурс для ИИ-анализа' : 'Recommended Angle'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3].map(idx => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full ${
                  idx < anglesCovered
                    ? 'bg-emerald-400'
                    : isDark
                    ? 'bg-white/15'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        <p
          className={`text-xs font-semibold mb-1 ${
            isDark ? 'text-blue-300' : 'text-blue-700'
          }`}
        >
          {segment.recommendedAngle}
        </p>

        <p
          className={`text-[11px] leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {isRu
            ? 'Съемка с разных точек помогает ИИ точнее рассчитывать 3D-траекторию ракетки и контактную зону.'
            : 'Multi-angle video enables precise 3D trajectory calculation and impact alignment.'}
        </p>
      </div>

      {/* 6. Biomechanical Checkpoints (Слоты техники) */}
      <section className="mb-4">
        <div className="flex items-center justify-between mb-2 px-1">
          <h2
            className={`text-[11px] font-bold uppercase tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {isRu ? 'Контрольные точки техники' : 'Biomechanical Checkpoints'} ({segment.slots.length})
          </h2>
          <span
            className={`text-[11px] ${
              isDark ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            {isRu ? '3D-расчет' : '3D Metrics'}
          </span>
        </div>

        <div className="space-y-2">
          {segment.slots.map(slot => (
            <div
              key={slot.id}
              className={`p-3 rounded-xl border transition-all ${
                isDark
                  ? 'bg-[#0E1726]/80 border-white/[0.06]'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-xs font-semibold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {slot.name}
                </span>

                <div className="flex items-center gap-1.5">
                  {slot.score !== undefined ? (
                    <span
                      className={`text-xs font-bold font-mono ${
                        slot.score >= 8.0 ? 'text-emerald-400' : 'text-blue-400'
                      }`}
                    >
                      {slot.score.toFixed(1)} ★
                    </span>
                  ) : null}

                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      slot.status === 'anchored'
                        ? isDark
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : slot.status === 'ai'
                        ? isDark
                          ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                        : isDark
                        ? 'bg-white/[0.04] text-slate-400 border border-white/[0.06]'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {slot.status === 'anchored' ? (
                      <>
                        <Check className="w-2.5 h-2.5 text-emerald-400" />
                        <span>{isRu ? 'Тренер ✓' : 'Coach ✓'}</span>
                      </>
                    ) : slot.status === 'ai' ? (
                      <>
                        <Sparkles className="w-2.5 h-2.5 text-blue-400" />
                        <span>{isRu ? 'AI' : 'AI'}</span>
                      </>
                    ) : (
                      <span>{isRu ? 'Ожидает' : 'Open'}</span>
                    )}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <span
                  className={isDark ? 'text-slate-400' : 'text-slate-500'}
                >
                  {slot.metricLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Video Analysis History for this Stroke */}
      <section>
        <div className="flex items-center justify-between mb-2 px-1">
          <h2
            className={`text-[11px] font-bold uppercase tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {isRu ? 'История разборов' : 'Analysis History'}
          </h2>
          <span
            className={`text-[11px] font-mono ${
              isDark ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            {segmentRecords.length} {isRu ? 'зап.' : 'rec.'}
          </span>
        </div>

        {segmentRecords.length === 0 ? (
          <div
            className={`p-4 rounded-xl border text-center text-xs leading-relaxed ${
              isDark
                ? 'bg-[#0E1726]/60 border-white/[0.06] text-slate-400'
                : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}
          >
            {isRu
              ? 'Пока нет загруженных видео для этого удара. Нажмите «Отправить видео», чтобы запустить первый разбор!'
              : 'No recorded analyses for this stroke yet. Tap "Upload Video" to start your first review!'}
          </div>
        ) : (
          <div className="space-y-2">
            {segmentRecords.map(record => (
              <button
                key={record.id}
                id={`record-item-${record.id}`}
                type="button"
                onClick={() => onSelectAnalysis(record)}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all active:scale-[0.99] ${
                  isDark
                    ? 'bg-[#0E1726]/80 border-white/[0.06] hover:border-white/15'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
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

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold font-mono ${
                      record.overallScore >= 8.0
                        ? 'text-emerald-400'
                        : 'text-blue-400'
                    }`}
                  >
                    {record.overallScore} ★
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

