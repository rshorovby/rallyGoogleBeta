import React, { useState } from 'react';
import { AnalysisObservation } from '../../types';
import { ChevronLeft, ChevronRight, X, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface AnalysisPointModalProps {
  points: AnalysisObservation[];
  theme?: 'light' | 'dark';
  onClose: () => void;
}

export const AnalysisPointModal: React.FC<AnalysisPointModalProps> = ({
  points,
  theme = 'dark',
  onClose,
}) => {
  const isDark = theme === 'dark';
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentPoint = points[currentIndex] || points[0];
  const total = points.length;

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar pb-24 px-5 pt-3 flex flex-col justify-between">
      {/* Navigation Bar */}
      <div>
        <div className="flex items-center justify-between py-2 mb-3 select-none">
          <button
            id="btn-close-analysis-points"
            type="button"
            onClick={onClose}
            className={`flex items-center gap-1 text-sm font-medium py-1 px-1.5 rounded-lg transition-colors ${
              isDark
                ? 'text-blue-400 hover:text-blue-300'
                : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Analysis</span>
          </button>

          <span
            className={`text-xs font-mono tabular-nums uppercase tracking-wider px-2 py-0.5 rounded-full border ${
              isDark
                ? 'bg-white/5 border-white/10 text-slate-300'
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            Point {currentIndex + 1} of {total}
          </span>
        </div>

        {/* 1 Card Structure (Одна карточка: замечание и как закрыть) */}
        <div
          className={`rounded-[24px] p-5 border shadow-lg transition-all ${
            isDark
              ? 'bg-[#0E1626] border-white/10 text-slate-100'
              : 'bg-white border-slate-200/90 text-slate-900 shadow-slate-100'
          }`}
        >
          {/* Section A: Observation / Defect (Замечание) */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span
                className={`text-[11px] font-semibold uppercase tracking-wider ${
                  isDark ? 'text-amber-400/90' : 'text-amber-700'
                }`}
              >
                Biomechanical Observation
              </span>
            </div>

            <h2
              className={`text-lg font-bold tracking-tight leading-snug ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}
            >
              {currentPoint.title}
            </h2>

            <p
              className={`text-[13px] leading-relaxed mt-2.5 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              {currentPoint.issueDescription}
            </p>
          </div>

          {/* Section B: How to Resolve / Lock (Как закрыть) */}
          <div
            className={`p-4 rounded-[18px] border ${
              isDark
                ? 'bg-[#0A111F] border-blue-500/20'
                : 'bg-blue-50/70 border-blue-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span
                className={`text-[11px] font-semibold uppercase tracking-wider ${
                  isDark ? 'text-blue-400' : 'text-blue-800'
                }`}
              >
                Correction Directive
              </span>
            </div>

            <p
              className={`text-[13px] font-medium leading-relaxed ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {currentPoint.correctionDirective}
            </p>
          </div>

          {/* Section C: Measured Kinetic Impact */}
          <div
            className={`mt-4 pt-3 border-t text-[11px] flex items-center justify-between ${
              isDark ? 'border-white/[0.06] text-slate-400' : 'border-slate-100 text-slate-500'
            }`}
          >
            <span>Target Impact:</span>
            <span className="font-semibold text-right max-w-[200px]">
              {currentPoint.kineticsImpact}
            </span>
          </div>
        </div>
      </div>

      {/* Pagination & Stepper Controls (Листание 1–3) */}
      <div className="pt-6 pb-2">
        <div className="flex items-center justify-between">
          <button
            id="btn-prev-point"
            type="button"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            className={`flex items-center gap-1 text-xs font-semibold py-2 px-3 rounded-full border transition-all ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed border-transparent'
                : isDark
                ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          {/* 1-3 Paging Indicator Dots */}
          <div className="flex items-center gap-2">
            {points.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === currentIndex
                    ? 'w-6 bg-blue-500'
                    : isDark
                    ? 'w-1.5 bg-white/20'
                    : 'w-1.5 bg-slate-300'
                }`}
                aria-label={`Go to point ${i + 1}`}
              />
            ))}
          </div>

          <button
            id="btn-next-point"
            type="button"
            disabled={currentIndex === total - 1}
            onClick={() => setCurrentIndex(prev => Math.min(total - 1, prev + 1))}
            className={`flex items-center gap-1 text-xs font-semibold py-2 px-3 rounded-full border transition-all ${
              currentIndex === total - 1
                ? 'opacity-30 cursor-not-allowed border-transparent'
                : isDark
                ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p
          className={`text-[11px] text-center mt-3 font-mono ${
            isDark ? 'text-slate-600' : 'text-slate-400'
          }`}
        >
          No likes or social noise • Biomechanical precision
        </p>
      </div>
    </div>
  );
};
