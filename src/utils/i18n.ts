import { getAbsoluteLocaleUrl, getRelativeLocaleUrl } from 'astro:i18n';

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
    'site.title': 'Ansagan Islamgaliev — Senior Full-Stack .NET & React Engineer',
    'site.description': 'Live CV and engineering portfolio for Ansagan Islamgaliev. Specialized in ASP.NET Core, .NET 8, React, and Azure enterprise systems.',
    'nav.overview': 'Overview',
    'nav.projects': 'Projects',
    'nav.cv': 'CV',
    'nav.pdf': 'PDF CV',
    'theme.toggle': 'Toggle dark/light theme',
    'theme.darkMode': 'Dark theme',
    'a11y.skipToContent': 'Skip to content',
    'theme.dark': 'Dark',
    'theme.light': 'Light',
    'cta.downloadPdf': 'Download PDF CV',
    'cta.print': 'Print / Save as PDF',
    'cta.contact': 'Email me',
    'cta.viewTimeline': 'Full CV',
    'cta.backToTop': 'Back to Top',
    'footer.rights': 'All rights reserved.',
    'footer.updated': 'Updated',
    'footer.builtWith': 'Engineered with Astro & Tailwind CSS',
    'site.name': 'Ansagan Islamgaliev',
    'contact.title': 'Contact & Channels',
    'contact.location': 'Location:',
    'contact.email': 'Email:',
    'contact.phone': 'Phone:',
    'metrics.title': 'Highlights',
    'skills.title': 'Tech stack',
    'skills.backend': 'Backend & Cloud Platform',
    'skills.frontend': 'Frontend & Visualization',
    'skills.architecture': 'Architecture & Practices',
    'projects.title': 'Projects',
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
    'notFound.title': 'Page not found',
    'notFound.body': 'This page does not exist or has moved.',
  },
  ru: {
    'site.title': 'Ансаган Исламгалиев — Ведущий Full-Stack разработчик (.NET / React)',
    'site.description': 'Интерактивное резюме и инженерное портфолио Ансагана Исламгалиева. Специализация: ASP.NET Core, .NET 8, React и корпоративные системы Azure.',
    'nav.overview': 'Обзор',
    'nav.projects': 'Проекты',
    'nav.cv': 'CV',
    'nav.pdf': 'PDF резюме',
    'theme.toggle': 'Переключить тему оформления',
    'theme.darkMode': 'Тёмная тема',
    'a11y.skipToContent': 'Перейти к содержанию',
    'theme.dark': 'Темная',
    'theme.light': 'Светлая',
    'cta.downloadPdf': 'Скачать резюме в PDF',
    'cta.print': 'Печать / Сохранить в PDF',
    'cta.contact': 'Написать мне',
    'cta.viewTimeline': 'Полное резюме',
    'cta.backToTop': 'Наверх',
    'footer.rights': 'Все права защищены.',
    'footer.updated': 'Обновлено',
    'footer.builtWith': 'Разработано на Astro и Tailwind CSS',
    'site.name': 'Ансаган Исламгалиев',
    'contact.title': 'Контакты и каналы связи',
    'contact.location': 'Город:',
    'contact.email': 'Email:',
    'contact.phone': 'Телефон:',
    'metrics.title': 'Ключевые результаты',
    'skills.title': 'Технологический стек',
    'skills.backend': 'Backend и облачные платформы',
    'skills.frontend': 'Frontend и визуализация',
    'skills.architecture': 'Архитектура и практики',
    'projects.title': 'Проекты',
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
    'notFound.title': 'Страница не найдена',
    'notFound.body': 'Такой страницы нет, или она была перемещена.',
  },
  kk: {
    'site.title': 'Аңсаған Исламғалиев — Жоғары санатты Full-Stack әзірлеуші (.NET / React)',
    'site.description': 'Аңсаған Исламғалиевтің интерактивті өмірбаяны және инженерлік портфолиосы. ASP.NET Core, .NET 8, React және Azure кәсіпорындық жүйелері.',
    'nav.overview': 'Шолу',
    'nav.projects': 'Жобалар',
    'nav.cv': 'CV',
    'nav.pdf': 'PDF өмірбаян',
    'theme.toggle': 'Көрініс тақырыбын ауыстыру',
    'theme.darkMode': 'Күңгірт тақырып',
    'a11y.skipToContent': 'Мазмұнға өту',
    'theme.dark': 'Күңгірт',
    'theme.light': 'Жарық',
    'cta.downloadPdf': 'PDF нұсқасын жүктеу',
    'cta.print': 'Басып шығару / PDF етіп сақтау',
    'cta.contact': 'Маған жазу',
    'cta.viewTimeline': 'Толық өмірбаян',
    'cta.backToTop': 'Жоғарыға',
    'footer.rights': 'Барлық құқықтар қорғалған.',
    'footer.updated': 'Жаңартылған',
    'footer.builtWith': 'Astro және Tailwind CSS технологияларымен әзірленген',
    'site.name': 'Аңсаған Исламғалиев',
    'contact.title': 'Байланыс және арналар',
    'contact.location': 'Қала:',
    'contact.email': 'Email:',
    'contact.phone': 'Телефон:',
    'metrics.title': 'Негізгі нәтижелер',
    'skills.title': 'Технологиялық стек',
    'skills.backend': 'Backend және бұлттық платформалар',
    'skills.frontend': 'Frontend және визуализация',
    'skills.architecture': 'Архитектура және тәжірибелер',
    'projects.title': 'Жобалар',
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
    'notFound.title': 'Бет табылмады',
    'notFound.body': 'Мұндай бет жоқ немесе басқа мекенжайға көшірілген.',
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
 * Strips the base and locale prefix from a pathname, leaving the page path
 * e.g., "/ru/cv/" -> "cv", "/kk/" -> "", "/cv/" -> "cv"
 */
function getPagePath(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const withoutBase = base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  const segments = withoutBase.split('/').filter(Boolean);
  if (segments.length > 0 && (LOCALES as readonly string[]).includes(segments[0])) {
    segments.shift();
  }
  return segments.join('/');
}

/**
 * Route-preserving root-relative URL of the same page in another locale.
 * Astro's i18n helper applies `base` and `trailingSlash`, so links match the canonical URL exactly.
 * e.g., getLocalizedPath("/cv/", "ru") -> "/ru/cv/"
 * getLocalizedPath("/ru/cv/", "en") -> "/cv/"
 * getLocalizedPath("/kk/", "en") -> "/"
 */
export function getLocalizedPath(pathname: string, targetLocale: Locale): string {
  return getRelativeLocaleUrl(targetLocale, getPagePath(pathname));
}

/**
 * Absolute form of getLocalizedPath on `site`, for canonical, hreflang and og:url.
 */
export function getLocalizedUrl(pathname: string, targetLocale: Locale): string {
  return getAbsoluteLocaleUrl(targetLocale, getPagePath(pathname));
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

/**
 * Returns canonical PDF CV filename per locale
 */
export function getPdfCvFilename(locale: Locale): string {
  if (locale === 'ru') return 'Ansagan_Islamgaliev_CV_RU.pdf';
  if (locale === 'kk') return 'Ansagan_Islamgaliev_CV_KK.pdf';
  return 'Ansagan_Islamgaliev_CV.pdf';
}

/**
 * Returns the public root-relative URL to the prebuilt PDF CV
 */
export function getPdfCvPath(locale: Locale): string {
  return `/cv/${getPdfCvFilename(locale)}`;
}

