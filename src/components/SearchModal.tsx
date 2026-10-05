import React, { useState, useEffect } from 'react';
import type { EmergencyScenario, Language } from '../types';

import { emergencyScenarios } from '../data/emergencies';
import { awarenessGuides } from '../data/awareness';
import { officialResources } from '../data/resources';
import { translations } from '../data/locales';
import { Search, X, ShieldAlert, BookOpen, MapPin, ChevronRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScenario: (scenario: EmergencyScenario) => void;
  onSelectCategory: (tab: string) => void;
  lang: Language;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectScenario,
  onSelectCategory,
  lang,
}) => {
  const [query, setQuery] = useState('');
  const t = translations[lang];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent, toggle
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search results prioritizing Emergency Scenarios first!
  const matchedScenarios = emergencyScenarios.filter((sc) => {
    if (!q) return false;
    return (
      sc.title[lang].toLowerCase().includes(q) ||
      sc.searchKeywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  const matchedAwareness = awarenessGuides.filter((ag) => {
    if (!q) return false;
    return (
      ag.title[lang].toLowerCase().includes(q) ||
      ag.summary[lang].toLowerCase().includes(q)
    );
  });

  const matchedResources = officialResources.filter((res) => {
    if (!q) return false;
    return (
      res.name[lang].toLowerCase().includes(q) ||
      res.phone.includes(q) ||
      res.purpose[lang].toLowerCase().includes(q)
    );
  });

  const hasAnyResults =
    matchedScenarios.length > 0 || matchedAwareness.length > 0 || matchedResources.length > 0;

  const quickChips = [
    { label: lang === 'en' ? 'Someone following me' : 'पीछा करना', q: 'following' },
    { label: lang === 'en' ? 'UPI / Bank Scam' : 'UPI फ्रॉड', q: 'upi' },
    { label: lang === 'en' ? 'Someone fainted / CPR' : 'बेहोशी', q: 'unconscious' },
    { label: lang === 'en' ? 'Road Accident' : 'एक्सीडेंट', q: 'accident' },
    { label: lang === 'en' ? 'Fire' : 'आग', q: 'fire' },
    { label: lang === 'en' ? 'Dog Bite / Rabies' : 'कुत्ते का काटना', q: 'dog' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 z-10 flex flex-col max-h-[85vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center space-x-3 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchModal.placeholder}
            className="w-full bg-transparent border-none text-slate-900 placeholder-slate-400 text-base sm:text-lg focus:outline-none focus:ring-0 font-medium"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter Chips (When query is empty) */}
        {!query && (
          <div className="p-6 overflow-y-auto">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
              {t.searchModal.quickFilter}
            </span>
            <div className="flex flex-wrap gap-2">
              {quickChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuery(chip.q)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-navy-800 hover:text-white text-slate-700 text-xs sm:text-sm font-semibold transition-colors border border-slate-200 flex items-center space-x-1"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-emergency-500" />
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="p-4 overflow-y-auto space-y-6 max-h-[65vh]">
            
            {/* 1. Emergency Scenarios (Prioritized!) */}
            {matchedScenarios.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 text-xs font-extrabold text-emergency-600 uppercase tracking-wider mb-2">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Emergency Protocols ({matchedScenarios.length})</span>
                </div>
                <div className="space-y-2">
                  {matchedScenarios.map((sc) => (
                    <div
                      key={sc.id}
                      onClick={() => {
                        onClose();
                        onSelectScenario(sc);
                      }}
                      className="p-3.5 rounded-2xl bg-amber-50/60 hover:bg-amber-100/80 border border-amber-200/80 cursor-pointer transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-navy-800 bg-white px-2 py-0.5 rounded border border-amber-300">
                          Emergency → {sc.categoryLabel[lang]}
                        </span>
                        <h4 className="font-extrabold text-slate-900 text-sm sm:text-base mt-1">
                          {sc.title[lang]}
                        </h4>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-navy-900 group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Awareness Guides */}
            {matchedAwareness.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 text-xs font-extrabold text-amber-600 uppercase tracking-wider mb-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Awareness Guides ({matchedAwareness.length})</span>
                </div>
                <div className="space-y-2">
                  {matchedAwareness.map((ag) => (
                    <div
                      key={ag.id}
                      onClick={() => {
                        onClose();
                        onSelectCategory('awareness');
                      }}
                      className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-navy-800 bg-navy-100 px-2 py-0.5 rounded">
                          Awareness → {ag.categoryLabel[lang]}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm mt-1">
                          {ag.title[lang]}
                        </h4>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-navy-900 group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Official Resources */}
            {matchedResources.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 text-xs font-extrabold text-emerald-600 uppercase tracking-wider mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>Verified Helplines ({matchedResources.length})</span>
                </div>
                <div className="space-y-2">
                  {matchedResources.map((res) => (
                    <div
                      key={res.id}
                      onClick={() => {
                        onClose();
                        onSelectCategory('resources');
                      }}
                      className="p-3.5 rounded-2xl bg-emerald-50/50 hover:bg-emerald-100/70 border border-emerald-200/80 cursor-pointer transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-300">
                          Directory → {res.categoryLabel[lang]}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm mt-1">
                          {res.name[lang]} ({res.phone})
                        </h4>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-900 group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results state */}
            {!hasAnyResults && (
              <div className="py-12 text-center text-slate-500 text-sm">
                {t.searchModal.noResults}
              </div>
            )}

          </div>
        )}

        {/* Footer info */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 text-right text-[11px] text-slate-400 font-medium">
          Press <kbd className="bg-white border text-slate-600 px-1 rounded">ESC</kbd> to close
        </div>
      </div>
    </div>
  );
};
