import React from 'react';

import { translations } from '../data/locales';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const t = translations.en;

  return (
    <footer className="bg-midnight text-ivory border-t border-lavender/25 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Disclaimer Banner */}
        <div className="bg-midnight-800 border border-lavender/20 rounded-2xl p-5 mb-10 text-xs sm:text-sm text-ivory/90 leading-relaxed flex items-start space-x-3">
          <ShieldCheck className="w-5 h-5 text-lavender shrink-0 mt-0.5" />
          <div>
            <strong className="text-lavender font-extrabold uppercase tracking-wide block mb-0.5">
              {t.footer.disclaimerTitle}
            </strong>
            <span>{t.footer.disclaimerText}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-lavender/20">
          
          {/* Brand Col */}
          <div className="md:col-span-2">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-3.5 mb-3 focus:outline-none group text-left"
              aria-label="SafeIndia — Know what to do when it matters"
            >
              <img
                src="/images/safeindia-emblem.png"
                alt="SafeIndia — Know what to do when it matters"
                className="h-12 w-12 object-contain shrink-0 group-hover:scale-105 transition-transform duration-200"
              />
              <div>
                <span className="text-xl font-black text-ivory tracking-tight group-hover:text-lavender transition-colors block">
                  SafeIndia
                </span>
                <span className="text-xs font-semibold text-lavender block">
                  {t.tagline}
                </span>
              </div>
            </button>
            <p className="text-xs text-ivory/75 max-w-sm leading-relaxed">
              {t.heroSubtext}
            </p>
          </div>

          {/* Core Links */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-lavender mb-4">
              Core Platform
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-ivory/80">
              <li>
                <button onClick={() => onNavigate('emergencies')} className="hover:text-lavender transition-colors">
                  {t.nav.emergencies}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('nearme')} className="hover:text-lavender transition-colors">
                  {t.nav.getHelpNearMe}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('awareness')} className="hover:text-lavender transition-colors">
                  {t.nav.awareness}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-lavender transition-colors">
                  {t.nav.resources}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-lavender transition-colors">
                  {t.nav.about}
                </button>
              </li>
            </ul>
          </div>

          {/* Information Links */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-lavender mb-4">
              Information & Trust
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-ivory/80 font-semibold">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-lavender transition-colors">
                  {t.footer.sources}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-lavender transition-colors">
                  {t.footer.accessibility}
                </button>
              </li>
              <li>
                <span className="text-ivory/50 font-normal">{t.footer.privacy}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Rights */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/60 gap-2">
          <p>© {CURRENT_YEAR} SafeIndia. {t.footer.rights}</p>
          <div className="flex items-center space-x-4 text-ivory/60">
            <span>No Auth • No Tracking • Completely Public</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
