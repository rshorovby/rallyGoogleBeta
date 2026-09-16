import React, { useState } from 'react';
import { IPhoneFrame } from '../common/IPhoneFrame';
import { TabBar } from '../common/TabBar';
import { SplashScreen } from '../screens/SplashScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { SegmentScreen } from '../screens/SegmentScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { AnalysisScreen } from '../screens/AnalysisScreen';
import { AnalysisPointModal } from '../screens/AnalysisPointModal';
import { AccountScreen } from '../screens/AccountScreen';
import { PlayerProfilePush } from '../screens/PlayerProfilePush';
import { LinkTelegramPush } from '../screens/LinkTelegramPush';
import { LanguagePush } from '../screens/LanguagePush';
import { AboutPush } from '../screens/AboutPush';
import { SubmissionStatusScreen } from '../screens/SubmissionStatusScreen';
import {
  PROGRESSED_PROFILE,
  ZERO_PROFILE,
  PROGRESSED_SEGMENTS,
  SAMPLE_ANALYSIS,
  HISTORY_RECORDS,
} from '../../data/mockData';
import { StrokeSegmentData } from '../../types';

export const AllScreensMatrix: React.FC = () => {
  const [activeThemeFilter, setActiveThemeFilter] = useState<'both' | 'dark' | 'light'>('both');
  const [activeScreenTab, setActiveScreenTab] = useState<string>('all');

  const forehandSegment: StrokeSegmentData = PROGRESSED_SEGMENTS[0];

  const screens = [
    {
      id: 'splash',
      name: '1. Icon & Splash',
      description: 'Court line geometry & coverage ring on calm canvas (static, no animation)',
      render: (theme: 'light' | 'dark') => (
        <SplashScreen theme={theme} onEnterApp={() => {}} />
      ),
      hasTabBar: false,
    },
    {
      id: 'signin',
      name: '2. Sign in with Apple',
      description: 'RallyMind name, one confident sentence on why Apple, official button',
      render: (theme: 'light' | 'dark') => (
        <SignInScreen theme={theme} onSignIn={() => {}} />
      ),
      hasTabBar: false,
    },
    {
      id: 'home',
      name: '3. Home (Главная)',
      description: 'Who we are, Telegram link, Send Video, Dossier card, 6 segments, filming guide',
      render: (theme: 'light' | 'dark') => (
        <HomeScreen
          profile={PROGRESSED_PROFILE}
          segments={PROGRESSED_SEGMENTS}
          theme={theme}
          latestAnalysis={SAMPLE_ANALYSIS}
          onSelectSegment={() => {}}
          onOpenIntake={() => {}}
          onOpenTelegram={() => {}}
        />
      ),
      hasTabBar: true,
      activeTab: 'home' as const,
    },
    {
      id: 'segment',
      name: '4. Segment (Сегмент)',
      description: 'Forehand stroke coverage, 3 informational slots, what to film, submissions list',
      render: (theme: 'light' | 'dark') => (
        <SegmentScreen
          segment={forehandSegment}
          theme={theme}
          onBack={() => {}}
          onOpenIntakeForSegment={() => {}}
          onSelectAnalysis={() => {}}
          recentRecords={HISTORY_RECORDS}
        />
      ),
      hasTabBar: true,
      activeTab: 'home' as const,
    },
    {
      id: 'history',
      name: '5. History (История)',
      description: 'Analysis counter, segment & supervisor filters, chronological cards, NO video thumbnails',
      render: (theme: 'light' | 'dark') => (
        <HistoryScreen
          records={HISTORY_RECORDS}
          theme={theme}
          onSelectRecord={() => {}}
        />
      ),
      hasTabBar: true,
      activeTab: 'history' as const,
    },
    {
      id: 'analysis',
      name: '6. Analysis (Разбор)',
      description: 'Local video, coach supervision badge, summary, 0-10 scores, focus, delete from iPhone',
      render: (theme: 'light' | 'dark') => (
        <AnalysisScreen
          record={SAMPLE_ANALYSIS}
          theme={theme}
          onBack={() => {}}
          onOpenDetails={() => {}}
          onDeleteLocal={() => {}}
        />
      ),
      hasTabBar: true,
      activeTab: 'history' as const,
    },
    {
      id: 'point',
      name: '7. Analysis Point (Пункт разбора)',
      description: 'Single card: defect & how to close it, 1-3 pagination, no likes or lesson links',
      render: (theme: 'light' | 'dark') => (
        <AnalysisPointModal
          points={SAMPLE_ANALYSIS.points}
          theme={theme}
          onClose={() => {}}
        />
      ),
      hasTabBar: false,
    },
    {
      id: 'account',
      name: '8. Account Root (Аккаунт)',
      description: 'Player (read-only), Channels (Telegram + Push), Appearance (Theme + Language), App, Session',
      render: (theme: 'light' | 'dark') => (
        <AccountScreen
          profile={PROGRESSED_PROFILE}
          theme={theme}
          language="ru"
          onToggleTheme={() => {}}
          onToggleNotifications={() => {}}
          onOpenProfile={() => {}}
          onOpenLinkTelegram={() => {}}
          onOpenLanguage={() => {}}
          onOpenAbout={() => {}}
          onSignOut={() => {}}
          onDeleteAccount={() => {}}
        />
      ),
      hasTabBar: true,
      activeTab: 'account' as const,
    },
    {
      id: 'account-profile',
      name: '9. Push: Player Profile (Профиль игрока)',
      description: '7 read-only fields matching bot onboarding, level label, generic mode note if skipped',
      render: (theme: 'light' | 'dark') => (
        <PlayerProfilePush
          profile={PROGRESSED_PROFILE}
          theme={theme}
          language="ru"
          onBack={() => {}}
          onFillProfile={() => {}}
        />
      ),
      hasTabBar: true,
      activeTab: 'account' as const,
    },
    {
      id: 'account-telegram',
      name: '10. Push: Link Telegram (Привязать Telegram)',
      description: 'Two-way linking: Code from the bot (text field) & Code for the bot (monospace generator)',
      render: (theme: 'light' | 'dark') => (
        <LinkTelegramPush
          profile={PROGRESSED_PROFILE}
          theme={theme}
          language="ru"
          onBack={() => {}}
          onLinkSuccess={() => {}}
        />
      ),
      hasTabBar: true,
      activeTab: 'account' as const,
    },
    {
      id: 'account-language',
      name: '11. Push: Language (Язык)',
      description: 'Russian & English selector, immediate interface localization toggle',
      render: (theme: 'light' | 'dark') => (
        <LanguagePush
          theme={theme}
          language="ru"
          onBack={() => {}}
          onSelectLanguage={() => {}}
        />
      ),
      hasTabBar: true,
      activeTab: 'account' as const,
    },
    {
      id: 'account-about',
      name: '12. Push: About (О приложении)',
      description: 'RallyMind 1.0, player channel specification, staff coach stays in Forum',
      render: (theme: 'light' | 'dark') => (
        <AboutPush
          theme={theme}
          language="ru"
          onBack={() => {}}
        />
      ),
      hasTabBar: true,
      activeTab: 'account' as const,
    },
    {
      id: 'submission-status',
      name: '13. Submission Status (Статус заявки)',
      description: '4-step kinetic pipeline: Queued, Review, Ready, Coach verified; privacy card; and active requests',
      render: (theme: 'light' | 'dark') => (
        <SubmissionStatusScreen
          ticket={{
            id: 'sub-8492',
            stroke: 'forehand',
            strokeTitle: 'Форхенд по линии',
            step: 'review',
            createdAt: 'Только что',
            comment: 'Снимал против подкрученной подачи, обычно не успеваю с разворотом...',
            durationFormatted: '00:24',
          }}
          theme={theme}
          language="ru"
          onClose={() => {}}
          onRecordAnother={() => {}}
          onViewReport={() => {}}
        />
      ),
      hasTabBar: false,
    },
  ];

  const filteredScreens =
    activeScreenTab === 'all' ? screens : screens.filter(s => s.id === activeScreenTab);

  return (
    <div className="w-full min-h-screen bg-[#060911] text-slate-100 p-6 sm:p-8">
      {/* Top Gallery Bar */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D2FF1F]" />
              <span className="text-xs font-mono tracking-widest uppercase text-blue-400">
                Screen Catalog Matrix
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">All RallyMind Screens</h1>
            <p className="text-xs text-slate-400 mt-1">
              Full specification mockups in Light and Dark mode with Dynamic Island and persistent Tab Bar.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Theme filter */}
            <div className="flex p-1 rounded-xl bg-white/5 border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setActiveThemeFilter('both')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  activeThemeFilter === 'both' ? 'bg-blue-600 text-white' : 'text-slate-400'
                }`}
              >
                Both Modes
              </button>
              <button
                type="button"
                onClick={() => setActiveThemeFilter('dark')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  activeThemeFilter === 'dark' ? 'bg-blue-600 text-white' : 'text-slate-400'
                }`}
              >
                Dark Only
              </button>
              <button
                type="button"
                onClick={() => setActiveThemeFilter('light')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  activeThemeFilter === 'light' ? 'bg-blue-600 text-white' : 'text-slate-400'
                }`}
              >
                Light Only
              </button>
            </div>
          </div>
        </div>

        {/* Screen Picker Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-4 pb-2">
          <button
            type="button"
            onClick={() => setActiveScreenTab('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all ${
              activeScreenTab === 'all'
                ? 'bg-white text-black border-white'
                : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            All Screens ({screens.length})
          </button>
          {screens.map(s => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveScreenTab(s.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all ${
                activeScreenTab === s.id
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Screen Display Grid */}
      <div className="max-w-7xl mx-auto space-y-16">
        {filteredScreens.map(screen => (
          <div key={screen.id} className="pt-2">
            <div className="mb-4">
              <h2 className="text-xl font-bold tracking-tight text-white">{screen.name}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{screen.description}</p>
            </div>

            <div className="flex flex-wrap items-start justify-center gap-8 lg:gap-12">
              {/* Dark Mode Mockup */}
              {(activeThemeFilter === 'both' || activeThemeFilter === 'dark') && (
                <div className="flex flex-col items-center">
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                    iPhone 16 Pro • Dark (Court Night)
                  </span>
                  <div className="scale-[0.92] sm:scale-100 origin-top">
                    <IPhoneFrame theme="dark">
                      <div className="relative flex-1 w-full flex flex-col overflow-hidden">
                        {screen.render('dark')}
                        {screen.hasTabBar && (
                          <div className="absolute bottom-0 left-0 right-0 z-40">
                            <TabBar
                              activeTab={screen.activeTab || 'home'}
                              onSelectTab={() => {}}
                              theme="dark"
                            />
                          </div>
                        )}
                      </div>
                    </IPhoneFrame>
                  </div>
                </div>
              )}

              {/* Light Mode Mockup */}
              {(activeThemeFilter === 'both' || activeThemeFilter === 'light') && (
                <div className="flex flex-col items-center">
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                    iPhone 16 Pro • Light (Court Daylight)
                  </span>
                  <div className="scale-[0.92] sm:scale-100 origin-top">
                    <IPhoneFrame theme="light">
                      <div className="relative flex-1 w-full flex flex-col overflow-hidden">
                        {screen.render('light')}
                        {screen.hasTabBar && (
                          <div className="absolute bottom-0 left-0 right-0 z-40">
                            <TabBar
                              activeTab={screen.activeTab || 'home'}
                              onSelectTab={() => {}}
                              theme="light"
                            />
                          </div>
                        )}
                      </div>
                    </IPhoneFrame>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
