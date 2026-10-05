import React, { useState } from 'react';
import type { Language } from '../types';
import { officialResources } from '../data/resources';
import { translations } from '../data/locales';
import {
  MapPin,
  PhoneCall,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Clock,
  UserCheck,
  Search,
  Sparkles
} from 'lucide-react';

interface ResourcesViewProps {
  lang: Language;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const t = translations[lang];

  const categories = [
    { id: 'all', label: t.emergencySection.allCategories },
    { id: 'emergency', label: lang === 'en' ? 'National Emergency' : 'राष्ट्रीय आपातकालीन' },
    { id: 'women-child', label: lang === 'en' ? 'Women & Child' : 'महिला एवं बाल' },
    { id: 'cyber', label: lang === 'en' ? 'Cyber Crime' : 'साइबर सुरक्षा' },
    { id: 'medical', label: lang === 'en' ? 'Medical Emergency' : 'चिकित्सा सेवा' },
    { id: 'disaster', label: lang === 'en' ? 'Disaster & Fire' : 'आपदा एवं आग' },
    { id: 'mental-health', label: lang === 'en' ? 'Mental Health' : 'मानसिक स्वास्थ्य' },
    { id: 'transport', label: lang === 'en' ? 'Transport & Rail' : 'परिवहन एवं रेलवे' },
  ];

  const handleCopy = (id: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const filteredResources = officialResources.filter((res) => {
    const matchesCat = activeCategory === 'all' || res.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      res.name[lang].toLowerCase().includes(q) ||
      res.phone.includes(q) ||
      res.purpose[lang].toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

      {/* Header */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center space-x-2 bg-brandGreen-100 text-brandGreen-800 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-brandGreen-200 mb-3">
          <MapPin className="w-4 h-4 text-brandGreen-600" />
          <span>Government & Official Directory</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          📍 {t.resourcesSection.title}
        </h1>
        <p className="mt-2 text-slate-600 text-base sm:text-lg">
          {t.resourcesSection.subheading}
        </p>
      </div>

      {/* Top Essential Quick Strip */}
      <div className="mb-8 bg-gradient-to-r from-navy-900 via-navy-900 to-navy-950 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-extrabold tracking-wide uppercase text-amber-300">
            {lang === 'en' ? 'Priority Emergency Helplines' : 'प्राथमिक आपातकालीन नंबर'}
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <a
            href="tel:112"
            className="bg-emergency-600 hover:bg-emergency-500 p-3.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all hover:scale-102 shadow-md group"
          >
            <span className="text-xs font-bold text-emergency-100 uppercase">National Emergency</span>
            <span className="text-2xl font-black text-white mt-0.5 group-hover:scale-110 transition-transform">112</span>
            <span className="text-[10px] text-white/80">Police / Fire / Ambulance</span>
          </a>

          <a
            href="tel:1930"
            className="bg-navy-800 border border-navy-700 hover:bg-navy-700 p-3.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all hover:scale-102 shadow-md group"
          >
            <span className="text-xs font-bold text-amber-400 uppercase">Cyber Crime Fraud</span>
            <span className="text-2xl font-black text-white mt-0.5 group-hover:scale-110 transition-transform">1930</span>
            <span className="text-[10px] text-slate-300">Fund Freeze / Scams</span>
          </a>

          <a
            href="tel:108"
            className="bg-navy-800 border border-navy-700 hover:bg-navy-700 p-3.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all hover:scale-102 shadow-md group"
          >
            <span className="text-xs font-bold text-emerald-400 uppercase">Medical Ambulance</span>
            <span className="text-2xl font-black text-white mt-0.5 group-hover:scale-110 transition-transform">108</span>
            <span className="text-[10px] text-slate-300">Free Ambulance 24/7</span>
          </a>

          <a
            href="tel:1091"
            className="bg-navy-800 border border-navy-700 hover:bg-navy-700 p-3.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all hover:scale-102 shadow-md group"
          >
            <span className="text-xs font-bold text-amber-300 uppercase">Women Helpline</span>
            <span className="text-2xl font-black text-white mt-0.5 group-hover:scale-110 transition-transform">1091</span>
            <span className="text-[10px] text-slate-300">24/7 Women Distress</span>
          </a>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="mb-8 space-y-4">
        <div className="max-w-xl mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search service name or helpline number (e.g. 112, Cyber, Mental Health)..."
            className="w-full bg-white border border-slate-300 focus:border-navy-800 rounded-2xl pl-11 pr-4 py-3 text-sm sm:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-navy-800/20 text-slate-900 placeholder-slate-400"
          />
        </div>

        <div className="flex items-center justify-start md:justify-center overflow-x-auto pb-2 gap-2 scrollbar-none px-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${activeCategory === cat.id
                ? 'bg-navy-800 text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className={`bg-white rounded-3xl border-2 p-6 sm:p-7 shadow-sm transition-all duration-200 hover:shadow-lg flex flex-col justify-between ${res.isNationalEmergency ? 'border-emergency-500/40' : 'border-slate-200 hover:border-navy-400'
              }`}
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-navy-800 bg-navy-100 px-2.5 py-0.5 rounded-full">
                  {res.categoryLabel[lang]}
                </span>
                <span className="inline-flex items-center space-x-1 text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
                  <Clock className="w-3 h-3" />
                  <span>{res.availability}</span>
                </span>
              </div>

              {/* Service Name */}
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                {res.name[lang]}
              </h2>

              {/* Purpose */}
              <div className="mt-3 text-sm text-slate-700 font-medium leading-relaxed">
                <strong className="text-slate-900 block text-xs uppercase text-slate-400 font-bold mb-0.5">
                  {t.resourcesSection.forWhat}:
                </strong>
                <span>{res.purpose[lang]}</span>
              </div>

              {/* Who can use */}
              <div className="mt-3 text-xs text-slate-600 flex items-start space-x-2">
                <UserCheck className="w-4 h-4 text-navy-700 shrink-0 mt-0.5" />
                <span>
                  <strong>{t.resourcesSection.whoCanUse}:</strong> {res.whoCanUse[lang]}
                </span>
              </div>
            </div>

            {/* Action Bar & Source */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">

                {/* Direct Dial Call Button */}
                <a
                  href={`tel:${res.phone}`}
                  className="grow inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-5 py-3 rounded-xl text-base shadow-md transition-all active:scale-95"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{t.resourcesSection.callService} ({res.phone})</span>
                </a>

                {/* Copy Number */}
                <button
                  onClick={() => handleCopy(res.id, res.phone)}
                  className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors border border-slate-200 text-xs font-bold"
                  title="Copy Phone Number"
                  aria-label="Copy Phone Number"
                >
                  {copiedId === res.id ? (
                    <Check className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-slate-600" />
                  )}
                </button>

                {/* Official Website */}
                {res.website && (
                  <a
                    href={res.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-100 hover:bg-slate-200 text-navy-900 rounded-xl transition-colors border border-slate-200 text-xs font-bold flex items-center space-x-1"
                    title="Visit Official Website"
                  >
                    <ExternalLink className="w-5 h-5 text-navy-800" />
                  </a>
                )}
              </div>

              {/* Source & Last Verified Date */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span className="flex items-center space-x-1 truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">Source: {res.source}</span>
                </span>
                <span className="shrink-0">Verified: {res.verifiedDate}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
