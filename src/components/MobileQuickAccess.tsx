import React, { useEffect } from 'react';
import { ShieldAlert, X, PhoneCall, ArrowRight, MapPin } from 'lucide-react';
import type { EmergencyScenario } from '../types';
import { emergencyScenarios } from '../data/emergencies';
import { translations } from '../data/locales';
import { useDialogFocus } from '../hooks/useDialogFocus';

interface MobileQuickAccessProps {
  onSelectScenario: (scenario: EmergencyScenario) => void;
  onNavigate?: (tab: string) => void;
  showFloatingButton?: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const MobileQuickAccess: React.FC<MobileQuickAccessProps> = ({
  onSelectScenario,
  onNavigate,
  showFloatingButton = true,
  isOpen,
  onOpen,
  onClose,
}) => {
  const t = translations.en;
  const dialogRef = useDialogFocus<HTMLDivElement>(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const quickDialNumbers = [
    { label: "112 National Emergency", phone: "112", desc: "Police, Fire, Rescue" },
    { label: "1930 Cyber Fraud", phone: "1930", desc: "Bank & UPI Fraud" },
    { label: "108 Medical Ambulance", phone: "108", desc: "Free Ambulance 24/7" },
    { label: "1091 Women Helpline", phone: "1091", desc: "Women Safety 24/7" },
  ];

  return (
    <>
      {/* Floating Button for Desktop (phones use the bottom navigation, so it never covers guide text) */}
      {showFloatingButton && (
        <div className="hidden lg:block fixed bottom-5 right-5 z-40">
          <button
            onClick={onOpen}
            className="group flex items-center space-x-2 bg-emergency hover:bg-emergency-600 text-white font-black px-4 py-3.5 rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20 focus:outline-none focus:ring-4 focus:ring-emergency/40"
            aria-label="Emergency Help Dial Modal"
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

          {/* Backdrop Click */}
          <div className="fixed inset-0" onClick={onClose} />

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Emergency Assistance"
            tabIndex={-1}
            className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 border border-lavender/60 z-10 max-h-[90vh] overflow-y-auto"
          >

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-lavender/40 mb-5">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-emergency text-white rounded-xl shadow-xs">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-midnight">
                    Emergency Assistance
                  </h2>
                  <p className="text-xs text-midnight/70 font-medium">Choose a helpline or select what happened</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-midnight/70 hover:bg-lavender/30 hover:text-midnight"
                aria-label="Close emergency menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Direct Get Help Near Me action */}
            {onNavigate && (
              <div className="mb-5">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigate('nearme');
                  }}
                  className="w-full p-4 bg-plum hover:bg-plum-600 text-white rounded-2xl flex items-center justify-between border border-lavender/30 shadow-md transition-transform active:scale-95 group text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-lavender/30 text-white rounded-xl group-hover:scale-110 transition-transform shrink-0 border border-lavender/40">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-black text-white block">
                        {t.nav.getHelpNearMe}
                      </span>
                      <span className="text-xs text-lavender">
                        Find nearby police stations, hospitals, and fire stations on a map
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-lavender group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                </button>
              </div>
            )}

            {/* Direct Official Call Grid */}
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-midnight/70 block mb-3">
                Official National Helplines (1-Tap Call)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickDialNumbers.map((num, idx) => (
                  <a
                    key={idx}
                    href={`tel:${num.phone}`}
                    className="p-3.5 bg-midnight hover:bg-midnight-800 text-ivory rounded-2xl flex items-center justify-between transition-transform active:scale-95 shadow-xs border border-lavender/20"
                  >
                    <div>
                      <span className="text-xs font-bold text-lavender block">{num.label}</span>
                      <span className="text-xs text-ivory/60">{num.desc}</span>
                    </div>
                    <span className="shrink-0 bg-emergency p-2 rounded-xl text-white font-extrabold text-sm flex items-center space-x-1">
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{num.phone}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Emergency Scenario Picker */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-midnight/70 block mb-3">
                Quick Emergency Guides
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
                    <span>{sc.title.en}</span>
                    <ArrowRight className="w-4 h-4 text-plum" />
                  </button>
                ))}
              </div>
            </div>

            {/* Safety confirmation note */}
            <p className="mt-6 text-xs text-center text-midnight/70 font-medium">
              Calls connect only when you confirm on your phone. No automatic dialing.
            </p>

          </div>
        </div>
      )}
    </>
  );
};
