import React from 'react';
import { PhoneCall, ShieldAlert, ExternalLink } from 'lucide-react';
import { translations } from '../../data/locales';

export const EmergencyBanner: React.FC = () => {
  const t = translations.en;

  return (
    <div className="bg-emergency text-white rounded-3xl p-5 sm:p-6 shadow-md border border-emergency-800 mb-6 transition-all duration-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left: Info */}
        <div className="flex items-start space-x-3.5">
          <div className="p-3 bg-white/10 rounded-2xl shrink-0 mt-0.5 border border-white/20">
            <ShieldAlert className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-white bg-white/20 px-2.5 py-0.5 rounded-full mb-1">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>{t.nearMe.call112Title}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Emergency? Dial 112 Immediately
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-white/90 max-w-xl font-medium leading-relaxed">
              {t.nearMe.call112Sub}
            </p>
            <div className="mt-2 flex items-center space-x-2 text-[11px] text-white/80">
              <span>{t.nearMe.call112Source}</span>
              <a
                href="https://112.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white inline-flex items-center space-x-0.5 font-bold"
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
            className="w-full md:w-auto inline-flex items-center justify-center space-x-2.5 bg-white hover:bg-ivory text-emergency font-black px-6 py-3.5 rounded-2xl text-base sm:text-lg shadow-md transition-all duration-200 active:scale-95"
            aria-label="Call 112 National Emergency Helpline"
          >
            <PhoneCall className="w-5 h-5 text-emergency" />
            <span>{t.nearMe.call112Button}</span>
          </a>
        </div>

      </div>
    </div>
  );
};
