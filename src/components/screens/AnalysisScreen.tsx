import React, { useState } from 'react';
import { AnalysisRecord } from '../../types';
import { SupervisionPill } from '../common/StatusPill';
import { ChevronLeft, Play, Pause, HardDrive, Trash2, ArrowRight } from 'lucide-react';

interface AnalysisScreenProps {
  record: AnalysisRecord;
  theme?: 'light' | 'dark';
  onBack: () => void;
  onOpenDetails: () => void;
  onDeleteLocal: () => void;
}

export const AnalysisScreen: React.FC<AnalysisScreenProps> = ({
  record,
  theme = 'dark',
  onBack,
  onOpenDetails,
  onDeleteLocal,
}) => {
  const isDark = theme === 'dark';
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrubberValue, setScrubberValue] = useState(42);

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar pb-24 px-5 pt-2">
      {/* Top Navigation */}
      <div className="flex items-center justify-between py-2 mb-2 select-none">
        <button
          id="btn-back-from-analysis"
          type="button"
          onClick={onBack}
          className={`flex items-center gap-1 text-sm font-medium -ml-1.5 py-1 px-1.5 rounded-lg transition-colors ${
            isDark
              ? 'text-blue-400 hover:text-blue-300'
              : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <span
          className={`text-[11px] font-mono uppercase tracking-wider ${
            isDark ? 'text-slate-500' : 'text-slate-400'
          }`}
        >
          Analysis #{record.id.replace('an-', '')}
        </span>
      </div>

      {/* 1. Local Video Player (On-Device Local Video Playback) */}
      <div
        className={`relative w-full rounded-[22px] overflow-hidden border mb-4 ${
          isDark ? 'bg-[#080C14] border-white/10' : 'bg-slate-900 border-slate-800'
        }`}
      >
        {/* Synthetic Video Viewport representing high-speed hardcourt tennis stroke capture */}
        <div className="relative aspect-[16/10] w-full flex flex-col justify-between p-3 select-none">
          {/* Subtle court line vector overlay for kinematic tracking */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <line x1="20%" y1="0" x2="20%" y2="100%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="65%" x2="100%" y2="65%" stroke="white" strokeWidth="1" />
              <circle cx="58%" cy="54%" r="18" stroke="#D2FF1F" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
              <line x1="58%" y1="36%" x2="58%" y2="72%" stroke="#D2FF1F" strokeWidth="1" />
            </svg>
          </div>

          {/* Top Info Bar inside player */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-white/90 border border-white/10">
              <HardDrive className="w-3 h-3 text-blue-400" />
              <span>Local on iPhone</span>
            </div>

            <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-[#D2FF1F] border border-white/10">
              {record.localVideoDuration}
            </span>
          </div>

          {/* Play / Pause Interactive Scrubber Center */}
          <div className="relative z-10 flex items-center justify-center">
            <button
              id="btn-toggle-playback"
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-white flex items-center justify-center transition-transform active:scale-90 hover:bg-white/30 shadow-lg"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-0.5 fill-current" />}
            </button>
          </div>

          {/* Bottom Video Scrubber & Time Bar */}
          <div className="relative z-10 space-y-1">
            <input
              id="video-timeline-scrubber"
              type="range"
              min="0"
              max="100"
              value={scrubberValue}
              onChange={e => setScrubberValue(Number(e.target.value))}
              className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#D2FF1F]"
            />
            <div className="flex justify-between text-[9px] font-mono text-slate-300">
              <span>00:01.8 (Impact Point)</span>
              <span>240 fps Telemetry</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Supervision Status & Title */}
      <div className="mb-4">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <SupervisionPill
            status={record.supervisionStatus}
            coachName={record.coachName}
            theme={theme}
          />
          <span
            className={`text-xs font-mono tabular-nums ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {record.recordedAt}
          </span>
        </div>

        <h1
          className={`text-xl font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {record.strokeDisplayName}
        </h1>
      </div>

      {/* 3. Executive Summary («Кратко») */}
      <div
        className={`p-3.5 rounded-[18px] border mb-4 ${
          isDark ? 'bg-[#0E1524] border-white/[0.08]' : 'bg-white border-slate-200'
        }`}
      >
        <span
          className={`text-[10px] uppercase font-semibold tracking-wider block mb-1 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          Executive Summary
        </span>
        <p
          className={`text-xs leading-relaxed ${
            isDark ? 'text-slate-200' : 'text-slate-800'
          }`}
        >
          {record.summary}
        </p>
      </div>

      {/* 4. Calibrated 0-10 Scores («Оценки») */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2 px-1">
          <h2
            className={`text-xs font-semibold uppercase tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Biomechanical Calibrations (0–10)
          </h2>
          <span
            className={`text-xs font-bold tabular-nums ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}
          >
            Overall {record.overallScore.toFixed(1)}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div
            className={`p-3 rounded-[16px] border ${
              isDark ? 'bg-[#101728] border-white/[0.06]' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span
              className={`text-[10px] uppercase font-medium tracking-wider block ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Contact
            </span>
            <span
              className={`text-lg font-bold tabular-nums block mt-0.5 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {record.metrics.contactPoint.toFixed(1)}
            </span>
            <span className="text-[10px] text-slate-500">Early Forward</span>
          </div>

          <div
            className={`p-3 rounded-[16px] border ${
              isDark ? 'bg-[#101728] border-white/[0.06]' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span
              className={`text-[10px] uppercase font-medium tracking-wider block ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Kinetic
            </span>
            <span
              className={`text-lg font-bold tabular-nums block mt-0.5 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {record.metrics.kineticChain.toFixed(1)}
            </span>
            <span className="text-[10px] text-slate-500">Elastic Coil</span>
          </div>

          <div
            className={`p-3 rounded-[16px] border ${
              isDark ? 'bg-[#101728] border-white/[0.06]' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span
              className={`text-[10px] uppercase font-medium tracking-wider block ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Balance
            </span>
            <span
              className={`text-lg font-bold tabular-nums block mt-0.5 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {record.metrics.balance.toFixed(1)}
            </span>
            <span className="text-[10px] text-slate-500">Center of Gravity</span>
          </div>
        </div>
      </div>

      {/* 5. Technique Focus & What to Film Next («Фокус» & «Что снять») */}
      <div
        className={`p-3.5 rounded-[18px] border mb-4 space-y-3 ${
          isDark ? 'bg-[#0E1524] border-white/[0.08]' : 'bg-white border-slate-200'
        }`}
      >
        <div>
          <span
            className={`text-[10px] uppercase font-semibold tracking-wider block ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Technique Focus
          </span>
          <p
            className={`text-xs font-semibold mt-0.5 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {record.primaryFocus}
          </p>
        </div>

        <div className={`pt-2.5 border-t ${isDark ? 'border-white/[0.06]' : 'border-slate-100'}`}>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: isDark ? '#D2FF1F' : '#9FD600' }}
            />
            <span
              className={`text-[10px] uppercase font-semibold tracking-wider ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              What to record next
            </span>
          </div>
          <p
            className={`text-xs mt-1 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            {record.whatToFilmNext}
          </p>
        </div>
      </div>

      {/* 6. Action: Detailed Points («Подробнее») */}
      <div className="mb-6">
        <button
          id="btn-open-analysis-details"
          type="button"
          onClick={onOpenDetails}
          className={`w-full h-[48px] rounded-[16px] flex items-center justify-between px-4 font-semibold text-sm tracking-tight border transition-all active:scale-[0.99] ${
            isDark
              ? 'bg-[#10192B] border-blue-500/30 text-white hover:bg-[#152138]'
              : 'bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>Detailed Points ({record.points.length} Observations)</span>
          </div>
          <ArrowRight className="w-4 h-4 text-blue-400" />
        </button>
      </div>

      {/* 7. Quiet Action: Delete from this iPhone («убрать с этого iPhone») */}
      <div className="text-center pt-2 pb-6">
        <button
          id="btn-delete-local-video"
          type="button"
          onClick={onDeleteLocal}
          className={`inline-flex items-center gap-1.5 text-xs font-normal transition-colors py-1.5 px-3 rounded-lg ${
            isDark
              ? 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
          }`}
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Remove video from this iPhone</span>
        </button>
      </div>
    </div>
  );
};
