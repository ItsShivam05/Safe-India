import React from 'react';
import { ShieldCheck, Zap, RefreshCw, CheckCircle2 } from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../data/locales';

interface PhilosophyProps {
  lang: Language;
}

export const Philosophy: React.FC<PhilosophyProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section className="py-12 md:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-navy-800 bg-navy-50 px-3 py-1 rounded-full border border-navy-200">
            Design Philosophy
          </span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.philosophy.title}
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Structured around one question: <strong className="text-slate-900">&quot;Something has happened. What should I do now?&quot;</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">

          {/* Pillar 1: Before */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-navy-400 hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-navy-800 text-amber-400 flex items-center justify-center font-bold text-xl mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-navy-800 uppercase tracking-wider block mb-1">Step 1</span>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {t.philosophy.before} → Prepare
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.philosophy.beforeDesc}
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-700 font-medium">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-brandGreen-600 shrink-0" />
                <span>Emergency preparedness checklists</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-brandGreen-600 shrink-0" />
                <span>Digital scam awareness guides</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: During */}
          <div className="bg-slate-50 border-2 border-emergency-500/40 rounded-2xl p-6 sm:p-8 hover:border-emergency-500 hover:shadow-xl transition-all duration-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emergency-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-lg">
              Critical
            </div>
            <div className="w-12 h-12 rounded-xl bg-emergency-600 text-white flex items-center justify-center font-bold text-xl mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-emergency-700 uppercase tracking-wider block mb-1">Step 2</span>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {t.philosophy.during} → Act
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.philosophy.duringDesc}
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-700 font-medium">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emergency-600 shrink-0" />
                <span>Numbered immediate DO THIS NOW steps</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emergency-600 shrink-0" />
                <span>High-contrast DON&apos;T warnings</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3: After */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-brandGreen-500 hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-brandGreen-700 text-white flex items-center justify-center font-bold text-xl mb-4">
              <RefreshCw className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-brandGreen-700 uppercase tracking-wider block mb-1">Step 3</span>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {t.philosophy.after} → Recover
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.philosophy.afterDesc}
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-700 font-medium">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-brandGreen-600 shrink-0" />
                <span>Verified official helpline links & contacts</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-brandGreen-600 shrink-0" />
                <span>Legal rights & RBI Zero Liability protection</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};
