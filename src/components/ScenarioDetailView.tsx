import React, { useState } from 'react';
import type { EmergencyScenario, Language } from '../types';
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
  lang: Language;
}

export const ScenarioDetailView: React.FC<ScenarioDetailViewProps> = ({
  scenario,
  onBack,
  lang,
}) => {
  const [copied, setCopied] = useState(false);
  const t = translations[lang];

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
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-10 animate-in fade-in duration-200">

      {/* Top Back & Share Navigation */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-sm font-bold text-navy-800 hover:text-navy-950 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.scenarioView.backToEmergencies}</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 px-3 py-2 rounded-xl shadow-sm transition-all"
        >
          <Share2 className="w-3.5 h-3.5 text-navy-800" />
          <span>{copied ? t.scenarioView.copied : t.scenarioView.shareProtocol}</span>
        </button>
      </div>

      {/* Header Category & Title */}
      <div className="mb-6">
        <div className="inline-flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider text-navy-800 bg-navy-50 px-3 py-1 rounded-full border border-navy-200 mb-3">
          {renderIcon(scenario.iconName)}
          <span>{scenario.categoryLabel[lang]}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
          {scenario.title[lang]}
        </h1>
      </div>

      {/* 🚨 IF YOU ARE IN IMMEDIATE DANGER Banner */}
      <div className="bg-gradient-to-r from-emergency-600 via-emergency-700 to-emergency-800 text-white rounded-2xl p-5 sm:p-7 shadow-xl mb-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center space-x-2 text-xs font-black tracking-wider uppercase text-amber-300">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span>{t.scenarioView.immediateDangerHeader}</span>
            </span>
            <p className="text-base sm:text-lg font-bold text-white leading-tight">
              {scenario.immediateActionText?.[lang]}
            </p>
          </div>

          {scenario.immediateCallNumber && (
            <a
              href={`tel:${scenario.immediateCallNumber}`}
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center space-x-2 bg-white hover:bg-slate-100 text-emergency-700 font-extrabold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-2xl text-base transition-all active:scale-95"
            >
              <PhoneCall className="w-5 h-5 text-emergency-600 animate-bounce" />
              <span>{t.scenarioView.callNow} {scenario.immediateCallNumber}</span>
            </a>
          )}
        </div>
      </div>

      {/* DO THIS NOW Section (Numbered clear step-by-step list) */}
      <section className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-brandGreen-100 text-brandGreen-700 flex items-center justify-center font-bold">
            <CheckCircle className="w-5 h-5 text-brandGreen-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {t.scenarioView.doNowHeader}
          </h2>
        </div>

        <ol className="space-y-4">
          {scenario.doNow[lang].map((step, idx) => (
            <li key={idx} className="flex items-start space-x-4 text-base sm:text-lg text-slate-800 font-medium">
              <span className="w-7 h-7 shrink-0 rounded-full bg-navy-800 text-white flex items-center justify-center text-sm font-extrabold">
                {idx + 1}
              </span>
              <span className="pt-0.5 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* DON'T Section (Clear warnings) */}
      <section className="bg-amber-50/50 border-2 border-amber-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-amber-200/60">
          <div className="w-8 h-8 rounded-lg bg-emergency-100 text-emergency-700 flex items-center justify-center font-bold">
            <XCircle className="w-5 h-5 text-emergency-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {t.scenarioView.dontHeader}
          </h2>
        </div>

        <ul className="space-y-3">
          {scenario.dont[lang].map((item, idx) => (
            <li key={idx} className="flex items-start space-x-3 text-sm sm:text-base text-slate-800 font-medium">
              <XCircle className="w-5 h-5 text-emergency-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* AFTER THE IMMEDIATE DANGER Section */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 tracking-tight flex items-center space-x-2">
          <Clock className="w-5 h-5 text-navy-700" />
          <span>{t.scenarioView.afterDangerHeader}</span>
        </h2>
        <ul className="space-y-3 text-sm sm:text-base text-slate-700">
          {scenario.afterDanger[lang].map((step, idx) => (
            <li key={idx} className="flex items-start space-x-3">
              <span className="w-2 h-2 rounded-full bg-navy-600 shrink-0 mt-2" />
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 📞 IMPORTANT VERIFIED RESOURCES Section */}
      <section className="bg-navy-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg mb-8">
        <h2 className="text-xl font-extrabold text-white mb-6 tracking-tight flex items-center space-x-2">
          <PhoneCall className="w-5 h-5 text-amber-400" />
          <span>{t.scenarioView.importantResourcesHeader}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenario.resources.map((res, idx) => (
            <div key={idx} className="bg-navy-800/90 border border-navy-700 rounded-xl p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-100 text-sm">{res.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{res.purpose}</p>
              </div>
              <a
                href={`tel:${res.phone}`}
                className="shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-2 rounded-lg text-xs flex items-center space-x-1.5 transition-colors shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{res.phone}</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Verified Official Source & Date Footer Badge */}
      <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>{t.scenarioView.verifiedSource}:</strong> {scenario.source.name}
          </span>
        </div>
        <div className="flex items-center space-x-3 text-slate-500">
          <span>{t.scenarioView.lastReviewed}: <strong>{scenario.source.lastReviewed}</strong></span>
          {scenario.source.url && (
            <a
              href={scenario.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-navy-800 hover:underline font-semibold"
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
