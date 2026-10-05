import React from 'react';
import { ArrowRight, ShieldAlert, BookOpen, MapPin, Search } from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../data/locales';

interface HeroProps {
  onNavigate: (tab: string) => void;
  lang: Language;
  onOpenSearch: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, lang, onOpenSearch }) => {
  const t = translations[lang];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-900 via-navy-900 to-navy-950 text-white pt-8 pb-16 md:pt-14 md:pb-24 border-b border-navy-800">
      {/* Subtle India Network / Geometric Background Grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Brand Logo & Identity Badge */}
        <div className="flex flex-col items-center justify-center mb-6">
          <img
            src="/safeindia-logo.png"
            alt="SafeIndia Official Logo"
            className="h-28 sm:h-36 md:h-44 w-auto object-contain drop-shadow-2xl hover:scale-102 transition-transform duration-300"
          />
          <span className="inline-flex items-center px-3.5 py-1 mt-4 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-400/30 text-amber-300 tracking-wide uppercase">
            Public Safety Knowledge Platform • India
          </span>
        </div>

        {/* Hero Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
          {t.tagline}
        </h1>

        {/* Supporting Subtext */}
        <p className="mt-4 sm:mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          {t.heroSubtext}
        </p>

        {/* Search Bar Prompt */}
        <div className="mt-8 max-w-xl mx-auto">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between bg-navy-800/90 hover:bg-navy-800 border border-navy-700 text-slate-300 px-5 py-3.5 rounded-2xl shadow-lg transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <span className="flex items-center space-x-3 text-sm sm:text-base text-slate-400">
              <Search className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>{t.emergencySection.searchPlaceholder}</span>
            </span>
            <span className="bg-navy-950 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-navy-800">
              Search
            </span>
          </button>
        </div>

        {/* Three Large Core Interactive Navigation Cards */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          {/* Card 1: Emergencies */}
          <button
            onClick={() => onNavigate('emergencies')}
            className="group relative bg-navy-800/80 hover:bg-navy-800 border-2 border-emergency-500/40 hover:border-emergency-500 p-6 sm:p-8 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-emergency-600/20 hover:-translate-y-1.5 flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-emergency-500"
          >
            <div className="absolute top-4 right-4 bg-emergency-500/20 text-emergency-400 p-2 rounded-xl group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-7 h-7 text-emergency-400" />
            </div>

            <div>
              <div className="inline-flex items-center space-x-2 text-emergency-400 text-xs font-bold uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-emergency-500 animate-ping" />
                <span>Immediate Action</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-emergency-300 transition-colors">
                🚨 {t.heroCards.emergenciesTitle}
              </h2>
              <p className="mt-2 text-sm text-slate-300 font-medium">
                {t.heroCards.emergenciesSubtitle}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between text-xs sm:text-sm font-bold text-emergency-400 group-hover:text-emergency-300">
              <span>{t.heroCards.emergenciesAction}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </button>

          {/* Card 2: Awareness */}
          <button
            onClick={() => onNavigate('awareness')}
            className="group relative bg-navy-800/80 hover:bg-navy-800 border-2 border-navy-600 hover:border-amber-400/80 p-6 sm:p-8 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1.5 flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <div className="absolute top-4 right-4 bg-navy-700 text-amber-400 p-2 rounded-xl group-hover:scale-110 transition-transform">
              <BookOpen className="w-7 h-7 text-amber-400" />
            </div>

            <div>
              <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <span>Prevention & Guides</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-amber-300 transition-colors">
                🛡️ {t.heroCards.awarenessTitle}
              </h2>
              <p className="mt-2 text-sm text-slate-300 font-medium">
                {t.heroCards.awarenessSubtitle}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between text-xs sm:text-sm font-bold text-amber-400 group-hover:text-amber-300">
              <span>{t.heroCards.awarenessAction}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </button>

          {/* Card 3: Resources */}
          <button
            onClick={() => onNavigate('resources')}
            className="group relative bg-navy-800/80 hover:bg-navy-800 border-2 border-brandGreen-600/50 hover:border-brandGreen-500 p-6 sm:p-8 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-brandGreen-600/20 hover:-translate-y-1.5 flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-brandGreen-500"
          >
            <div className="absolute top-4 right-4 bg-brandGreen-950/60 text-brandGreen-400 p-2 rounded-xl group-hover:scale-110 transition-transform">
              <MapPin className="w-7 h-7 text-brandGreen-400" />
            </div>

            <div>
              <div className="inline-flex items-center space-x-2 text-brandGreen-400 text-xs font-bold uppercase tracking-wider mb-2">
                <span>Verified Helplines</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-brandGreen-300 transition-colors">
                📍 {t.heroCards.resourcesTitle}
              </h2>
              <p className="mt-2 text-sm text-slate-300 font-medium">
                {t.heroCards.resourcesSubtitle}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between text-xs sm:text-sm font-bold text-brandGreen-400 group-hover:text-brandGreen-300">
              <span>{t.heroCards.resourcesAction}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </button>

        </div>
      </div>
    </section>
  );
};
