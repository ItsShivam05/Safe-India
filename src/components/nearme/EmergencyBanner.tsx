import React from 'react';
import { PhoneCall, ShieldAlert, ExternalLink } from 'lucide-react';
import type { Language } from '../../types';
import { translations } from '../../data/locales';

interface EmergencyBannerProps {
  lang: Language;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="bg-gradient-to-r from-emergency-700 via-emergency-600 to-emergency-700 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-emergency-500/50 mb-6 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left: Info */}
        <div className="flex items-start space-x-3.5">
          <div className="p-3 bg-white/10 rounded-2xl shrink-0 mt-0.5 border border-white/20">
            <ShieldAlert className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-emergency-100 bg-white/15 px-2.5 py-0.5 rounded-full mb-1">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>{t.nearMe.call112Title}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Emergency? Dial 112 Immediately
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-emergency-100 max-w-xl font-medium leading-relaxed">
              {t.nearMe.call112Sub}
            </p>
            <div className="mt-2 flex items-center space-x-2 text-[11px] text-emergency-200">
              <span>{t.nearMe.call112Source}</span>
              <a
                href="https://112.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white inline-flex items-center space-x-0.5"
              >
                <span>112.gov.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Right: Explicit 1-tap call button */}
        <div className="shrink-0 flex items-center">
          <a
            href="tel:112"
            className="w-full md:w-auto inline-flex items-center justify-center space-x-2.5 bg-white hover:bg-slate-100 text-emergency-700 font-black px-6 py-3.5 rounded-2xl text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95 border-2 border-white"
            aria-label="Call 112 National Emergency Helpline"
          >
            <PhoneCall className="w-5 h-5 fill-emergency-700 text-emergency-700" />
            <span>{t.nearMe.call112Button}</span>
          </a>
        </div>

      </div>
    </div>
  );
};
