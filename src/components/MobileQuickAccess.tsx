import React, { useState } from 'react';
import { ShieldAlert, X, PhoneCall, ArrowRight } from 'lucide-react';
import type { Language, EmergencyScenario } from '../types';
import { emergencyScenarios } from '../data/emergencies';
import { translations } from '../data/locales';

interface MobileQuickAccessProps {
  lang: Language;
  onSelectScenario: (scenario: EmergencyScenario) => void;
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
}

export const MobileQuickAccess: React.FC<MobileQuickAccessProps> = ({
  lang,
  onSelectScenario,
  isOpenExternal,
  onCloseExternal,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const t = translations[lang];

  const isOpen = isOpenExternal !== undefined ? isOpenExternal : internalOpen;
  const setIsOpen = (val: boolean) => {
    if (onCloseExternal && !val) onCloseExternal();
    setInternalOpen(val);
  };

  const quickDialNumbers = [
    { label: "112 National Emergency", phone: "112", desc: "Police, Fire, Rescue" },
    { label: "1930 Cyber Fraud", phone: "1930", desc: "Bank & UPI Fraud" },
    { label: "108 Medical Ambulance", phone: "108", desc: "Free Ambulance 24/7" },
    { label: "1091 Women Helpline", phone: "1091", desc: "Women Safety 24/7" },
  ];

  return (
    <>
      {/* Floating Bottom Right Button for Mobile & Desktop */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center space-x-2 bg-gradient-to-r from-emergency-600 to-emergency-700 hover:from-emergency-500 hover:to-emergency-600 text-white font-black px-4 py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20 focus:outline-none focus:ring-4 focus:ring-emergency-500/50"
          aria-label="Emergency Help Dial Modal"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <ShieldAlert className="w-5 h-5 text-white animate-pulse" />
          <span className="text-sm tracking-wide uppercase font-extrabold">{t.nav.emergencyHelp}</span>
        </button>
      </div>

      {/* Emergency Quick Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-200">

          {/* Backdrop Click */}
          <div className="fixed inset-0" onClick={() => setIsOpen(false)} />

          <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 border border-slate-200 z-10 max-h-[90vh] overflow-y-auto">

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-emergency-600 text-white rounded-xl">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">
                    🚨 Emergency Direct Help
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">Select official helpline or scenario protocol</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-800"
                aria-label="Close emergency menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Direct Official Call Grid */}
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                Official National Helplines (1-Tap Dial)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickDialNumbers.map((num, idx) => (
                  <a
                    key={idx}
                    href={`tel:${num.phone}`}
                    className="p-3.5 bg-slate-900 hover:bg-navy-900 text-white rounded-2xl flex items-center justify-between transition-transform active:scale-95 shadow-md border border-slate-800"
                  >
                    <div>
                      <span className="text-xs font-semibold text-amber-400 block">{num.label}</span>
                      <span className="text-xs text-slate-400">{num.desc}</span>
                    </div>
                    <span className="shrink-0 bg-emergency-600 p-2 rounded-xl text-white font-extrabold text-sm flex items-center space-x-1">
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{num.phone}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Emergency Scenario Picker */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                Quick Scenario Protocols
              </span>
              <div className="space-y-2">
                {emergencyScenarios.slice(0, 4).map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setIsOpen(false);
                      onSelectScenario(sc);
                    }}
                    className="w-full text-left p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 transition-colors"
                  >
                    <span>{sc.title[lang]}</span>
                    <ArrowRight className="w-4 h-4 text-navy-800" />
                  </button>
                ))}
              </div>
            </div>

            {/* Safety confirmation note */}
            <p className="mt-6 text-[11px] text-center text-slate-400 font-medium">
              Calls are initiated only after explicit user confirmation on phone. No auto-dialing.
            </p>

          </div>
        </div>
      )}
    </>
  );
};
