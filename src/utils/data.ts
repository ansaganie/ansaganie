import cvEn from '../data/cv-en.json';
import cvRu from '../data/cv-ru.json';
import cvKk from '../data/cv-kk.json';
import { candidateProfileSchema, type CandidateProfile } from '../schemas/cv';
import type { Locale } from './i18n';

const profiles: Record<Locale, CandidateProfile> = {
  en: candidateProfileSchema.parse(cvEn),
  ru: candidateProfileSchema.parse(cvRu),
  kk: candidateProfileSchema.parse(cvKk),
};

export function getCandidateProfile(locale: Locale): CandidateProfile {
  return profiles[locale] || profiles.en;
}
