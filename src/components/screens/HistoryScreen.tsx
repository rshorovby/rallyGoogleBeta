import React, { useState } from 'react';
import { AnalysisRecord, StrokeType, SupervisionStatus } from '../../types';
import { SupervisionPill } from '../common/StatusPill';
import { ChevronRight, Filter } from 'lucide-react';

interface HistoryScreenProps {
  records: AnalysisRecord[];
  theme?: 'light' | 'dark';
  onSelectRecord: (record: AnalysisRecord) => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  records,
  theme = 'dark',
  onSelectRecord,
}) => {
  const isDark = theme === 'dark';

  const [strokeFilter, setStrokeFilter] = useState<StrokeType | 'all'>('all');
  const [supervisorFilter, setSupervisorFilter] = useState<SupervisionStatus | 'all'>('all');

  const filteredRecords = records.filter(record => {
    if (strokeFilter !== 'all' && record.stroke !== strokeFilter) return false;
    if (supervisorFilter !== 'all' && record.supervisionStatus !== supervisorFilter) return false;
    return true;
  });

  const confirmedCount = records.filter(r => r.supervisionStatus === 'coach_confirmed').length;
  const pendingCount = records.filter(r => r.supervisionStatus === 'pending_supervisor').length;

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar pb-24 px-5 pt-3">
      {/* 1. Header: History Summary */}
      <header className="mb-3 select-none">
        <div className="flex items-center justify-between">
          <h1
            className={`text-2xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            History
          </h1>
          <span
            className={`text-xs font-mono tabular-nums px-2 py-0.5 rounded-full border ${
              isDark
                ? 'bg-white/5 border-white/10 text-slate-300'
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            {records.length} logged
          </span>
        </div>

        {/* Concise metrics telemetry summary */}
        <div
          className={`flex items-center gap-4 mt-1 text-xs ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          <span>
            <strong className={isDark ? 'text-emerald-400' : 'text-emerald-700'}>
              {confirmedCount}
            </strong>{' '}
            Coach Confirmed
          </span>
          <span>•</span>
          <span>
            <strong className={isDark ? 'text-amber-400' : 'text-amber-700'}>
              {pendingCount}
            </strong>{' '}
            Awaiting Coach
          </span>
        </div>
      </header>

      {/* 2. Filters: Stroke Segments & Supervision Filter Chips */}
      <div className="mb-4 space-y-2 select-none">
        {/* Stroke Segment Horizontal Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1">
          {(['all', 'forehand', 'backhand', 'serve', 'net', 'footwork', 'rally'] as const).map(
            type => {
              const active = strokeFilter === type;
              const label =
                type === 'all'
                  ? 'All Strokes'
                  : type === 'forehand'
                  ? 'Forehand'
                  : type === 'backhand'
                  ? 'Backhand'
                  : type === 'serve'
                  ? 'Serve'
                  : type === 'net'
                  ? 'Net Play'
                  : type === 'footwork'
                  ? 'Footwork'
                  : 'Rally';

              return (
                <button
                  key={type}
                  id={`filter-stroke-${type}`}
                  type="button"
                  onClick={() => setStrokeFilter(type)}
                  className={`px-3 py-1 rounded-full text-xs font-medium tracking-tight whitespace-nowrap border transition-all ${
                    active
                      ? isDark
                        ? 'bg-blue-600/30 border-blue-500 text-white shadow-xs'
                        : 'bg-blue-600 border-blue-600 text-white'
                      : isDark
                      ? 'bg-[#101726]/80 border-white/[0.08] text-slate-400 hover:text-slate-200'
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {label}
                </button>
              );
            }
          )}
        </div>

        {/* Supervision Status Filter Chips */}
        <div className="flex items-center gap-1.5">
          {(['all', 'coach_confirmed', 'ai_verified'] as const).map(status => {
            const active = supervisorFilter === status;
            const label =
              status === 'all'
                ? 'All Supervision'
                : status === 'coach_confirmed'
                ? 'Coach Verified'
                : 'AI Only';

            return (
              <button
                key={status}
                id={`filter-supervision-${status}`}
                type="button"
                onClick={() => setSupervisorFilter(status)}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium tracking-tight whitespace-nowrap border transition-all ${
                  active
                    ? isDark
                      ? 'bg-white/15 border-white/25 text-white'
                      : 'bg-slate-800 border-slate-800 text-white'
                    : isDark
                    ? 'bg-transparent border-transparent text-slate-500 hover:text-slate-400'
                    : 'bg-transparent border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Chronological Cards: Stroke, 0-10 Scores, Status (Explicit: NO video previews) */}
      <div className="space-y-2.5">
        {filteredRecords.length === 0 ? (
          <div
            className={`p-6 rounded-[20px] border text-center text-xs ${
              isDark
                ? 'bg-[#101726]/60 border-white/[0.06] text-slate-500'
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            No analyses match the current filter parameters.
          </div>
        ) : (
          filteredRecords.map(record => (
            <button
              key={record.id}
              id={`history-card-${record.id}`}
              type="button"
              onClick={() => onSelectRecord(record)}
              className={`w-full p-4 rounded-[20px] border text-left transition-all active:scale-[0.99] ${
                isDark
                  ? 'bg-[#0F1626]/90 border-white/[0.08] hover:border-blue-500/40 shadow-sm'
                  : 'bg-white border-slate-200/90 hover:border-blue-400/60 shadow-xs'
              }`}
            >
              {/* Top Row: Date & Status Pill */}
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span
                  className={`text-[11px] font-medium ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {record.recordedAt}
                </span>
                <SupervisionPill
                  status={record.supervisionStatus}
                  coachName={record.coachName}
                  theme={theme}
                  compact
                />
              </div>

              {/* Stroke Title */}
              <div className="flex items-center justify-between gap-2">
                <h2
                  className={`text-sm font-semibold tracking-tight leading-snug line-clamp-1 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {record.strokeDisplayName}
                </h2>
                <ChevronRight
                  className={`w-4 h-4 flex-shrink-0 ${
                    isDark ? 'text-slate-600' : 'text-slate-400'
                  }`}
                />
              </div>

              {/* Scores 0-10 Metrics Grid (Razor sharp readability on dense container) */}
              <div
                className={`mt-2.5 pt-2.5 border-t grid grid-cols-3 gap-2 ${
                  isDark ? 'border-white/[0.06]' : 'border-slate-100'
                }`}
              >
                <div>
                  <span
                    className={`text-[10px] uppercase font-medium tracking-wider block ${
                      isDark ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    Contact
                  </span>
                  <span
                    className={`text-sm font-bold tabular-nums ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {record.metrics.contactPoint.toFixed(1)}
                    <span className="text-[10px] font-normal text-slate-500">/10</span>
                  </span>
                </div>

                <div>
                  <span
                    className={`text-[10px] uppercase font-medium tracking-wider block ${
                      isDark ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    Kinetic
                  </span>
                  <span
                    className={`text-sm font-bold tabular-nums ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {record.metrics.kineticChain.toFixed(1)}
                    <span className="text-[10px] font-normal text-slate-500">/10</span>
                  </span>
                </div>

                <div>
                  <span
                    className={`text-[10px] uppercase font-medium tracking-wider block ${
                      isDark ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    Balance
                  </span>
                  <span
                    className={`text-sm font-bold tabular-nums ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {record.metrics.balance.toFixed(1)}
                    <span className="text-[10px] font-normal text-slate-500">/10</span>
                  </span>
                </div>
              </div>

              {/* Primary Focus Excerpt */}
              <div
                className={`mt-2 text-[11px] font-normal line-clamp-1 ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                Focus: {record.primaryFocus}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};
