import React, { useState } from 'react';
import type { EmergencyScenario, Language } from '../types';
import { emergencyScenarios } from '../data/emergencies';
import { translations } from '../data/locales';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface AIProtocolMatcherProps {
  onSelectScenario: (scenario: EmergencyScenario) => void;
  lang: Language;
}

export const AIProtocolMatcher: React.FC<AIProtocolMatcherProps> = ({
  onSelectScenario,
  lang,
}) => {
  const [query, setQuery] = useState('');
  const [matchedScenario, setMatchedScenario] = useState<EmergencyScenario | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const t = translations[lang];

  const sampleQueries = [
    lang === 'en' ? 'A stranger keeps following me near metro' : 'कोई अनजान बंदा मेरा पीछा कर रहा है',
    lang === 'en' ? 'Someone deducted money via UPI OTP' : 'OTP बता दिया और बैंक से पैसे कट गए',
    lang === 'en' ? 'Someone has fainted and is unconscious' : 'कोई अचानक बेहोश होकर गिर पड़ा',
    lang === 'en' ? 'Kitchen cylinder gas smell is leaking' : 'रसोई में गैस सिलेंडर से बदबू आ रही है',
  ];

  const handleMatch = (searchStr: string) => {
    const q = searchStr.toLowerCase().trim();
    if (!q) return;

    setIsSearching(true);
    setHasSearched(true);

    setTimeout(() => {
      let bestMatch: EmergencyScenario | null = null;
      let highestScore = 0;

      emergencyScenarios.forEach((sc) => {
        let score = 0;
        const keywords = [...sc.searchKeywords, sc.title.en.toLowerCase(), sc.title.hi.toLowerCase()];

        keywords.forEach((kw) => {
          if (q.includes(kw.toLowerCase())) {
            score += 3;
          }
        });

        const words = q.split(/\s+/);
        words.forEach((w) => {
          if (w.length > 2 && keywords.some((k) => k.toLowerCase().includes(w))) {
            score += 1;
          }
        });

        if (score > highestScore) {
          highestScore = score;
          bestMatch = sc;
        }
      });

      if (!bestMatch || highestScore < 1) {
        if (q.includes('follow') || q.includes('stalk') || q.includes('chase') || q.includes('पीछा')) {
          bestMatch = emergencyScenarios.find((s) => s.id === 'someone-following') || null;
        } else if (q.includes('upi') || q.includes('bank') || q.includes('money') || q.includes('otp') || q.includes('पैसे')) {
          bestMatch = emergencyScenarios.find((s) => s.id === 'upi-bank-fraud') || null;
        } else if (q.includes('faint') || q.includes('unconscious') || q.includes('heart') || q.includes('बेहोश')) {
          bestMatch = emergencyScenarios.find((s) => s.id === 'unconscious-person') || null;
        } else if (q.includes('gas') || q.includes('cylinder') || q.includes('leak') || q.includes('गैस')) {
          bestMatch = emergencyScenarios.find((s) => s.id === 'lpg-gas-leak') || null;
        } else {
          bestMatch = emergencyScenarios[0];
        }
      }

      setMatchedScenario(bestMatch);
      setIsSearching(false);
    }, 300);
  };

  return (
    <div className="bg-gradient-to-br from-navy-900 to-navy-950 border border-navy-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl max-w-4xl mx-auto my-8">
      
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2.5 bg-amber-400/10 border border-amber-400/30 rounded-2xl text-amber-400">
          <Sparkles className="w-5 h-5 animate-spin-slow" />
        </div>
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full">
            {t.aiHelper.badge}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
            {t.aiHelper.title}
          </h2>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-300 mb-6">
        {t.aiHelper.disclaimer}
      </p>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleMatch(query);
        }}
        className="relative mb-4"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.aiHelper.placeholder}
          className="w-full bg-navy-950 border border-navy-700 text-white rounded-2xl pl-4 pr-32 py-3.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder-slate-500 shadow-inner"
        />
        <button
          type="submit"
          disabled={isSearching || !query.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-navy-950 font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center space-x-1"
        >
          {isSearching ? (
            <span>Matching...</span>
          ) : (
            <>
              <span>{t.aiHelper.button}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Sample Query Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-xs text-slate-400 font-semibold">{t.aiHelper.sampleQueries}</span>
        {sampleQueries.map((sq, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setQuery(sq);
              handleMatch(sq);
            }}
            className="text-xs bg-navy-800 hover:bg-navy-700 text-slate-200 border border-navy-700 px-3 py-1.5 rounded-xl transition-colors text-left"
          >
            &quot;{sq}&quot;
          </button>
        ))}
      </div>

      {/* Output Protocol Match Preview */}
      {hasSearched && matchedScenario && (
        <div className="bg-navy-800/90 border-2 border-amber-400/60 rounded-2xl p-5 sm:p-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Matched Official Protocol
              </span>
            </div>
            <span className="text-[10px] bg-navy-950 text-slate-400 px-2 py-0.5 rounded border border-navy-700">
              Verified Source: {matchedScenario.source.name}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            {matchedScenario.title[lang]}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 mb-4">
            {matchedScenario.immediateActionText?.[lang]}
          </p>

          <button
            onClick={() => onSelectScenario(matchedScenario)}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-emergency-600 to-emergency-700 hover:from-emergency-500 text-white font-extrabold px-6 py-3 rounded-xl text-sm shadow-md transition-all active:scale-95"
          >
            <span>Open Full Protocol ({matchedScenario.title[lang]})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};
