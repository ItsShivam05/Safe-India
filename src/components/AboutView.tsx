import React from 'react';
import type { Language } from '../types';
import { translations } from '../data/locales';
import { Zap, Lock, HeartHandshake, Award } from 'lucide-react';


interface AboutViewProps {
  lang: Language;
}

export const AboutView: React.FC<AboutViewProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      
      {/* Brand Hero Box */}
      <div className="bg-gradient-to-b from-navy-900 to-navy-950 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl mb-12 border border-navy-800">
        <img
          src="/safeindia-logo.png"
          alt="SafeIndia Official Logo"
          className="h-28 sm:h-36 w-auto mx-auto mb-6 object-contain drop-shadow-lg"
        />
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
          {t.aboutPage.title}
        </h1>
        <p className="text-base sm:text-xl text-amber-300 font-medium max-w-2xl mx-auto">
          {t.aboutPage.subtitle}
        </p>
      </div>

      {/* Core Question & Mission */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm mb-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-black uppercase tracking-widest text-navy-800 bg-navy-100 px-3 py-1 rounded-full">
            {t.aboutPage.missionTitle}
          </span>
          <blockquote className="my-6 text-2xl sm:text-3xl font-extrabold text-slate-900 italic tracking-tight">
            {t.aboutPage.missionQuote}
          </blockquote>
          <p className="text-base text-slate-700 leading-relaxed font-medium">
            {t.aboutPage.desc1}
          </p>
        </div>
      </div>

      {/* Core Principles Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8">
          {t.aboutPage.principlesTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl bg-navy-800 text-amber-400 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {t.aboutPage.principle1Title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.aboutPage.principle1Desc}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl bg-emergency-600 text-white flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {t.aboutPage.principle2Title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.aboutPage.principle2Desc}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {t.aboutPage.principle3Title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.aboutPage.principle3Desc}
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer Box */}
      <div className="bg-amber-50 border border-amber-300 rounded-2xl p-6 flex items-start space-x-4">
        <HeartHandshake className="w-8 h-8 text-amber-600 shrink-0 mt-1" />
        <div>
          <h4 className="font-extrabold text-amber-900 text-sm uppercase tracking-wider mb-1">
            {t.footer.disclaimerTitle}
          </h4>
          <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
            {t.footer.disclaimerText}
          </p>
        </div>
      </div>

    </article>
  );
};
