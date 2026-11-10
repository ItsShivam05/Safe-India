import React from 'react';
import { ArrowRight, ShieldAlert, BookOpen, MapPin, Search, PhoneCall, CheckCircle, ShieldCheck, UserX, Activity, Droplet, Flame, Car, CreditCard, LocateFixed, Siren } from 'lucide-react';
import type { EmergencyScenario } from '../types';
import { emergencyScenarios } from '../data/emergencies';
import { useLanguage } from '../i18n/language';
import { SEARCH_SHORTCUT_LABEL } from '../utils/platform';

interface HeroProps {
  onNavigate: (tab: string) => void;
  onOpenSearch: () => void;
  onSelectScenario: (scenario: EmergencyScenario) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenSearch, onSelectScenario }) => {
  const { t } = useLanguage();

  const quickTiles = [
    { scenarioId: 'someone-following', label: t.heroTiles.following, icon: UserX },
    { scenarioId: 'unconscious-person', label: t.heroTiles.unconscious, icon: Activity },
    { scenarioId: 'severe-bleeding', label: t.heroTiles.bleeding, icon: Droplet },
    { scenarioId: 'building-fire', label: t.heroTiles.fire, icon: Flame },
    { scenarioId: 'road-accident', label: t.heroTiles.accident, icon: Car },
    { scenarioId: 'upi-bank-fraud', label: t.heroTiles.scam, icon: CreditCard },
  ];

  const pillars = [
    {
      tab: 'emergencies',
      badge: t.hero.pillar1Badge,
      title: t.heroCards.emergenciesTitle,
      subtitle: t.heroCards.emergenciesSubtitle,
      points: t.hero.pillar1Points,
      action: t.heroCards.emergenciesAction,
      card: 'bg-white border-l-emergency border-lavender/40',
      badgeClass: 'bg-emergency-50 text-emergency border-emergency-200',
      badgeIcon: <span className="w-2 h-2 rounded-full bg-emergency" />,
      cornerIcon: <ShieldAlert className="w-6 h-6 text-emergency group-hover:scale-110 transition-transform" />,
      titleHover: 'group-hover:text-emergency',
      footer: 'border-emergency-100 text-emergency',
    },
    {
      tab: 'awareness',
      badge: t.hero.pillar2Badge,
      title: t.heroCards.awarenessTitle,
      subtitle: t.heroCards.awarenessSubtitle,
      points: t.hero.pillar2Points,
      action: t.heroCards.awarenessAction,
      card: 'bg-lavender/25 border-l-plum border-lavender/60',
      badgeClass: 'bg-white text-plum border-lavender',
      badgeIcon: <BookOpen className="w-3.5 h-3.5 text-plum" />,
      cornerIcon: (
        <div className="w-7 h-7 rounded-lg bg-plum text-white flex items-center justify-center group-hover:scale-110 transition-transform">
          <BookOpen className="w-4 h-4" />
        </div>
      ),
      titleHover: 'group-hover:text-plum',
      footer: 'border-lavender/60 text-plum',
    },
    {
      tab: 'resources',
      badge: t.hero.pillar3Badge,
      title: t.heroCards.resourcesTitle,
      subtitle: t.heroCards.resourcesSubtitle,
      points: t.hero.pillar3Points,
      action: t.heroCards.resourcesAction,
      card: 'bg-sage/25 border-l-sage-600 border-sage/60',
      badgeClass: 'bg-white text-midnight border-sage',
      badgeIcon: <MapPin className="w-3.5 h-3.5 text-sage-600" />,
      cornerIcon: <PhoneCall className="w-5 h-5 text-midnight group-hover:scale-110 transition-transform" />,
      titleHover: 'group-hover:text-sage-700',
      footer: 'border-sage/60 text-midnight',
    },
  ];

  return (
    <section className="bg-ivory text-midnight pt-6 pb-12 md:pt-10 md:pb-16 border-b border-lavender/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14">

          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 bg-lavender/40 border border-plum/20 text-midnight px-3.5 py-1 rounded-full text-xs font-bold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-plum" />
              <span>{t.hero.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-midnight leading-tight">
              {t.hero.headline}
            </h1>

            {/* Emergency Tiles: one tap to the right steps */}
            <div>
              <h2 className="text-sm font-extrabold text-midnight mb-2.5">{t.heroTiles.title}</h2>
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

              {/* The three fastest ways to get help */}
              <div className="grid grid-cols-3 gap-2.5 mt-2.5">
                <a
                  href="tel:112"
                  className="flex flex-col sm:flex-row items-center justify-center gap-1.5 bg-emergency hover:bg-emergency-600 text-white rounded-2xl p-3 text-xs sm:text-sm font-black text-center"
                >
                  <PhoneCall className="w-5 h-5 shrink-0" />
                  <span>{t.heroTiles.call112}</span>
                </a>
                <button
                  type="button"
                  onClick={() => onNavigate('whereami')}
                  className="flex flex-col sm:flex-row items-center justify-center gap-1.5 bg-midnight hover:bg-midnight-800 text-white rounded-2xl p-3 text-xs sm:text-sm font-bold text-center"
                >
                  <LocateFixed className="w-5 h-5 shrink-0 text-lavender" />
                  <span>{t.heroTiles.whereAmI}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('sos')}
                  className="flex flex-col sm:flex-row items-center justify-center gap-1.5 bg-white hover:bg-emergency-50 border-2 border-emergency text-emergency rounded-2xl p-3 text-xs sm:text-sm font-black text-center"
                >
                  <Siren className="w-5 h-5 shrink-0" />
                  <span>{t.heroTiles.sos}</span>
                </button>
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

            <p className="hidden sm:block text-base sm:text-lg text-midnight/80 font-normal leading-relaxed max-w-2xl">
              {t.heroSubtext} {t.hero.subtextExtra}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('nearme')}
                className="inline-flex items-center space-x-2.5 bg-plum hover:bg-plum-600 text-white font-bold px-6 py-3.5 rounded-2xl shadow-sm transition-all duration-200 active:scale-95 text-sm sm:text-base border border-plum-600"
              >
                <MapPin className="w-5 h-5 text-lavender" />
                <span>{t.nav.getHelpNearMe}</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('resources')}
                className="inline-flex items-center space-x-2 bg-white hover:bg-ivory-100 text-midnight font-bold px-5 py-3.5 rounded-2xl border border-lavender shadow-sm transition-all duration-200 active:scale-95 text-sm sm:text-base"
              >
                <span>{t.hero.exploreResources}</span>
                <ArrowRight className="w-4 h-4 text-plum" />
              </button>
            </div>

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

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-midnight/70 pt-1">
              {[t.hero.markerSources, t.hero.markerPrivacy, t.hero.marker112].map((marker) => (
                <span key={marker} className="flex items-center space-x-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-sage-600" />
                  <span>{marker}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-lavender/50 bg-midnight group">
              <img
                src="/illustrations/hero_confident_commute.jpg"
                alt={t.hero.imageAlt}
                className="w-full h-[200px] sm:h-[320px] lg:h-[460px] object-cover transition-transform duration-700 group-hover:scale-102"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent pointer-events-none" />
              <div className="hidden sm:block absolute bottom-4 left-4 right-4 bg-midnight/90 backdrop-blur-xs text-white p-3.5 rounded-2xl border border-white/10 shadow-lg text-left">
                <p className="text-xs font-bold text-lavender tracking-wide uppercase">{t.hero.captionTitle}</p>
                <p className="text-xs text-ivory/85 mt-0.5 leading-snug">{t.hero.captionBody}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-black text-midnight tracking-tight">{t.hero.pillarsTitle}</h2>
            <p className="text-xs sm:text-sm text-midnight/70">{t.hero.pillarsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pillars.map((pillar) => (
              <div
                key={pillar.tab}
                className={`relative cursor-pointer rounded-2xl p-6 border-l-4 border-t border-r border-b shadow-xs hover:shadow-md transition-all duration-200 group flex flex-col justify-between ${pillar.card}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center space-x-1.5 text-xs font-extrabold uppercase px-2.5 py-1 rounded-full border ${pillar.badgeClass}`}>
                      {pillar.badgeIcon}
                      <span>{pillar.badge}</span>
                    </span>
                    {pillar.cornerIcon}
                  </div>
                  <h3 className={`text-xl font-bold text-midnight transition-colors ${pillar.titleHover}`}>
                    <button
                      type="button"
                      onClick={() => onNavigate(pillar.tab)}
                      className="text-left font-bold after:absolute after:inset-0 after:rounded-2xl"
                    >
                      {pillar.title}
                    </button>
                  </h3>
                  <p className="text-xs sm:text-sm text-midnight/75 mt-1.5 leading-relaxed">{pillar.subtitle}</p>
                  <div className="mt-3 text-xs text-midnight/70 space-y-1">
                    {pillar.points.map((point) => (
                      <p key={point}>• {point}</p>
                    ))}
                  </div>
                </div>

                <div className={`mt-6 pt-3 border-t flex items-center justify-between text-xs font-bold ${pillar.footer}`}>
                  <span>{pillar.action}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
