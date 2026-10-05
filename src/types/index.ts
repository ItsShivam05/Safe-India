export type UrgencyLevel = 'critical' | 'high' | 'medium';

export interface VerifiedSource {
  name: string;
  url?: string;
  lastReviewed: string; // e.g. "October 2026"
  authorityType: 'Government' | 'Emergency Services' | 'Medical Authority' | 'Disaster Authority';
}

export interface EmergencyResourceRef {
  name: string;
  phone: string;
  purpose: string;
  url?: string;
}

export interface EmergencyScenario {
  id: string;
  category: 'personal-safety' | 'medical' | 'fire-disaster' | 'road-transport' | 'digital-emergency' | 'animal';
  categoryLabel: { en: string; hi: string };
  iconName: string;
  title: { en: string; hi: string };
  urgency: UrgencyLevel;
  immediateCallNumber?: string;
  immediateActionText?: { en: string; hi: string };
  doNow: { en: string[]; hi: string[] };
  dont: { en: string[]; hi: string[] };
  afterDanger: { en: string[]; hi: string[] };
  resources: EmergencyResourceRef[];
  source: VerifiedSource;
  searchKeywords: string[];
}

export interface AwarenessGuide {
  id: string;
  category: 'personal' | 'digital' | 'home' | 'road' | 'disaster';
  categoryLabel: { en: string; hi: string };
  iconName: string;
  title: { en: string; hi: string };
  summary: { en: string; hi: string };
  doList: { en: string[]; hi: string[] };
  dontList: { en: string[]; hi: string[] };
  checklist?: { en: string[]; hi: string[] };
  source: VerifiedSource;
}

export interface OfficialResource {
  id: string;
  name: { en: string; hi: string };
  category: 'emergency' | 'women-child' | 'cyber' | 'medical' | 'disaster' | 'transport' | 'mental-health';
  categoryLabel: { en: string; hi: string };
  purpose: { en: string; hi: string };
  whoCanUse: { en: string; hi: string };
  phone: string;
  alternatePhone?: string;
  website?: string;
  availability: string; // e.g. "24/7 Toll Free"
  verifiedDate: string;
  source: string;
  isNationalEmergency?: boolean;
}

export type Language = 'en' | 'hi';
