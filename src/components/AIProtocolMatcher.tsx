import React, { useState } from 'react';
import type { EmergencyScenario } from '../types';
import { emergencyScenarios } from '../data/emergencies';
import { translations } from '../data/locales';
import { Sparkles, ArrowRight, ShieldCheck, PhoneCall, AlertTriangle } from 'lucide-react';

interface AIProtocolMatcherProps {
  onSelectScenario: (scenario: EmergencyScenario) => void;
}

// Everyday words that say nothing about which emergency this is.
const IGNORED_WORDS = new Set([
  'the', 'and', 'for', 'has', 'have', 'having', 'had', 'was', 'were', 'are', 'not', 'with', 'this', 'that',
  'there', 'from', 'near', 'you', 'your', 'her', 'his', 'him', 'she', 'they', 'them', 'our', 'what', 'who',
  'why', 'how', 'when', 'where', 'someone', 'somebody', 'person', 'people', 'man', 'woman', 'situation',
]);

// Used when the keywords find nothing, so everyday wording and Hindi still reach the right guide.
const WORD_STEMS: Array<{ scenarioId: string; stems: string[] }> = [
  { scenarioId: 'someone-following', stems: ['follow', 'stalk', 'chase', 'पीछा'] },
  { scenarioId: 'upi-bank-fraud', stems: ['upi', 'bank', 'money', 'otp', 'पैसे'] },
  { scenarioId: 'unconscious-person', stems: ['faint', 'unconscious', 'बेहोश'] },
  { scenarioId: 'lpg-gas-leak', stems: ['gas', 'cylinder', 'गैस'] },
];

const isSameWord = (word: string, keywordWord: string) =>
  word === keywordWord ||
  (word.length >= 4 && keywordWord.startsWith(word)) ||
  new RegExp(`^${keywordWord}(s|es|ed|ing)$`).test(word);

/**
 * Finds the guide that fits the description. Returns null rather than guessing,
 * because a wrong guide is more dangerous than sending the person to call 112.
 */
const findMatchingScenario = (searchStr: string): EmergencyScenario | null => {
  const words = searchStr.split(/[^\p{L}\p{N}\p{M}]+/u).filter(Boolean);
  const paddedText = ` ${words.join(' ')} `;

  let bestMatch: EmergencyScenario | null = null;
  let highestScore = 0;

  emergencyScenarios.forEach((sc) => {
    let score = 0;
    const keywords = [...sc.searchKeywords, sc.title.en].map((kw) => kw.toLowerCase());
    const keywordWords = keywords.flatMap((kw) => kw.split(/[^\p{L}\p{N}\p{M}]+/u)).filter(Boolean);

    keywords.forEach((kw) => {
      if (paddedText.includes(` ${kw} `)) {
        score += 3;
      }
    });

    words.forEach((w) => {
      if (w.length > 2 && !IGNORED_WORDS.has(w) && keywordWords.some((k) => isSameWord(w, k))) {
        score += 1;
      }
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatch = sc;
    }
  });

  // One loose word alone ("road", "phone") is not enough to recommend a guide.
  if (highestScore >= 2) return bestMatch;

  const stemMatch = WORD_STEMS.find(({ stems }) =>
    words.some((w) => stems.some((stem) => w.startsWith(stem)))
  );
  return emergencyScenarios.find((s) => s.id === stemMatch?.scenarioId) ?? null;
};

export const AIProtocolMatcher: React.FC<AIProtocolMatcherProps> = ({
  onSelectScenario,
}) => {
  const [query, setQuery] = useState('');
  const [matchedScenario, setMatchedScenario] = useState<EmergencyScenario | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const t = translations.en;

  const sampleQueries = [
    'A stranger keeps following me near metro',
    'Someone deducted money via UPI OTP',
    'Someone has fainted and is unconscious',
    'Kitchen cylinder gas smell is leaking',
  ];

  const handleMatch = (searchStr: string) => {
    const q = searchStr.toLowerCase().trim();
    if (!q) return;

    setIsSearching(true);
    setHasSearched(true);

    setTimeout(() => {
      setMatchedScenario(findMatchingScenario(q));
      setIsSearching(false);
    }, 300);
  };

  return (
    <div className="bg-midnight text-ivory rounded-3xl p-6 sm:p-8 shadow-md max-w-4xl mx-auto my-10 border border-lavender/30">
      
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2.5 bg-plum/30 border border-lavender/30 rounded-2xl text-lavender">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-lavender bg-midnight-800 border border-lavender/20 px-2.5 py-0.5 rounded-full">
            {t.aiHelper.badge}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            {t.aiHelper.title}
          </h2>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-ivory/80 mb-6">
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
          className="w-full bg-midnight-950 border border-lavender/30 text-white rounded-2xl pl-4 pr-32 py-3.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-plum placeholder-ivory/40 shadow-inner"
        />
        <button
          type="submit"
          disabled={isSearching || !query.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-plum hover:bg-plum-600 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all shadow-sm flex items-center space-x-1.5"
        >
          {isSearching ? (
            <span>Finding steps...</span>
          ) : (
            <>
              <span>{t.aiHelper.button}</span>
              <ArrowRight className="w-4 h-4 text-lavender" />
            </>
          )}
        </button>
      </form>

      {/* Sample Query Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-xs text-lavender font-semibold">{t.aiHelper.sampleQueries}</span>
        {sampleQueries.map((sq, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setQuery(sq);
              handleMatch(sq);
            }}
            className="text-xs bg-midnight-800 hover:bg-midnight-700 text-ivory/90 border border-lavender/20 px-3 py-1.5 rounded-xl transition-colors text-left"
          >
            &quot;{sq}&quot;
          </button>
        ))}
      </div>

      {/* Output Match Preview */}
      {hasSearched && matchedScenario && (
        <div className="bg-midnight-900 border-2 border-lavender/40 rounded-2xl p-5 sm:p-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-sage" />
              <span className="text-xs font-bold text-lavender uppercase tracking-wider">
                Recommended Safety Guide
              </span>
            </div>
            <span className="text-xs bg-midnight-950 text-ivory/70 px-2 py-0.5 rounded border border-lavender/20">
              Source: {matchedScenario.source.name}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            {matchedScenario.title.en}
          </h3>

          <p className="text-xs sm:text-sm text-ivory/80 line-clamp-2 mb-4">
            {matchedScenario.immediateActionText?.en}
          </p>

          <button
            onClick={() => onSelectScenario(matchedScenario)}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-emergency hover:bg-emergency-600 text-white font-extrabold px-6 py-3 rounded-xl text-sm shadow-md transition-all active:scale-95"
          >
            <span>Open Full Guide ({matchedScenario.title.en})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* No Match: send the person to 112 and the guide list instead of guessing */}
      {hasSearched && !isSearching && !matchedScenario && (
        <div className="bg-midnight-900 border-2 border-lavender/40 rounded-2xl p-5 sm:p-6" role="status">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-lavender" />
            <h3 className="text-lg font-bold text-white">{t.aiHelper.noMatchTitle}</h3>
          </div>

          <p className="text-xs sm:text-sm text-ivory/80 mb-4">
            {t.aiHelper.noMatchBody}
          </p>

          <a
            href="tel:112"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-emergency hover:bg-emergency-600 text-white font-extrabold px-6 py-3 rounded-xl text-sm shadow-md transition-all active:scale-95 mb-5"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{t.aiHelper.noMatchCall}</span>
          </a>

          <span className="text-xs font-bold text-lavender uppercase tracking-wider block mb-2">
            {t.aiHelper.noMatchGuides}
          </span>
          <div className="flex flex-wrap gap-2">
            {emergencyScenarios.map((sc) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => onSelectScenario(sc)}
                className="text-xs bg-midnight-800 hover:bg-midnight-700 text-ivory/90 border border-lavender/20 px-3 py-1.5 rounded-xl transition-colors text-left"
              >
                {sc.title.en}
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
