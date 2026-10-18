import React, { useState, useEffect } from 'react';
import type { EmergencyScenario } from '../types';

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
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectScenario,
  onSelectCategory,
}) => {
  const [query, setQuery] = useState('');
  const t = translations.en;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
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
    const titleText = sc.title.en || '';
    return (
      titleText.toLowerCase().includes(q) ||
      sc.searchKeywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  const matchedAwareness = awarenessGuides.filter((ag) => {
    if (!q) return false;
    const titleText = ag.title.en || '';
    const summaryText = ag.summary.en || '';
    return (
      titleText.toLowerCase().includes(q) ||
      summaryText.toLowerCase().includes(q)
    );
  });

  const matchedResources = officialResources.filter((res) => {
    if (!q) return false;
    const nameText = res.name.en || '';
    const purposeText = res.purpose.en || '';
    return (
      nameText.toLowerCase().includes(q) ||
      res.phone.includes(q) ||
      purposeText.toLowerCase().includes(q)
    );
  });

  const hasAnyResults =
    matchedScenarios.length > 0 || matchedAwareness.length > 0 || matchedResources.length > 0;

  const quickChips = [
    { label: 'Someone following me', q: 'following' },
    { label: 'UPI / Bank Scam', q: 'upi' },
    { label: 'Someone fainted / CPR', q: 'unconscious' },
    { label: 'Road Accident', q: 'accident' },
    { label: 'Fire', q: 'fire' },
    { label: 'Dog Bite / Rabies', q: 'dog' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-midnight-950/80 backdrop-blur-xs animate-in fade-in duration-150">
      
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-lavender/60 z-10 flex flex-col max-h-[85vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-lavender/40 flex items-center space-x-3 bg-ivory-50">
          <Search className="w-5 h-5 text-midnight/40 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchModal.placeholder}
            className="w-full bg-transparent border-none text-midnight placeholder-midnight/40 text-base sm:text-lg focus:outline-none focus:ring-0 font-medium"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-midnight/40 hover:text-midnight hover:bg-lavender/30"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter Chips (When query is empty) */}
        {!query && (
          <div className="p-6 overflow-y-auto">
            <span className="text-xs font-bold text-midnight/50 uppercase tracking-wider block mb-3">
              {t.searchModal.quickFilter}
            </span>
            <div className="flex flex-wrap gap-2">
              {quickChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuery(chip.q)}
                  className="px-3.5 py-2 rounded-xl bg-ivory hover:bg-plum hover:text-white text-midnight text-xs sm:text-sm font-semibold transition-colors border border-lavender/60 flex items-center space-x-1.5"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-emergency" />
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>

            {/* Direct Get Help Near Me Action Button */}
            <button
              onClick={() => {
                onClose();
                onSelectCategory('nearme');
              }}
              className="mt-5 w-full p-3.5 bg-plum hover:bg-plum-600 text-white rounded-2xl flex items-center justify-between text-xs sm:text-sm font-bold border border-lavender/30 shadow-xs transition-all"
            >
              <span className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 text-lavender" />
                <span>{t.nav.getHelpNearMe} — Police, Hospitals, Fire Stations</span>
              </span>
              <span className="text-lavender font-extrabold text-xs">Open Map →</span>
            </button>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="p-4 overflow-y-auto space-y-6 max-h-[65vh]">
            
            {/* 1. Emergency Scenarios (Prioritized!) */}
            {matchedScenarios.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 text-xs font-extrabold text-emergency uppercase tracking-wider mb-2">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Emergency Guides ({matchedScenarios.length})</span>
                </div>
                <div className="space-y-2">
                  {matchedScenarios.map((sc) => (
                    <div
                      key={sc.id}
                      onClick={() => {
                        onClose();
                        onSelectScenario(sc);
                      }}
                      className="p-3.5 rounded-2xl bg-emergency-50/40 hover:bg-emergency-50 border border-emergency-200 cursor-pointer transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emergency bg-white px-2 py-0.5 rounded border border-emergency-200">
                          Emergency → {sc.categoryLabel.en}
                        </span>
                        <h4 className="font-bold text-midnight text-sm sm:text-base mt-1">
                          {sc.title.en}
                        </h4>
                      </div>
                      <ChevronRight className="w-5 h-5 text-midnight/40 group-hover:text-emergency group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Awareness Guides */}
            {matchedAwareness.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 text-xs font-extrabold text-plum uppercase tracking-wider mb-2">
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
                      className="p-3.5 rounded-2xl bg-lavender/25 hover:bg-lavender/40 border border-lavender/60 cursor-pointer transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-plum bg-white px-2 py-0.5 rounded border border-lavender">
                          Awareness → {ag.categoryLabel.en}
                        </span>
                        <h4 className="font-bold text-midnight text-sm mt-1">
                          {ag.title.en}
                        </h4>
                      </div>
                      <ChevronRight className="w-5 h-5 text-midnight/40 group-hover:text-plum group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Official Resources */}
            {matchedResources.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 text-xs font-extrabold text-sage-700 uppercase tracking-wider mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>Emergency Numbers ({matchedResources.length})</span>
                </div>
                <div className="space-y-2">
                  {matchedResources.map((res) => (
                    <div
                      key={res.id}
                      onClick={() => {
                        onClose();
                        onSelectCategory('resources');
                      }}
                      className="p-3.5 rounded-2xl bg-sage/20 hover:bg-sage/35 border border-sage/50 cursor-pointer transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-midnight bg-white px-2 py-0.5 rounded border border-sage">
                          Directory → {res.categoryLabel.en}
                        </span>
                        <h4 className="font-bold text-midnight text-sm mt-1">
                          {res.name.en} ({res.phone})
                        </h4>
                      </div>
                      <ChevronRight className="w-5 h-5 text-midnight/40 group-hover:text-midnight group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results state */}
            {!hasAnyResults && (
              <div className="py-12 text-center text-midnight/60 text-sm">
                {t.searchModal.noResults}
              </div>
            )}

          </div>
        )}

        {/* Footer info */}
        <div className="p-3 bg-ivory border-t border-lavender/40 text-right text-[11px] text-midnight/50 font-medium">
          Press <kbd className="bg-white border border-lavender text-midnight px-1.5 py-0.5 rounded">ESC</kbd> to close
        </div>
      </div>
    </div>
  );
};
