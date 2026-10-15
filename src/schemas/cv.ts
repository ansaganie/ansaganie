import { z } from 'zod';

export const periodSchema = z.object({
  start: z.string().regex(/^\d{4}-\d{2}$/, 'Start date must be in YYYY-MM format'),
  end: z.string().regex(/^\d{4}-\d{2}$/, 'End date must be in YYYY-MM format').nullable().optional(),
  display: z.string(),
});

export const experienceSchema = z.object({
  id: z.string(),
  roleTitle: z.string(),
  company: z.string(),
  department: z.string().optional(),
  client: z.string().optional(),
  location: z.string(),
  period: periodSchema,
  roleType: z.enum(['fullstack', 'frontend', 'backend', 'domain']),
  summary: z.string(),
  keyMetrics: z.array(z.string()).optional(),
  achievements: z.array(z.string()),
  technologies: z.array(z.string()),
  defaultExpanded: z.boolean().default(false),
});

export const metricSchema = z.object({
  id: z.string(),
  headline: z.string(),
  label: z.string(),
  impact: z.string(),
  project: z.string(),
  details: z.string(),
  technologies: z.array(z.string()),
});

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  role: z.string(),
  client: z.string().optional(),
  projectType: z.enum(['enterprise', 'commercial', 'opensource']),
  featured: z.boolean().default(false),
  impact: z.string().optional(),
  metrics: z.array(z.string()).optional(),
  technologies: z.array(z.string()),
  architectureDiagram: z.string().optional(),
  githubUrl: z.url().optional(),
  liveUrl: z.url().optional(),
});

export const certificationSchema = z.object({
  id: z.string(),
  title: z.string(),
  issuer: z.string(),
  issueDate: z.string(),
  credentialId: z.string().optional(),
  verificationUrl: z.url(),
  iconName: z.string(),
});

export const honorSchema = z.object({
  id: z.string(),
  title: z.string(),
  organization: z.string(),
  year: z.number().int(),
  citation: z.string(),
  badgeType: z.enum(['coin', 'certificate', 'award']),
});

export const educationSchema = z.object({
  id: z.string(),
  institution: z.string(),
  degree: z.string(),
  field: z.string(),
  period: z.string(),
  location: z.string(),
});

export const languageSkillSchema = z.object({
  language: z.string(),
  proficiency: z.string(),
  code: z.string(),
});

export const contactInfoSchema = z.object({
  email: z.email(),
  phone: z.string(),
  telegram: z.url(),
  linkedin: z.url(),
  github: z.url(),
  location: z.string(),
  availability: z.string().optional(),
});

export const candidateProfileSchema = z.object({
  locale: z.enum(['en', 'ru', 'kk']),
  name: z.string(),
  title: z.string(),
  elevatorPitch: z.string(),
  summary: z.string(),
  updatedAt: z.string().optional(),
  contact: contactInfoSchema,
  metrics: z.array(metricSchema),
  skills: z.object({
    primary: z.array(z.string()),
    frontend: z.array(z.string()),
    backend: z.array(z.string()),
    cloudDevops: z.array(z.string()),
    architecture: z.array(z.string()),
  }),
  experience: z.array(experienceSchema),
  projects: z.array(projectSchema),
  certifications: z.array(certificationSchema),
  honors: z.array(honorSchema),
  education: z.array(educationSchema),
  languages: z.array(languageSkillSchema),
});

export type CandidateProfile = z.infer<typeof candidateProfileSchema>;
export type ExperienceItem = z.infer<typeof experienceSchema>;
export type MetricItem = z.infer<typeof metricSchema>;
export type ProjectItem = z.infer<typeof projectSchema>;
export type CertificationItem = z.infer<typeof certificationSchema>;
export type HonorItem = z.infer<typeof honorSchema>;
export type EducationItem = z.infer<typeof educationSchema>;
export type LanguageSkillItem = z.infer<typeof languageSkillSchema>;
export type ContactInfoItem = z.infer<typeof contactInfoSchema>;
