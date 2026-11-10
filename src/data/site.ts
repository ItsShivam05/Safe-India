import { emergencyScenarios } from './emergencies.ts';
import { awarenessGuides } from './awareness.ts';

export const SITE_URL = 'https://safe-india.vercel.app';
export const SITE_NAME = 'SafeIndia';
export const OG_IMAGE_PATH = '/og-image.jpg';

// Where readers report mistakes. Swap for a Google Form link to let people report without a GitHub account.
const REPORT_MISTAKE_BASE = 'https://github.com/ItsShivam05/Safe-India/issues/new';

export const reportMistakeUrl = (pageTitle: string, path: string) =>
  `${REPORT_MISTAKE_BASE}?title=${encodeURIComponent(`Mistake in: ${pageTitle}`)}&body=${encodeURIComponent(
    `Page: ${SITE_URL}${path}\n\nWhat is wrong:\n\nWhat it should say (and a source, if you have one):\n`
  )}`;

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
  tools: '/tools',
  sos: '/sos',
  whereami: '/where-am-i',
  alarm: '/tools/alarm',
  medicalid: '/tools/medical-id',
  complaint: '/tools/complaint',
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
  {
    path: TAB_PATHS.tools,
    title: 'Safety Tools | SafeIndia',
    description: 'SOS to your contacts, your exact location for 112, a loud alarm, a medical ID and complaint drafts. Works without internet.',
  },
  {
    path: TAB_PATHS.sos,
    title: 'SOS to your contacts | SafeIndia',
    description: 'Send your location to two trusted people on WhatsApp or SMS in an emergency.',
  },
  {
    path: TAB_PATHS.whereami,
    title: 'Where am I? Your location for 112 | SafeIndia',
    description: 'See your nearest address and coordinates so you can tell the 112 operator exactly where you are.',
  },
  {
    path: TAB_PATHS.alarm,
    title: 'Loud alarm | SafeIndia',
    description: 'Play a loud siren from your phone to draw attention.',
  },
  {
    path: TAB_PATHS.medicalid,
    title: 'Medical ID | SafeIndia',
    description: 'Keep your blood group, allergies and emergency contact ready to show responders. Saved only on your phone.',
  },
  {
    path: TAB_PATHS.complaint,
    title: 'Complaint drafts for fraud or a lost phone | SafeIndia',
    description: 'Ready-to-copy complaint text for online fraud or a lost or stolen phone.',
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
