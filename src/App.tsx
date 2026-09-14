/**
 * RallyMind — Native iOS Tennis Technique Coverage & AI Analysis System
 * Apple Human Interface Guidelines • Liquid Glass • Hardcourt Geometry
 */

import React, { useState } from 'react';
import {
  ThemeMode,
  TabId,
  ScreenId,
  StrokeType,
  PlayerProfile,
  StrokeSegmentData,
  AnalysisRecord,
  IntakeSubmission,
} from './types';
import {
  PROGRESSED_PROFILE,
  ZERO_PROFILE,
  PROGRESSED_SEGMENTS,
  ZERO_SEGMENTS,
  SAMPLE_ANALYSIS,
  HISTORY_RECORDS,
} from './data/mockData';

// Common Components
import { IPhoneFrame } from './components/common/IPhoneFrame';
import { TabBar } from './components/common/TabBar';

// Screens
import { SplashScreen } from './components/screens/SplashScreen';
import { SignInScreen } from './components/screens/SignInScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { SegmentScreen } from './components/screens/SegmentScreen';
import { HistoryScreen } from './components/screens/HistoryScreen';
import { AnalysisScreen } from './components/screens/AnalysisScreen';
import { AnalysisPointModal } from './components/screens/AnalysisPointModal';
import { AccountScreen } from './components/screens/AccountScreen';
import { IntakeModal } from './components/screens/IntakeModal';
import { TelegramSyncModal } from './components/screens/TelegramSyncModal';

// Presentation Views
import { DesignSystemSheet } from './components/designSystem/DesignSystemSheet';
import { AllScreensMatrix } from './components/matrix/AllScreensMatrix';

import { Smartphone, LayoutGrid, Palette, RotateCcw, Moon, Sun } from 'lucide-react';

export default function App() {
  // Global View Mode: 'prototype' | 'matrix' | 'system'
  const [viewMode, setViewMode] = useState<'prototype' | 'matrix' | 'system'>('prototype');

  // Theme: strictly 'light' | 'dark' (no system option)
  const [theme, setTheme] = useState<ThemeMode>('dark');

  // Profile data toggle: Progressed vs Zero State
  const [isZeroState, setIsZeroState] = useState<boolean>(false);

  // Active Profile & Segments
  const [profile, setProfile] = useState<PlayerProfile>(PROGRESSED_PROFILE);
  const [segments, setSegments] = useState<StrokeSegmentData[]>(PROGRESSED_SEGMENTS);
  const [history, setHistory] = useState<AnalysisRecord[]>(HISTORY_RECORDS);

  // Navigation State within Prototype
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [selectedStrokeId, setSelectedStrokeId] = useState<StrokeType>('forehand');
  const [activeAnalysisRecord, setActiveAnalysisRecord] = useState<AnalysisRecord>(SAMPLE_ANALYSIS);

  // Modals & Action Sheets
  const [showIntake, setShowIntake] = useState<boolean>(false);
  const [intakeDefaultStroke, setIntakeDefaultStroke] = useState<StrokeType>('forehand');
  const [showTelegramModal, setShowTelegramModal] = useState<boolean>(false);

  // Toggle between Progressed Profile and Zero State
  const handleToggleState = (zero: boolean) => {
    setIsZeroState(zero);
    if (zero) {
      setProfile(ZERO_PROFILE);
      setSegments(ZERO_SEGMENTS);
      setHistory([]);
    } else {
      setProfile(PROGRESSED_PROFILE);
      setSegments(PROGRESSED_SEGMENTS);
      setHistory(HISTORY_RECORDS);
    }
  };

  // Tab navigation
  const handleSelectTab = (tab: TabId) => {
    setActiveTab(tab);
    if (tab === 'home') {
      setCurrentScreen('home');
    } else if (tab === 'history') {
      setCurrentScreen('history');
    } else if (tab === 'account') {
      setCurrentScreen('account');
    }
  };

  // Push to segment detail
  const handleOpenSegment = (strokeId: StrokeType) => {
    setSelectedStrokeId(strokeId);
    setCurrentScreen('segment');
  };

  // Push to analysis view
  const handleOpenAnalysis = (record: AnalysisRecord) => {
    setActiveAnalysisRecord(record);
    setCurrentScreen('analysis');
  };

  // Open intake flow
  const handleOpenIntake = (stroke?: StrokeType) => {
    setIntakeDefaultStroke(stroke || 'forehand');
    setShowIntake(true);
  };

  // Handle Intake submission (creates local record and updates coverage)
  const handleIntakeSubmit = (submission: IntakeSubmission) => {
    setShowIntake(false);
    const newRecord: AnalysisRecord = {
      id: `an-${Date.now().toString().slice(-4)}`,
      stroke: submission.stroke,
      strokeDisplayName: `${submission.stroke.toUpperCase()} • ${submission.focusArea}`,
      recordedAt: 'Just now',
      localVideoDuration: '00:04.0 (240 fps)',
      supervisionStatus: 'ai_verified',
      overallScore: 8.2,
      metrics: {
        contactPoint: 8.5,
        kineticChain: 8.0,
        balance: 8.2,
      },
      summary: `Biomechanical analysis processed on-device. Focus on: ${submission.focusArea}.`,
      primaryFocus: submission.focusArea,
      whatToFilmNext: 'Sustain depth from baseline corner.',
      points: [
        {
          id: `pt-${Date.now()}`,
          pointNumber: 1,
          title: 'Immediate Contact Stability',
          issueDescription: submission.sessionNote || 'Stable racquet orientation through ball impact zone.',
          correctionDirective: 'Maintain radial wrist firmness through full finish trajectory.',
          kineticsImpact: 'Solidified biomechanical anchor point.',
        },
      ],
    };

    setHistory([newRecord, ...history]);
    setActiveAnalysisRecord(newRecord);
    setCurrentScreen('analysis');

    // Update segment coverage if zero state
    if (isZeroState) {
      setProfile(prev => ({
        ...prev,
        overallCoverage: 16,
        totalAnalyses: 1,
        localDiskUsage: '94 MB (1 local recording)',
      }));
      setSegments(prev =>
        prev.map(s =>
          s.id === submission.stroke
            ? {
                ...s,
                coveragePercent: 33,
                aiSlots: 1,
                slots: s.slots.map((sl, idx) => (idx === 0 ? { ...sl, status: 'ai', score: 8.2 } : sl)),
              }
            : s
        )
      );
    }
  };

  // Delete local video from this iPhone
  const handleDeleteLocalVideo = () => {
    setHistory(prev => prev.filter(r => r.id !== activeAnalysisRecord.id));
    setCurrentScreen('history');
  };

  // Current active segment object
  const currentSegment =
    segments.find(s => s.id === selectedStrokeId) || segments[0];

  return (
    <div className={`min-h-screen w-full transition-colors duration-200 ${
      theme === 'dark' ? 'bg-[#04060B] text-white' : 'bg-[#EAEFF5] text-slate-900'
    }`}>
      {/* Universal Top Designer Control Bar */}
      <header className="w-full border-b border-white/10 px-4 py-2.5 bg-[#090D18]/90 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 select-none text-white">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#0E2752] border border-blue-500/40 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#D2FF1F]" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight block leading-none">RallyMind</span>
              <span className="text-[10px] font-mono text-slate-400">iOS 26 HIG • Tennis Biometrics</span>
            </div>
          </div>

          <div className="hidden md:block h-4 w-[1px] bg-white/20" />

          {/* View Mode Switcher */}
          <div className="flex p-1 rounded-xl bg-white/5 border border-white/10 text-xs">
            <button
              id="mode-prototype"
              type="button"
              onClick={() => setViewMode('prototype')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors font-medium ${
                viewMode === 'prototype'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Interactive iPhone</span>
            </button>

            <button
              id="mode-matrix"
              type="button"
              onClick={() => setViewMode('matrix')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors font-medium ${
                viewMode === 'matrix'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>All Screens Matrix (Light & Dark)</span>
            </button>

            <button
              id="mode-system"
              type="button"
              onClick={() => setViewMode('system')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors font-medium ${
                viewMode === 'system'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Design System Sheet (Лист системы)</span>
            </button>
          </div>
        </div>

        {/* Global Controls: Theme & Profile State */}
        <div className="flex items-center gap-3">
          {/* Progressed vs Zero State Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 text-xs">
            <span className="text-[11px] text-slate-400 px-1 font-mono">State:</span>
            <button
              type="button"
              onClick={() => handleToggleState(false)}
              className={`px-2.5 py-0.5 rounded-lg transition-colors ${
                !isZeroState ? 'bg-white/20 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              Progressed (48%)
            </button>
            <button
              type="button"
              onClick={() => handleToggleState(true)}
              className={`px-2.5 py-0.5 rounded-lg transition-colors ${
                isZeroState ? 'bg-white/20 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              Zero State (0%)
            </button>
          </div>

          {/* Theme Toggle (Strictly Light | Dark) */}
          <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setTheme('light')}
              title="Switch to Light Theme"
              className={`p-1.5 rounded-lg transition-colors ${
                theme === 'light' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              title="Switch to Dark Theme"
              className={`p-1.5 rounded-lg transition-colors ${
                theme === 'dark' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* VIEW 1: INTERACTIVE IPHONE PROTOTYPE */}
      {viewMode === 'prototype' && (
        <main className="w-full py-6 flex flex-col items-center justify-center">
          {/* Interactive Screen Navigator Bar */}
          <div className="mb-4 flex flex-wrap items-center justify-center gap-1.5 max-w-2xl px-4 text-xs select-none">
            <span className={`text-[11px] font-mono mr-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Jump to Screen:
            </span>
            <button
              type="button"
              onClick={() => setCurrentScreen('splash')}
              className={`px-2.5 py-1 rounded-full border transition-all ${
                currentScreen === 'splash'
                  ? 'bg-blue-600 text-white border-blue-500'
                  : theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-slate-300'
                  : 'bg-white border-slate-300 text-slate-700'
              }`}
            >
              Splash
            </button>
            <button
              type="button"
              onClick={() => setCurrentScreen('signin')}
              className={`px-2.5 py-1 rounded-full border transition-all ${
                currentScreen === 'signin'
                  ? 'bg-blue-600 text-white border-blue-500'
                  : theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-slate-300'
                  : 'bg-white border-slate-300 text-slate-700'
              }`}
            >
              Sign In with Apple
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('home');
                setCurrentScreen('home');
              }}
              className={`px-2.5 py-1 rounded-full border transition-all ${
                currentScreen === 'home'
                  ? 'bg-blue-600 text-white border-blue-500'
                  : theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-slate-300'
                  : 'bg-white border-slate-300 text-slate-700'
              }`}
            >
              Home (Главная)
            </button>
            <button
              type="button"
              onClick={() => setCurrentScreen('segment')}
              className={`px-2.5 py-1 rounded-full border transition-all ${
                currentScreen === 'segment'
                  ? 'bg-blue-600 text-white border-blue-500'
                  : theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-slate-300'
                  : 'bg-white border-slate-300 text-slate-700'
              }`}
            >
              Segment (Сегмент)
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('history');
                setCurrentScreen('history');
              }}
              className={`px-2.5 py-1 rounded-full border transition-all ${
                currentScreen === 'history'
                  ? 'bg-blue-600 text-white border-blue-500'
                  : theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-slate-300'
                  : 'bg-white border-slate-300 text-slate-700'
              }`}
            >
              History (История)
            </button>
            <button
              type="button"
              onClick={() => setCurrentScreen('analysis')}
              className={`px-2.5 py-1 rounded-full border transition-all ${
                currentScreen === 'analysis'
                  ? 'bg-blue-600 text-white border-blue-500'
                  : theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-slate-300'
                  : 'bg-white border-slate-300 text-slate-700'
              }`}
            >
              Analysis (Разбор)
            </button>
            <button
              type="button"
              onClick={() => setCurrentScreen('analysis-detail')}
              className={`px-2.5 py-1 rounded-full border transition-all ${
                currentScreen === 'analysis-detail'
                  ? 'bg-blue-600 text-white border-blue-500'
                  : theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-slate-300'
                  : 'bg-white border-slate-300 text-slate-700'
              }`}
            >
              Point (Пункт)
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('account');
                setCurrentScreen('account');
              }}
              className={`px-2.5 py-1 rounded-full border transition-all ${
                currentScreen === 'account'
                  ? 'bg-blue-600 text-white border-blue-500'
                  : theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-slate-300'
                  : 'bg-white border-slate-300 text-slate-700'
              }`}
            >
              Account (Аккаунт)
            </button>
          </div>

          {/* iPhone 16 Pro Hardware Mockup Frame */}
          <IPhoneFrame theme={theme}>
            <div className="relative flex-1 w-full h-full flex flex-col overflow-hidden">
              {/* Screen Router */}
              {currentScreen === 'splash' && (
                <SplashScreen theme={theme} onEnterApp={() => setCurrentScreen('signin')} />
              )}

              {currentScreen === 'signin' && (
                <SignInScreen
                  theme={theme}
                  onSignIn={() => {
                    setActiveTab('home');
                    setCurrentScreen('home');
                  }}
                />
              )}

              {currentScreen === 'home' && (
                <HomeScreen
                  profile={profile}
                  segments={segments}
                  theme={theme}
                  onSelectSegment={handleOpenSegment}
                  onOpenIntake={() => handleOpenIntake('forehand')}
                  onOpenTelegram={() => setShowTelegramModal(true)}
                />
              )}

              {currentScreen === 'segment' && (
                <SegmentScreen
                  segment={currentSegment}
                  theme={theme}
                  onBack={() => setCurrentScreen('home')}
                  onOpenIntakeForSegment={() => handleOpenIntake(currentSegment.id)}
                  onSelectAnalysis={handleOpenAnalysis}
                  recentRecords={history}
                />
              )}

              {currentScreen === 'history' && (
                <HistoryScreen
                  records={history}
                  theme={theme}
                  onSelectRecord={handleOpenAnalysis}
                />
              )}

              {currentScreen === 'analysis' && (
                <AnalysisScreen
                  record={activeAnalysisRecord}
                  theme={theme}
                  onBack={() => setCurrentScreen('history')}
                  onOpenDetails={() => setCurrentScreen('analysis-detail')}
                  onDeleteLocal={handleDeleteLocalVideo}
                />
              )}

              {currentScreen === 'analysis-detail' && (
                <AnalysisPointModal
                  points={activeAnalysisRecord.points}
                  theme={theme}
                  onClose={() => setCurrentScreen('analysis')}
                />
              )}

              {currentScreen === 'account' && (
                <AccountScreen
                  profile={profile}
                  theme={theme}
                  onToggleTheme={newTheme => setTheme(newTheme)}
                  onOpenTelegramCode={() => setShowTelegramModal(true)}
                  onSignOut={() => setCurrentScreen('signin')}
                  onDeleteAccount={() => {
                    handleToggleState(true);
                    setCurrentScreen('signin');
                  }}
                />
              )}

              {/* Persistent Native Tab Bar (Rule: Таббар не прятать на push (сегмент, разбор)) */}
              {currentScreen !== 'splash' &&
                currentScreen !== 'signin' &&
                currentScreen !== 'analysis-detail' && (
                  <div className="absolute bottom-0 left-0 right-0 z-30">
                    <TabBar
                      activeTab={activeTab}
                      onSelectTab={handleSelectTab}
                      theme={theme}
                    />
                  </div>
                )}

              {/* Modal Sheet: 3-Step Video Intake */}
              {showIntake && (
                <IntakeModal
                  initialStroke={intakeDefaultStroke}
                  theme={theme}
                  onClose={() => setShowIntake(false)}
                  onSubmit={handleIntakeSubmit}
                />
              )}

              {/* Modal Sheet: Telegram 6-Digit Code Link */}
              {showTelegramModal && (
                <TelegramSyncModal
                  code={profile.telegramCode || '742-891'}
                  theme={theme}
                  onClose={() => setShowTelegramModal(false)}
                  onLinkSuccess={() => {
                    setProfile(prev => ({ ...prev, telegramLinked: true }));
                    setShowTelegramModal(false);
                  }}
                />
              )}
            </div>
          </IPhoneFrame>
        </main>
      )}

      {/* VIEW 2: ALL SCREENS MATRIX (Light & Dark side-by-side) */}
      {viewMode === 'matrix' && <AllScreensMatrix />}

      {/* VIEW 3: DESIGN SYSTEM SHEET (Лист системы) */}
      {viewMode === 'system' && <DesignSystemSheet theme={theme} />}
    </div>
  );
}
