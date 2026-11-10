import React, { useEffect } from 'react';
import { ShieldAlert, X, PhoneCall, ArrowRight, MapPin, Siren, LocateFixed } from 'lucide-react';
import type { EmergencyScenario } from '../types';
import { emergencyScenarios } from '../data/emergencies';
import { useLanguage } from '../i18n/language';
import { useDialogFocus } from '../hooks/useDialogFocus';

interface MobileQuickAccessProps {
  onSelectScenario: (scenario: EmergencyScenario) => void;
  onNavigate: (tab: string) => void;
  showFloatingButton?: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const QUICK_DIAL_PHONES = ['112', '1930', '108', '1091'];

export const MobileQuickAccess: React.FC<MobileQuickAccessProps> = ({
  onSelectScenario,
  onNavigate,
  showFloatingButton = true,
  isOpen,
  onOpen,
  onClose,
}) => {
  const { t, pick } = useLanguage();
  const dialogRef = useDialogFocus<HTMLDivElement>(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const go = (tab: string) => {
    onClose();
    onNavigate(tab);
  };

  return (
    <>
      {/* Floating Button for Desktop (phones use the bottom navigation, so it never covers guide text) */}
      {showFloatingButton && (
        <div className="hidden lg:block fixed bottom-5 right-5 z-40">
          <button
            onClick={onOpen}
            className="group flex items-center space-x-2 bg-emergency hover:bg-emergency-600 text-white font-black px-4 py-3.5 rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20 focus:outline-none focus:ring-4 focus:ring-emergency/40"
            aria-label={t.nav.floatingHelpLabel}
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <ShieldAlert className="w-5 h-5 text-white" />
            <span className="text-sm tracking-wide uppercase font-extrabold">{t.nav.emergencyHelp}</span>
          </button>
        </div>
      )}

      {/* Emergency Quick Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-midnight-950/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="fixed inset-0" onClick={onClose} />

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={t.quickAccess.title}
            tabIndex={-1}
            className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 border border-lavender/60 z-10 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-4 border-b border-lavender/40 mb-5">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-emergency text-white rounded-xl shadow-xs">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-midnight">{t.quickAccess.title}</h2>
                  <p className="text-xs text-midnight/70 font-medium">{t.quickAccess.subtitle}</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-midnight/70 hover:bg-lavender/30 hover:text-midnight"
                aria-label={t.quickAccess.close}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* SOS and location first: the fastest ways to get someone to you */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <button
                type="button"
                onClick={() => go('sos')}
                className="p-4 bg-emergency hover:bg-emergency-600 text-white rounded-2xl flex items-center space-x-3 text-left font-black text-sm"
              >
                <Siren className="w-5 h-5 shrink-0" />
                <span>{t.quickAccess.sos}</span>
              </button>
              <button
                type="button"
                onClick={() => go('whereami')}
                className="p-4 bg-midnight hover:bg-midnight-800 text-white rounded-2xl flex items-center space-x-3 text-left font-bold text-sm"
              >
                <LocateFixed className="w-5 h-5 shrink-0 text-lavender" />
                <span>{t.quickAccess.whereAmI}</span>
              </button>
            </div>

            <div className="mb-5">
              <button
                type="button"
                onClick={() => go('nearme')}
                className="w-full p-4 bg-plum hover:bg-plum-600 text-white rounded-2xl flex items-center justify-between border border-lavender/30 shadow-md transition-transform active:scale-95 group text-left"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-lavender/30 text-white rounded-xl shrink-0 border border-lavender/40">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-black text-white block">{t.nav.getHelpNearMe}</span>
                    <span className="text-xs text-lavender">{t.quickAccess.nearMeDesc}</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-lavender shrink-0 ml-2" />
              </button>
            </div>

            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-midnight/70 block mb-3">
                {t.quickAccess.helplinesTitle}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {t.quickAccess.numbers.map((num, idx) => (
                  <a
                    key={QUICK_DIAL_PHONES[idx]}
                    href={`tel:${QUICK_DIAL_PHONES[idx]}`}
                    className="p-3.5 bg-midnight hover:bg-midnight-800 text-ivory rounded-2xl flex items-center justify-between transition-transform active:scale-95 shadow-xs border border-lavender/20"
                  >
                    <div>
                      <span className="text-xs font-bold text-lavender block">{num.label}</span>
                      <span className="text-xs text-ivory/70">{num.desc}</span>
                    </div>
                    <span className="shrink-0 bg-emergency p-2 rounded-xl text-white font-extrabold text-sm flex items-center space-x-1">
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{QUICK_DIAL_PHONES[idx]}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-midnight/70 block mb-3">
                {t.quickAccess.guidesTitle}
              </span>
              <div className="space-y-2">
                {emergencyScenarios.slice(0, 4).map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      onClose();
                      onSelectScenario(sc);
                    }}
                    className="w-full text-left p-3.5 bg-ivory hover:bg-ivory-100 border border-lavender/60 rounded-xl flex items-center justify-between text-xs sm:text-sm font-bold text-midnight transition-colors"
                  >
                    <span>{pick(sc.title)}</span>
                    <ArrowRight className="w-4 h-4 text-plum" />
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-6 text-xs text-center text-midnight/70 font-medium">{t.quickAccess.note}</p>
          </div>
        </div>
      )}
    </>
  );
};
