import React, { useState } from 'react';
import { StrokeType, IntakeSubmission } from '../../types';
import { Camera, Image as ImageIcon, X, ChevronRight, Check } from 'lucide-react';

interface IntakeModalProps {
  initialStroke?: StrokeType;
  theme?: 'light' | 'dark';
  onClose: () => void;
  onSubmit: (submission: IntakeSubmission) => void;
}

export const IntakeModal: React.FC<IntakeModalProps> = ({
  initialStroke = 'forehand',
  theme = 'dark',
  onClose,
  onSubmit,
}) => {
  const isDark = theme === 'dark';

  // Step state: 0 = Action Sheet (Camera/Photos), 1 = Stroke, 2 = Focus Area, 3 = Session Note
  const [step, setStep] = useState<number>(0);
  const [source, setSource] = useState<'camera' | 'photos'>('camera');
  const [selectedStroke, setSelectedStroke] = useState<StrokeType>(initialStroke);
  const [focusArea, setFocusArea] = useState<string>('Contact point & wrist lag');
  const [sessionNote, setSessionNote] = useState<string>('');

  const handleSelectSource = (src: 'camera' | 'photos') => {
    setSource(src);
    setStep(1);
  };

  const handleSubmitFinal = () => {
    onSubmit({
      stroke: selectedStroke,
      focusArea,
      sessionNote: sessionNote.trim() || 'Standard technical calibration capture.',
      source,
    });
  };

  const strokeOptions: { id: StrokeType; title: string; subtitle: string }[] = [
    { id: 'forehand', title: 'Forehand Drive', subtitle: 'Topspin / Flat drive' },
    { id: 'backhand', title: 'Backhand', subtitle: 'Two-handed / One-handed' },
    { id: 'serve', title: 'Serve & Kick', subtitle: 'Trophy apex & toss' },
    { id: 'net', title: 'Net Play & Volley', subtitle: 'Punch volley & reflex' },
    { id: 'footwork', title: 'Footwork & Split', subtitle: 'Lateral deceleration' },
    { id: 'rally', title: 'Live Rally', subtitle: 'Continuous depth pattern' },
  ];

  const focusOptions = [
    'Contact point forward & wrist lag',
    'Torso-pelvis separation (Shoulder coil)',
    'Low-to-high swing path finish',
    'Split-step timing on opponent contact',
    'Trophy position & elbow height',
    'Open-stance ground reaction force',
  ];

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* iOS Action Sheet / Modal Surface */}
      <div
        className={`w-full max-h-[90%] rounded-t-[32px] p-5 pb-8 border-t flex flex-col justify-between shadow-2xl transition-all ${
          isDark
            ? 'bg-[#0E1524] border-white/10 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Grabber Handle & Close Header */}
        <div className="flex items-center justify-between pb-2 select-none">
          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] font-mono tracking-widest uppercase ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {step === 0 ? 'Video Source' : `Step ${step} of 3`}
            </span>
          </div>

          <button
            id="btn-close-intake"
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

        {/* STEP 0: Action Sheet — Camera vs Photos («Диалог Камера / Медиатека») */}
        {step === 0 && (
          <div className="py-3 space-y-3">
            <div className="mb-2">
              <h2 className="text-lg font-bold tracking-tight">Select Video</h2>
              <p
                className={`text-xs mt-0.5 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                1 stroke repetition • Standard video (3–5s)
              </p>
            </div>

            <button
              id="intake-source-camera"
              type="button"
              onClick={() => handleSelectSource('camera')}
              className={`w-full h-14 rounded-[18px] border flex items-center gap-3.5 px-4 font-semibold text-sm transition-all active:scale-[0.99] ${
                isDark
                  ? 'bg-[#121B2D] border-white/10 text-white hover:border-blue-500/40'
                  : 'bg-slate-50 border-slate-200 text-slate-900 hover:border-blue-300'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                }`}
              >
                <Camera className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block leading-tight">Camera (Record New)</span>
                <span
                  className={`text-[11px] font-normal ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  Direct court video capture
                </span>
              </div>
            </button>

            <button
              id="intake-source-photos"
              type="button"
              onClick={() => handleSelectSource('photos')}
              className={`w-full h-14 rounded-[18px] border flex items-center gap-3.5 px-4 font-semibold text-sm transition-all active:scale-[0.99] ${
                isDark
                  ? 'bg-[#121B2D] border-white/10 text-white hover:border-blue-500/40'
                  : 'bg-slate-50 border-slate-200 text-slate-900 hover:border-blue-300'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                }`}
              >
                <ImageIcon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block leading-tight">Photo Library</span>
                <span
                  className={`text-[11px] font-normal ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  Choose existing clip from on-device storage
                </span>
              </div>
            </button>
          </div>
        )}

        {/* STEP 1: Stroke Selection («Удар») */}
        {step === 1 && (
          <div className="py-2 space-y-3">
            <div>
              <h2 className="text-lg font-bold tracking-tight">1. Select Stroke</h2>
              <p
                className={`text-xs mt-0.5 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Which technical pillar does this clip capture?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-[260px] overflow-y-auto no-scrollbar">
              {strokeOptions.map(opt => {
                const isSelected = selectedStroke === opt.id;
                return (
                  <button
                    key={opt.id}
                    id={`select-stroke-${opt.id}`}
                    type="button"
                    onClick={() => setSelectedStroke(opt.id)}
                    className={`p-3 rounded-[16px] border text-left transition-all ${
                      isSelected
                        ? isDark
                          ? 'bg-blue-600/30 border-blue-500 text-white shadow-xs'
                          : 'bg-blue-50 border-blue-600 text-blue-900'
                        : isDark
                        ? 'bg-[#101728] border-white/5 text-slate-300'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="text-xs font-semibold block leading-tight">
                      {opt.title}
                    </span>
                    <span
                      className={`text-[10px] mt-0.5 block ${
                        isSelected
                          ? isDark
                            ? 'text-blue-200'
                            : 'text-blue-700'
                          : isDark
                          ? 'text-slate-500'
                          : 'text-slate-400'
                      }`}
                    >
                      {opt.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              id="btn-intake-to-step-2"
              type="button"
              onClick={() => setStep(2)}
              className={`w-full h-11 rounded-[16px] flex items-center justify-center gap-1.5 font-semibold text-xs transition-all active:scale-98 ${
                isDark
                  ? 'bg-blue-600 text-white hover:bg-blue-500'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <span>Next: Focus Area</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* STEP 2: What to Look At («На что смотреть») */}
        {step === 2 && (
          <div className="py-2 space-y-3">
            <div>
              <h2 className="text-lg font-bold tracking-tight">2. Technique Focus</h2>
              <p
                className={`text-xs mt-0.5 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Direct AI kinematic focus to a specific mechanical milestone
              </p>
            </div>

            <div className="space-y-1.5 max-h-[250px] overflow-y-auto no-scrollbar">
              {focusOptions.map(opt => {
                const isSelected = focusArea === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFocusArea(opt)}
                    className={`w-full p-2.5 rounded-[14px] border text-left text-xs font-medium flex items-center justify-between transition-all ${
                      isSelected
                        ? isDark
                          ? 'bg-blue-600/25 border-blue-500 text-white'
                          : 'bg-blue-50 border-blue-600 text-blue-900'
                        : isDark
                        ? 'bg-[#101728] border-white/5 text-slate-300'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-400" />}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className={`h-11 px-4 rounded-[16px] border text-xs font-semibold ${
                  isDark ? 'border-white/10 text-slate-300' : 'border-slate-200 text-slate-700'
                }`}
              >
                Back
              </button>
              <button
                id="btn-intake-to-step-3"
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 h-11 rounded-[16px] bg-blue-600 text-white font-semibold text-xs flex items-center justify-center gap-1.5"
              >
                <span>Next: Comment</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Context Comment («Комментарий») */}
        {step === 3 && (
          <div className="py-2 space-y-3">
            <div>
              <h2 className="text-lg font-bold tracking-tight">3. Session Note</h2>
              <p
                className={`text-xs mt-0.5 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Optional match or training context for supervisor review
              </p>
            </div>

            <div>
              <textarea
                id="intake-comment-textarea"
                rows={3}
                value={sessionNote}
                onChange={e => setSessionNote(e.target.value)}
                placeholder="e.g. Trying to sustain depth against heavy crosscourt top-spin on slow court..."
                className={`w-full p-3 rounded-[16px] text-xs outline-none border resize-none transition-all ${
                  isDark
                    ? 'bg-[#101728] border-white/10 text-white placeholder-slate-500 focus:border-blue-500'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-600'
                }`}
              />
            </div>

            {/* Submission Telemetry Summary */}
            <div
              className={`p-3 rounded-[16px] text-[11px] font-mono border space-y-1 ${
                isDark
                  ? 'bg-black/40 border-white/5 text-slate-400'
                  : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}
            >
              <div className="flex justify-between">
                <span>Stroke:</span>
                <span className="text-white font-sans uppercase font-medium">{selectedStroke}</span>
              </div>
              <div className="flex justify-between">
                <span>Focus:</span>
                <span className="text-blue-300 font-sans truncate max-w-[180px]">{focusArea}</span>
              </div>
              <div className="flex justify-between">
                <span>Storage:</span>
                <span className="text-emerald-400 font-sans">On-Device Local Sandbox</span>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setStep(2)}
                className={`h-11 px-4 rounded-[16px] border text-xs font-semibold ${
                  isDark ? 'border-white/10 text-slate-300' : 'border-slate-200 text-slate-700'
                }`}
              >
                Back
              </button>
              <button
                id="btn-submit-intake-final"
                type="button"
                onClick={handleSubmitFinal}
                className={`flex-1 h-11 rounded-[16px] font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.99] border shadow-xs ${
                  isDark
                    ? 'bg-[#0E2752] border-blue-500/40 text-white hover:bg-[#123166]'
                    : 'bg-[#1D4ED8] border-blue-600 text-white hover:bg-[#1E40AF]'
                }`}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: isDark ? '#D2FF1F' : '#D4FF00' }}
                />
                <span>Submit for AI Analysis</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
