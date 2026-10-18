import React, { useState } from 'react';
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

interface ResourcesViewProps {}

export const ResourcesView: React.FC<ResourcesViewProps> = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const t = translations.en;

  const categories = [
    { id: 'all', label: t.emergencySection.allCategories },
    { id: 'emergency', label: 'National Emergency' },
    { id: 'women-child', label: 'Women & Child' },
    { id: 'cyber', label: 'Cyber Crime' },
    { id: 'medical', label: 'Medical Emergency' },
    { id: 'disaster', label: 'Disaster & Fire' },
    { id: 'mental-health', label: 'Mental Health' },
    { id: 'transport', label: 'Transport & Rail' },
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
    const nameText = res.name.en || '';
    const purposeText = res.purpose.en || '';
    const matchesSearch =
      !q ||
      nameText.toLowerCase().includes(q) ||
      res.phone.includes(q) ||
      purposeText.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-ivory text-midnight">

      {/* Header */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center space-x-2 bg-sage/30 text-midnight text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full border border-sage mb-3">
          <MapPin className="w-4 h-4 text-sage-700" />
          <span>Official Helplines & Numbers</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-midnight tracking-tight">
          {t.resourcesSection.title}
        </h1>
        <p className="mt-2 text-midnight/75 text-base sm:text-lg">
          {t.resourcesSection.subheading}
        </p>
      </div>

      {/* Top Essential Quick Strip */}
      <div className="mb-8 bg-midnight rounded-3xl p-6 text-ivory shadow-md border border-lavender/30">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-5 h-5 text-lavender" />
          <h2 className="text-base font-extrabold tracking-wide uppercase text-lavender">
            Priority Emergency Helplines
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <a
            href="tel:112"
            className="bg-emergency hover:bg-emergency-600 p-3.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all hover:scale-102 shadow-sm group"
          >
            <span className="text-xs font-bold text-white/90 uppercase">National Emergency</span>
            <span className="text-2xl font-black text-white mt-0.5 group-hover:scale-105 transition-transform">112</span>
            <span className="text-[10px] text-white/80">Police / Fire / Ambulance</span>
          </a>

          <a
            href="tel:1930"
            className="bg-midnight-800 border border-lavender/20 hover:bg-midnight-700 p-3.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all hover:scale-102 shadow-xs group"
          >
            <span className="text-xs font-bold text-lavender uppercase">Cyber Crime Fraud</span>
            <span className="text-2xl font-black text-white mt-0.5 group-hover:scale-105 transition-transform">1930</span>
            <span className="text-[10px] text-ivory/70">Fund Freeze / Scams</span>
          </a>

          <a
            href="tel:108"
            className="bg-midnight-800 border border-lavender/20 hover:bg-midnight-700 p-3.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all hover:scale-102 shadow-xs group"
          >
            <span className="text-xs font-bold text-sage uppercase">Medical Ambulance</span>
            <span className="text-2xl font-black text-white mt-0.5 group-hover:scale-105 transition-transform">108</span>
            <span className="text-[10px] text-ivory/70">Free Ambulance 24/7</span>
          </a>

          <a
            href="tel:1091"
            className="bg-midnight-800 border border-lavender/20 hover:bg-midnight-700 p-3.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all hover:scale-102 shadow-xs group"
          >
            <span className="text-xs font-bold text-lavender uppercase">Women Helpline</span>
            <span className="text-2xl font-black text-white mt-0.5 group-hover:scale-105 transition-transform">1091</span>
            <span className="text-[10px] text-ivory/70">24/7 Women Distress</span>
          </a>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="mb-8 space-y-4">
        <div className="max-w-xl mx-auto relative">
          <Search className="w-5 h-5 text-midnight/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search service name or helpline number (e.g. 112, Cyber, Mental Health)..."
            className="w-full bg-white border border-lavender focus:border-plum rounded-2xl pl-11 pr-4 py-3.5 text-sm sm:text-base shadow-xs focus:outline-none focus:ring-2 focus:ring-plum text-midnight placeholder-midnight/40 font-medium"
          />
        </div>

        <div className="flex items-center justify-start md:justify-center overflow-x-auto pb-2 gap-2 scrollbar-none px-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-plum text-white shadow-sm'
                  : 'bg-white border border-lavender/60 text-midnight/80 hover:bg-lavender/30 hover:border-lavender'
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
            className={`bg-white rounded-3xl border p-6 sm:p-7 shadow-xs transition-all duration-200 hover:shadow-md flex flex-col justify-between ${
              res.isNationalEmergency ? 'border-emergency/40' : 'border-lavender/60 hover:border-plum'
            }`}
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-midnight bg-lavender/40 px-2.5 py-0.5 rounded-full border border-lavender">
                  {res.categoryLabel.en}
                </span>
                <span className="inline-flex items-center space-x-1 text-xs text-midnight bg-sage/30 px-2.5 py-0.5 rounded-full border border-sage font-semibold">
                  <Clock className="w-3 h-3 text-sage-700" />
                  <span>{res.availability}</span>
                </span>
              </div>

              {/* Service Name */}
              <h2 className="text-xl sm:text-2xl font-bold text-midnight leading-snug">
                {res.name.en}
              </h2>

              {/* Purpose */}
              <div className="mt-3 text-sm text-midnight/80 font-normal leading-relaxed">
                <strong className="text-midnight block text-xs uppercase text-midnight/50 font-bold mb-0.5">
                  {t.resourcesSection.forWhat}:
                </strong>
                <span>{res.purpose.en}</span>
              </div>

              {/* Who can use */}
              <div className="mt-3 text-xs text-midnight/70 flex items-start space-x-2">
                <UserCheck className="w-4 h-4 text-plum shrink-0 mt-0.5" />
                <span>
                  <strong>{t.resourcesSection.whoCanUse}:</strong> {res.whoCanUse.en}
                </span>
              </div>
            </div>

            {/* Action Bar & Source */}
            <div className="mt-6 pt-5 border-t border-lavender/30">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">

                {/* Direct Dial Call Button */}
                <a
                  href={`tel:${res.phone}`}
                  className="grow inline-flex items-center justify-center space-x-2 bg-plum hover:bg-plum-600 text-white font-extrabold px-5 py-3 rounded-xl text-sm sm:text-base shadow-xs transition-all active:scale-95"
                >
                  <PhoneCall className="w-4 h-4 text-lavender" />
                  <span>{t.resourcesSection.callService} ({res.phone})</span>
                </a>

                {/* Copy Number */}
                <button
                  onClick={() => handleCopy(res.id, res.phone)}
                  className="p-3 bg-ivory hover:bg-ivory-100 text-midnight rounded-xl transition-colors border border-lavender text-xs font-bold"
                  title="Copy Phone Number"
                  aria-label="Copy Phone Number"
                >
                  {copiedId === res.id ? (
                    <Check className="w-5 h-5 text-sage-700" />
                  ) : (
                    <Copy className="w-5 h-5 text-midnight/70" />
                  )}
                </button>

                {/* Official Website */}
                {res.website && (
                  <a
                    href={res.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-ivory hover:bg-ivory-100 text-midnight rounded-xl transition-colors border border-lavender text-xs font-bold flex items-center space-x-1"
                    title="Visit Official Website"
                  >
                    <ExternalLink className="w-5 h-5 text-plum" />
                  </a>
                )}
              </div>

              {/* Source & Last Verified Date */}
              <div className="flex items-center justify-between text-[11px] text-midnight/60 font-medium">
                <span className="flex items-center space-x-1 truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-sage-600 shrink-0" />
                  <span className="truncate">Source: {res.source}</span>
                </span>
                <span className="shrink-0">Updated: {res.verifiedDate}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
