import React from 'react';
import { CoverageRing } from '../common/CoverageRing';
import { SlotPill, SupervisionPill } from '../common/StatusPill';
import { TabBar } from '../common/TabBar';
import { ShieldCheck, Sparkles, Clock, Check, Layers, Type, Palette, Compass, Cpu } from 'lucide-react';

interface DesignSystemSheetProps {
  theme?: 'light' | 'dark';
}

export const DesignSystemSheet: React.FC<DesignSystemSheetProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={`w-full min-h-screen p-6 sm:p-10 transition-colors duration-200 ${
        isDark ? 'bg-[#060911] text-slate-100' : 'bg-[#F4F6F9] text-slate-900'
      }`}
    >
      {/* Sheet Header */}
      <header className="max-w-6xl mx-auto mb-10 pb-6 border-b border-slate-700/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: isDark ? '#D2FF1F' : '#9FD600' }} />
              <span className="text-xs font-mono tracking-widest uppercase text-blue-400">
                RallyMind • iOS 26 HIG Design Specification
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Design System Sheet (Лист системы)
            </h1>
            <p className={`text-sm mt-1 max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Hardcourt geometry, Liquid Glass material recipes, and technique coverage metrics designed strictly for Apple Human Interface Guidelines.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border ${
                isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              Mode: {isDark ? 'Dark (Night Hardcourt)' : 'Light (Day Hardcourt)'}
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* SECTION 1: PALETTE (Hardcourt Cold Canvas + Deep Court-Blue + 1% Optic-Yellow) */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold tracking-tight">1. Hardcourt Color Architecture</h2>
          </div>
          <p className={`text-xs mb-4 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Tennis is read through temperature and court geometry, not cliparts or rackets. Deep court blue anchors structure; optic yellow is strictly rationed to 1–2% of the interface surface area as an acute optical accent.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Color 1: Cold Canvas */}
            <div
              className={`p-4 rounded-[20px] border ${
                isDark ? 'bg-[#0E1524] border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <div
                className="w-full h-16 rounded-[12px] mb-3 border border-white/10"
                style={{ backgroundColor: isDark ? '#080C14' : '#F2F5F9' }}
              />
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold">Cold Canvas</span>
                <span className="text-xs font-mono">{isDark ? '#080C14' : '#F2F5F9'}</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Calm hardcourt substrate. Zero pure #000 or #FFF; blue-tinted cool neutral.
              </p>
            </div>

            {/* Color 2: Deep Court Blue */}
            <div
              className={`p-4 rounded-[20px] border ${
                isDark ? 'bg-[#0E1524] border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <div
                className="w-full h-16 rounded-[12px] mb-3"
                style={{ backgroundColor: isDark ? '#0E2752' : '#1D4ED8' }}
              />
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold">Court Blue (Baseline)</span>
                <span className="text-xs font-mono">{isDark ? '#0E2752' : '#1D4ED8'}</span>
              </div>
              <p className="text-[11px] text-slate-500">
                US Open hardcourt blue tone. Applied to master cards, primary actions, and coverage tracks.
              </p>
            </div>

            {/* Color 3: Optic Yellow (1–2% Strict Accent) */}
            <div
              className={`p-4 rounded-[20px] border ${
                isDark ? 'bg-[#0E1524] border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <div
                className="w-full h-16 rounded-[12px] mb-3 relative flex items-center justify-center"
                style={{ backgroundColor: isDark ? '#D2FF1F' : '#9FD600' }}
              >
                <span className="text-black font-bold text-xs uppercase tracking-wider">1% Surface Accent</span>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold">Optic Yellow</span>
                <span className="text-xs font-mono">{isDark ? '#D2FF1F' : '#9FD600'}</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Pure tennis ball optic wavelength. Strict 1–2% budget: record dot, lead arc point, active filter pip.
              </p>
            </div>

            {/* Color 4: Biometric Neutral Slates */}
            <div
              className={`p-4 rounded-[20px] border ${
                isDark ? 'bg-[#0E1524] border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <div
                className="w-full h-16 rounded-[12px] mb-3"
                style={{ backgroundColor: isDark ? '#1E293B' : '#CBD5E1' }}
              />
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold">Court Slate Secondary</span>
                <span className="text-xs font-mono">{isDark ? '#1E293B' : '#CBD5E1'}</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Dividers, non-active tracks, and subtle court lines without visual vibration.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: LIQUID GLASS MATERIALS & LEGIBILITY FORMULA */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold tracking-tight">2. Liquid Glass & Legibility Formula</h2>
          </div>
          <p className={`text-xs mb-4 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            <strong>Rule:</strong> Glass where there is space and air; dense structured containers where there are numerical scores. This guarantees that 0–10 evaluations are 100% legible under all lighting conditions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Air Material (Navigation, Modals, TabBar) */}
            <div
              className={`p-5 rounded-[22px] border ${
                isDark
                  ? 'bg-[#0F1626]/75 backdrop-blur-2xl border-white/15'
                  : 'bg-white/80 backdrop-blur-2xl border-slate-200/90 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase text-blue-400">Where There is Air</span>
                <span className="text-[11px] font-mono">Ultra-Thin Material</span>
              </div>
              <h3 className="text-base font-semibold mb-1">Liquid Glass Sheet</h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Used for the 3-tab floating TabBar, the Dynamic Island, and sliding intake sheets. Features a 24px backdrop blur with a specular inner border highlight (`1px solid rgba(255,255,255,0.08)`).
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 font-mono text-[11px] text-slate-400">
                Formula: backdrop-blur-2xl bg-opacity-75 + border-white/10
              </div>
            </div>

            {/* Dense Telemetry Substrate (Metrics & Calibrations) */}
            <div
              className={`p-5 rounded-[22px] border ${
                isDark
                  ? 'bg-[#101728] border-white/10'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase text-emerald-400">Where There Are Numbers</span>
                <span className="text-[11px] font-mono">Solid High-Contrast Tile</span>
              </div>
              <h3 className="text-base font-semibold mb-1">Dense Telemetry Container</h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                High-density container for 0–10 score breakdowns, contact point angles, and kinetic chain metrics. Zero blur interference behind numerical values; pure tabular readability.
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 font-mono text-[11px] text-slate-400">
                Nested Radius Rule: Inner = Outer (16px) - Padding (12px) = 4px
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: COVERAGE RING (ИЗУЧЕННОСТЬ) & GEOMETRY */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Compass className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold tracking-tight">3. Coverage Ring Geometry (Изученность)</h2>
          </div>
          <p className={`text-xs mb-4 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Technique Coverage is the primary numerical and spatial gesture. It is divided into 6 baseline pillar ticks representing the 6 core strokes.
          </p>

          <div
            className={`p-6 rounded-[24px] border flex flex-col md:flex-row items-center justify-around gap-6 ${
              isDark ? 'bg-[#0E1524] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex flex-col items-center">
              <CoverageRing percentage={0} size={120} strokeWidth={8} theme={theme} label="Baseline (0%)" />
              <span className="text-xs font-mono mt-2 text-slate-400">Zero State</span>
            </div>

            <div className="flex flex-col items-center">
              <CoverageRing percentage={48} size={120} strokeWidth={8} theme={theme} label="Active (48%)" />
              <span className="text-xs font-mono mt-2 text-slate-400">Progressed Profile</span>
            </div>

            <div className="flex flex-col items-center">
              <CoverageRing percentage={85} size={120} strokeWidth={8} theme={theme} label="Mastery (85%)" />
              <span className="text-xs font-mono mt-2 text-slate-400">Advanced Lockdown</span>
            </div>

            <div className="max-w-sm text-xs space-y-2">
              <h4 className="font-semibold text-sm">Mathematical Stroke Spec:</h4>
              <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                • Circumference: <code>2 × π × r</code> with 6 perimeter ticks at 60° intervals.
              </p>
              <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                • Primary Arc: Deep Court-Blue (<code>#1D4ED8</code>).
              </p>
              <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                • Kinetic Lead Tip: Optic-Yellow (<code>#D2FF1F</code>) dot marking current trajectory.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: STATUS PILLS & SLOTS HIERARCHY */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold tracking-tight">4. Supervision Pills & Slot States</h2>
          </div>
          <p className={`text-xs mb-4 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Coaches confirm analyses asynchronously without in-app chat clutter. Technique slots are strictly informational and non-tappable as specified.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Supervision Statuses */}
            <div
              className={`p-5 rounded-[20px] border space-y-3 ${
                isDark ? 'bg-[#0E1524] border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Supervision Status System
              </h3>
              <div className="flex flex-wrap gap-2 items-center">
                <SupervisionPill status="coach_confirmed" coachName="M. Lindner, PTR Pro" theme={theme} />
                <SupervisionPill status="ai_verified" theme={theme} />
                <SupervisionPill status="pending_supervisor" theme={theme} />
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                Indicates whether the AI biomechanical report has been confirmed by a verified PTR/USPTA coach.
              </p>
            </div>

            {/* Technique Slots */}
            <div
              className={`p-5 rounded-[20px] border space-y-3 ${
                isDark ? 'bg-[#0E1524] border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Biomechanical Slots (3 States)
              </h3>
              <div className="flex flex-wrap gap-2 items-center">
                <SlotPill status="anchored" score={8.8} theme={theme} />
                <SlotPill status="ai" score={7.2} theme={theme} />
                <SlotPill status="empty" theme={theme} />
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                Three immutable states: Anchored (Закреплено), AI Analyzed (ИИ), and Open Slot (Незакрыто).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: TYPOGRAPHY SYSTEM (SF PRO HIG) */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold tracking-tight">5. Typography Hierarchy (SF Pro System)</h2>
          </div>

          <div
            className={`p-5 rounded-[22px] border divide-y ${
              isDark ? 'bg-[#0E1524] border-white/10 divide-white/5' : 'bg-white border-slate-200 divide-slate-100'
            }`}
          >
            <div className="py-2.5 flex items-baseline justify-between">
              <span className="text-2xl font-bold tracking-tight">Large Title (34pt / Bold)</span>
              <span className="text-xs font-mono text-slate-500">Screen Titles & Dossiers</span>
            </div>
            <div className="py-2.5 flex items-baseline justify-between">
              <span className="text-xl font-semibold tracking-tight">Title 2 (22pt / Semibold)</span>
              <span className="text-xs font-mono text-slate-500">Master Stroke Names</span>
            </div>
            <div className="py-2.5 flex items-baseline justify-between">
              <span className="text-base font-medium">Body (17pt / Regular)</span>
              <span className="text-xs font-mono text-slate-500">Analysis Observations & Guidance</span>
            </div>
            <div className="py-2.5 flex items-baseline justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider">Subhead / Eyebrow (12pt / Medium)</span>
              <span className="text-xs font-mono text-slate-500">Category & Pillar Identifiers</span>
            </div>
            <div className="py-2.5 flex items-baseline justify-between">
              <span className="text-sm font-bold tabular-nums">Tabular Figures (0123456789)</span>
              <span className="text-xs font-mono text-slate-500">0–10 Scores & Frame Rates</span>
            </div>
          </div>
        </section>

        {/* SECTION 6: TAB BAR ARCHITECTURE (EXACTLY 3 TABS) */}
        <section className="pb-10">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold tracking-tight">6. Tab Bar Architecture (3 Tabs Only)</h2>
          </div>
          <p className={`text-xs mb-4 max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Strictly 3 tabs: <strong>Home (Главная)</strong>, <strong>History (История)</strong>, and <strong>Account (Аккаунт)</strong>. A 4th tab is strictly forbidden. The tennis racket is permissible only as an SF Symbol on Home.
          </p>

          <div className="max-w-md mx-auto rounded-[28px] overflow-hidden border border-white/10 shadow-xl">
            <TabBar activeTab="home" onSelectTab={() => {}} theme={theme} />
          </div>
        </section>
      </div>
    </div>
  );
};
