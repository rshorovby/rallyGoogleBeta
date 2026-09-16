/**
 * RallyMind — Native iOS Tennis Technique Coverage & AI Analysis System
 * Apple Human Interface Guidelines • Liquid Glass • Hardcourt Geometry
 */

import React, { useState } from 'react';
import {
  ThemeMode,
  AppLanguage,
  ProfileState,
  TabId,
  ScreenId,
  StrokeType,
  PlayerProfile,
  StrokeSegmentData,
  AnalysisRecord,
  IntakeSubmission,
  SubmissionTicket,
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
import { PlayerProfilePush } from './components/screens/PlayerProfilePush';
import { LinkTelegramPush } from './components/screens/LinkTelegramPush';
import { LanguagePush } from './components/screens/LanguagePush';
import { AboutPush } from './components/screens/AboutPush';
import { IntakeFlowModal } from './components/screens/IntakeFlowModal';
import { SubmissionStatusScreen } from './components/screens/SubmissionStatusScreen';
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

  // Interface language: bilingual ru | en (default ru per requirements)
  const [language, setLanguage] = useState<AppLanguage>('ru');

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
  const [activeTicket, setActiveTicket] = useState<SubmissionTicket | null>({
    id: 'sub-8492',
    stroke: 'forehand',
    strokeTitle: 'Форхенд по линии',
    step: 'review',
    createdAt: 'Только что',
    comment: 'Снимал против подкрученной подачи, обычно не успеваю с разворотом...',
    durationFormatted: '00:24',
  });

  // Toggle between Progressed Profile and Zero State
  const handleToggleState = (zero: boolean) => {
    setIsZeroState(zero);
    if (zero) {
      setProfile({
        ...ZERO_PROFILE,
        profileState: 'empty',
        level: undefined,
        telegramLinked: false,
        notificationsEnabled: false,
      });
      setSegments(ZERO_SEGMENTS);
      setHistory([]);
    } else {
      setProfile({
        ...PROGRESSED_PROFILE,
        profileState: 'filled',
        level: 'recreational',
        telegramLinked: false,
        notificationsEnabled: true,
      });
      setSegments(PROGRESSED_SEGMENTS);
      setHistory(HISTORY_RECORDS);
    }
  };

  // Prototype state overrides for Account tab testing
  const handleSetProfileState = (state: ProfileState) => {
    if (state === 'filled') {
      setProfile(prev => ({
        ...prev,
        profileState: 'filled',
        level: 'recreational',
        profileHand: 'right',
        frequency: '3_4',
        experience: 'y3_7',
        coaching: 'group',
        focus: 'technique',
        injuries: '',
      }));
    } else if (state === 'skipped') {
      setProfile(prev => ({
        ...prev,
        profileState: 'skipped',
        level: undefined,
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        profileState: 'empty',
        level: undefined,
      }));
    }
  };

  const handleSetTelegramLinked = (linked: boolean) => {
    setProfile(prev => ({ ...prev, telegramLinked: linked }));
  };

  const handleSetNotifications = (enabled: boolean) => {
    setProfile(prev => ({ ...prev, notificationsEnabled: enabled }));
  };

  const handleFillProfile = () => {
    setProfile(prev => ({
      ...prev,
      profileState: 'filled',
      level: 'recreational',
      profileHand: 'right',
      frequency: '3_4',
      experience: 'y3_7',
      coaching: 'group',
      focus: 'technique',
      injuries: '',
    }));
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

    const strokeRuNames: Record<StrokeType, string> = {
      forehand: 'Форхенд по линии',
      backhand: 'Бэкхенд по диагонали',
      serve: 'Подача (первая плоская)',
      net: 'Волей у сетки',
      footwork: 'Ноги и сплит-степ',
      rally: 'Розыгрыш на задней линии',
    };

    const newRecord: AnalysisRecord = {
      id: `an-${Date.now().toString().slice(-4)}`,
      stroke: submission.stroke,
      strokeDisplayName: `${submission.stroke.toUpperCase()} • ${submission.focusArea}`,
      recordedAt: language === 'ru' ? 'Только что' : 'Just now',
      localVideoDuration: submission.trimDuration || '00:24',
      supervisionStatus: 'pending_supervisor',
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

    const newTicket: SubmissionTicket = {
      id: `sub-${Date.now().toString().slice(-4)}`,
      stroke: submission.isGeneralReview ? 'general' : submission.stroke,
      strokeTitle: submission.isGeneralReview
        ? (language === 'ru' ? 'Общий обзор розыгрыша' : 'General Rally Overview')
        : (language === 'ru' ? (strokeRuNames[submission.stroke] || submission.stroke) : submission.stroke),
      step: 'review',
      createdAt: language === 'ru' ? 'Только что' : 'Just now',
      comment: submission.sessionNote,
      durationFormatted: submission.trimDuration || '00:24',
      isGeneralReview: submission.isGeneralReview,
      linkedAnalysisId: newRecord.id,
    };

    setHistory([newRecord, ...history]);
    setActiveAnalysisRecord(newRecord);
    setActiveTicket(newTicket);
    setCurrentScreen('submission-status');

    // Update segment focus and metrics dynamically upon video upload
    setSegments(prev =>
      prev.map(s => {
        if (s.id === submission.stroke) {
          const newVideos = (s.videosCount || 0) + 1;
          const newAngles = Math.min(s.totalAnglesRequired || 4, (s.anglesCoveredCount || 0) + 1);
          return {
            ...s,
            coveragePercent: Math.min(100, Math.max(33, s.coveragePercent + 15)),
            aiSlots: Math.max(1, s.aiSlots),
            videosCount: newVideos,
            anglesCoveredCount: newAngles,
            currentFocus: {
              instruction: `Maintain ${submission.focusArea} with high kinetic stability`,
              russianInstruction: `Контролируй «${submission.focusArea}» до конца проводки`,
              status: 'active',
              approvedByCoach: true,
              coachName: 'M. Lindner, PTR Pro',
              assignedAt: 'После новой загрузки',
              aiRationale: 'ИИ скорректировал фокус сегмента по новому видео. Тренер утвердил установку до следующей съемки.',
              recommendedAngle: s.recommendedAngle,
            },
            slots: s.slots.map((sl, idx) =>
              idx === 0 && sl.status === 'empty'
                ? { ...sl, status: 'ai', score: 8.2 }
                : sl
            ),
          };
        }
        return s;
      })
    );

    // Update player profile coverage and count
    setProfile(prev => ({
      ...prev,
      overallCoverage: Math.min(100, Math.max(16, prev.overallCoverage + 10)),
      totalAnalyses: prev.totalAnalyses + 1,
      localDiskUsage: `${(prev.totalAnalyses + 1) * 94} MB (${prev.totalAnalyses + 1} local recordings)`,
    }));
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

        {/* Global Controls: Theme, Profile, Telegram, Push, Language */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Progressed vs Zero State Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-slate-400 px-1 font-mono">Dossier:</span>
            <button
              type="button"
              onClick={() => handleToggleState(false)}
              className={`px-2 py-0.5 rounded-lg transition-colors ${
                !isZeroState ? 'bg-white/20 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              Progressed (48%)
            </button>
            <button
              type="button"
              onClick={() => handleToggleState(true)}
              className={`px-2 py-0.5 rounded-lg transition-colors ${
                isZeroState ? 'bg-white/20 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              Zero State (0%)
            </button>
          </div>

          {/* Account Profile State: filled | skipped | empty */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-slate-400 px-1 font-mono">Profile:</span>
            <button
              id="ctrl-profile-filled"
              type="button"
              onClick={() => handleSetProfileState('filled')}
              className={`px-2 py-0.5 rounded-lg transition-colors ${
                profile.profileState === 'filled' && profile.level
                  ? 'bg-blue-600 text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Filled
            </button>
            <button
              id="ctrl-profile-skipped"
              type="button"
              onClick={() => handleSetProfileState('skipped')}
              className={`px-2 py-0.5 rounded-lg transition-colors ${
                profile.profileState === 'skipped'
                  ? 'bg-blue-600 text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Skipped
            </button>
            <button
              id="ctrl-profile-empty"
              type="button"
              onClick={() => handleSetProfileState('empty')}
              className={`px-2 py-0.5 rounded-lg transition-colors ${
                profile.profileState === 'empty' || (!profile.level && profile.profileState !== 'skipped')
                  ? 'bg-blue-600 text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Empty
            </button>
          </div>

          {/* Telegram State: linked | not linked */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-slate-400 px-1 font-mono">Telegram:</span>
            <button
              id="ctrl-telegram-linked"
              type="button"
              onClick={() => handleSetTelegramLinked(true)}
              className={`px-2 py-0.5 rounded-lg transition-colors ${
                profile.telegramLinked
                  ? 'bg-emerald-600 text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Linked
            </button>
            <button
              id="ctrl-telegram-not-linked"
              type="button"
              onClick={() => handleSetTelegramLinked(false)}
              className={`px-2 py-0.5 rounded-lg transition-colors ${
                !profile.telegramLinked
                  ? 'bg-white/20 text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Not Linked
            </button>
          </div>

          {/* Notifications State: on | off */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-slate-400 px-1 font-mono">Push:</span>
            <button
              id="ctrl-push-on"
              type="button"
              onClick={() => handleSetNotifications(true)}
              className={`px-2 py-0.5 rounded-lg transition-colors ${
                profile.notificationsEnabled
                  ? 'bg-emerald-600 text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              On
            </button>
            <button
              id="ctrl-push-off"
              type="button"
              onClick={() => handleSetNotifications(false)}
              className={`px-2 py-0.5 rounded-lg transition-colors ${
                !profile.notificationsEnabled
                  ? 'bg-white/20 text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Off
            </button>
          </div>

          {/* Language Toggle: RU | EN */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
            <button
              id="ctrl-lang-ru"
              type="button"
              onClick={() => setLanguage('ru')}
              className={`px-2 py-0.5 rounded-lg transition-colors font-mono font-bold ${
                language === 'ru' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              RU
            </button>
            <button
              id="ctrl-lang-en"
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-lg transition-colors font-mono font-bold ${
                language === 'en' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
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
            <button
              type="button"
              onClick={() => {
                setActiveTab('account');
                setCurrentScreen('account-profile');
              }}
              className={`px-2.5 py-1 rounded-full border transition-all ${
                currentScreen === 'account-profile'
                  ? 'bg-blue-600 text-white border-blue-500'
                  : theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-slate-300'
                  : 'bg-white border-slate-300 text-slate-700'
              }`}
            >
              Profile Push
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('account');
                setCurrentScreen('account-telegram');
              }}
              className={`px-2.5 py-1 rounded-full border transition-all ${
                currentScreen === 'account-telegram'
                  ? 'bg-blue-600 text-white border-blue-500'
                  : theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-slate-300'
                  : 'bg-white border-slate-300 text-slate-700'
              }`}
            >
              Telegram Push
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('account');
                setCurrentScreen('account-language');
              }}
              className={`px-2.5 py-1 rounded-full border transition-all ${
                currentScreen === 'account-language'
                  ? 'bg-blue-600 text-white border-blue-500'
                  : theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-slate-300'
                  : 'bg-white border-slate-300 text-slate-700'
              }`}
            >
              Language Push
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('account');
                setCurrentScreen('account-about');
              }}
              className={`px-2.5 py-1 rounded-full border transition-all ${
                currentScreen === 'account-about'
                  ? 'bg-blue-600 text-white border-blue-500'
                  : theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-slate-300'
                  : 'bg-white border-slate-300 text-slate-700'
              }`}
            >
              About Push
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
                  language={language}
                  latestAnalysis={history[0]}
                  activeSubmission={activeTicket}
                  onOpenSubmissionStatus={() => setCurrentScreen('submission-status')}
                  onSelectAnalysis={handleOpenAnalysis}
                  onSelectSegment={handleOpenSegment}
                  onOpenIntake={(stroke) => handleOpenIntake(stroke || 'forehand')}
                  onOpenTelegram={() => {
                    setActiveTab('account');
                    setCurrentScreen('account-telegram');
                  }}
                />
              )}

              {currentScreen === 'submission-status' && (
                <SubmissionStatusScreen
                  ticket={
                    activeTicket || {
                      id: 'sub-8492',
                      stroke: 'forehand',
                      strokeTitle: 'Форхенд по линии',
                      step: 'review',
                      createdAt: 'Только что',
                      comment: 'Снимал против подкрученной подачи, обычно не успеваю с разворотом...',
                      durationFormatted: '00:24',
                    }
                  }
                  theme={theme}
                  language={language}
                  onClose={() => setCurrentScreen('home')}
                  onRecordAnother={() => handleOpenIntake()}
                  onViewReport={() => {
                    if (activeAnalysisRecord) {
                      setCurrentScreen('analysis');
                    } else if (history.length > 0) {
                      setActiveAnalysisRecord(history[0]);
                      setCurrentScreen('analysis');
                    }
                  }}
                />
              )}

              {currentScreen === 'segment' && (
                <SegmentScreen
                  segment={currentSegment}
                  theme={theme}
                  language={language}
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
                  language={language}
                  onToggleTheme={newTheme => setTheme(newTheme)}
                  onToggleNotifications={() =>
                    setProfile(prev => ({ ...prev, notificationsEnabled: !prev.notificationsEnabled }))
                  }
                  onOpenProfile={() => setCurrentScreen('account-profile')}
                  onOpenLinkTelegram={() => setCurrentScreen('account-telegram')}
                  onOpenLanguage={() => setCurrentScreen('account-language')}
                  onOpenAbout={() => setCurrentScreen('account-about')}
                  onSignOut={() => setCurrentScreen('signin')}
                  onDeleteAccount={() => {
                    handleToggleState(true);
                    setCurrentScreen('signin');
                  }}
                />
              )}

              {currentScreen === 'account-profile' && (
                <PlayerProfilePush
                  profile={profile}
                  theme={theme}
                  language={language}
                  onBack={() => setCurrentScreen('account')}
                  onFillProfile={handleFillProfile}
                />
              )}

              {currentScreen === 'account-telegram' && (
                <LinkTelegramPush
                  profile={profile}
                  theme={theme}
                  language={language}
                  onBack={() => setCurrentScreen('account')}
                  onLinkSuccess={() => {
                    setProfile(prev => ({ ...prev, telegramLinked: true }));
                    setCurrentScreen('account');
                  }}
                />
              )}

              {currentScreen === 'account-language' && (
                <LanguagePush
                  theme={theme}
                  language={language}
                  onBack={() => setCurrentScreen('account')}
                  onSelectLanguage={lang => setLanguage(lang)}
                />
              )}

              {currentScreen === 'account-about' && (
                <AboutPush
                  theme={theme}
                  language={language}
                  onBack={() => setCurrentScreen('account')}
                />
              )}

              {/* Persistent Native Tab Bar (Rule: Таббар не прятать на push (сегмент, разбор)) */}
              {currentScreen !== 'splash' &&
                currentScreen !== 'signin' &&
                currentScreen !== 'analysis-detail' &&
                currentScreen !== 'submission-status' && (
                  <div className="absolute bottom-0 left-0 right-0 z-30">
                    <TabBar
                      activeTab={activeTab}
                      onSelectTab={handleSelectTab}
                      theme={theme}
                    />
                  </div>
                )}

              {/* Modal Sheet: Video Trim & Intake Flow */}
              {showIntake && (
                <IntakeFlowModal
                  initialStroke={intakeDefaultStroke}
                  theme={theme}
                  language={language}
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
