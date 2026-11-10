import React from 'react';
import { useLanguage } from '../i18n/language';
import { emergencyScenarios } from '../data/emergencies';
import { awarenessGuides } from '../data/awareness';
import type { VerifiedSource } from '../types';
import { reportMistakeUrl, TAB_PATHS } from '../data/site';
import { Zap, Lock, HeartHandshake, Award, ExternalLink, ShieldCheck, Accessibility } from 'lucide-react';

// One entry per authority, keeping a link if any guide provides one.
const citedSources = [...emergencyScenarios, ...awarenessGuides]
  .map((guide) => guide.source)
  .reduce<VerifiedSource[]>((sources, source) => {
    const existing = sources.find((s) => s.name === source.name);
    if (!existing) return [...sources, source];
    if (!existing.url && source.url) existing.url = source.url;
    return sources;
  }, [])
  .map((source) => ({ name: source.name, url: source.url }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const AboutView: React.FC = () => {
  const { t } = useLanguage();

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 bg-ivory text-midnight">
      
      {/* Brand Hero Box */}
      <div className="bg-midnight rounded-3xl p-8 sm:p-12 text-ivory text-center shadow-md mb-12 border border-lavender/30">
        <div className="inline-block mb-6">
          <img
            src="/images/safeindia-emblem.png"
            alt={t.aboutPage.logoAlt}
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

      {/* Official Sources */}
      <section id="sources" className="bg-white rounded-3xl border border-lavender/60 p-6 sm:p-8 shadow-xs mb-6 scroll-mt-28">
        <h2 className="text-xl font-black text-midnight mb-2 flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-sage-700 shrink-0" />
          <span>{t.aboutPage.sourcesTitle}</span>
        </h2>
        <p className="text-sm text-midnight/80 mb-4">
          {t.aboutPage.sourcesIntro}{' '}
          <a
            href={reportMistakeUrl('About page', TAB_PATHS.about)}
            target="_blank"
            rel="noopener noreferrer"
            title={t.scenarioView.reportMistakeNote}
            className="text-plum font-semibold hover:underline"
          >
            {t.scenarioView.reportMistake}
          </a>
        </p>
        <ul className="space-y-2 text-sm text-midnight/90">
          {citedSources.map((source) => (
            <li key={source.name}>
              {source.url ? (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-plum font-semibold hover:underline"
                >
                  <span>{source.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              ) : (
                <span>{source.name}</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Privacy */}
      <section id="privacy" className="bg-white rounded-3xl border border-lavender/60 p-6 sm:p-8 shadow-xs mb-6 scroll-mt-28">
        <h2 className="text-xl font-black text-midnight mb-3 flex items-center space-x-2">
          <Lock className="w-5 h-5 text-plum shrink-0" />
          <span>{t.aboutPage.privacyTitle}</span>
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-midnight/90">
          {t.aboutPage.privacyPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      {/* Accessibility */}
      <section id="accessibility" className="bg-white rounded-3xl border border-lavender/60 p-6 sm:p-8 shadow-xs mb-10 scroll-mt-28">
        <h2 className="text-xl font-black text-midnight mb-3 flex items-center space-x-2">
          <Accessibility className="w-5 h-5 text-plum shrink-0" />
          <span>{t.aboutPage.accessibilityTitle}</span>
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-midnight/90">
          {t.aboutPage.accessibilityPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

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
