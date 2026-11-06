import React from 'react';
import { ArrowRight, ShieldAlert, BookOpen, MapPin, Search, PhoneCall, CheckCircle, ShieldCheck, UserX, Activity, Droplet, Flame, Car, CreditCard } from 'lucide-react';
import type { EmergencyScenario } from '../types';
import { emergencyScenarios } from '../data/emergencies';
import { translations } from '../data/locales';
import { SEARCH_SHORTCUT_LABEL } from '../utils/platform';

interface HeroProps {
  onNavigate: (tab: string) => void;
  onOpenSearch: () => void;
  onSelectScenario: (scenario: EmergencyScenario) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenSearch, onSelectScenario }) => {
  const t = translations.en;

  const quickTiles = [
    { scenarioId: 'someone-following', label: t.heroTiles.following, icon: UserX },
    { scenarioId: 'unconscious-person', label: t.heroTiles.unconscious, icon: Activity },
    { scenarioId: 'severe-bleeding', label: t.heroTiles.bleeding, icon: Droplet },
    { scenarioId: 'building-fire', label: t.heroTiles.fire, icon: Flame },
    { scenarioId: 'road-accident', label: t.heroTiles.accident, icon: Car },
    { scenarioId: 'upi-bank-fraud', label: t.heroTiles.scam, icon: CreditCard },
  ];

  return (
    <section className="bg-ivory text-midnight pt-6 pb-12 md:pt-10 md:pb-16 border-b border-lavender/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Asymmetrical Editorial Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14">
          
          {/* Left Column: Left-aligned editorial copy and primary actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Category / Mission Badge */}
            <div className="inline-flex items-center space-x-2 bg-lavender/40 border border-plum/20 text-midnight px-3.5 py-1 rounded-full text-xs font-bold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-plum" />
              <span>Public Safety & Emergency Companion • India</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-midnight leading-tight">
              Clear steps, verified help, and calm guidance when minutes matter.
            </h1>

            {/* Emergency Tiles: one tap to the right steps */}
            <div>
              <h2 className="text-sm font-extrabold text-midnight mb-2.5">
                {t.heroTiles.title}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {quickTiles.map((tile) => {
                  const Icon = tile.icon;
                  const scenario = emergencyScenarios.find((s) => s.id === tile.scenarioId);
                  if (!scenario) return null;
                  return (
                    <button
                      key={tile.scenarioId}
                      type="button"
                      onClick={() => onSelectScenario(scenario)}
                      className="flex items-center space-x-2.5 bg-white hover:bg-emergency-50 border-2 border-emergency/30 hover:border-emergency rounded-2xl p-3.5 min-h-[64px] text-left text-sm font-bold text-midnight shadow-xs transition-colors active:scale-95"
                    >
                      <Icon className="w-5 h-5 text-emergency shrink-0" />
                      <span className="leading-snug">{tile.label}</span>
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => onNavigate('emergencies')}
                className="mt-3 inline-flex items-center space-x-1.5 text-sm font-bold text-emergency hover:underline"
              >
                <span>{t.heroTiles.seeAll}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Supporting Copy */}
            <p className="hidden sm:block text-base sm:text-lg text-midnight/80 font-normal leading-relaxed max-w-2xl">
              {t.heroSubtext} Step-by-step actions for emergencies, practical daily safety checklists, and fast ways to find nearby police stations, hospitals, and national helplines.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Primary Action: Get Help Near Me */}
              <button
                type="button"
                onClick={() => onNavigate('nearme')}
                className="inline-flex items-center space-x-2.5 bg-plum hover:bg-plum-600 text-white font-bold px-6 py-3.5 rounded-2xl shadow-sm transition-all duration-200 active:scale-95 text-sm sm:text-base border border-plum-600"
              >
                <MapPin className="w-5 h-5 text-lavender" />
                <span>{t.nav.getHelpNearMe}</span>
              </button>

              {/* Secondary Action: Explore Safety Resources */}
              <button
                type="button"
                onClick={() => onNavigate('resources')}
                className="inline-flex items-center space-x-2 bg-white hover:bg-ivory-100 text-midnight font-bold px-5 py-3.5 rounded-2xl border border-lavender shadow-sm transition-all duration-200 active:scale-95 text-sm sm:text-base"
              >
                <span>Explore Safety Resources</span>
                <ArrowRight className="w-4 h-4 text-plum" />
              </button>
            </div>

            {/* Quick Search Trigger Input */}
            <div className="pt-2 max-w-lg">
              <button
                type="button"
                onClick={onOpenSearch}
                className="w-full flex items-center justify-between bg-white hover:bg-ivory-50 border border-lavender/60 text-midnight/70 px-4 py-3 rounded-2xl shadow-xs transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-plum text-left"
              >
                <span className="flex items-center space-x-2.5 text-xs sm:text-sm text-midnight/70">
                  <Search className="w-4 h-4 text-plum group-hover:scale-110 transition-transform" />
                  <span>{t.emergencySection.searchPlaceholder}</span>
                </span>
                <span className="hidden md:inline shrink-0 ml-2 bg-lavender/30 text-midnight text-xs font-bold px-2.5 py-1 rounded-lg border border-lavender">
                  {SEARCH_SHORTCUT_LABEL}
                </span>
              </button>
            </div>

            {/* Reassuring markers */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-midnight/70 pt-1">
              <span className="flex items-center space-x-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-sage-600" />
                <span>Clear, official guidance</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-sage-600" />
                <span>No login, no tracking</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-sage-600" />
                <span>Direct 112 emergency calling</span>
              </span>
            </div>

          </div>

          {/* Right Column: Large Cinematic Anime Illustration */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-lavender/50 bg-midnight group">
              <img
                src="/illustrations/hero_confident_commute.jpg"
                alt="Cinematic 2D anime illustration of an Indian commuter woman walking confidently near a modern metro station during golden hour"
                className="w-full h-[200px] sm:h-[320px] lg:h-[460px] object-cover transition-transform duration-700 group-hover:scale-102"
                loading="eager"
              />
              {/* Subtle gradient vignette at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent pointer-events-none" />

              {/* Inset Caption Badge */}
              <div className="hidden sm:block absolute bottom-4 left-4 right-4 bg-midnight/90 backdrop-blur-xs text-white p-3.5 rounded-2xl border border-white/10 shadow-lg text-left">
                <p className="text-xs font-bold text-lavender tracking-wide uppercase">
                  Everyday Confidence
                </p>
                <p className="text-xs text-ivory/85 mt-0.5 leading-snug">
                  Empowering citizens across Indian transit networks, streets, and community hubs.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Core Pillars: Three Distinct Visual Treatments */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-midnight tracking-tight">
                Core Safety Pillars
              </h2>
              <p className="text-xs sm:text-sm text-midnight/70">
                Three simple ways to protect yourself, stay prepared, and find immediate help.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Pillar 1: Emergencies — Distinct High-Urgency Treatment */}
            <div
              className="relative cursor-pointer bg-white rounded-2xl p-6 border-l-4 border-l-emergency border-t border-r border-b border-lavender/40 shadow-xs hover:shadow-md transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center space-x-1.5 bg-emergency-50 text-emergency text-xs font-extrabold uppercase px-2.5 py-1 rounded-full border border-emergency-200">
                    <span className="w-2 h-2 rounded-full bg-emergency" />
                    <span>Immediate Action</span>
                  </span>
                  <ShieldAlert className="w-6 h-6 text-emergency group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-bold text-midnight group-hover:text-emergency transition-colors">
                  <button
                    type="button"
                    onClick={() => onNavigate('emergencies')}
                    className="text-left font-bold after:absolute after:inset-0 after:rounded-2xl"
                  >
                    {t.heroCards.emergenciesTitle}
                  </button>
                </h3>
                <p className="text-xs sm:text-sm text-midnight/75 mt-1.5 leading-relaxed">
                  {t.heroCards.emergenciesSubtitle}
                </p>
                <div className="mt-3 text-xs text-midnight/70 space-y-1">
                  <p>• Step-by-step immediate actions</p>
                  <p>• Clear warnings on what to avoid</p>
                  <p>• 1-tap emergency calling</p>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-emergency-100 flex items-center justify-between text-xs font-bold text-emergency">
                <span>{t.heroCards.emergenciesAction}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Pillar 2: Awareness — Distinct Reassuring Guide Treatment */}
            <div
              className="relative cursor-pointer bg-lavender/25 rounded-2xl p-6 border-l-4 border-l-plum border-t border-r border-b border-lavender/60 shadow-xs hover:shadow-md transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center space-x-1.5 bg-white text-plum text-xs font-extrabold uppercase px-2.5 py-1 rounded-full border border-lavender">
                    <BookOpen className="w-3.5 h-3.5 text-plum" />
                    <span>Prevention & Daily Safety</span>
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-plum text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BookOpen className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-midnight group-hover:text-plum transition-colors">
                  <button
                    type="button"
                    onClick={() => onNavigate('awareness')}
                    className="text-left font-bold after:absolute after:inset-0 after:rounded-2xl"
                  >
                    {t.heroCards.awarenessTitle}
                  </button>
                </h3>
                <p className="text-xs sm:text-sm text-midnight/75 mt-1.5 leading-relaxed">
                  {t.heroCards.awarenessSubtitle}
                </p>
                <div className="mt-3 text-xs text-midnight/70 space-y-1">
                  <p>• Practical checklists for commuting & home</p>
                  <p>• Easy ways to spot UPI & phone scams</p>
                  <p>• Readiness guides for flood & earthquake</p>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-lavender/60 flex items-center justify-between text-xs font-bold text-plum">
                <span>{t.heroCards.awarenessAction}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Pillar 3: Resources — Distinct Directory & Network Treatment */}
            <div
              className="relative cursor-pointer bg-sage/25 rounded-2xl p-6 border-l-4 border-l-sage-600 border-t border-r border-b border-sage/60 shadow-xs hover:shadow-md transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center space-x-1.5 bg-white text-midnight text-xs font-extrabold uppercase px-2.5 py-1 rounded-full border border-sage">
                    <MapPin className="w-3.5 h-3.5 text-sage-600" />
                    <span>Emergency Helplines</span>
                  </span>
                  <PhoneCall className="w-5 h-5 text-midnight group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-bold text-midnight group-hover:text-sage-700 transition-colors">
                  <button
                    type="button"
                    onClick={() => onNavigate('resources')}
                    className="text-left font-bold after:absolute after:inset-0 after:rounded-2xl"
                  >
                    {t.heroCards.resourcesTitle}
                  </button>
                </h3>
                <p className="text-xs sm:text-sm text-midnight/75 mt-1.5 leading-relaxed">
                  {t.heroCards.resourcesSubtitle}
                </p>
                <div className="mt-3 text-xs text-midnight/70 space-y-1">
                  <p>• 112 National Emergency (Police, Fire, Ambulance)</p>
                  <p>• 1930 Cyber Fraud Helpline</p>
                  <p>• 1091 Women Helpline (24/7)</p>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-sage/60 flex items-center justify-between text-xs font-bold text-midnight">
                <span>{t.heroCards.resourcesAction}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
