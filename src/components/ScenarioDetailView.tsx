import React, { useState } from 'react';
import type { EmergencyScenario } from '../types';
import { translations } from '../data/locales';
import {
  PhoneCall,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  Share2,
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  UserX,
  Car,
  Activity,
  Droplet,
  Flame,
  Wind,
  ShieldAlert,
  CreditCard,
  Smartphone,
  Shield
} from 'lucide-react';

interface ScenarioDetailViewProps {
  scenario: EmergencyScenario;
  onBack: () => void;
}

export const ScenarioDetailView: React.FC<ScenarioDetailViewProps> = ({
  scenario,
  onBack,
}) => {
  const [copied, setCopied] = useState(false);
  const t = translations.en;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserX': return <UserX className="w-6 h-6" />;
      case 'Car': return <Car className="w-6 h-6" />;
      case 'Activity': return <Activity className="w-6 h-6" />;
      case 'Droplet': return <Droplet className="w-6 h-6" />;
      case 'Flame': return <Flame className="w-6 h-6" />;
      case 'Wind': return <Wind className="w-6 h-6" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6" />;
      case 'CreditCard': return <CreditCard className="w-6 h-6" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6" />;
      case 'Shield': return <Shield className="w-6 h-6" />;
      default: return <AlertTriangle className="w-6 h-6" />;
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-10 animate-in fade-in duration-200 bg-ivory text-midnight">

      {/* Top Back & Share Navigation */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-lavender/40">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-sm font-bold text-midnight hover:text-plum bg-lavender/30 hover:bg-lavender/60 px-3.5 py-2 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-plum" />
          <span>{t.scenarioView.backToEmergencies}</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-midnight hover:text-plum bg-white border border-lavender hover:border-plum px-3 py-2 rounded-xl shadow-xs transition-all"
        >
          <Share2 className="w-3.5 h-3.5 text-plum" />
          <span>{copied ? t.scenarioView.copied : t.scenarioView.shareProtocol}</span>
        </button>
      </div>

      {/* Header Category & Title */}
      <div className="mb-6">
        <div className="inline-flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider text-midnight bg-lavender/40 px-3 py-1 rounded-full border border-lavender mb-3">
          {renderIcon(scenario.iconName)}
          <span>{scenario.categoryLabel.en}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-midnight tracking-tight leading-snug">
          {scenario.title.en}
        </h1>
      </div>

      {/* 🚨 IF YOU ARE IN IMMEDIATE DANGER Banner */}
      <div className="bg-emergency text-white rounded-3xl p-6 sm:p-7 shadow-md mb-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center space-x-2 text-xs font-black tracking-wider uppercase text-white/90">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              <span>{t.scenarioView.immediateDangerHeader}</span>
            </span>
            <p className="text-base sm:text-lg font-bold text-white leading-tight">
              {scenario.immediateActionText?.en}
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

      {/* DO THIS NOW Section (Numbered clear step-by-step list) */}
      <section className="bg-white border border-lavender/60 rounded-3xl p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-lavender/30">
          <div className="w-8 h-8 rounded-xl bg-sage/30 text-midnight flex items-center justify-center font-bold border border-sage">
            <CheckCircle className="w-5 h-5 text-sage-700" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-midnight tracking-tight">
            {t.scenarioView.doNowHeader}
          </h2>
        </div>

        <ol className="space-y-4">
          {scenario.doNow.en.map((step, idx) => (
            <li key={idx} className="flex items-start space-x-4 text-base text-midnight/90 font-medium">
              <span className="w-7 h-7 shrink-0 rounded-full bg-plum text-white flex items-center justify-center text-xs font-extrabold">
                {idx + 1}
              </span>
              <span className="pt-0.5 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
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
          {scenario.dont.en.map((item, idx) => (
            <li key={idx} className="flex items-start space-x-3 text-sm sm:text-base text-midnight/90 font-medium">
              <XCircle className="w-5 h-5 text-emergency shrink-0 mt-0.5" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* AFTER THE IMMEDIATE DANGER Section */}
      <section className="bg-white border border-lavender/60 rounded-3xl p-6 sm:p-8 shadow-xs mb-8">
        <h2 className="text-lg sm:text-xl font-bold text-midnight mb-4 tracking-tight flex items-center space-x-2">
          <Clock className="w-5 h-5 text-plum" />
          <span>{t.scenarioView.afterDangerHeader}</span>
        </h2>
        <ul className="space-y-3 text-sm sm:text-base text-midnight/80">
          {scenario.afterDanger.en.map((step, idx) => (
            <li key={idx} className="flex items-start space-x-3">
              <span className="w-2 h-2 rounded-full bg-plum shrink-0 mt-2" />
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 📞 IMPORTANT VERIFIED RESOURCES Section */}
      <section className="bg-midnight text-ivory rounded-3xl p-6 sm:p-8 shadow-md mb-8 border border-lavender/30">
        <h2 className="text-xl font-black text-white mb-6 tracking-tight flex items-center space-x-2">
          <PhoneCall className="w-5 h-5 text-lavender" />
          <span>{t.scenarioView.importantResourcesHeader}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenario.resources.map((res, idx) => (
            <div key={idx} className="bg-midnight-800 border border-lavender/20 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-sm">{res.name}</h3>
                <p className="text-xs text-lavender mt-0.5">{res.purpose}</p>
              </div>
              <a
                href={`tel:${res.phone}`}
                className="shrink-0 bg-plum hover:bg-plum-600 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-colors shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5 text-lavender" />
                <span>{res.phone}</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Verified Official Source & Date Footer Badge */}
      <div className="bg-white border border-lavender/60 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-midnight/70">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-sage-600 shrink-0" />
          <span>
            <strong>{t.scenarioView.verifiedSource}:</strong> {scenario.source.name}
          </span>
        </div>
        <div className="flex items-center space-x-3 text-midnight/60">
          <span>{t.scenarioView.lastReviewed}: <strong>{scenario.source.lastReviewed}</strong></span>
          {scenario.source.url && (
            <a
              href={scenario.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-plum hover:underline font-semibold"
            >
              <span>Source</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

    </article>
  );
};
