import React, { useState, useEffect } from 'react';
import { StrokeType, IntakeSubmission } from '../../types';
import { ChevronLeft, Play, Pause, Video, Check } from 'lucide-react';

interface IntakeFlowModalProps {
  initialStroke?: StrokeType;
  theme?: 'light' | 'dark';
  language?: 'ru' | 'en';
  onClose: () => void;
  onSubmit: (submission: IntakeSubmission) => void;
}

export const IntakeFlowModal: React.FC<IntakeFlowModalProps> = ({
  initialStroke = 'forehand',
  theme = 'dark',
  language = 'ru',
  onClose,
  onSubmit,
}) => {
  const isDark = theme === 'dark';
  const isRu = language === 'ru';

  // Sub-step: 'trim' («Обрезка») | 'intake' («Интейк»)
  const [subStep, setSubStep] = useState<'trim' | 'intake'>('trim');

  // Trimmer state
  const [trimStart, setTrimStart] = useState<number>(12); // in seconds
  const [trimEnd, setTrimEnd] = useState<number>(36); // in seconds
  const totalDuration = 60; // 60s max clip
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playhead, setPlayhead] = useState<number>(18);

  // Intake selection state
  const [selectedStroke, setSelectedStroke] = useState<StrokeType>(initialStroke);
  const [isGeneralReview, setIsGeneralReview] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');

  // Selected duration calculation
  const currentDurationSec = Math.max(1, trimEnd - trimStart);
  const formattedDuration = `00:${currentDurationSec.toString().padStart(2, '0')}`;

  // Stroke options matching the reference
  const strokeOptions: { id: StrokeType; ruTitle: string; enTitle: string; defaultFocus: string }[] = [
    { id: 'forehand', ruTitle: 'Форхенд', enTitle: 'Forehand', defaultFocus: 'Точка контакта и хлыст предплечья' },
    { id: 'backhand', ruTitle: 'Бэкхенд', enTitle: 'Backhand', defaultFocus: 'Выход головки ракетки и плечевой упор' },
    { id: 'serve', ruTitle: 'Подача', enTitle: 'Serve', defaultFocus: 'Позиция трофи и подброс' },
    { id: 'net', ruTitle: 'Волей', enTitle: 'Volley', defaultFocus: 'Компактный замах и жесткость кисти' },
    { id: 'footwork', ruTitle: 'Ноги', enTitle: 'Footwork', defaultFocus: 'Сплит-степ и боковое торможение' },
    { id: 'rally', ruTitle: 'Розыгрыш', enTitle: 'Rally', defaultFocus: 'Удержание глубины и тайминг перестроения' },
  ];

  // Simulated playback loop for the trimmer preview
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlayhead(prev => {
          if (prev >= trimEnd) return trimStart;
          return prev + 1;
        });
      }, 500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, trimStart, trimEnd]);

  // Submit action
  const handleFinalSubmit = () => {
    const chosenStrokeObj = strokeOptions.find(s => s.id === selectedStroke);
    const chosenFocus = isGeneralReview
      ? (isRu ? 'Общий технический баланс и розыгрыш' : 'Overall tactical and technical balance')
      : (chosenStrokeObj?.defaultFocus || 'Техника удара');

    onSubmit({
      stroke: selectedStroke,
      focusArea: chosenFocus,
      sessionNote: comment.trim() || (isRu ? 'Рабочий дубль тренировочной сессии.' : 'Training clip session record.'),
      source: 'camera',
      isGeneralReview,
      trimDuration: formattedDuration,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Container simulating mobile screen */}
      <div
        className={`w-full max-w-md h-full sm:h-[92vh] sm:rounded-[36px] overflow-hidden flex flex-col justify-between shadow-2xl relative select-none ${
          isDark ? 'bg-[#0A101D] text-white' : 'bg-slate-50 text-slate-900'
        }`}
      >
        {/* ========================================================================= */}
        {/* SCREEN 1: ОБРЕЗКА (Trim video & framing)                                */}
        {/* ========================================================================= */}
        {subStep === 'trim' && (
          <div className="flex flex-col h-full justify-between p-5 pb-6">
            {/* Top Bar */}
            <div className="flex items-center justify-between pt-1 pb-3">
              <button
                type="button"
                onClick={onClose}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                  isDark
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <h1 className="text-base font-bold tracking-tight">
                {isRu ? 'Обрезка' : 'Trim'}
              </h1>

              <button
                type="button"
                onClick={() => setSubStep('intake')}
                className="text-xs font-semibold px-2 py-1 text-slate-400 hover:text-white transition-colors"
              >
                {isRu ? 'Готово' : 'Done'}
              </button>
            </div>

            {/* Middle: Video Canvas with 3x3 Crop Grid & Brand Neon Corner Brackets */}
            <div className="flex-1 flex flex-col items-center justify-center my-2">
              <div
                className={`w-full max-w-[340px] aspect-square rounded-[24px] relative overflow-hidden border flex items-center justify-center shadow-lg ${
                  isDark
                    ? 'bg-[#12231A] border-white/10'
                    : 'bg-[#1F3A2B] border-slate-300'
                }`}
              >
                {/* Court lines visual background */}
                <div className="absolute inset-0 opacity-25 pointer-events-none">
                  <div className="w-full h-full border-2 border-white/40 m-auto" />
                  <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/40" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/40" />
                </div>

                {/* 3x3 Rule-of-Thirds Grid */}
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                  <div className="border-r border-b border-white/[0.12]" />
                  <div className="border-r border-b border-white/[0.12]" />
                  <div className="border-b border-white/[0.12]" />
                  <div className="border-r border-b border-white/[0.12]" />
                  <div className="border-r border-b border-white/[0.12]" />
                  <div className="border-b border-white/[0.12]" />
                  <div className="border-r border-white/[0.12]" />
                  <div className="border-r border-white/[0.12]" />
                  <div />
                </div>

                {/* Neon Tennis Corner Brackets (Exact UX from Screenshot) */}
                {/* Top-Left */}
                <div
                  className="absolute top-6 left-6 w-5 h-5 border-t-[3px] border-l-[3px] rounded-tl-[4px]"
                  style={{ borderColor: isDark ? '#D2FF1F' : '#84CC16' }}
                />
                {/* Top-Right */}
                <div
                  className="absolute top-6 right-6 w-5 h-5 border-t-[3px] border-r-[3px] rounded-tr-[4px]"
                  style={{ borderColor: isDark ? '#D2FF1F' : '#84CC16' }}
                />
                {/* Bottom-Left */}
                <div
                  className="absolute bottom-6 left-6 w-5 h-5 border-b-[3px] border-l-[3px] rounded-bl-[4px]"
                  style={{ borderColor: isDark ? '#D2FF1F' : '#84CC16' }}
                />
                {/* Bottom-Right */}
                <div
                  className="absolute bottom-6 right-6 w-5 h-5 border-b-[3px] border-r-[3px] rounded-br-[4px]"
                  style={{ borderColor: isDark ? '#D2FF1F' : '#84CC16' }}
                />

                {/* Simulated Player Silhouette & Play/Pause Button */}
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="z-10 w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white active:scale-95 transition-transform"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-0.5" />
                  )}
                </button>

                {/* Angle Overlay watermark badge */}
                <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-mono text-white/80">
                  4K 60fps • Angle: 45° Rear
                </div>
              </div>

              {/* Clip duration guidance text matching screenshot */}
              <div className="mt-3 text-center">
                <p className="text-xs text-slate-400">
                  {isRu ? (
                    <>
                      Клип до <span className="font-semibold text-white">60 сек</span>, идеально —{' '}
                      <span className="font-semibold text-white">10–30 сек.</span>
                    </>
                  ) : (
                    <>
                      Clip up to <span className="font-semibold text-white">60 sec</span>, recommended —{' '}
                      <span className="font-semibold text-white">10–30 sec.</span>
                    </>
                  )}
                </p>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  {isRu ? 'Сейчас:' : 'Current:'}{' '}
                  <span className="font-bold text-white">{formattedDuration}</span>
                </p>
              </div>

              {/* Trimmer Bar with Audio/Video Waveform and Neon Lime Drag Handles */}
              <div className="w-full max-w-[340px] mt-4 relative">
                <div
                  className={`w-full h-12 rounded-2xl relative flex items-center px-1 overflow-hidden border ${
                    isDark
                      ? 'bg-[#0E1726] border-white/10'
                      : 'bg-slate-200 border-slate-300'
                  }`}
                >
                  {/* Waveform bars */}
                  <div className="absolute inset-0 flex items-center justify-around px-2 pointer-events-none opacity-40">
                    {[16, 24, 32, 14, 28, 36, 20, 15, 30, 22, 18, 34, 26, 12, 28, 30, 24, 18, 22, 32, 15].map(
                      (h, idx) => (
                        <div
                          key={idx}
                          className="w-[2.5px] rounded-full bg-slate-400"
                          style={{ height: `${h}px` }}
                        />
                      )
                    )}
                  </div>

                  {/* Active Selected Region Highlight */}
                  <div
                    className="absolute top-0 bottom-0 border-y-2 pointer-events-none"
                    style={{
                      left: `${(trimStart / totalDuration) * 100}%`,
                      width: `${((trimEnd - trimStart) / totalDuration) * 100}%`,
                      borderColor: isDark ? '#D2FF1F' : '#84CC16',
                      backgroundColor: isDark ? 'rgba(210, 255, 31, 0.08)' : 'rgba(132, 204, 22, 0.1)',
                    }}
                  />

                  {/* Left Trimmer Handle (Lime Vertical Pill) */}
                  <div
                    className="absolute top-1 bottom-1 w-3 rounded-full cursor-ew-resize flex items-center justify-center z-20 shadow-md"
                    style={{
                      left: `calc(${(trimStart / totalDuration) * 100}% - 6px)`,
                      backgroundColor: isDark ? '#D2FF1F' : '#84CC16',
                    }}
                    onClick={() => setTrimStart(Math.max(0, trimStart - 2))}
                  >
                    <div className="w-[1px] h-3 bg-black/60 rounded-full" />
                  </div>

                  {/* Right Trimmer Handle (Lime Vertical Pill) */}
                  <div
                    className="absolute top-1 bottom-1 w-3 rounded-full cursor-ew-resize flex items-center justify-center z-20 shadow-md"
                    style={{
                      left: `calc(${(trimEnd / totalDuration) * 100}% - 6px)`,
                      backgroundColor: isDark ? '#D2FF1F' : '#84CC16',
                    }}
                    onClick={() => setTrimEnd(Math.min(totalDuration, trimEnd + 2))}
                  >
                    <div className="w-[1px] h-3 bg-black/60 rounded-full" />
                  </div>

                  {/* Playhead indicator */}
                  {isPlaying && (
                    <div
                      className="absolute top-0 bottom-0 w-[2px] bg-white z-15 pointer-events-none transition-all duration-300 shadow-xs"
                      style={{ left: `${(playhead / totalDuration) * 100}%` }}
                    />
                  )}
                </div>

                {/* Helper hint for handles */}
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono mt-1 px-1">
                  <span>00:00</span>
                  <span>00:30</span>
                  <span>01:00</span>
                </div>
              </div>
            </div>

            {/* Bottom CTA: «Продолжить» in Signature Tennis Lime */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSubStep('intake')}
                className="w-full h-13 rounded-2xl font-bold text-sm tracking-wide flex items-center justify-center shadow-lg active:scale-[0.99] transition-all text-slate-950"
                style={{
                  backgroundColor: isDark ? '#D2FF1F' : '#84CC16',
                }}
              >
                {isRu ? 'Продолжить' : 'Continue'}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCREEN 2: ИНТЕЙК (Segment clarification & notes)                        */}
        {/* ========================================================================= */}
        {subStep === 'intake' && (
          <div className="flex flex-col h-full justify-between p-5 pb-6 overflow-y-auto no-scrollbar">
            {/* Top Bar with Back Button */}
            <div className="flex items-center justify-between pt-1 pb-2">
              <button
                type="button"
                onClick={() => setSubStep('trim')}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                  isDark
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <h1 className="text-base font-bold tracking-tight">
                {isRu ? 'Интейк' : 'Intake'}
              </h1>

              <div className="w-9" />
            </div>

            <div className="space-y-4 my-auto">
              {/* Section 1: Что на видео? */}
              <div>
                <label className="text-xs font-semibold block mb-2 text-slate-400">
                  {isRu ? 'Что на видео?' : 'What is in the video?'}
                </label>

                {/* 2x3 Grid of Stroke Options */}
                <div className="grid grid-cols-2 gap-2.5">
                  {strokeOptions.map(opt => {
                    const isSelected = !isGeneralReview && selectedStroke === opt.id;

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setSelectedStroke(opt.id);
                          setIsGeneralReview(false);
                        }}
                        className={`p-3 rounded-2xl text-left border flex items-center justify-between transition-all active:scale-[0.98] min-h-[52px] ${
                          isSelected
                            ? isDark
                              ? 'border-[#D2FF1F] bg-[#13221A] text-white shadow-xs'
                              : 'border-[#65A30D] bg-lime-50 text-slate-950 shadow-xs'
                            : isDark
                            ? 'border-white/[0.08] bg-[#0E1726]/80 text-slate-300 hover:border-white/20'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                        style={{
                          borderColor: isSelected ? (isDark ? '#D2FF1F' : '#65A30D') : undefined,
                        }}
                      >
                        <span className="text-xs font-bold leading-none">
                          {isRu ? opt.ruTitle : opt.enTitle}
                        </span>

                        {/* Selection radio / checkbox pill */}
                        <div
                          className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all ${
                            isSelected
                              ? isDark
                                ? 'bg-[#D2FF1F] text-slate-950'
                                : 'bg-[#65A30D] text-white'
                              : isDark
                              ? 'border border-white/20 bg-black/20'
                              : 'border border-slate-300 bg-slate-100'
                          }`}
                        >
                          {isSelected && <div className="w-2.5 h-2.5 rounded-sm bg-current" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Toggle Card: «Общий обзор без сегмента» */}
                <div
                  className={`mt-2.5 p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                    isDark
                      ? 'bg-[#0E1726]/80 border-white/[0.08]'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="pr-3">
                    <span
                      className={`text-xs font-bold block ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {isRu ? 'Общий обзор без сегмента' : 'General overview without segment'}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {isRu ? 'Если это не один конкретный удар' : 'If this is not a single specific stroke'}
                    </span>
                  </div>

                  {/* iOS Style Toggle Switch */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isGeneralReview}
                    onClick={() => setIsGeneralReview(!isGeneralReview)}
                    className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out relative flex items-center ${
                      isGeneralReview
                        ? isDark
                          ? 'bg-[#D2FF1F]'
                          : 'bg-[#65A30D]'
                        : isDark
                        ? 'bg-white/15'
                        : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                        isGeneralReview
                          ? 'translate-x-5 bg-black'
                          : 'translate-x-0 bg-white'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Section 2: Комментарий (необязательно) */}
              <div>
                <label className="text-xs font-semibold block mb-2 text-slate-400">
                  {isRu ? 'Комментарий (необязательно)' : 'Comment (optional)'}
                </label>

                <textarea
                  rows={3}
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder={
                    isRu
                      ? 'Снимал против подкрученной подачи, обычно не успеваю с разворотом...'
                      : 'Filmed against heavy topspin, struggled with shoulder turn...'
                  }
                  className={`w-full p-3.5 rounded-2xl text-xs outline-none border resize-none transition-all ${
                    isDark
                      ? 'bg-[#0E1726]/90 border-white/10 text-white placeholder-slate-500 focus:border-[#D2FF1F]/50'
                      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-slate-400'
                  }`}
                />
              </div>

              {/* AI Autonomous Detection Guidance Card (Exact copy from UX screenshot) */}
              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed border ${
                  isDark
                    ? 'bg-[#0E1726]/50 border-white/[0.06] text-slate-400'
                    : 'bg-slate-100 border-slate-200 text-slate-600'
                }`}
              >
                {isRu
                  ? 'Если ИИ увидит на кадре другой удар, чем отмечено здесь — разбор построится по факту, а не по выбору.'
                  : 'If AI detects a different stroke in the frame than marked here — the analysis will adapt to reality, not the label.'}
              </div>
            </div>

            {/* Bottom CTA: «Отправить на разбор» */}
            <div className="pt-3">
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="w-full h-13 rounded-2xl font-bold text-sm tracking-wide flex items-center justify-center shadow-lg active:scale-[0.99] transition-all text-slate-950"
                style={{
                  backgroundColor: isDark ? '#D2FF1F' : '#84CC16',
                }}
              >
                {isRu ? 'Отправить на разбор' : 'Submit for analysis'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
