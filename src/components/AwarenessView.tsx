import React, { useState } from 'react';
import type { Language } from '../types';

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

interface AwarenessViewProps {
  lang: Language;
}

export const AwarenessView: React.FC<AwarenessViewProps> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [expandedGuideId, setExpandedGuideId] = useState<string | null>(null);

  const t = translations[lang];

  const categories = [
    { id: 'all', label: t.emergencySection.allCategories },
    { id: 'personal', label: lang === 'en' ? 'Personal Safety' : 'व्यक्तिगत सुरक्षा' },
    { id: 'digital', label: lang === 'en' ? 'Digital Safety' : 'डिजिटल सुरक्षा' },
    { id: 'home', label: lang === 'en' ? 'Home Safety' : 'गृह सुरक्षा' },
    { id: 'disaster', label: lang === 'en' ? 'Disaster Preparedness' : 'आपदा प्रबंधन' },
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* Section Header */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center space-x-2 bg-navy-100 text-navy-800 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-navy-200 mb-3">
          <BookOpen className="w-4 h-4 text-amber-500" />
          <span>Prevention & Awareness</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          🛡️ {t.awarenessSection.title}
        </h1>
        <p className="mt-2 text-slate-600 text-base sm:text-lg">
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
                ? 'bg-navy-800 text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Awareness Guides Cards */}
      <div className="space-y-8">
        {filteredGuides.map((guide) => {
          const isExpanded = expandedGuideId === guide.id || activeCategory !== 'all';
          return (
            <article
              key={guide.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-200 hover:border-navy-300"
            >
              {/* Card Title & Summary Bar */}
              <div
                onClick={() => setExpandedGuideId(isExpanded ? null : guide.id)}
                className="p-6 sm:p-8 cursor-pointer bg-slate-50/60 hover:bg-slate-50 transition-colors flex items-start justify-between gap-4"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-navy-800 text-amber-400 rounded-2xl shrink-0">
                    {renderIcon(guide.iconName)}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-navy-800 bg-navy-100 px-2.5 py-0.5 rounded-full">
                      {guide.categoryLabel[lang]}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                      {guide.title[lang]}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600 font-medium">
                      {guide.summary[lang]}
                    </p>
                  </div>
                </div>

                <button className="p-2 text-slate-400 hover:text-navy-900">
                  {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                </button>
              </div>

              {/* Expandable Content Body */}
              {isExpanded && (
                <div className="p-6 sm:p-8 pt-2 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* DO Box */}
                  <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5">
                    <h3 className="text-base font-extrabold text-emerald-900 mb-3 flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>{t.awarenessSection.do}</span>
                    </h3>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                      {guide.doList[lang].map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* DON'T Box */}
                  <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-5">
                    <h3 className="text-base font-extrabold text-amber-900 mb-3 flex items-center space-x-2">
                      <XCircle className="w-5 h-5 text-amber-600" />
                      <span>{t.awarenessSection.dont}</span>
                    </h3>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                      {guide.dontList[lang].map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <XCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Interactive Preparation Checklist */}
                  {guide.checklist && (
                    <div className="md:col-span-2 bg-slate-900 text-white rounded-2xl p-5 sm:p-6 mt-2">
                      <h3 className="text-sm sm:text-base font-bold text-amber-400 mb-3 flex items-center space-x-2">
                        <CheckSquare className="w-5 h-5 text-amber-400" />
                        <span>{t.awarenessSection.checklist}</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {guide.checklist[lang].map((item, idx) => {
                          const key = `${guide.id}-${idx}`;
                          const isChecked = !!checkedItems[key];
                          return (
                            <label
                              key={idx}
                              onClick={() => toggleCheck(key)}
                              className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer border transition-colors ${
                                isChecked
                                  ? 'bg-navy-800 border-amber-400 text-amber-200 line-through opacity-80'
                                  : 'bg-navy-950/80 border-navy-800 hover:border-navy-700 text-slate-200'
                              }`}
                            >
                              {isChecked ? (
                                <CheckSquare className="w-5 h-5 text-amber-400 shrink-0" />
                              ) : (
                                <Square className="w-5 h-5 text-slate-500 shrink-0" />
                              )}
                              <span className="text-xs sm:text-sm font-medium">{item}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Footer Source */}
                  <div className="md:col-span-2 text-xs text-slate-500 flex items-center space-x-2 pt-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Verified Source: <strong>{guide.source.name}</strong> (Reviewed {guide.source.lastReviewed})</span>
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
