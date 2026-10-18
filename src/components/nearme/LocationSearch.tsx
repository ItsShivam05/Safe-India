import React, { useState } from 'react';
import { Search, MapPin, Loader2, X } from 'lucide-react';
import type { Language, GeocodedLocation } from '../../types';
import { translations } from '../../data/locales';
import { searchLocation } from '../../services/locationService';

interface LocationSearchProps {
  lang: Language;
  onSelectLocation: (loc: GeocodedLocation) => void;
  disabled?: boolean;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({
  lang,
  onSelectLocation,
  disabled = false,
}) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<GeocodedLocation[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const t = translations[lang];

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanQuery = query.trim();
    if (!cleanQuery) return;

    setIsSearching(true);
    setErrorMsg(null);
    setHasSearched(true);

    try {
      const locations = await searchLocation(cleanQuery);
      setResults(locations);
      if (locations.length === 0) {
        setErrorMsg(t.nearMe.manualNoResults);
      }
    } catch (err) {
      console.error('Failed to search location:', err);
      setErrorMsg(t.nearMe.manualNoResults);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelect = (loc: GeocodedLocation) => {
    onSelectLocation(loc);
    setResults([]);
    setHasSearched(false);
    setQuery(loc.displayName.split(',')[0]); // Shorten input to prime landmark name
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setHasSearched(false);
    setErrorMsg(null);
  };

  return (
    <div className="w-full relative">
      <form onSubmit={handleSearch} className="relative flex items-center">
        <div className="relative w-full">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={query}
            disabled={disabled}
            onChange={(e) => {
              setQuery(e.target.value);
              if (errorMsg) setErrorMsg(null);
            }}
            placeholder={t.nearMe.searchPlaceholder}
            className="w-full bg-white border border-slate-300 focus:border-navy-700 rounded-2xl pl-11 pr-24 py-3.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-700/20 shadow-sm transition-all"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-20 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
              aria-label="Clear location search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={disabled || isSearching || !query.trim()}
          className="absolute right-2 bg-navy-800 hover:bg-navy-900 disabled:opacity-50 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center space-x-1.5"
        >
          {isSearching ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
              <span>{t.nearMe.searchBtn}</span>
            </>
          ) : (
            <span>{t.nearMe.searchBtn}</span>
          )}
        </button>
      </form>

      {/* Geocoding Results Dropdown */}
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl z-30 overflow-hidden divide-y divide-slate-100 max-h-72 overflow-y-auto">
          <div className="px-4 py-2 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Matching Locations in India
          </div>
          {results.map((loc, idx) => (
            <button
              key={`${loc.lat}-${loc.lon}-${idx}`}
              type="button"
              onClick={() => handleSelect(loc)}
              className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors flex items-start space-x-3 text-xs sm:text-sm text-slate-800 group"
            >
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <div className="grow">
                <span className="font-semibold block text-slate-900 group-hover:text-navy-900">
                  {loc.displayName.split(',').slice(0, 2).join(',')}
                </span>
                <span className="text-slate-500 text-[11px] line-clamp-1">
                  {loc.displayName}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Error message */}
      {hasSearched && !isSearching && errorMsg && (
        <p className="mt-2 text-xs text-rose-600 font-medium px-2">
          {errorMsg}
        </p>
      )}
    </div>
  );
};
