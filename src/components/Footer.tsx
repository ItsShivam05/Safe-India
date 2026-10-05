import React from 'react';
import type { Language } from '../types';

import { translations } from '../data/locales';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, lang }) => {
  const t = translations[lang];

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Disclaimer Banner */}
        <div className="bg-navy-900/80 border border-navy-800 rounded-2xl p-5 mb-10 text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start space-x-3">
          <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-400 font-extrabold uppercase tracking-wide block mb-0.5">
              {t.footer.disclaimerTitle}
            </strong>
            <span>{t.footer.disclaimerText}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-navy-800/80">
          
          {/* Brand Col */}
          <div className="md:col-span-2">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-3 mb-3 focus:outline-none"
            >
              <img
                src="/safeindia-logo.png"
                alt="SafeIndia Logo"
                className="h-12 w-auto object-contain"
              />
            </button>
            <p className="text-sm font-semibold text-amber-400 mb-2">
              {t.tagline}
            </p>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              {t.heroSubtext}
            </p>
          </div>

          {/* Core Links */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 mb-4">
              Core Platform
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-slate-400">
              <li>
                <button onClick={() => onNavigate('emergencies')} className="hover:text-amber-400 transition-colors">
                  🚨 {t.nav.emergencies}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('awareness')} className="hover:text-amber-400 transition-colors">
                  🛡️ {t.nav.awareness}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-amber-400 transition-colors">
                  📍 {t.nav.resources}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">
                  ℹ️ {t.nav.about}
                </button>
              </li>
            </ul>
          </div>

          {/* Information Links */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 mb-4">
              Information & Trust
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400 font-semibold">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">
                  {t.footer.sources}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">
                  {t.footer.accessibility}
                </button>
              </li>
              <li>
                <span className="text-slate-500 font-normal">{t.footer.privacy}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Rights */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} SafeIndia. {t.footer.rights}</p>
          <div className="flex items-center space-x-4 text-slate-400">
            <span>No Auth • No Tracking • Completely Public</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
