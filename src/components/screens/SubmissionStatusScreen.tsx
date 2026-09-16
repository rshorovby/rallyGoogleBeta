import React, { useState, useEffect } from 'react';
import { SubmissionTicket } from '../../types';
import { X, Check, Eye, ShieldCheck, Sparkles } from 'lucide-react';

interface SubmissionStatusScreenProps {
  ticket: SubmissionTicket;
  theme?: 'light' | 'dark';
  language?: 'ru' | 'en';
  onClose: () => void;
  onRecordAnother: () => void;
  onViewReport: (ticket: SubmissionTicket) => void;
}

export const SubmissionStatusScreen: React.FC<SubmissionStatusScreenProps> = ({
  ticket,
  theme = 'dark',
  language = 'ru',
  onClose,
  onRecordAnother,
  onViewReport,
}) => {
  const isDark = theme === 'dark';
  const isRu = language === 'ru';

  // Stepper state: 'queued' | 'review' | 'report_ready' | 'coach_verified'
  const [currentStep, setCurrentStep] = useState<'queued' | 'review' | 'report_ready' | 'coach_verified'>(
    ticket.step || 'review'
  );

  // Stepper definition
  const steps = [
    { id: 'queued', labelRu: 'Очередь', labelEn: 'Queued' },
    { id: 'review', labelRu: 'Ревью', labelEn: 'Review' },
    { id: 'report_ready', labelRu: 'Отчёт готов', labelEn: 'Ready' },
    { id: 'coach_verified', labelRu: 'Закреплено тренером', labelEn: 'Verified' },
  ];

  const stepIndex = steps.findIndex(s => s.id === currentStep);

  // Dynamic explanation text based on active step
  const getStepDescription = () => {
    if (currentStep === 'queued') {
      return isRu
        ? 'Видео загружено и поставлено в приоритетную очередь биомеханического анализа.'
        : 'Video uploaded and prioritized in biomechanical processing queue.';
    }
    if (currentStep === 'review') {
      return isRu
        ? 'Сейчас заявку смотрит тренер перед тем, как отчёт ИИ станет финальным. Обычно это быстрее, чем ждать ИИ-отчёт без ревью.'
        : 'A supervisor coach is reviewing the clip before AI metrics finalize. This is typically faster and more accurate.';
    }
    if (currentStep === 'report_ready') {
      return isRu
        ? 'Отчёт готов! Биомеханическая карта контакта, углы плечевого пояса и ключевые фокусы сформированы.'
        : 'Report ready! Biomechanical kinetic chain map and stroke milestones are computed.';
    }
    return isRu
      ? 'Отчёт закреплён главным тренером. Технический слот в матрице обновлён.'
      : 'Report verified and permanently anchored by head coach.';
  };

  return (
    <div
      className={`min-h-full flex flex-col justify-between p-5 pb-8 relative animate-in fade-in duration-200 ${
        isDark ? 'bg-[#080D1A] text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Top Bar matching Screenshot 1 */}
      <div className="flex items-center justify-between pt-2 pb-4">
        <h1 className="text-xl font-bold tracking-tight">
          {isRu ? 'Статус заявки' : 'Submission Status'}
        </h1>

        <button
          type="button"
          onClick={onClose}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isDark
              ? 'bg-white/10 text-slate-300 hover:bg-white/20'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4 flex-1">
        {/* Main Status Stepper Card */}
        <div
          className={`p-4 rounded-3xl border transition-all ${
            isDark
              ? 'bg-[#0E1726]/85 border-white/[0.08] shadow-lg'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          {/* Header Title (Stroke Name) */}
          <div className="mb-6">
            <span
              className={`text-sm font-bold block ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {ticket.strokeTitle || (isRu ? 'Форхенд по линии' : 'Forehand down the line')}
            </span>
            <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">
              {isRu ? 'Клип' : 'Clip'}: {ticket.durationFormatted || '00:24'} • {ticket.createdAt || 'Только что'}
            </span>
          </div>

          {/* 4-Step Stepper Component */}
          <div className="relative px-1 mb-6">
            {/* Horizontal Track Line */}
            <div className="absolute top-2.5 left-5 right-5 h-[2px] bg-white/10 -z-0">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${(stepIndex / (steps.length - 1)) * 100}%`,
                  backgroundColor: isDark ? '#D2FF1F' : '#84CC16',
                }}
              />
            </div>

            {/* Stepper Nodes */}
            <div className="relative z-10 flex items-center justify-between">
              {steps.map((st, idx) => {
                const isPassed = idx < stepIndex;
                const isCurrent = idx === stepIndex;

                return (
                  <div
                    key={st.id}
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => setCurrentStep(st.id as any)}
                  >
                    {/* Node Circle */}
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                        isPassed
                          ? isDark
                            ? 'bg-[#D2FF1F] text-slate-950'
                            : 'bg-[#65A30D] text-white'
                          : isCurrent
                          ? isDark
                            ? 'border-2 border-[#D2FF1F] bg-[#0E1726] shadow-[0_0_12px_rgba(210,255,31,0.4)]'
                            : 'border-2 border-[#65A30D] bg-white'
                          : isDark
                          ? 'border-2 border-white/20 bg-[#0E1726]'
                          : 'border-2 border-slate-300 bg-white'
                      }`}
                    >
                      {isPassed ? (
                        <Check className="w-3 h-3 stroke-[3]" />
                      ) : isCurrent ? (
                        <div
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: isDark ? '#D2FF1F' : '#65A30D' }}
                        />
                      ) : null}
                    </div>

                    {/* Node Label */}
                    <span
                      className={`text-[10px] mt-2 font-medium text-center max-w-[65px] leading-tight ${
                        isCurrent
                          ? isDark
                            ? 'text-white font-bold'
                            : 'text-slate-950 font-bold'
                          : isPassed
                          ? isDark
                            ? 'text-slate-300'
                            : 'text-slate-600'
                          : 'text-slate-500'
                      }`}
                    >
                      {isRu ? st.labelRu : st.labelEn}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stepper Explanation Text */}
          <p
            className={`text-xs leading-relaxed pt-3 border-t ${
              isDark ? 'border-white/[0.06] text-slate-300' : 'border-slate-100 text-slate-600'
            }`}
          >
            {getStepDescription()}
          </p>

          {/* Interactive Fast-Forward simulator button */}
          <div className="mt-3.5 flex items-center justify-between pt-2">
            <span className="text-[10px] font-mono text-slate-400">
              {isRu ? 'Симуляция ИИ-обработки' : 'Live processing'}:
            </span>
            <button
              type="button"
              onClick={() => {
                if (currentStep === 'queued') setCurrentStep('review');
                else if (currentStep === 'review') setCurrentStep('report_ready');
                else if (currentStep === 'report_ready') setCurrentStep('coach_verified');
                else setCurrentStep('review');
              }}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-all ${
                isDark
                  ? 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              {isRu ? 'Шаг вперед ➜' : 'Advance step ➜'}
            </button>
          </div>
        </div>

        {/* Video Privacy Guarantee Card with Orange Accent Border */}
        <div
          className={`p-4 rounded-2xl border-l-[3px] border-l-[#EA580C] border transition-all ${
            isDark
              ? 'bg-[#0E1726]/70 border-white/[0.06] text-slate-300'
              : 'bg-orange-50/50 border-slate-200 text-slate-700'
          }`}
        >
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#EA580C] flex-shrink-0 mt-0.5" />
            <div>
              <span
                className={`text-xs font-bold block ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {isRu ? 'Видео остаётся у тебя.' : 'Video stays on your device.'}
              </span>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isRu
                  ? 'Копия хранится только на этом iPhone — после обработки на сервере файл не остаётся.'
                  : 'The clip is stored only on this iPhone — after server feature extraction, raw video is deleted.'}
              </p>
            </div>
          </div>
        </div>

        {/* Other Open Submissions («Другие незакрытые заявки») */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">
            {isRu ? 'Другие незакрытые заявки' : 'Other open submissions'}
          </h2>

          <div
            className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
              isDark
                ? 'bg-[#0E1726]/60 border-white/[0.06]'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Thumbnail representation */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                  isDark
                    ? 'bg-[#15231B] border-white/10 text-emerald-400'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                }`}
              >
                <Eye className="w-4 h-4" />
              </div>

              <div>
                <span
                  className={`text-xs font-bold block ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {isRu ? 'Подача, общий обзор' : 'Serve, general overview'}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {isRu ? 'Отправлено вчера' : 'Submitted yesterday'}
                </span>
              </div>
            </div>

            {/* Badge: «На супервизии» */}
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold font-mono bg-[#2A180B] text-[#FB923C] border border-[#EA580C]/30">
              {isRu ? 'На супервизии' : 'Supervising'}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom CTA Actions */}
      <div className="pt-4 space-y-2.5">
        {/* If report is ready, show high-contrast View Report button */}
        {(currentStep === 'report_ready' || currentStep === 'coach_verified') && (
          <button
            type="button"
            onClick={() => onViewReport(ticket)}
            className="w-full h-13 rounded-2xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg active:scale-[0.99] transition-all text-slate-950"
            style={{
              backgroundColor: isDark ? '#D2FF1F' : '#84CC16',
            }}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isRu ? 'Посмотреть готовый отчёт' : 'View final analysis report'}</span>
          </button>
        )}

        {/* Primary Action: «Снять ещё один клип» */}
        <button
          type="button"
          onClick={onRecordAnother}
          className={`w-full h-13 rounded-2xl font-bold text-sm tracking-wide flex items-center justify-center transition-all active:scale-[0.99] border ${
            currentStep === 'report_ready' || currentStep === 'coach_verified'
              ? isDark
                ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
              : 'text-slate-950 shadow-md'
          }`}
          style={
            currentStep === 'report_ready' || currentStep === 'coach_verified'
              ? undefined
              : {
                  backgroundColor: isDark ? '#D2FF1F' : '#84CC16',
                }
          }
        >
          {isRu ? 'Снять ещё один клип' : 'Capture another clip'}
        </button>
      </div>
    </div>
  );
};
