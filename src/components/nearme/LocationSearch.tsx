import React, { useState } from 'react';
import { Search, MapPin, Loader2, X } from 'lucide-react';
import type { GeocodedLocation } from '../../types';
import { translations } from '../../data/locales';
import { searchLocation } from '../../services/locationService';

interface LocationSearchProps {
  onSelectLocation: (loc: GeocodedLocation) => void;
  disabled?: boolean;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({
  onSelectLocation,
  disabled = false,
}) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<GeocodedLocation[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const t = translations.en;

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
          <Search className="w-5 h-5 text-midnight/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={query}
            disabled={disabled}
            onChange={(e) => {
              setQuery(e.target.value);
              if (errorMsg) setErrorMsg(null);
            }}
            placeholder={t.nearMe.searchPlaceholder}
            className="w-full bg-white border border-lavender focus:border-plum rounded-2xl pl-11 pr-24 py-3.5 text-sm sm:text-base text-midnight placeholder-midnight/40 focus:outline-none focus:ring-2 focus:ring-plum shadow-xs transition-all font-medium"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-20 top-1/2 -translate-y-1/2 p-1 text-midnight/40 hover:text-midnight rounded-full"
              aria-label="Clear location search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={disabled || isSearching || !query.trim()}
          className="absolute right-2 bg-plum hover:bg-plum-600 disabled:opacity-50 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all shadow-xs flex items-center space-x-1.5"
        >
          {isSearching ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-lavender" />
              <span>{t.nearMe.searchBtn}</span>
            </>
          ) : (
            <span>{t.nearMe.searchBtn}</span>
          )}
        </button>
      </form>

      {/* Geocoding Results Dropdown */}
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-lavender/60 shadow-xl z-30 overflow-hidden divide-y divide-lavender/30 max-h-72 overflow-y-auto">
          <div className="px-4 py-2 bg-ivory text-[11px] font-bold text-midnight/60 uppercase tracking-wider">
            Matching Locations in India
          </div>
          {results.map((loc, idx) => (
            <button
              key={`${loc.lat}-${loc.lon}-${idx}`}
              type="button"
              onClick={() => handleSelect(loc)}
              className="w-full text-left px-4 py-3 hover:bg-ivory transition-colors flex items-start space-x-3 text-xs sm:text-sm text-midnight group"
            >
              <MapPin className="w-4 h-4 text-plum shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <div className="grow">
                <span className="font-semibold block text-midnight group-hover:text-plum">
                  {loc.displayName.split(',').slice(0, 2).join(',')}
                </span>
                <span className="text-midnight/60 text-[11px] line-clamp-1">
                  {loc.displayName}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Error message */}
      {hasSearched && !isSearching && errorMsg && (
        <p className="mt-2 text-xs text-emergency font-medium px-2">
          {errorMsg}
        </p>
      )}
    </div>
  );
};
