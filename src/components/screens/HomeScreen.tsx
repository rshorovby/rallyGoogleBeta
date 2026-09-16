import React, { useState } from 'react';
import {
  PlayerProfile,
  StrokeSegmentData,
  StrokeType,
  AnalysisRecord,
  AppLanguage,
} from '../../types';
import {
  Send,
  Video,
  ChevronRight,
  Sparkles,
  Flame,
  ShieldCheck,
  Camera,
  TrendingUp,
  ScanEye,
  Clock,
  HelpCircle,
} from 'lucide-react';
import { SubmissionTicket } from '../../types';

interface HomeScreenProps {
  profile: PlayerProfile;
  segments: StrokeSegmentData[];
  theme?: 'light' | 'dark';
  language?: AppLanguage;
  latestAnalysis?: AnalysisRecord;
  activeSubmission?: SubmissionTicket | null;
  onSelectSegment: (id: StrokeType) => void;
  onOpenIntake: (stroke?: StrokeType) => void;
  onOpenSubmissionStatus?: () => void;
  onOpenTelegram: () => void;
  onOpenProfile?: () => void;
  onSelectAnalysis?: (record: AnalysisRecord) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  profile,
  segments,
  theme = 'dark',
  language = 'ru',
  latestAnalysis,
  activeSubmission,
  onSelectSegment,
  onOpenIntake,
  onOpenSubmissionStatus,
  onOpenTelegram,
  onOpenProfile,
  onSelectAnalysis,
}) => {
  const isDark = theme === 'dark';
  const isRu = language !== 'en';
  const isZeroState = profile.overallCoverage === 0 || profile.totalAnalyses === 0;

  // Active stroke tab for the unified Focus card
  const [activeSegmentTab, setActiveSegmentTab] = useState<StrokeType>('forehand');
  const [showScalesExplainer, setShowScalesExplainer] = useState<boolean>(false);

  // Active segment data
  const currentTabSegment =
    segments.find(s => s.id === activeSegmentTab) || segments[0];

  // 1. Шкала прогресса игрока (средний балл всех оцененных ударов)
  const allScoredSlots = segments.flatMap(s => s.slots).filter(sl => sl.score !== undefined);
  const averageMasteryScore =
    allScoredSlots.length > 0
      ? allScoredSlots.reduce((acc, sl) => acc + (sl.score || 0), 0) / allScoredSlots.length
      : 0;
  const playerProgressPercent = isZeroState ? 0 : Math.round(averageMasteryScore * 10);
  const playerProgressScoreStr = isZeroState ? '—' : averageMasteryScore.toFixed(1);

  // 2. Шкала изученности техники (охват ракурсов и качество базы)
  const totalAnglesCovered = segments.reduce(
    (acc, s) => acc + (s.anglesCoveredCount || (s.coveragePercent > 0 ? 1 : 0)),
    0
  );
  const totalPossibleAngles = 6 * 4; // 24 ракурса для полной 3D-оцифровки
  const techniqueFamiliarityPercent = isZeroState
    ? 0
    : Math.min(100, Math.round((totalAnglesCovered / totalPossibleAngles) * 100));

  // Segment average score helper
  const getSegmentAverageScore = (seg: StrokeSegmentData) => {
    const scored = seg.slots.filter(s => s.score !== undefined);
    if (scored.length === 0) return null;
    const avg = scored.reduce((sum, s) => sum + (s.score || 0), 0) / scored.length;
    return avg.toFixed(1);
  };

  // Level label
  const getLevelLabel = () => {
    if (isZeroState) return isRu ? 'Калибровка уровня' : 'Calibration';
    switch (profile.level) {
      case 'competitive':
        return 'NTRP 4.5+';
      case 'advanced':
        return 'NTRP 4.0';
      case 'beginner':
        return 'NTRP 2.5';
      case 'recreational':
      default:
        return 'NTRP 3.5';
    }
  };

  // =========================================================
  // 1. КОМПАКТНЫЙ СТРИП ДВУХ ШКАЛ (ПРОГРЕСС + ИЗУЧЕННОСТЬ)
  // =========================================================
  const renderCleanDualScales = () => (
    <div
      className={`rounded-2xl p-3.5 mb-4 border transition-all ${
        isDark
          ? 'bg-[#0E1726]/90 border-white/[0.08]'
          : 'bg-white border-slate-200/90 shadow-xs'
      }`}
    >
      <div className="flex items-center justify-between mb-2.5">
        <span
          className={`text-[11px] font-bold uppercase tracking-wider ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {isRu ? 'Ключевые шкалы' : 'Core Metrics'}
        </span>
        <button
          type="button"
          onClick={() => setShowScalesExplainer(!showScalesExplainer)}
          className={`flex items-center gap-1 text-[11px] font-medium transition-colors ${
            isDark
              ? 'text-blue-400 hover:text-blue-300'
              : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{isRu ? 'О шкалах' : 'About'}</span>
        </button>
      </div>

      {showScalesExplainer && (
        <div
          className={`p-3 rounded-xl mb-3 text-xs leading-relaxed border animate-in fade-in duration-150 ${
            isDark
              ? 'bg-blue-950/40 border-blue-500/25 text-slate-300'
              : 'bg-blue-50/70 border-blue-200 text-slate-700'
          }`}
        >
          <p className="mb-1">
            <strong className="text-blue-400 font-semibold">1. Прогресс:</strong>{' '}
            {isRu
              ? 'Средняя оценка техники по всем 6 ударам (0–10 баллов).'
              : 'Average technique score across all strokes (0–10).'}
          </p>
          <p>
            <strong className="text-emerald-400 font-semibold">2. Изученность:</strong>{' '}
            {isRu
              ? 'Количество ракурсов съемки. Чем больше разных углов, тем точнее разбор ИИ и тренера.'
              : 'Multi-angle camera coverage. Varied angles provide deeper AI analysis.'}
          </p>
        </div>
      )}

      {/* 2 Минималистичные шкалы в 2 колонки на экранах */}
      <div className="grid grid-cols-2 gap-3">
        {/* Scale 1: Прогресс техники */}
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
                {isRu ? 'Прогресс' : 'Progress'}
              </span>
            </div>
            <span
              className={`font-mono text-xs font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {isZeroState ? '0%' : `${playerProgressScoreStr} ★`}
            </span>
          </div>
          <div
            className={`w-full h-1.5 rounded-full overflow-hidden ${
              isDark ? 'bg-white/10' : 'bg-slate-200'
            }`}
          >
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-500"
              style={{ width: `${Math.max(playerProgressPercent, 3)}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] mt-1 text-slate-400">
            <span>{isZeroState ? (isRu ? 'Старт' : 'Start') : `${playerProgressPercent}%`}</span>
            <span>{getLevelLabel()}</span>
          </div>
        </div>

        {/* Scale 2: Изученность техники */}
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
              {isZeroState ? '0%' : `${techniqueFamiliarityPercent}%`}
            </span>
          </div>
          <div
            className={`w-full h-1.5 rounded-full overflow-hidden ${
              isDark ? 'bg-white/10' : 'bg-slate-200'
            }`}
          >
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${Math.max(techniqueFamiliarityPercent, 3)}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] mt-1 text-slate-400">
            <span>
              {isZeroState
                ? isRu
                  ? '0 ракурсов'
                  : '0 angles'
                : `${totalAnglesCovered}/${totalPossibleAngles} ${isRu ? 'рак.' : 'ang.'}`}
            </span>
            <span className="text-emerald-400 font-medium">
              {isZeroState
                ? isRu
                  ? 'Ожидает'
                  : 'Pending'
                : techniqueFamiliarityPercent >= 50
                ? isRu
                  ? 'Точный'
                  : 'Precise'
                : isRu
                ? 'Базовый'
                : 'Basic'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // =========================================================
  // ZERO / EMPTY STATE: МАКСИМАЛЬНАЯ ЧИСТОТА И ОДИН ПРИЗЫВ
  // =========================================================
  if (isZeroState) {
    return (
      <div className="w-full h-full overflow-y-auto no-scrollbar pb-24 px-5 pt-3 select-none">
        {/* Header */}
        <header className="flex items-center justify-between py-1 mb-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border ${
                isDark
                  ? 'bg-blue-600/20 border-blue-500/30 text-white'
                  : 'bg-blue-50 border-blue-200 text-blue-800'
              }`}
            >
              {profile.name ? profile.name[0] : 'N'}
            </div>
            <div>
              <h1
                className={`text-base font-bold tracking-tight leading-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {profile.name || (isRu ? 'Новый игрок' : 'New Player')}
              </h1>
              <span
                className={`text-[11px] font-medium ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {profile.hand === 'Left-handed'
                  ? isRu
                    ? 'Левша'
                    : 'Lefty'
                  : isRu
                  ? 'Правша'
                  : 'Righty'}
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <span
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                isDark
                  ? 'bg-white/[0.08] text-blue-300'
                  : 'bg-blue-50 text-blue-700 border border-blue-200/60'
              }`}
            >
              {isRu ? 'Калибровка уровня' : 'Calibration'}
            </span>
          </div>
        </header>

        {/* 2 Core Scales (Zero baseline) */}
        {renderCleanDualScales()}

        {/* Active Submission Status Tracker Banner */}
        {activeSubmission && (
          <div
            role="button"
            tabIndex={0}
            onClick={onOpenSubmissionStatus}
            className={`p-3.5 rounded-2xl mb-4 border flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] ${
              isDark
                ? 'bg-[#101D1A] border-[#D2FF1F]/30 hover:border-[#D2FF1F]/60 shadow-sm'
                : 'bg-lime-50/80 border-lime-400/60 hover:border-lime-500 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-2.5 h-2.5 rounded-full animate-pulse flex-shrink-0"
                style={{ backgroundColor: isDark ? '#D2FF1F' : '#65A30D' }}
              />
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {activeSubmission.strokeTitle}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {activeSubmission.step === 'queued'
                      ? isRu ? 'Очередь' : 'Queued'
                      : activeSubmission.step === 'review'
                      ? isRu ? 'На ревью' : 'In Review'
                      : activeSubmission.step === 'report_ready'
                      ? isRu ? 'Отчёт готов' : 'Ready'
                      : isRu ? 'Закреплено' : 'Verified'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {isRu ? 'Нажми, чтобы отследить статус разбора ➜' : 'Tap to track submission status ➜'}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
          </div>
        )}

        {/* Hero Card: AI Automatic Stroke Detection */}
        <div
          className={`rounded-2xl p-5 mb-4 border relative overflow-hidden ${
            isDark
              ? 'bg-gradient-to-b from-[#111C33] to-[#0D1527] border-blue-500/40 shadow-lg'
              : 'bg-gradient-to-b from-blue-50 to-white border-blue-200 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: isDark ? '#D2FF1F' : '#84CC16' }}
            />
            <span
              className={`text-[11px] font-bold uppercase tracking-wider ${
                isDark ? 'text-blue-300' : 'text-blue-700'
              }`}
            >
              {isRu ? 'Первый разбор' : 'First Analysis'}
            </span>
          </div>

          <h2
            className={`text-lg font-bold tracking-tight mb-1.5 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {isRu ? 'ИИ сам определит удар' : 'AI Will Auto-Detect Your Stroke'}
          </h2>

          <p
            className={`text-xs leading-relaxed mb-4 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {isRu
              ? 'Загрузи любое видео с корта (3–5 сек). ИИ автоматически распознает тип удара, рассчитает биомеханику и запустит шкалу прогресса.'
              : 'Upload any court video (3–5s). AI will automatically detect the stroke, calculate biomechanics, and start your progress scale.'}
          </p>

          <button
            id="btn-empty-upload-primary"
            type="button"
            onClick={() => onOpenIntake()}
            className={`w-full h-12 rounded-xl flex items-center justify-between px-4 font-semibold text-sm transition-all active:scale-[0.98] border shadow-md ${
              isDark
                ? 'bg-[#0E2752] border-blue-400/60 text-white hover:bg-[#13356D]'
                : 'bg-[#1D4ED8] border-blue-600 text-white hover:bg-[#1E40AF]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Video className="w-4 h-4 text-blue-300" />
              <span>{isRu ? 'Отправить видео' : 'Send Video'}</span>
            </div>
            <Send className="w-4 h-4 text-blue-200" />
          </button>
        </div>

        {/* Minimalist Stroke Matrix */}
        <div>
          <div className="flex items-center justify-between mb-2.5 px-1">
            <h3
              className={`text-[11px] font-bold uppercase tracking-wider ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {isRu ? 'Сегменты техники (6)' : 'Technique Segments (6)'}
            </h3>
            <span
              className={`text-[11px] ${
                isDark ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              {isRu ? 'Ожидают видео' : 'Awaiting video'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {segments.map(s => {
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onOpenIntake(s.id)}
                  className={`p-3 rounded-xl text-left border transition-all active:scale-[0.98] flex flex-col justify-between min-h-[96px] ${
                    isDark
                      ? 'bg-[#0E1726]/70 border-white/[0.05] hover:border-white/15'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-bold truncate uppercase tracking-wider ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {s.russianTitle}
                    </span>
                    <span className="text-xs text-slate-500 font-mono flex-shrink-0 ml-1.5">—</span>
                  </div>

                  <div className="space-y-2 w-full">
                    {/* Progress Bar */}
                    <div>
                      <div className="text-[10px] text-slate-400 mb-[4px] leading-none">
                        {isRu ? 'Прогресс' : 'Progress'}
                      </div>
                      <div
                        className={`w-full h-1.5 rounded-full overflow-hidden ${
                          isDark ? 'bg-white/10' : 'bg-slate-100'
                        }`}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: '0%',
                            backgroundColor: isDark ? '#D2FF1F' : '#84CC16',
                          }}
                        />
                      </div>
                    </div>

                    {/* Familiarity Bar */}
                    <div>
                      <div className="text-[10px] text-slate-400 mb-[4px] leading-none">
                        {isRu ? 'Изученность' : 'Coverage'}
                      </div>
                      <div
                        className={`w-full h-1.5 rounded-full overflow-hidden ${
                          isDark ? 'bg-white/10' : 'bg-slate-100'
                        }`}
                      >
                        <div
                          className="h-full rounded-full bg-[#EA580C]"
                          style={{ width: '0%' }}
                        />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // PROGRESSED STATE: ЧИСТЫЙ И ЭРГОНОМИЧНЫЙ ИНТЕРФЕЙС
  // =========================================================
  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar pb-24 px-5 pt-3 select-none">
      {/* 1. Header */}
      <header className="flex items-center justify-between py-1 mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border ${
              isDark
                ? 'bg-blue-600/20 border-blue-500/30 text-white'
                : 'bg-blue-50 border-blue-200 text-blue-800'
            }`}
          >
            {profile.name ? profile.name[0] : 'U'}
          </div>
          <div>
            <h1
              className={`text-base font-bold tracking-tight leading-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {profile.name}
            </h1>
            <span
              className={`text-[11px] font-medium ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {profile.hand === 'Left-handed'
                ? isRu
                  ? 'Левша'
                  : 'Lefty'
                : isRu
                ? 'Правша'
                : 'Righty'}{' '}
              • {getLevelLabel()}
            </span>
          </div>
        </div>

        <div
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
            isDark
              ? 'bg-amber-500/10 border-amber-500/25 text-amber-300'
              : 'bg-amber-50 border-amber-200 text-amber-700'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>{isRu ? '3 на неделе' : '3 this week'}</span>
        </div>
      </header>

      {/* 2. Чистый стрип двух шкал */}
      {renderCleanDualScales()}

      {/* Active Submission Status Tracker Banner */}
      {activeSubmission && (
        <div
          role="button"
          tabIndex={0}
          onClick={onOpenSubmissionStatus}
          className={`p-3.5 rounded-2xl mb-4 border flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] ${
            isDark
              ? 'bg-[#101D1A] border-[#D2FF1F]/30 hover:border-[#D2FF1F]/60 shadow-sm'
              : 'bg-lime-50/80 border-lime-400/60 hover:border-lime-500 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-2.5 h-2.5 rounded-full animate-pulse flex-shrink-0"
              style={{ backgroundColor: isDark ? '#D2FF1F' : '#65A30D' }}
            />
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {activeSubmission.strokeTitle}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {activeSubmission.step === 'queued'
                    ? isRu ? 'Очередь' : 'Queued'
                    : activeSubmission.step === 'review'
                    ? isRu ? 'На ревью' : 'In Review'
                    : activeSubmission.step === 'report_ready'
                    ? isRu ? 'Отчёт готов' : 'Ready'
                    : isRu ? 'Закреплено' : 'Verified'}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {isRu ? 'Нажми, чтобы отследить статус разбора ➜' : 'Tap to track submission status ➜'}
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
        </div>
      )}

      {/* 3. ЕДИНАЯ ЦЕНТРАЛЬНАЯ КАРТОЧКА: «ФОКУС НА КОРТ» С ТАБАМИ УДАРОВ */}
      <section
        aria-label="Unified Training Focus"
        className={`rounded-2xl p-4 mb-4 border relative overflow-hidden transition-all ${
          isDark
            ? 'bg-gradient-to-b from-[#111C33] to-[#0E1626] border-blue-500/35 shadow-md'
            : 'bg-gradient-to-b from-blue-50/70 to-white border-blue-200/90 shadow-sm'
        }`}
      >
        {/* Top Eyebrow & Status */}
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
              {isRu ? 'Твой фокус на корт' : 'Court Focus'}
            </span>
          </div>

          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
              currentTabSegment.currentFocus?.approvedByCoach
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
              {currentTabSegment.currentFocus?.approvedByCoach
                ? currentTabSegment.currentFocus.coachName
                  ? currentTabSegment.currentFocus.coachName.split(',')[0]
                  : isRu
                  ? 'Тренер ✓'
                  : 'Coach ✓'
                : isRu
                ? 'AI Фокус'
                : 'AI Focus'}
            </span>
          </span>
        </div>

        {/* Minimalist Pill Tabs for 6 Strokes */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-3 -mx-1 px-1">
          {segments.map(seg => {
            const isSelected = seg.id === activeSegmentTab;
            return (
              <button
                key={seg.id}
                type="button"
                onClick={() => setActiveSegmentTab(seg.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
                  isSelected
                    ? isDark
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-blue-600 text-white shadow-xs'
                    : isDark
                    ? 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {seg.russianTitle}
              </button>
            );
          })}
        </div>

        {/* Clean Directive Box */}
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
              ? currentTabSegment.currentFocus?.russianInstruction || currentTabSegment.whatToFilmNext
              : currentTabSegment.currentFocus?.instruction || currentTabSegment.whatToFilmNext}
            »
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 flex-shrink-0 text-blue-400" />
              <span>
                {isRu ? 'Закреплен до следующего видео' : 'Active until next video'}
              </span>
            </span>
            <span className="font-mono text-blue-400 font-medium">
              {currentTabSegment.anglesCoveredCount || 1}/4 {isRu ? 'рак.' : 'ang.'}
            </span>
          </div>
        </div>

        {/* Primary CTA: Record this stroke */}
        <button
          id={`btn-record-focus-${currentTabSegment.id}`}
          type="button"
          onClick={() => onOpenIntake(currentTabSegment.id)}
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
                ? `Снять ${currentTabSegment.russianTitle}`
                : `Film ${currentTabSegment.title.split(' ')[0]}`}
            </span>
          </div>
          <Send className="w-3.5 h-3.5 text-blue-200" />
        </button>
      </section>

      {/* 4. МИНИМАЛИСТИЧНАЯ СЕТКА 6 УДАРОВ (БЕЗ ДУБЛИРОВАНИЯ И ВИЗУАЛЬНОГО ШУМА) */}
      <section>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h2
            className={`text-[11px] font-bold uppercase tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {isRu ? 'Карта ударов' : 'Stroke Map'}
          </h2>
          <span
            className={`text-[11px] ${
              isDark ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            {isRu ? 'Нажми для деталей' : 'Tap for details'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {segments.map(seg => {
            const avgScore = getSegmentAverageScore(seg);
            const scoreVal = avgScore ? parseFloat(avgScore) : 0;
            const scorePercent = avgScore ? Math.round((scoreVal / 10) * 100) : 0;
            const angles = seg.anglesCoveredCount || (seg.coveragePercent > 0 ? 1 : 0);
            const familiarityPercent = Math.round((angles / 4) * 100);

            return (
              <button
                key={seg.id}
                type="button"
                onClick={() => onSelectSegment(seg.id)}
                className={`p-3 rounded-xl text-left border transition-all active:scale-[0.98] flex flex-col justify-between min-h-[96px] ${
                  isDark
                    ? 'bg-[#0E1726]/80 border-white/[0.06] hover:border-white/[0.15]'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                {/* Top: Title in bold + Score */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-bold truncate uppercase tracking-wider ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {seg.russianTitle}
                  </span>

                  {avgScore ? (
                    <span
                      className="text-xs font-bold font-mono flex-shrink-0 ml-1.5"
                      style={{ color: isDark ? '#D2FF1F' : '#65A30D' }}
                    >
                      {avgScore}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500 font-mono flex-shrink-0 ml-1.5">—</span>
                  )}
                </div>

                {/* 2 Progress Bars (Прогресс & Изученность) */}
                <div className="space-y-2 w-full">
                  {/* Progress bar (Lime / Yellow-green) */}
                  <div>
                    <div className="text-[10px] text-slate-400 mb-[4px] leading-none">
                      {isRu ? 'Прогресс' : 'Progress'}
                    </div>
                    <div
                      className={`w-full h-1.5 rounded-full overflow-hidden ${
                        isDark ? 'bg-white/10' : 'bg-slate-100'
                      }`}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, Math.max(0, scorePercent))}%`,
                          backgroundColor: isDark ? '#D2FF1F' : '#84CC16',
                        }}
                      />
                    </div>
                  </div>

                  {/* Familiarity bar (Coral / Orange) */}
                  <div>
                    <div className="text-[10px] text-slate-400 mb-[4px] leading-none">
                      {isRu ? 'Изученность' : 'Coverage'}
                    </div>
                    <div
                      className={`w-full h-1.5 rounded-full overflow-hidden ${
                        isDark ? 'bg-white/10' : 'bg-slate-100'
                      }`}
                    >
                      <div
                        className="h-full rounded-full bg-[#EA580C] transition-all duration-500"
                        style={{
                          width: `${Math.min(100, Math.max(0, familiarityPercent))}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
