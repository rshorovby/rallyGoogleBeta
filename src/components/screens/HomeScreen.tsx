import React from 'react';
import { PlayerProfile, StrokeSegmentData, StrokeType } from '../../types';
import { CoverageRing } from '../common/CoverageRing';
import { Send, ChevronRight, Video, AlertCircle, Sparkles } from 'lucide-react';

interface HomeScreenProps {
  profile: PlayerProfile;
  segments: StrokeSegmentData[];
  theme?: 'light' | 'dark';
  onSelectSegment: (id: StrokeType) => void;
  onOpenIntake: () => void;
  onOpenTelegram: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  profile,
  segments,
  theme = 'dark',
  onSelectSegment,
  onOpenIntake,
  onOpenTelegram,
}) => {
  const isDark = theme === 'dark';
  const isZeroState = profile.overallCoverage === 0;

  // Find the primary recommended stroke to film next
  const lowestSegment = segments.reduce((min, cur) =>
    cur.coveragePercent < min.coveragePercent ? cur : min
  );

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar pb-24 px-5 pt-3">
      {/* 1. Header: Who We Are & Player Context */}
      <header className="flex items-center justify-between py-2 mb-3 select-none">
        <div>
          <div className="flex items-center gap-1.5">
            <span
              className={`text-[12px] font-semibold uppercase tracking-wider ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Player Dossier
            </span>
            <span className="w-1 h-1 rounded-full bg-blue-500" />
            <span
              className={`text-[12px] font-medium ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {profile.hand.split('-')[0]}
            </span>
          </div>
          <h1
            className={`text-xl font-semibold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {profile.name}
          </h1>
        </div>

        {/* Telegram Sync Pill (if not linked) */}
        {!profile.telegramLinked && (
          <button
            id="btn-link-telegram-banner"
            type="button"
            onClick={onOpenTelegram}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-tight border transition-all active:scale-95 ${
              isDark
                ? 'bg-blue-600/15 border-blue-500/30 text-blue-400 hover:bg-blue-600/20'
                : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Link Telegram</span>
          </button>
        )}
      </header>

      {/* 2. Primary CTA: Send Video («Отправить видео») */}
      <div className="mb-4">
        <button
          id="btn-send-video-main"
          type="button"
          onClick={onOpenIntake}
          className={`w-full h-[50px] rounded-[16px] flex items-center justify-between px-4 transition-all duration-150 active:scale-[0.99] border shadow-sm ${
            isDark
              ? 'bg-[#0E2752] border-blue-500/40 text-white hover:bg-[#123166]'
              : 'bg-[#1D4ED8] border-blue-600 text-white hover:bg-[#1E40AF]'
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Optic Yellow Recording Accent Glyphic indicator */}
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: isDark ? '#D2FF1F' : '#D4FF00' }}
              />
            </div>
            <div className="text-left">
              <span className="text-[15px] font-semibold tracking-tight block leading-tight">
                Submit Video
              </span>
              <span className="text-[11px] text-blue-200 font-normal">
                Single clip • 120/240 fps slow-mo
              </span>
            </div>
          </div>
          <Send className="w-4 h-4 text-blue-200" />
        </button>
      </div>

      {/* 3. Master Dossier & Coverage Card (Карточка досье / изученности) */}
      {/* Answers immediately: Насколько я изучен и что снять дальше */}
      <section
        aria-label="Technique Coverage Dossier"
        className={`rounded-[22px] p-4 mb-4 border transition-all ${
          isDark
            ? 'bg-[#0F1626]/90 border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
            : 'bg-white border-slate-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.06)]'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 pr-3">
            <div className="flex items-center gap-2">
              <span
                className={`text-[11px] font-semibold uppercase tracking-wider ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Technique Coverage
              </span>
            </div>
            <div className="mt-1">
              <span
                className={`text-2xl font-bold tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {profile.overallCoverage}% Mapped
              </span>
            </div>
            <p
              className={`text-xs mt-1.5 leading-relaxed ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {isZeroState
                ? 'No strokes recorded yet. Film your first forehand to establish biomechanical baseline.'
                : '14 biomechanical slots verified. Supervisor locked 5 technical anchors.'}
            </p>
          </div>

          <CoverageRing
            percentage={profile.overallCoverage}
            size={96}
            strokeWidth={8}
            theme={theme}
          />
        </div>

        {/* Immediate Answer: What to film next */}
        <div
          className={`mt-3.5 pt-3 border-t flex items-start gap-2.5 ${
            isDark ? 'border-white/[0.07]' : 'border-slate-100'
          }`}
        >
          <div
            className="w-2 h-2 rounded-full mt-1 flex-shrink-0"
            style={{ backgroundColor: isDark ? '#D2FF1F' : '#9FD600' }}
          />
          <div>
            <span
              className={`text-[11px] font-semibold uppercase tracking-wider block ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              What to record next
            </span>
            <span
              className={`text-xs font-medium leading-snug block mt-0.5 ${
                isDark ? 'text-slate-200' : 'text-slate-800'
              }`}
            >
              {lowestSegment.title}: {lowestSegment.whatToFilmNext}
            </span>
          </div>
        </div>
      </section>

      {/* 4. Six Stroke Segments (Шесть сегментов) */}
      <section className="mb-4">
        <div className="flex items-center justify-between mb-2 px-1">
          <h2
            className={`text-xs font-semibold uppercase tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Stroke Segments (6)
          </h2>
          <span
            className={`text-[11px] font-mono ${
              isDark ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            HIG Geometric Model
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {segments.map(segment => {
            const isTarget = segment.id === lowestSegment.id;

            return (
              <button
                key={segment.id}
                id={`segment-card-${segment.id}`}
                type="button"
                onClick={() => onSelectSegment(segment.id)}
                className={`p-3 rounded-[18px] text-left border transition-all active:scale-[0.98] flex flex-col justify-between h-[106px] ${
                  isDark
                    ? 'bg-[#101728]/90 border-white/[0.07] hover:border-blue-500/40'
                    : 'bg-white border-slate-200 hover:border-blue-300 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between w-full">
                  <div>
                    <span
                      className={`text-[10px] font-medium uppercase tracking-wider block ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {segment.russianTitle}
                    </span>
                    <span
                      className={`text-sm font-semibold tracking-tight block ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {segment.title.split(' ')[0]}
                    </span>
                  </div>
                  {isTarget && (
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: isDark ? '#D2FF1F' : '#9FD600' }}
                      title="Recommended next stroke"
                    />
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span
                      className={`font-semibold tabular-nums ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      {segment.coveragePercent}%
                    </span>
                    <span
                      className={`text-[10px] ${
                        isDark ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      {segment.anchoredSlots}/{segment.totalSlots} locked
                    </span>
                  </div>

                  {/* Segment mini progress bar */}
                  <div
                    className={`w-full h-1.5 rounded-full overflow-hidden ${
                      isDark ? 'bg-white/10' : 'bg-slate-100'
                    }`}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${segment.coveragePercent}%`,
                        backgroundColor: isDark ? '#2563EB' : '#1D4ED8',
                      }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. Short Filming Guide Tip (Короткая подсказка как снимать) */}
      <section
        className={`p-3.5 rounded-[18px] border flex items-center gap-3 ${
          isDark
            ? 'bg-[#0B111E] border-white/[0.06] text-slate-300'
            : 'bg-slate-50 border-slate-200/80 text-slate-700'
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isDark ? 'bg-blue-500/15 text-blue-400' : 'bg-blue-100 text-blue-700'
          }`}
        >
          <Video className="w-4 h-4" />
        </div>
        <div className="flex-1 text-left">
          <span
            className={`text-xs font-semibold block ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            How to Film for 1-Clip Analysis
          </span>
          <p
            className={`text-[11px] leading-tight mt-0.5 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Mount phone 45° behind baseline at hip height. Film at 120 or 240 fps slow-mo.
          </p>
        </div>
        <ChevronRight
          className={`w-4 h-4 flex-shrink-0 ${
            isDark ? 'text-slate-600' : 'text-slate-400'
          }`}
        />
      </section>
    </div>
  );
};
