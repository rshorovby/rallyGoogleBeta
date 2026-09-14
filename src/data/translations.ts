import {
  AppLanguage,
  ProfileLevel,
  ProfileHand,
  ProfileFrequency,
  ProfileExperience,
  ProfileCoaching,
  ProfileFocus,
} from '../types';

export interface Translations {
  account: {
    title: string;
    sectionPlayer: string;
    playerProfileTitle: string;
    playerNotFilled: string;
    sectionChannels: string;
    telegramNotLinked: string;
    telegramLinked: string;
    telegramSubtitleNotLinked: string;
    notificationsTitle: string;
    notificationsFootnote: string;
    sectionAppearance: string;
    themeTitle: string;
    themeLight: string;
    themeDark: string;
    languageTitle: string;
    sectionApp: string;
    aboutTitle: string;
    versionFootnote: string;
    sectionSession: string;
    signOut: string;
    deleteAccount: string;
    deleteAlertTitle: string;
    deleteAlertMessage: string;
    deleteAlertCancel: string;
    deleteAlertConfirm: string;
  };
  profilePush: {
    title: string;
    level: string;
    hand: string;
    frequency: string;
    experience: string;
    coaching: string;
    focus: string;
    injuries: string;
    injuriesNone: string;
    hintFilled: string;
    hintSkipped: string;
    hintEmpty: string;
    fillCta: string;
  };
  telegramPush: {
    title: string;
    botCodeSection: string;
    botCodeDesc: string;
    botCodePlaceholder: string;
    linkButton: string;
    appCodeSection: string;
    appCodeDesc: string;
    revealButton: string;
    copyCode: string;
    copied: string;
    successMessage: string;
  };
  languagePush: {
    title: string;
    russian: string;
    english: string;
  };
  aboutPush: {
    title: string;
    appName: string;
    version: string;
    body: string;
  };
  common: {
    back: string;
  };
}

export const TRANSLATIONS: Record<AppLanguage, Translations> = {
  ru: {
    account: {
      title: 'Аккаунт',
      sectionPlayer: 'Игрок',
      playerProfileTitle: 'Профиль игрока',
      playerNotFilled: 'Не заполнен',
      sectionChannels: 'Каналы',
      telegramNotLinked: 'Telegram не привязан',
      telegramLinked: 'Telegram привязан',
      telegramSubtitleNotLinked: 'Код из бота',
      notificationsTitle: 'Уведомления о разборе',
      notificationsFootnote: 'Первый запрос системных уведомлений появится после первого отправленного видео.',
      sectionAppearance: 'Оформление',
      themeTitle: 'Тема',
      themeLight: 'Светлая',
      themeDark: 'Тёмная',
      languageTitle: 'Язык',
      sectionApp: 'Приложение',
      aboutTitle: 'О приложении',
      versionFootnote: 'RallyMind 1.0',
      sectionSession: 'Сессия',
      signOut: 'Выйти',
      deleteAccount: 'Удалить аккаунт',
      deleteAlertTitle: 'Удалить аккаунт?',
      deleteAlertMessage: 'Аккаунт удалится на сервере. Это нельзя отменить.',
      deleteAlertCancel: 'Отмена',
      deleteAlertConfirm: 'Удалить',
    },
    profilePush: {
      title: 'Профиль игрока',
      level: 'Уровень',
      hand: 'Рука',
      frequency: 'Частота',
      experience: 'Стаж',
      coaching: 'Тренер',
      focus: 'Цель',
      injuries: 'Травмы',
      injuriesNone: 'нет',
      hintFilled: 'Поля как в онбординге бота. Редактирования в приложении нет.',
      hintSkipped: 'Настройка была пропущена. Разборы идут в общем режиме.',
      hintEmpty: 'Профиль не заполнен. Разборы идут в общем режиме.',
      fillCta: 'Заполнить профиль',
    },
    telegramPush: {
      title: 'Привязать Telegram',
      botCodeSection: 'Код из бота',
      botCodeDesc: 'Введите 6-значный код, выданный ботом @RallyMindCoachBot',
      botCodePlaceholder: 'НАПРИМЕР: 692-140',
      linkButton: 'Привязать',
      appCodeSection: 'Код для бота',
      appCodeDesc: 'Или отправьте этот код в бот командой /link',
      revealButton: 'Показать код приложения',
      copyCode: 'Скопировать',
      copied: 'Скопировано',
      successMessage: 'Telegram успешно привязан',
    },
    languagePush: {
      title: 'Язык',
      russian: 'Русский',
      english: 'English',
    },
    aboutPush: {
      title: 'О приложении',
      appName: 'RallyMind',
      version: 'RallyMind 1.0',
      body: 'Нативный канал игрока RallyMind. Видео на разбор, отчёт и прогресс. Штатный тренер остаётся в Forum.',
    },
    common: {
      back: 'Назад',
    },
  },
  en: {
    account: {
      title: 'Account',
      sectionPlayer: 'Player',
      playerProfileTitle: 'Player profile',
      playerNotFilled: 'Not filled',
      sectionChannels: 'Channels',
      telegramNotLinked: 'Telegram not linked',
      telegramLinked: 'Telegram linked',
      telegramSubtitleNotLinked: 'Code from the bot',
      notificationsTitle: 'Review notifications',
      notificationsFootnote: 'System notification request will appear after your first video submission.',
      sectionAppearance: 'Appearance',
      themeTitle: 'Theme',
      themeLight: 'Light',
      themeDark: 'Dark',
      languageTitle: 'Language',
      sectionApp: 'App',
      aboutTitle: 'About',
      versionFootnote: 'RallyMind 1.0',
      sectionSession: 'Session',
      signOut: 'Sign Out',
      deleteAccount: 'Delete Account',
      deleteAlertTitle: 'Delete Account?',
      deleteAlertMessage: 'The account will be deleted on the server. This cannot be undone.',
      deleteAlertCancel: 'Cancel',
      deleteAlertConfirm: 'Delete',
    },
    profilePush: {
      title: 'Player profile',
      level: 'Level',
      hand: 'Hand',
      frequency: 'How often',
      experience: 'Experience',
      coaching: 'Coaching',
      focus: 'Focus',
      injuries: 'Injuries',
      injuriesNone: 'none',
      hintFilled: 'Fields as in bot onboarding. No editing in the app.',
      hintSkipped: 'Setup was skipped. Reviews run in generic mode.',
      hintEmpty: 'Profile is not filled. Reviews run in generic mode.',
      fillCta: 'Fill in profile',
    },
    telegramPush: {
      title: 'Link Telegram',
      botCodeSection: 'Code from the bot',
      botCodeDesc: 'Enter the 6-digit code provided by @RallyMindCoachBot',
      botCodePlaceholder: 'E.G.: 692-140',
      linkButton: 'Link',
      appCodeSection: 'Code for the bot',
      appCodeDesc: 'Or send this code to the bot using /link',
      revealButton: 'Show App Code',
      copyCode: 'Copy',
      copied: 'Copied',
      successMessage: 'Telegram linked successfully',
    },
    languagePush: {
      title: 'Language',
      russian: 'Русский',
      english: 'English',
    },
    aboutPush: {
      title: 'About',
      appName: 'RallyMind',
      version: 'RallyMind 1.0',
      body: 'Native player channel for RallyMind. Video for review, report, and progress. The staff coach stays in Forum.',
    },
    common: {
      back: 'Back',
    },
  },
};

export const LEVEL_LABELS: Record<AppLanguage, Record<ProfileLevel, string>> = {
  ru: {
    beginner: 'Начинающий',
    recreational: 'Любитель',
    advanced: 'Продвинутый',
    competitive: 'Pro',
  },
  en: {
    beginner: 'Beginner',
    recreational: 'Recreational',
    advanced: 'Advanced',
    competitive: 'Pro',
  },
};

export const HAND_LABELS: Record<AppLanguage, Record<ProfileHand, string>> = {
  ru: {
    right: 'Правая',
    left: 'Левая',
  },
  en: {
    right: 'Right',
    left: 'Left',
  },
};

export const FREQUENCY_LABELS: Record<AppLanguage, Record<ProfileFrequency, string>> = {
  ru: {
    '1': '1 раз в неделю',
    '2': '2 раза в неделю',
    '3_4': '3–4 раза',
    '5_plus': '5+ раз',
  },
  en: {
    '1': 'Once a week',
    '2': 'Twice a week',
    '3_4': '3–4 times',
    '5_plus': '5+ times',
  },
};

export const EXPERIENCE_LABELS: Record<AppLanguage, Record<ProfileExperience, string>> = {
  ru: {
    under_1: 'Меньше года',
    y1_3: '1–3 года',
    y3_7: '3–7 лет',
    y7_15: '7–15 лет',
    y15_plus: '15+ лет',
  },
  en: {
    under_1: 'Under a year',
    y1_3: '1–3 years',
    y3_7: '3–7 years',
    y7_15: '7–15 years',
    y15_plus: '15+ years',
  },
};

export const COACHING_LABELS: Record<AppLanguage, Record<ProfileCoaching, string>> = {
  ru: {
    individual: 'Индивидуально',
    group: 'В группе',
    both: 'Индивидуально и в группе',
    none: 'Не занимаюсь',
  },
  en: {
    individual: 'Individual',
    group: 'In a group',
    both: 'Both',
    none: 'None',
  },
};

export const FOCUS_LABELS: Record<AppLanguage, Record<ProfileFocus, string>> = {
  ru: {
    stability: 'Стабильность',
    power: 'Сила',
    technique: 'Техника',
    footwork: 'Ноги и баланс',
    serve: 'Подача',
    all: 'Всё понемногу',
  },
  en: {
    stability: 'Stability',
    power: 'Power',
    technique: 'Technique',
    footwork: 'Footwork & balance',
    serve: 'Serve',
    all: 'A bit of everything',
  },
};
