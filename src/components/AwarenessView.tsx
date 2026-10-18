import React, { useState } from 'react';

import { awarenessGuides } from '../data/awareness';
import { translations } from '../data/locales';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  CheckSquare,
  Square,
  Lock,
  Eye,
  Home,
  ShieldAlert,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const AwarenessView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [expandedGuideId, setExpandedGuideId] = useState<string | null>(null);

  const t = translations.en;

  const categories = [
    { id: 'all', label: t.emergencySection.allCategories },
    { id: 'personal', label: 'Personal Safety' },
    { id: 'digital', label: 'Digital Safety' },
    { id: 'home', label: 'Home Safety' },
    { id: 'disaster', label: 'Disaster Preparedness' },
  ];

  const filteredGuides = awarenessGuides.filter(
    (g) => activeCategory === 'all' || g.category === activeCategory
  );

  const toggleCheck = (idKey: string) => {
    setCheckedItems((prev) => ({ ...prev, [idKey]: !prev[idKey] }));
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Eye': return <Eye className="w-6 h-6" />;
      case 'Lock': return <Lock className="w-6 h-6" />;
      case 'Home': return <Home className="w-6 h-6" />;
      default: return <ShieldAlert className="w-6 h-6" />;
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-ivory text-midnight">
      
      {/* Section Header */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center space-x-2 bg-lavender/30 text-plum text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full border border-lavender mb-3">
          <BookOpen className="w-4 h-4 text-plum" />
          <span>Prevention & Awareness</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-midnight tracking-tight">
          {t.awarenessSection.title}
        </h1>
        <p className="mt-2 text-midnight/75 text-base sm:text-lg">
          {t.awarenessSection.subheading}
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-start md:justify-center overflow-x-auto pb-4 gap-2 mb-8 scrollbar-none px-1">
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

      {/* Awareness Guides Cards */}
      <div className="space-y-6">
        {filteredGuides.map((guide) => {
          const isExpanded = expandedGuideId === guide.id || activeCategory !== 'all';
          return (
            <article
              key={guide.id}
              className="bg-white rounded-3xl border border-lavender/60 shadow-xs overflow-hidden transition-all duration-200 hover:border-plum"
            >
              {/* Card Title & Summary Bar */}
              <div
                onClick={() => setExpandedGuideId(isExpanded ? null : guide.id)}
                className="p-6 sm:p-7 cursor-pointer bg-ivory-50 hover:bg-ivory-100 transition-colors flex items-start justify-between gap-4"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-plum text-white rounded-2xl shrink-0 shadow-xs">
                    {renderIcon(guide.iconName)}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-midnight bg-lavender/40 px-2.5 py-0.5 rounded-full border border-lavender">
                      {guide.categoryLabel.en}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-midnight mt-1">
                      {guide.title.en}
                    </h2>
                    <p className="mt-1 text-sm text-midnight/75 font-normal">
                      {guide.summary.en}
                    </p>
                  </div>
                </div>

                <button className="p-2 text-midnight/50 hover:text-plum">
                  {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                </button>
              </div>

              {/* Expandable Content Body */}
              {isExpanded && (
                <div className="p-6 sm:p-8 pt-4 border-t border-lavender/40 grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* DO Box */}
                  <div className="bg-sage/20 border border-sage/60 rounded-2xl p-5">
                    <h3 className="text-base font-extrabold text-midnight mb-3 flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-sage-700" />
                      <span>{t.awarenessSection.do}</span>
                    </h3>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-midnight/90 font-medium">
                      {guide.doList.en.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* DON'T Box */}
                  <div className="bg-emergency-50/50 border border-emergency-200 rounded-2xl p-5">
                    <h3 className="text-base font-extrabold text-emergency mb-3 flex items-center space-x-2">
                      <XCircle className="w-5 h-5 text-emergency" />
                      <span>{t.awarenessSection.dont}</span>
                    </h3>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-midnight/90 font-medium">
                      {guide.dontList.en.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <XCircle className="w-4 h-4 text-emergency shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Interactive Preparation Checklist */}
                  {guide.checklist && (
                    <div className="md:col-span-2 bg-midnight text-ivory rounded-2xl p-5 sm:p-6 mt-2 border border-lavender/20">
                      <h3 className="text-sm sm:text-base font-bold text-lavender mb-3 flex items-center space-x-2">
                        <CheckSquare className="w-5 h-5 text-lavender" />
                        <span>{t.awarenessSection.checklist}</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {guide.checklist.en.map((item, idx) => {
                          const key = `${guide.id}-${idx}`;
                          const isChecked = !!checkedItems[key];
                          return (
                            <label
                              key={idx}
                              onClick={() => toggleCheck(key)}
                              className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer border transition-colors ${
                                isChecked
                                  ? 'bg-midnight-800 border-plum text-lavender line-through opacity-80'
                                  : 'bg-midnight-950/80 border-lavender/20 hover:border-lavender text-ivory'
                              }`}
                            >
                              {isChecked ? (
                                <CheckSquare className="w-5 h-5 text-lavender shrink-0" />
                              ) : (
                                <Square className="w-5 h-5 text-lavender/40 shrink-0" />
                              )}
                              <span className="text-xs sm:text-sm font-medium">{item}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Footer Source */}
                  <div className="md:col-span-2 text-xs text-midnight/60 flex items-center space-x-2 pt-2">
                    <ShieldCheck className="w-4 h-4 text-sage-600" />
                    <span>Official Source: <strong>{guide.source.name}</strong> (Reviewed {guide.source.lastReviewed})</span>
                  </div>

                </div>
              )}
            </article>
          );
        })}
      </div>

    </section>
  );
};
