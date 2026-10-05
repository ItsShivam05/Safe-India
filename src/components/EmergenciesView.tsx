import React, { useState } from 'react';
import type { EmergencyScenario, Language } from '../types';

import { emergencyScenarios } from '../data/emergencies';
import { translations } from '../data/locales';
import {
  ShieldAlert,
  Search,
  ChevronRight,
  PhoneCall,
  UserX,
  Car,
  Activity,
  Droplet,
  Flame,
  Wind,
  CreditCard,
  Smartphone,
  Shield,
  AlertTriangle
} from 'lucide-react';

interface EmergenciesViewProps {
  onSelectScenario: (scenario: EmergencyScenario) => void;
  lang: Language;
}

export const EmergenciesView: React.FC<EmergenciesViewProps> = ({
  onSelectScenario,
  lang,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const t = translations[lang];

  const categories = [
    { id: 'all', label: t.emergencySection.allCategories },
    { id: 'personal-safety', label: lang === 'en' ? 'Personal Safety' : 'व्यक्तिगत सुरक्षा' },
    { id: 'medical', label: lang === 'en' ? 'Medical Emergency' : 'चिकित्सा आपात स्थिति' },
    { id: 'fire-disaster', label: lang === 'en' ? 'Fire & Disaster' : 'आग एवं आपदा' },
    { id: 'road-transport', label: lang === 'en' ? 'Road & Transport' : 'सड़क एवं परिवहन' },
    { id: 'digital-emergency', label: lang === 'en' ? 'Digital Emergency' : 'डिजिटल आपात स्थिति' },
    { id: 'animal', label: lang === 'en' ? 'Animal Emergency' : 'पशु आपात स्थिति' },
  ];

  const filteredScenarios = emergencyScenarios.filter((sc) => {
    const matchesCategory = activeCategory === 'all' || sc.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      sc.title[lang].toLowerCase().includes(q) ||
      sc.searchKeywords.some((k) => k.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserX': return <UserX className="w-6 h-6" />;
      case 'Car': return <Car className="w-6 h-6" />;
      case 'Activity': return <Activity className="w-6 h-6" />;
      case 'Droplet': return <Droplet className="w-6 h-6" />;
      case 'Flame': return <Flame className="w-6 h-6" />;
      case 'Wind': return <Wind className="w-6 h-6" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6" />;
      case 'CreditCard': return <CreditCard className="w-6 h-6" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6" />;
      case 'Shield': return <Shield className="w-6 h-6" />;
      default: return <AlertTriangle className="w-6 h-6" />;
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* Header */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center space-x-2 bg-emergency-100 text-emergency-700 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-emergency-200 mb-3">
          <ShieldAlert className="w-4 h-4 text-emergency-600 animate-pulse" />
          <span>Immediate Response</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          🚨 {t.emergencySection.title}
        </h1>
        <p className="mt-2 text-slate-600 text-base sm:text-lg">
          {t.emergencySection.subheading}
        </p>
      </div>

      {/* Quick Search & Category Filter Pills */}
      <div className="mb-8 space-y-4">
        <div className="max-w-xl mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.emergencySection.searchPlaceholder}
            className="w-full bg-white border border-slate-300 focus:border-navy-800 rounded-2xl pl-11 pr-4 py-3 text-sm sm:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-navy-800/20 text-slate-900 placeholder-slate-400"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-start md:justify-center overflow-x-auto pb-2 gap-2 scrollbar-none px-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-navy-800 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Emergency Scenario Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScenarios.map((sc) => {
          const isCritical = sc.urgency === 'critical';
          return (
            <div
              key={sc.id}
              onClick={() => onSelectScenario(sc)}
              className={`group cursor-pointer bg-white rounded-2xl p-6 border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${
                isCritical
                  ? 'border-emergency-500/30 hover:border-emergency-500 shadow-sm'
                  : 'border-slate-200 hover:border-navy-600 shadow-sm'
              }`}
            >
              <div>
                {/* Urgency Badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl ${
                      isCritical
                        ? 'bg-emergency-100 text-emergency-700'
                        : 'bg-navy-50 text-navy-800'
                    }`}
                  >
                    {renderIcon(sc.iconName)}
                  </div>

                  <span
                    className={`text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${
                      isCritical
                        ? 'bg-emergency-600 text-white border-emergency-700 animate-pulse'
                        : 'bg-amber-100 text-amber-800 border-amber-300'
                    }`}
                  >
                    {isCritical ? 'Critical Action' : 'High Priority'}
                  </span>
                </div>

                {/* Scenario Title */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-navy-900 transition-colors leading-snug">
                  {sc.title[lang]}
                </h3>
              </div>

              {/* Action Footer preview */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold">
                {sc.immediateCallNumber ? (
                  <span className="inline-flex items-center space-x-1 text-emergency-600 font-extrabold">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call {sc.immediateCallNumber}</span>
                  </span>
                ) : (
                  <span className="text-navy-800">View Protocol</span>
                )}

                <span className="inline-flex items-center text-slate-400 group-hover:text-navy-900 group-hover:translate-x-1 transition-all">
                  <span>View Steps</span>
                  <ChevronRight className="w-4 h-4 ml-0.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredScenarios.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 max-w-md mx-auto">
          <p className="text-slate-600 font-semibold mb-2">No matching emergency protocols found.</p>
          <p className="text-xs text-slate-400 mb-4">Try searching for keywords like &quot;scam&quot;, &quot;fire&quot;, &quot;accident&quot;, or &quot;snake&quot;.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="px-4 py-2 bg-navy-800 text-white text-xs font-bold rounded-lg"
          >
            Clear Filters
          </button>
        </div>
      )}

    </section>
  );
};
