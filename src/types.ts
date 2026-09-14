/**
 * RallyMind — iOS Tennis Technique Coverage & AI Analysis System
 * Types and Schema definitions
 */

export type ThemeMode = 'light' | 'dark';
export type AppLanguage = 'ru' | 'en';

export type TabId = 'home' | 'history' | 'account';

export type ScreenId =
  | 'splash'
  | 'signin'
  | 'home'
  | 'segment'
  | 'history'
  | 'analysis'
  | 'analysis-detail'
  | 'account'
  | 'account-profile'
  | 'account-telegram'
  | 'account-language'
  | 'account-about';

export type ProfileLevel = 'beginner' | 'recreational' | 'advanced' | 'competitive';
export type ProfileHand = 'right' | 'left';
export type ProfileFrequency = '1' | '2' | '3_4' | '5_plus';
export type ProfileExperience = 'under_1' | 'y1_3' | 'y3_7' | 'y7_15' | 'y15_plus';
export type ProfileCoaching = 'individual' | 'group' | 'both' | 'none';
export type ProfileFocus = 'stability' | 'power' | 'technique' | 'footwork' | 'serve' | 'all';
export type ProfileState = 'filled' | 'skipped' | 'empty';

export interface PlayerProfile {
  name: string;
  hand: 'Right-handed' | 'Left-handed';
  dominantGrip: string;
  playStyle: string;
  totalAnalyses: number;
  overallCoverage: number; // percentage
  telegramLinked: boolean;
  telegramCode?: string;
  localDiskUsage: string;
  // iOS v1 Player profile quiz data
  profileState: ProfileState;
  level?: ProfileLevel;
  profileHand?: ProfileHand;
  frequency?: ProfileFrequency;
  experience?: ProfileExperience;
  coaching?: ProfileCoaching;
  focus?: ProfileFocus;
  injuries?: string;
  notificationsEnabled: boolean;
  telegramAppCode: string;
}

export type StrokeType =
  | 'forehand'
  | 'backhand'
  | 'serve'
  | 'net'
  | 'footwork'
  | 'rally';

export type SlotStatus = 'empty' | 'ai' | 'anchored';

export interface TechniqueSlot {
  id: string;
  name: string;
  status: SlotStatus; // 'empty' = Unclosed, 'ai' = AI Analyzed, 'anchored' = Coach Verified
  metricLabel: string;
  score?: number; // 0.0 - 10.0
}

export interface StrokeSegmentData {
  id: StrokeType;
  title: string;
  russianTitle: string;
  coveragePercent: number; // 0 - 100
  totalSlots: number;
  anchoredSlots: number;
  aiSlots: number;
  whatToFilmNext: string;
  recommendedAngle: string;
  slots: TechniqueSlot[];
  activeSubmissionsCount: number;
}

export type SupervisionStatus = 'coach_confirmed' | 'ai_verified' | 'pending_supervisor';

export interface AnalysisObservation {
  id: string;
  pointNumber: number; // 1 to 3
  title: string;
  issueDescription: string;
  correctionDirective: string;
  kineticsImpact: string;
}

export interface AnalysisRecord {
  id: string;
  stroke: StrokeType;
  strokeDisplayName: string;
  recordedAt: string;
  localVideoDuration: string;
  supervisionStatus: SupervisionStatus;
  coachName?: string;
  overallScore: number; // 0 - 10
  metrics: {
    contactPoint: number;
    kineticChain: number;
    balance: number;
    coilingAngle?: number;
  };
  summary: string;
  primaryFocus: string;
  whatToFilmNext: string;
  points: AnalysisObservation[];
}

export interface IntakeSubmission {
  stroke: StrokeType;
  focusArea: string;
  sessionNote: string;
  source: 'camera' | 'photos';
}
