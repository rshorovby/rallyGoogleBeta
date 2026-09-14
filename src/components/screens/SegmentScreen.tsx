import React from 'react';
import { StrokeSegmentData, AnalysisRecord } from '../../types';
import { CoverageRing } from '../common/CoverageRing';
import { SlotPill, SupervisionPill } from '../common/StatusPill';
import { ChevronLeft, Send, Sparkles, Shield, Clock } from 'lucide-react';

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

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar pb-24 px-5 pt-2">
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
            Technique Segment
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
            {segment.anchoredSlots} anchored • {segment.aiSlots} AI verified •{' '}
            {segment.totalSlots - segment.anchoredSlots - segment.aiSlots} open
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
        <span>Record {segment.russianTitle}</span>
      </button>

      {/* What to film next section */}
      <div
        className={`p-3.5 rounded-[18px] border mb-4 ${
          isDark
            ? 'bg-[#101726]/80 border-white/[0.08]'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: isDark ? '#D2FF1F' : '#9FD600' }}
          />
          <span
            className={`text-[11px] font-semibold uppercase tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Target for Next Submission
          </span>
        </div>
        <p
          className={`text-xs font-medium leading-relaxed ${
            isDark ? 'text-slate-200' : 'text-slate-800'
          }`}
        >
          {segment.whatToFilmNext}
        </p>
        <div
          className={`mt-2 pt-2 border-t text-[11px] font-mono flex items-center gap-1.5 ${
            isDark ? 'border-white/[0.06] text-slate-400' : 'border-slate-100 text-slate-500'
          }`}
        >
          <span>Camera setup:</span>
          <span className="font-sans font-medium">{segment.recommendedAngle}</span>
        </div>
      </div>

      {/* Technique Slots (Explicit requirement: "Слоты не тапаются") */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2 px-1">
          <h2
            className={`text-xs font-semibold uppercase tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Biomechanical Slots (3)
          </h2>
          <span
            className={`text-[11px] ${
              isDark ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            Informational Only
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
                    ? 'Coach Locked'
                    : slot.status === 'ai'
                    ? 'AI Verified'
                    : 'Unclosed'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submissions for this Stroke (Заявки по этому удару) */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <h2
            className={`text-xs font-semibold uppercase tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Submissions for this Stroke
          </h2>
          <span
            className={`text-[11px] font-mono ${
              isDark ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            {segmentRecords.length} recorded
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
            No previous submissions for this stroke. Film your first repetition.
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
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      Score {record.overallScore.toFixed(1)}/10
                    </span>
                    <SupervisionPill
                      status={record.supervisionStatus}
                      coachName={record.coachName}
                      theme={theme}
                      compact
                    />
                  </div>
                  <span
                    className={`text-[11px] mt-0.5 block ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {record.recordedAt} • {record.localVideoDuration}
                  </span>
                </div>
                <div
                  className={`text-xs font-medium ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`}
                >
                  View
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
