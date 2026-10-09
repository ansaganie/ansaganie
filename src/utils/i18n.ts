export const LOCALES = ['en', 'ru', 'kk'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  ru: 'RU',
  kk: 'ҚАЗ',
};

export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
  kk: 'Қазақша',
};

export const UI_TRANSLATIONS: Record<Locale, Record<string, string>> = {
  en: {
    'site.title': 'Angsagan Islyamgaliyev — Senior Full-Stack .NET & React Engineer',
    'site.description': 'Live CV and engineering portfolio for Angsagan Islyamgaliyev. Specialized in ASP.NET Core, .NET 8, React, and Azure mission-critical enterprise systems.',
    'nav.overview': 'Overview',
    'nav.cv': 'CV Timeline',
    'nav.pdf': 'PDF CV',
    'theme.toggle': 'Toggle dark/light theme',
    'theme.darkMode': 'Dark theme',
    'a11y.skipToContent': 'Skip to content',
    'theme.dark': 'Dark',
    'theme.light': 'Light',
    'cta.downloadPdf': 'Download PDF CV',
    'cta.print': 'Print / Save as PDF',
    'cta.contact': 'Contact Me',
    'cta.viewTimeline': 'View Career Timeline',
    'cta.backToTop': 'Back to Top',
    'footer.rights': 'All rights reserved.',
    'footer.atsCompliant': 'Semantic HTML5 & ATS-Engine Compliant',
    'footer.builtWith': 'Engineered with Astro & Tailwind CSS',
    'meta.availability': 'Available for enterprise contracts & senior roles',
    'site.name': 'Angsagan Islyamgaliyev',
    'contact.title': 'Contact & Channels',
    'contact.location': 'Location:',
    'contact.email': 'Email:',
    'contact.phone': 'Phone:',
    'metrics.title': 'Enterprise Impact Metrics',
    'metrics.subtitle': 'Verified Key Outcomes',
    'skills.title': 'Architectural Competencies & Tech Stack',
    'skills.backend': 'Backend & Cloud Platform',
    'skills.frontend': 'Frontend & Visualization',
    'skills.architecture': 'Architecture & Practices',
    'projects.title': 'Featured Engineering Projects',
    'projects.subtitle': 'Mission-Critical Systems',
    'projects.enterprise': 'ENTERPRISE',
    'projects.impact': 'Impact:',
    'projects.github': 'GitHub',
    'projects.live': 'Live Project',
    'cv.summary': 'Professional Summary',
    'cv.skills': 'Technical Competencies',
    'cv.skillsPrimary': 'Languages & Frameworks:',
    'cv.skillsFrontend': 'Frontend & Visualization:',
    'cv.skillsBackend': 'Backend & Cloud:',
    'cv.skillsArchitecture': 'Architecture & Practices:',
    'cv.experience': 'Work Experience',
    'cv.details': 'Details & Deliverables',
    'cv.honors': 'Enterprise Honors & Recognitions',
    'cv.certs': 'Certifications & Credentials',
    'cv.verify': 'Verify',
    'cv.education': 'Education & Formal Qualifications',
    'cv.languages': 'Languages',
  },
  ru: {
    'site.title': 'Аңсаған Ислямғалиев — Ведущий Full-Stack разработчик (.NET / React)',
    'site.description': 'Интерактивное резюме и инженерное портфолио Аңсағана Ислямғалиева. Специализация: ASP.NET Core, .NET 8, React и критически важные корпоративные системы Azure.',
    'nav.overview': 'Обзор',
    'nav.cv': 'Опыт и CV',
    'nav.pdf': 'PDF резюме',
    'theme.toggle': 'Переключить тему оформления',
    'theme.darkMode': 'Тёмная тема',
    'a11y.skipToContent': 'Перейти к содержанию',
    'theme.dark': 'Темная',
    'theme.light': 'Светлая',
    'cta.downloadPdf': 'Скачать резюме в PDF',
    'cta.print': 'Печать / Сохранить в PDF',
    'cta.contact': 'Связаться',
    'cta.viewTimeline': 'Полная хронология карьеры',
    'cta.backToTop': 'Наверх',
    'footer.rights': 'Все права защищены.',
    'footer.atsCompliant': 'Семантический HTML5 и 100% совместимость с ATS',
    'footer.builtWith': 'Разработано на Astro и Tailwind CSS',
    'meta.availability': 'Открыт к корпоративным контрактам и предложениям',
    'site.name': 'Аңсаған Ислямғалиев',
    'contact.title': 'Контакты и каналы связи',
    'contact.location': 'Город:',
    'contact.email': 'Email:',
    'contact.phone': 'Телефон:',
    'metrics.title': 'Ключевые показатели эффективности',
    'metrics.subtitle': 'Подтверждённые результаты',
    'skills.title': 'Архитектурные компетенции и технологический стек',
    'skills.backend': 'Backend и облачные платформы',
    'skills.frontend': 'Frontend и визуализация',
    'skills.architecture': 'Архитектура и практики',
    'projects.title': 'Избранные инженерные проекты',
    'projects.subtitle': 'Критически важные системы',
    'projects.enterprise': 'КОРПОРАТИВНЫЙ',
    'projects.impact': 'Результат:',
    'projects.github': 'GitHub',
    'projects.live': 'Живой проект',
    'cv.summary': 'Профессиональное резюме',
    'cv.skills': 'Технические компетенции',
    'cv.skillsPrimary': 'Языки и фреймворки:',
    'cv.skillsFrontend': 'Frontend и визуализация:',
    'cv.skillsBackend': 'Backend и облако:',
    'cv.skillsArchitecture': 'Архитектура и практики:',
    'cv.experience': 'Опыт работы',
    'cv.details': 'Подробности и результаты',
    'cv.honors': 'Корпоративные награды и признание',
    'cv.certs': 'Сертификаты и квалификации',
    'cv.verify': 'Проверить',
    'cv.education': 'Образование и квалификации',
    'cv.languages': 'Языки',
  },
  kk: {
    'site.title': 'Аңсаған Ислямғалиев — Жоғары санатты Full-Stack әзірлеуші (.NET / React)',
    'site.description': 'Аңсаған Ислямғалиевтің интерактивті өмірбаяны және инженерлік портфолиосы. ASP.NET Core, .NET 8, React және Azure кәсіпорындық шешімдері.',
    'nav.overview': 'Шолу',
    'nav.cv': 'Өмірбаян',
    'nav.pdf': 'PDF өмірбаян',
    'theme.toggle': 'Көрініс тақырыбын ауыстыру',
    'theme.darkMode': 'Күңгірт тақырып',
    'a11y.skipToContent': 'Мазмұнға өту',
    'theme.dark': 'Күңгірт',
    'theme.light': 'Жарық',
    'cta.downloadPdf': 'PDF нұсқасын жүктеу',
    'cta.print': 'Басып шығару / PDF етіп сақтау',
    'cta.contact': 'Байланысу',
    'cta.viewTimeline': 'Толық мансап жолы',
    'cta.backToTop': 'Жоғарыға',
    'footer.rights': 'Барлық құқықтар қорғалған.',
    'footer.atsCompliant': 'Семантикалық HTML5 және ATS сәйкестігі 100%',
    'footer.builtWith': 'Astro және Tailwind CSS технологияларымен әзірленген',
    'meta.availability': 'Келісім-шарттар мен жобаларға ашық',
    'site.name': 'Аңсаған Ислямғалиев',
    'contact.title': 'Байланыс және арналар',
    'contact.location': 'Қала:',
    'contact.email': 'Email:',
    'contact.phone': 'Телефон:',
    'metrics.title': 'Негізгі нәтиже көрсеткіштері',
    'metrics.subtitle': 'Расталған нәтижелер',
    'skills.title': 'Архитектуралық құзыреттер және технологиялар',
    'skills.backend': 'Backend және бұлттық платформалар',
    'skills.frontend': 'Frontend және визуализация',
    'skills.architecture': 'Архитектура және тәжірибелер',
    'projects.title': 'Таңдаулы инженерлік жобалар',
    'projects.subtitle': 'Аса маңызды жүйелер',
    'projects.enterprise': 'КӘСІПОРЫНДЫҚ',
    'projects.impact': 'Нәтиже:',
    'projects.github': 'GitHub',
    'projects.live': 'Жұмыс істеп тұрған жоба',
    'cv.summary': 'Кәсіби түйіндеме',
    'cv.skills': 'Техникалық құзыреттер',
    'cv.skillsPrimary': 'Тілдер мен фреймворктер:',
    'cv.skillsFrontend': 'Frontend және визуализация:',
    'cv.skillsBackend': 'Backend және бұлт:',
    'cv.skillsArchitecture': 'Архитектура және тәжірибелер:',
    'cv.experience': 'Жұмыс тәжірибесі',
    'cv.details': 'Толық мәліметтер мен нәтижелер',
    'cv.honors': 'Кәсіпорындық марапаттар мен мойындау',
    'cv.certs': 'Сертификаттар мен біліктіліктер',
    'cv.verify': 'Тексеру',
    'cv.education': 'Білім және біліктіліктер',
    'cv.languages': 'Тілдер',
  },
};

/**
 * Extracts current locale from a URL pathname
 */
export function getLocaleFromUrl(url: URL | string): Locale {
  const pathname = typeof url === 'string' ? url : url.pathname;
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && (LOCALES as readonly string[]).includes(segments[0])) {
    return segments[0] as Locale;
  }
  return DEFAULT_LOCALE;
}

/**
 * Strips locale prefix from a pathname
 * e.g., "/ru/cv" -> "/cv", "/kk" -> "/"
 */
export function stripLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && (LOCALES as readonly string[]).includes(segments[0])) {
    segments.shift();
  }
  const clean = '/' + segments.join('/');
  return clean === '' ? '/' : clean;
}

/**
 * Formats route-preserving localized path
 * e.g., getLocalizedPath("/cv", "ru") -> "/ru/cv"
 * getLocalizedPath("/ru/cv", "en") -> "/cv"
 * getLocalizedPath("/ru/cv", "kk") -> "/kk/cv"
 */
export function getLocalizedPath(pathname: string, targetLocale: Locale): string {
  const cleanPath = stripLocaleFromPath(pathname);
  if (targetLocale === DEFAULT_LOCALE) {
    return cleanPath;
  }
  if (cleanPath === '/') {
    return `/${targetLocale}`;
  }
  return `/${targetLocale}${cleanPath}`;
}

/**
 * Translation helper
 */
export function useTranslations(locale: Locale) {
  const dict = UI_TRANSLATIONS[locale] || UI_TRANSLATIONS[DEFAULT_LOCALE];
  return function t(key: string): string {
    return dict[key] || UI_TRANSLATIONS[DEFAULT_LOCALE][key] || key;
  };
}
