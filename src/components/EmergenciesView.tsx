import React, { useState } from 'react';
import type { EmergencyScenario } from '../types';

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
}

export const EmergenciesView: React.FC<EmergenciesViewProps> = ({
  onSelectScenario,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const t = translations.en;

  const categories = [
    { id: 'all', label: t.emergencySection.allCategories },
    { id: 'personal-safety', label: 'Personal Safety' },
    { id: 'medical', label: 'Medical Emergency' },
    { id: 'fire-disaster', label: 'Fire & Disaster' },
    { id: 'road-transport', label: 'Road & Transport' },
    { id: 'digital-emergency', label: 'Digital Emergency' },
    { id: 'animal', label: 'Animal Emergency' },
  ];

  const filteredScenarios = emergencyScenarios.filter((sc) => {
    const matchesCategory = activeCategory === 'all' || sc.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const titleText = sc.title.en || '';
    const matchesSearch =
      !q ||
      titleText.toLowerCase().includes(q) ||
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-ivory text-midnight">
      
      {/* Header */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center space-x-2 bg-emergency-50 text-emergency text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full border border-emergency-200 mb-3">
          <ShieldAlert className="w-4 h-4 text-emergency animate-pulse" />
          <span>Immediate Action Guides</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-midnight tracking-tight">
          {t.emergencySection.title}
        </h1>
        <p className="mt-2 text-midnight/75 text-base sm:text-lg">
          {t.emergencySection.subheading}
        </p>
      </div>

      {/* Quick Search & Category Filter Pills */}
      <div className="mb-8 space-y-4">
        <div className="max-w-xl mx-auto relative">
          <Search className="w-5 h-5 text-midnight/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.emergencySection.searchPlaceholder}
            className="w-full bg-white border border-lavender focus:border-plum rounded-2xl pl-11 pr-4 py-3.5 text-sm sm:text-base shadow-xs focus:outline-none focus:ring-2 focus:ring-plum text-midnight placeholder-midnight/40 font-medium"
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
                  ? 'bg-plum text-white shadow-sm'
                  : 'bg-white border border-lavender/60 text-midnight/80 hover:bg-lavender/30 hover:border-lavender'
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
              className={`group cursor-pointer bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between ${
                isCritical
                  ? 'border-emergency/40 hover:border-emergency'
                  : 'border-lavender/60 hover:border-plum'
              }`}
            >
              <div>
                {/* Urgency Badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-2xl ${
                      isCritical
                        ? 'bg-emergency-50 text-emergency border border-emergency-200'
                        : 'bg-lavender/30 text-plum border border-lavender'
                    }`}
                  >
                    {renderIcon(sc.iconName)}
                  </div>

                  <span
                    className={`text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${
                      isCritical
                        ? 'bg-emergency text-white border-emergency-700 animate-pulse'
                        : 'bg-lavender/40 text-midnight border-lavender'
                    }`}
                  >
                    {isCritical ? 'Critical Action' : 'High Priority'}
                  </span>
                </div>

                {/* Scenario Title */}
                <h3 className="text-xl font-bold text-midnight group-hover:text-plum transition-colors leading-snug">
                  {sc.title.en}
                </h3>
              </div>

              {/* Action Footer preview */}
              <div className="mt-6 pt-4 border-t border-lavender/40 flex items-center justify-between text-xs sm:text-sm font-bold">
                {sc.immediateCallNumber ? (
                  <span className="inline-flex items-center space-x-1 text-emergency font-extrabold">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call {sc.immediateCallNumber}</span>
                  </span>
                ) : (
                  <span className="text-plum">View Action Steps</span>
                )}

                <span className="inline-flex items-center text-midnight/50 group-hover:text-plum group-hover:translate-x-1 transition-all">
                  <span>View Steps</span>
                  <ChevronRight className="w-4 h-4 ml-0.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredScenarios.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-lavender p-8 max-w-md mx-auto">
          <p className="text-midnight/80 font-bold mb-2">No matching emergency guides found.</p>
          <p className="text-xs text-midnight/60 mb-4">Try searching for words like &quot;scam&quot;, &quot;fire&quot;, &quot;accident&quot;, or &quot;snake&quot;.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="px-4 py-2 bg-plum text-white text-xs font-bold rounded-xl hover:bg-plum-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

    </section>
  );
};
