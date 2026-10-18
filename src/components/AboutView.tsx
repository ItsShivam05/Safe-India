import React from 'react';
import { translations } from '../data/locales';
import { Zap, Lock, HeartHandshake, Award } from 'lucide-react';


interface AboutViewProps {}

export const AboutView: React.FC<AboutViewProps> = () => {
  const t = translations.en;

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 bg-ivory text-midnight">
      
      {/* Brand Hero Box */}
      <div className="bg-midnight rounded-3xl p-8 sm:p-12 text-ivory text-center shadow-md mb-12 border border-lavender/30">
        <div className="inline-block mb-6">
          <img
            src="/images/safeindia-emblem.png"
            alt="SafeIndia — Know what to do when it matters"
            className="h-24 sm:h-32 w-auto object-contain mx-auto drop-shadow-md"
          />
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
          {t.aboutPage.title}
        </h1>
        <p className="text-base sm:text-lg text-lavender font-medium max-w-2xl mx-auto">
          {t.aboutPage.subtitle}
        </p>
      </div>

      {/* Core Question & Mission */}
      <div className="bg-white rounded-3xl border border-lavender/60 p-8 sm:p-10 shadow-xs mb-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-black uppercase tracking-widest text-plum bg-lavender/30 px-3.5 py-1 rounded-full border border-lavender">
            {t.aboutPage.missionTitle}
          </span>
          <blockquote className="my-6 text-2xl sm:text-3xl font-black text-midnight italic tracking-tight">
            {t.aboutPage.missionQuote}
          </blockquote>
          <p className="text-base text-midnight/80 leading-relaxed font-normal">
            {t.aboutPage.desc1}
          </p>
        </div>
      </div>

      {/* Core Principles Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-black text-midnight text-center mb-8">
          {t.aboutPage.principlesTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-lavender/60 rounded-3xl p-6 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-lavender/40 text-plum flex items-center justify-center mb-4 border border-lavender">
              <Lock className="w-6 h-6 text-plum" />
            </div>
            <h3 className="text-lg font-bold text-midnight mb-1">
              {t.aboutPage.principle1Title}
            </h3>
            <p className="text-sm text-midnight/75 leading-relaxed">
              {t.aboutPage.principle1Desc}
            </p>
          </div>

          <div className="bg-white border-2 border-emergency/30 rounded-3xl p-6 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-emergency-50 text-emergency flex items-center justify-center mb-4 border border-emergency-200">
              <Zap className="w-6 h-6 text-emergency" />
            </div>
            <h3 className="text-lg font-bold text-midnight mb-1">
              {t.aboutPage.principle2Title}
            </h3>
            <p className="text-sm text-midnight/75 leading-relaxed">
              {t.aboutPage.principle2Desc}
            </p>
          </div>

          <div className="bg-white border border-sage/60 rounded-3xl p-6 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-sage/30 text-midnight flex items-center justify-center mb-4 border border-sage">
              <Award className="w-6 h-6 text-sage-700" />
            </div>
            <h3 className="text-lg font-bold text-midnight mb-1">
              {t.aboutPage.principle3Title}
            </h3>
            <p className="text-sm text-midnight/75 leading-relaxed">
              {t.aboutPage.principle3Desc}
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer Box */}
      <div className="bg-lavender/25 border border-lavender rounded-3xl p-6 flex items-start space-x-4">
        <HeartHandshake className="w-8 h-8 text-plum shrink-0 mt-0.5" />
        <div>
          <h4 className="font-extrabold text-midnight text-sm uppercase tracking-wider mb-1">
            {t.footer.disclaimerTitle}
          </h4>
          <p className="text-xs sm:text-sm text-midnight/80 leading-relaxed">
            {t.footer.disclaimerText}
          </p>
        </div>
      </div>

    </article>
  );
};
