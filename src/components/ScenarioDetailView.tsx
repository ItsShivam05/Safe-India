import React, { useState } from 'react';
import { Link } from 'react-router';
import type { EmergencyScenario } from '../types';
import { fill, useLanguage } from '../i18n/language';
import { absoluteUrl, reportMistakeUrl, scenarioPath, TAB_PATHS } from '../data/site';
import { buildScenarioShareMessage } from '../services/shareService';
import { useSpeech } from '../hooks/useSpeech';
import { ShareButtons } from './ShareButtons';
import { ScenarioIcon } from './ScenarioIcon';
import {
  PhoneCall,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Volume2,
  VolumeX,
  ListOrdered,
  Rows3,
  MapPin,
  Headphones,
} from 'lucide-react';

interface ScenarioDetailViewProps {
  scenario: EmergencyScenario;
  onBack: () => void;
}

export const ScenarioDetailView: React.FC<ScenarioDetailViewProps> = ({
  scenario,
  onBack,
}) => {
  const { t, pick, lang } = useLanguage();
  const speech = useSpeech(lang);
  const [stepMode, setStepMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const title = pick(scenario.title);
  const immediateText = scenario.immediateActionText ? pick(scenario.immediateActionText) : '';
  const doNow = pick(scenario.doNow);
  const dont = pick(scenario.dont);
  const afterDanger = pick(scenario.afterDanger);
  const isLastStep = currentStep === doNow.length - 1;

  const shareProps = {
    title,
    message: buildScenarioShareMessage(scenario, lang),
    url: absoluteUrl(scenarioPath(scenario.id)),
  };

  // In one-step mode, read just the step on screen; otherwise read the whole guide
  const handleReadAloud = () => {
    if (speech.speaking) {
      speech.stop();
      return;
    }
    speech.speak(
      stepMode
        ? [doNow[currentStep]]
        : [title, immediateText, t.scenarioView.doNowHeader, ...doNow.map((s, i) => `${i + 1}. ${s}`), t.scenarioView.dontHeader, ...dont]
    );
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    if (speech.speaking) speech.speak([doNow[step]]);
  };

  // The operator script fits calls to 112, 108 and 101, not scam helplines
  const showOperatorScript = scenario.category !== 'digital-emergency';

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-10 animate-in fade-in duration-200 bg-ivory text-midnight">

      {/* Top Back & Share Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-4 border-b border-lavender/40">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-sm font-bold text-midnight hover:text-plum bg-lavender/30 hover:bg-lavender/60 px-3.5 py-2 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-plum" />
          <span>{t.scenarioView.backToEmergencies}</span>
        </button>

        <ShareButtons {...shareProps} compact />
      </div>

      {/* Header Category & Title */}
      <div className="mb-6">
        <div className="inline-flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider text-midnight bg-lavender/40 px-3 py-1 rounded-full border border-lavender mb-3">
          <ScenarioIcon name={scenario.iconName} className="w-6 h-6" />
          <span>{pick(scenario.categoryLabel)}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-midnight tracking-tight leading-snug">
          {title}
        </h1>
      </div>

      {/* 🚨 IF YOU ARE IN IMMEDIATE DANGER Banner */}
      <div className="bg-emergency text-white rounded-3xl p-6 sm:p-7 shadow-md mb-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center space-x-2 text-xs font-black tracking-wider uppercase text-white/90">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              <span>{t.scenarioView.immediateDangerHeader}</span>
            </span>
            <p className="text-base sm:text-lg font-bold text-white leading-tight">
              {immediateText}
            </p>
          </div>

          {scenario.immediateCallNumber && (
            <a
              href={`tel:${scenario.immediateCallNumber}`}
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center space-x-2 bg-white hover:bg-ivory text-emergency font-black px-6 py-3.5 rounded-2xl shadow-md text-base transition-all active:scale-95"
            >
              <PhoneCall className="w-5 h-5 text-emergency" />
              <span>{t.scenarioView.callNow} {scenario.immediateCallNumber}</span>
            </a>
          )}
        </div>
      </div>

      {/* Reading tools */}
      <div className="flex flex-wrap gap-2 mb-6">
        {speech.supported && (
          <button
            type="button"
            onClick={handleReadAloud}
            aria-pressed={speech.speaking}
            className="inline-flex items-center space-x-2 bg-white border border-lavender hover:border-plum text-midnight font-bold px-4 py-2.5 rounded-xl text-sm shadow-xs"
          >
            {speech.speaking ? <VolumeX className="w-4 h-4 text-plum" /> : <Volume2 className="w-4 h-4 text-plum" />}
            <span>{speech.speaking ? t.scenarioView.stopReading : t.scenarioView.readAloud}</span>
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            setStepMode(!stepMode);
            setCurrentStep(0);
            speech.stop();
          }}
          aria-pressed={stepMode}
          className="inline-flex items-center space-x-2 bg-white border border-lavender hover:border-plum text-midnight font-bold px-4 py-2.5 rounded-xl text-sm shadow-xs"
        >
          {stepMode ? <Rows3 className="w-4 h-4 text-plum" /> : <ListOrdered className="w-4 h-4 text-plum" />}
          <span>{stepMode ? t.scenarioView.listMode : t.scenarioView.stepMode}</span>
        </button>
      </div>

      {/* DO THIS NOW Section */}
      <section className="bg-white border border-lavender/60 rounded-3xl p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-lavender/30">
          <div className="w-8 h-8 rounded-xl bg-sage/30 text-midnight flex items-center justify-center font-bold border border-sage">
            <CheckCircle className="w-5 h-5 text-sage-700" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-midnight tracking-tight">
            {t.scenarioView.doNowHeader}
          </h2>
        </div>

        {stepMode ? (
          <div aria-live="polite">
            <p className="text-sm font-bold text-plum mb-3">
              {fill(t.scenarioView.stepOf, { n: currentStep + 1, total: doNow.length })}
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-midnight leading-snug min-h-[8rem]" data-testid="current-step">
              {doNow[currentStep]}
            </p>
            <div className="flex items-center justify-center gap-2 my-6" aria-hidden="true">
              {doNow.map((_, idx) => (
                <span key={idx} className={`h-2.5 rounded-full transition-all ${idx === currentStep ? 'w-8 bg-plum' : 'w-2.5 bg-lavender'}`} />
              ))}
            </div>
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => goToStep(currentStep - 1)}
                disabled={currentStep === 0}
                className="inline-flex items-center space-x-2 bg-white border border-lavender text-midnight font-bold px-5 py-3.5 rounded-2xl disabled:opacity-40"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>{t.scenarioView.previous}</span>
              </button>
              {isLastStep ? (
                <span className="text-sm font-bold text-sage-700 text-right">{t.scenarioView.finished}</span>
              ) : (
                <button
                  type="button"
                  onClick={() => goToStep(currentStep + 1)}
                  className="inline-flex items-center space-x-2 bg-plum hover:bg-plum-600 text-white font-bold px-6 py-3.5 rounded-2xl"
                >
                  <span>{t.scenarioView.next}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <ol className="space-y-4">
            {doNow.map((step, idx) => (
              <li key={idx} className="flex items-start space-x-4 text-base text-midnight/90 font-medium">
                <span className="w-7 h-7 shrink-0 rounded-full bg-plum text-white flex items-center justify-center text-xs font-extrabold">
                  {idx + 1}
                </span>
                <span className="pt-0.5 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        )}
      </section>

      {/* DON'T Section (Clear warnings) */}
      <section className="bg-white border-2 border-emergency/30 rounded-3xl p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-emergency-100">
          <div className="w-8 h-8 rounded-xl bg-emergency-50 text-emergency flex items-center justify-center font-bold border border-emergency-200">
            <XCircle className="w-5 h-5 text-emergency" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-midnight tracking-tight">
            {t.scenarioView.dontHeader}
          </h2>
        </div>

        <ul className="space-y-3">
          {dont.map((item, idx) => (
            <li key={idx} className="flex items-start space-x-3 text-sm sm:text-base text-midnight/90 font-medium">
              <XCircle className="w-5 h-5 text-emergency shrink-0 mt-0.5" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* What to tell the operator */}
      {showOperatorScript && (
        <section className="bg-lavender/20 border border-lavender/60 rounded-3xl p-6 sm:p-8 mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-midnight mb-4 flex items-center space-x-2">
            <Headphones className="w-5 h-5 text-plum" />
            <span>{t.scenarioView.tell112Title}</span>
          </h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm sm:text-base text-midnight/90">
            {t.scenarioView.tell112Points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ol>
          <Link
            to={TAB_PATHS.whereami}
            className="mt-4 inline-flex items-center space-x-2 text-sm font-bold text-plum hover:underline"
          >
            <MapPin className="w-4 h-4" />
            <span>{t.scenarioView.whereAmILink}</span>
          </Link>
        </section>
      )}

      {/* AFTER THE IMMEDIATE DANGER Section */}
      <section className="bg-white border border-lavender/60 rounded-3xl p-6 sm:p-8 shadow-xs mb-8">
        <h2 className="text-lg sm:text-xl font-bold text-midnight mb-4 tracking-tight flex items-center space-x-2">
          <Clock className="w-5 h-5 text-plum" />
          <span>{t.scenarioView.afterDangerHeader}</span>
        </h2>
        <ul className="space-y-3 text-sm sm:text-base text-midnight/80">
          {afterDanger.map((step, idx) => (
            <li key={idx} className="flex items-start space-x-3">
              <span className="w-2 h-2 rounded-full bg-plum shrink-0 mt-2" />
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Key helplines */}
      <section className="bg-midnight text-ivory rounded-3xl p-6 sm:p-8 shadow-md mb-8 border border-lavender/30">
        <h2 className="text-xl font-black text-white mb-6 tracking-tight flex items-center space-x-2">
          <PhoneCall className="w-5 h-5 text-lavender" />
          <span>{t.scenarioView.importantResourcesHeader}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenario.resources.map((res, idx) => (
            <div key={idx} className="bg-midnight-800 border border-lavender/20 rounded-2xl p-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-white text-sm">{res.name}</h3>
                <p className="text-xs text-lavender mt-0.5">{res.purpose}</p>
              </div>
              {res.phone ? (
                <a
                  href={`tel:${res.phone}`}
                  className="shrink-0 bg-plum hover:bg-plum-600 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-colors shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-lavender" />
                  <span>{res.phone}</span>
                </a>
              ) : res.url ? (
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 bg-plum hover:bg-plum-600 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-colors shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-lavender" />
                  <span>{t.scenarioView.openWebsite}</span>
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* Share This Guide */}
      <section className="bg-white border border-lavender/60 rounded-3xl p-6 sm:p-8 shadow-xs mb-8">
        <h2 className="text-lg font-bold text-midnight">{t.scenarioView.shareSectionTitle}</h2>
        <p className="mt-1 mb-4 text-sm text-midnight/80">{t.scenarioView.shareSectionBody}</p>
        <ShareButtons {...shareProps} />
      </section>

      {/* Source, date and mistake report */}
      <div className="bg-white border border-lavender/60 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-midnight/70">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-sage-600 shrink-0" />
          <span>
            <strong>{t.scenarioView.verifiedSource}:</strong> {scenario.source.name}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-midnight/70">
          <span>{t.scenarioView.lastReviewed}: <strong>{scenario.source.lastReviewed}</strong></span>
          <a
            href={reportMistakeUrl(scenario.title.en, scenarioPath(scenario.id))}
            target="_blank"
            rel="noopener noreferrer"
            title={t.scenarioView.reportMistakeNote}
            className="inline-flex items-center space-x-1 text-plum hover:underline font-semibold"
          >
            <span>{t.scenarioView.reportMistake}</span>
          </a>
          {scenario.source.url && (
            <a
              href={scenario.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-plum hover:underline font-semibold"
            >
              <span>{t.scenarioView.verifiedSource}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

    </article>
  );
};
