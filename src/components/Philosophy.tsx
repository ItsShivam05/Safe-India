import React from 'react';
import { ShieldCheck, Zap, RefreshCw, CheckCircle2, HeartHandshake, BookOpenCheck, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../i18n/language';

export const Philosophy: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 md:py-16 bg-ivory text-midnight border-b border-lavender/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-plum bg-lavender/30 px-3.5 py-1 rounded-full border border-lavender">
            {t.philosophy.badge}
          </span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-black text-midnight tracking-tight">
            {t.philosophy.title}
          </h2>
          <p className="mt-2 text-midnight/70 text-sm sm:text-base">
            {t.philosophy.structuredAround}{' '}
            <strong className="text-midnight">{t.philosophy.question}</strong>
          </p>
        </div>

        {/* 3 Step Protocol Cards (Before / During / After) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">

          {/* Pillar 1: Before */}
          <div className="bg-white border border-lavender/60 rounded-3xl p-6 sm:p-7 shadow-xs hover:border-plum transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-lavender/40 text-plum flex items-center justify-center font-bold text-xl mb-4 border border-lavender">
                <ShieldCheck className="w-6 h-6 text-plum" />
              </div>
              <span className="text-xs font-bold text-plum uppercase tracking-wider block mb-1">{t.philosophy.phase1}</span>
              <h3 className="text-xl font-bold text-midnight mb-2">
                {t.philosophy.before} → {t.philosophy.prepare}
              </h3>
              <p className="text-sm text-midnight/75 leading-relaxed">
                {t.philosophy.beforeDesc}
              </p>
            </div>
            <ul className="mt-5 pt-4 border-t border-lavender/30 space-y-2 text-xs text-midnight/80 font-medium">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0" />
                <span>{t.philosophy.phase1Points[0]}</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0" />
                <span>{t.philosophy.phase1Points[1]}</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: During */}
          <div className="bg-white border-2 border-emergency/40 rounded-3xl p-6 sm:p-7 shadow-xs hover:border-emergency transition-all duration-200 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 bg-emergency text-white text-xs font-extrabold uppercase px-3 py-1 rounded-bl-xl">
              {t.philosophy.critical}
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emergency-50 text-emergency flex items-center justify-center font-bold text-xl mb-4 border border-emergency-200">
                <Zap className="w-6 h-6 text-emergency" />
              </div>
              <span className="text-xs font-bold text-emergency uppercase tracking-wider block mb-1">{t.philosophy.phase2}</span>
              <h3 className="text-xl font-bold text-midnight mb-2">
                {t.philosophy.during} → {t.philosophy.act}
              </h3>
              <p className="text-sm text-midnight/75 leading-relaxed">
                {t.philosophy.duringDesc}
              </p>
            </div>
            <ul className="mt-5 pt-4 border-t border-emergency-100 space-y-2 text-xs text-midnight/80 font-medium">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emergency shrink-0" />
                <span>{t.philosophy.phase2Points[0]}</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emergency shrink-0" />
                <span>{t.philosophy.phase2Points[1]}</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3: After */}
          <div className="bg-white border border-sage/60 rounded-3xl p-6 sm:p-7 shadow-xs hover:border-sage-600 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sage/30 text-midnight flex items-center justify-center font-bold text-xl mb-4 border border-sage">
                <RefreshCw className="w-6 h-6 text-sage-700" />
              </div>
              <span className="text-xs font-bold text-sage-700 uppercase tracking-wider block mb-1">{t.philosophy.phase3}</span>
              <h3 className="text-xl font-bold text-midnight mb-2">
                {t.philosophy.after} → {t.philosophy.recover}
              </h3>
              <p className="text-sm text-midnight/75 leading-relaxed">
                {t.philosophy.afterDesc}
              </p>
            </div>
            <ul className="mt-5 pt-4 border-t border-sage/40 space-y-2 text-xs text-midnight/80 font-medium">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0" />
                <span>{t.philosophy.phase3Points[0]}</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0" />
                <span>{t.philosophy.phase3Points[1]}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Storytelling Modules with Cinematic Anime Illustrations */}
        <div className="space-y-12">
          
          {/* Story 1: Community Support & Bystander Assistance */}
          <div className="bg-white rounded-3xl border border-lavender/50 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1 p-6 sm:p-8 lg:p-10 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-lavender/30 text-plum px-3 py-1 rounded-full text-xs font-bold">
                <HeartHandshake className="w-3.5 h-3.5 text-plum" />
                <span>{t.philosophy.story1Badge}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-midnight tracking-tight leading-snug">
                {t.philosophy.story1Title}
              </h3>
              <p className="text-sm text-midnight/80 leading-relaxed font-normal">
                {t.philosophy.story1Body}
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-midnight/70">
                <span className="bg-ivory px-2.5 py-1 rounded-lg border border-lavender">{t.philosophy.story1Tags[0]}</span>
                <span className="bg-ivory px-2.5 py-1 rounded-lg border border-lavender">{t.philosophy.story1Tags[1]}</span>
                <span className="bg-ivory px-2.5 py-1 rounded-lg border border-lavender">{t.philosophy.story1Tags[2]}</span>
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2 h-44 sm:h-64 lg:h-80 relative overflow-hidden bg-midnight">
              <img
                src="/illustrations/community_support.jpg"
                alt={t.philosophy.story1Alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Story 2: Emergency Preparedness & First-Aid Knowledge */}
          <div className="bg-white rounded-3xl border border-lavender/50 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 h-44 sm:h-64 lg:h-80 relative overflow-hidden bg-midnight">
              <img
                src="/illustrations/safety_preparedness.jpg"
                alt={t.philosophy.story2Alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-sage/30 text-midnight px-3 py-1 rounded-full text-xs font-bold border border-sage">
                <BookOpenCheck className="w-3.5 h-3.5 text-sage-700" />
                <span>{t.philosophy.story2Badge}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-midnight tracking-tight leading-snug">
                {t.philosophy.story2Title}
              </h3>
              <p className="text-sm text-midnight/80 leading-relaxed font-normal">
                {t.philosophy.story2Body}
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-midnight/70">
                <span className="bg-ivory px-2.5 py-1 rounded-lg border border-lavender">{t.philosophy.story2Tags[0]}</span>
                <span className="bg-ivory px-2.5 py-1 rounded-lg border border-lavender">{t.philosophy.story2Tags[1]}</span>
                <span className="bg-ivory px-2.5 py-1 rounded-lg border border-lavender">{t.philosophy.story2Tags[2]}</span>
              </div>
            </div>
          </div>

          {/* Story 3: Accessing Dedicated Public Responders */}
          <div className="bg-white rounded-3xl border border-lavender/50 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1 p-6 sm:p-8 lg:p-10 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-emergency-50 text-emergency px-3 py-1 rounded-full text-xs font-bold border border-emergency-200">
                <ShieldAlert className="w-3.5 h-3.5 text-emergency" />
                <span>{t.philosophy.story3Badge}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-midnight tracking-tight leading-snug">
                {t.philosophy.story3Title}
              </h3>
              <p className="text-sm text-midnight/80 leading-relaxed font-normal">
                {t.philosophy.story3Body}
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-midnight/70">
                <span className="bg-ivory px-2.5 py-1 rounded-lg border border-lavender">{t.philosophy.story3Tags[0]}</span>
                <span className="bg-ivory px-2.5 py-1 rounded-lg border border-lavender">{t.philosophy.story3Tags[1]}</span>
                <span className="bg-ivory px-2.5 py-1 rounded-lg border border-lavender">{t.philosophy.story3Tags[2]}</span>
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2 h-44 sm:h-64 lg:h-80 relative overflow-hidden bg-midnight">
              <img
                src="/illustrations/emergency_responders.jpg"
                alt={t.philosophy.story3Alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
