import { emergencyScenarios } from './emergencies.ts';
import { awarenessGuides } from './awareness.ts';

export const SITE_URL = 'https://safe-india.vercel.app';
export const SITE_NAME = 'SafeIndia';
export const OG_IMAGE_PATH = '/og-image.jpg';

const DEFAULT_TITLE = 'SafeIndia — Know what to do when it matters.';
const DEFAULT_DESCRIPTION =
  'Practical emergency guidance, safety awareness and official helplines for everyone in India. Step-by-step help when it matters.';

export const TAB_PATHS: Record<string, string> = {
  home: '/',
  emergencies: '/emergencies',
  nearme: '/near-me',
  awareness: '/awareness',
  resources: '/resources',
  about: '/about',
};

export const scenarioPath = (id: string) => `/emergencies/${id}`;
export const awarenessPath = (id: string) => `/awareness/${id}`;
export const absoluteUrl = (path: string) => `${SITE_URL}${path}`;

export interface PageMeta {
  path: string;
  title: string;
  description: string;
}

// Every real page on the site. Used for the browser tab title, link previews and the sitemap.
export const allPages: PageMeta[] = [
  { path: TAB_PATHS.home, title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
  {
    path: TAB_PATHS.emergencies,
    title: 'Emergency Guides | SafeIndia',
    description: 'Step-by-step guidance for medical, fire, road, personal safety and digital emergencies in India.',
  },
  {
    path: TAB_PATHS.nearme,
    title: 'Find Emergency Help Near Me | SafeIndia',
    description: 'Find nearby police stations, hospitals and fire stations on a map, anywhere in India.',
  },
  {
    path: TAB_PATHS.awareness,
    title: 'Safety Awareness & Prevention | SafeIndia',
    description: 'Practical guides and checklists to protect yourself, your family and your digital accounts.',
  },
  {
    path: TAB_PATHS.resources,
    title: 'Emergency Numbers & Helplines in India | SafeIndia',
    description: 'National emergency numbers and helplines in India, including 112, 108, 101, 1091 and 1930.',
  },
  {
    path: TAB_PATHS.about,
    title: 'About SafeIndia',
    description: 'What SafeIndia is, the sources it refers to, and how it handles privacy and accessibility.',
  },
  ...emergencyScenarios.map((sc) => ({
    path: scenarioPath(sc.id),
    title: `${sc.title.en}: what to do | SafeIndia`,
    description: sc.immediateActionText?.en ?? DEFAULT_DESCRIPTION,
  })),
  ...awarenessGuides.map((guide) => ({
    path: awarenessPath(guide.id),
    title: `${guide.title.en} | SafeIndia`,
    description: guide.summary.en,
  })),
];

export const getPageMeta = (pathname: string): PageMeta => {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return allPages.find((page) => page.path === clean) ?? allPages[0];
};
