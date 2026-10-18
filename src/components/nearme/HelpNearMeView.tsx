import React, { useState, useRef } from 'react';
import {
  MapPin,
  Navigation,
  Loader2,
  AlertTriangle,
  RotateCcw,
  Shield,
  Cross,
  Flame,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import type {
  Language,
  LocationCoordinates,
  NearbyFacility,
  FacilityCategory,
  GeocodedLocation,
} from '../../types';
import { translations } from '../../data/locales';
import { getCurrentLocation, GeolocationError } from '../../services/locationService';
import { findNearbyFacilities } from '../../services/overpassService';
import { EmergencyBanner } from './EmergencyBanner';
import { LocationSearch } from './LocationSearch';
import { ResourceFilters } from './ResourceFilters';
import { ResourceCard } from './ResourceCard';
import { HelpMap } from './HelpMap';

interface HelpNearMeViewProps {
  lang: Language;
}

export const HelpNearMeView: React.FC<HelpNearMeViewProps> = ({ lang }) => {
  const t = translations[lang];

  // Geolocation & Search State
  const [userLocation, setUserLocation] = useState<LocationCoordinates | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Overpass Discovery State
  const [facilities, setFacilities] = useState<NearbyFacility[]>([]);
  const [isLoadingFacilities, setIsLoadingFacilities] = useState<boolean>(false);
  const [facilitiesError, setFacilitiesError] = useState<string | null>(null);
  const [radiusMeters, setRadiusMeters] = useState<number>(5000); // 5km default

  // Interaction State
  const [activeCategory, setActiveCategory] = useState<FacilityCategory | 'all'>('all');
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);

  // Ref to scroll selected card into view
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  // Ref to scroll map into view on mobile
  const mapSectionRef = useRef<HTMLDivElement>(null);

  // Trigger search when coordinates or radius change
  const fetchFacilities = async (coords: LocationCoordinates, radius: number) => {
    setIsLoadingFacilities(true);
    setFacilitiesError(null);
    setSelectedFacilityId(null);

    try {
      const results = await findNearbyFacilities(coords.lat, coords.lon, radius);
      setFacilities(results);
    } catch (err) {
      console.error('Failed to discover facilities:', err);
      setFacilitiesError(t.nearMe.osmError);
    } finally {
      setIsLoadingFacilities(false);
    }
  };

  // Explicit user action: "Use My Location"
  const handleUseMyLocation = async () => {
    setIsLocating(true);
    setLocationError(null);

    try {
      const coords = await getCurrentLocation();
      setUserLocation(coords);
      await fetchFacilities(coords, radiusMeters);
    } catch (err: unknown) {
      if (err instanceof GeolocationError) {
        if (err.code === 'PERMISSION_DENIED') {
          setLocationError(t.nearMe.permissionDenied);
        } else if (err.code === 'TIMEOUT') {
          setLocationError(t.nearMe.locationTimeout);
        } else {
          setLocationError(t.nearMe.locationUnavailable);
        }
      } else {
        setLocationError(t.nearMe.locationUnavailable);
      }
    } finally {
      setIsLocating(false);
    }
  };

  // Manual location selection
  const handleSelectManualLocation = (loc: GeocodedLocation) => {
    setLocationError(null);
    const coords: LocationCoordinates = {
      lat: loc.lat,
      lon: loc.lon,
      name: loc.displayName.split(',')[0],
      sourceType: 'manual',
    };
    setUserLocation(coords);
    fetchFacilities(coords, radiusMeters);
  };

  // Radius change handler
  const handleRadiusChange = (newRadius: number) => {
    setRadiusMeters(newRadius);
    if (userLocation) {
      fetchFacilities(userLocation, newRadius);
    }
  };

  // Handle marker / card selection
  const handleSelectFacility = (facility: NearbyFacility, isFromViewOnMapButton: boolean = false) => {
    setSelectedFacilityId(facility.id);
    if (isFromViewOnMapButton && typeof window !== 'undefined' && window.innerWidth < 1024) {
      mapSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const el = cardRefs.current.get(facility.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  // Category counts
  const counts = {
    all: facilities.length,
    police: facilities.filter((f) => f.category === 'police').length,
    hospital: facilities.filter((f) => f.category === 'hospital').length,
    fire_station: facilities.filter((f) => f.category === 'fire_station').length,
  };

  // Filtered facilities
  const filteredFacilities = facilities.filter((f) => {
    if (activeCategory === 'all') return true;
    return f.category === activeCategory;
  });

  const selectedFacility =
    facilities.find((f) => f.id === selectedFacilityId) || null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* 1. Prominent Emergency 112 Banner - Visible at all times */}
      <EmergencyBanner lang={lang} />

      {/* 2. Header & Privacy Explainer */}
      <div className="mb-8 max-w-3xl">
        <div className="inline-flex items-center space-x-2 bg-navy-100 text-navy-800 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full border border-navy-200 mb-3">
          <Navigation className="w-4 h-4 text-navy-700" />
          <span>Interactive Emergency Discovery</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          📍 {t.nearMe.title}
        </h1>
        <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
          {t.nearMe.subheading}
        </p>

        {/* Privacy Note Badge */}
        <div className="mt-4 flex items-start space-x-2.5 p-3.5 bg-slate-100/80 rounded-2xl border border-slate-200/80 text-xs text-slate-600">
          <Lock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-800 block">
              {t.nearMe.privacyTitle}
            </span>
            <span className="leading-relaxed">
              {t.nearMe.privacyNotice}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Location Trigger & Manual Search Bar */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Primary Action: Use My Location */}
          <div className="md:col-span-5">
            <button
              type="button"
              onClick={handleUseMyLocation}
              disabled={isLocating || isLoadingFacilities}
              className="w-full inline-flex items-center justify-center space-x-2.5 bg-gradient-to-r from-navy-800 to-navy-900 hover:from-navy-700 hover:to-navy-800 disabled:opacity-60 text-white font-black px-6 py-4 rounded-2xl text-base shadow-md transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-navy-800/30"
            >
              {isLocating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
                  <span>{t.nearMe.requestingLocation}</span>
                </>
              ) : (
                <>
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <span>{t.nearMe.useMyLocation}</span>
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="md:col-span-2 text-center text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>— {lang === 'en' ? 'OR' : 'या'} —</span>
          </div>

          {/* Secondary Action: Manual Search by city, area, or PIN */}
          <div className="md:col-span-5">
            <LocationSearch
              lang={lang}
              onSelectLocation={handleSelectManualLocation}
              disabled={isLocating || isLoadingFacilities}
            />
          </div>

        </div>

        {/* Location Error feedback */}
        {locationError && (
          <div className="mt-4 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start space-x-3 text-xs sm:text-sm text-rose-800 animate-in fade-in">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="grow">
              <span className="font-bold block">Location Access Issue</span>
              <span>{locationError}</span>
            </div>
          </div>
        )}

        {/* Current Active Location Label */}
        {userLocation && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                <strong>{t.nearMe.showingResults}:</strong>{' '}
                <span className="text-slate-900 font-semibold">
                  {userLocation.name || `${userLocation.lat.toFixed(4)}, ${userLocation.lon.toFixed(4)}`}
                </span>{' '}
                ({userLocation.sourceType === 'gps' ? 'Device GPS' : 'Manual Search'})
              </span>
            </div>

            <span className="text-[11px] text-slate-400">
              Radius: {(radiusMeters / 1000)} km
            </span>
          </div>
        )}
      </div>

      {/* 4. Loading Facilities State */}
      {isLoadingFacilities && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm my-8">
          <Loader2 className="w-10 h-10 animate-spin text-navy-800 mx-auto mb-4" />
          <h2 className="text-lg font-extrabold text-slate-900">
            {t.nearMe.searchingOsm}
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Connecting to OpenStreetMap Overpass API for verified nearby police, hospitals, and fire stations...
          </p>
        </div>
      )}

      {/* 5. API Error State */}
      {!isLoadingFacilities && facilitiesError && (
        <div className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-6 sm:p-8 text-center my-8">
          <AlertTriangle className="w-10 h-10 text-rose-600 mx-auto mb-3" />
          <h2 className="text-lg font-extrabold text-rose-900">
            Discovery Service Notice
          </h2>
          <p className="mt-1 text-sm text-rose-700 max-w-xl mx-auto">
            {facilitiesError}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {userLocation && (
              <button
                type="button"
                onClick={() => fetchFacilities(userLocation, radiusMeters)}
                className="inline-flex items-center space-x-2 bg-navy-800 hover:bg-navy-900 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.nearMe.retry}</span>
              </button>
            )}
            <a
              href="tel:112"
              className="inline-flex items-center space-x-2 bg-emergency-600 hover:bg-emergency-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md"
            >
              <span>{t.nearMe.call112Button}</span>
            </a>
          </div>
        </div>
      )}

      {/* 6. Success State: Interactive Map & Results List */}
      {!isLoadingFacilities && !facilitiesError && userLocation && (
        <div className="space-y-6">
          
          {/* Filter Bar with Radius Selector */}
          <ResourceFilters
            lang={lang}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            counts={counts}
            radiusMeters={radiusMeters}
            onRadiusChange={handleRadiusChange}
          />

          {/* Insufficient results prompt to expand radius */}
          {facilities.length < 3 && radiusMeters < 20000 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-900">
              <span>{t.nearMe.expandPrompt}</span>
              <div className="flex items-center space-x-2 shrink-0">
                {radiusMeters === 5000 && (
                  <button
                    type="button"
                    onClick={() => handleRadiusChange(10000)}
                    className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-sm transition-all"
                  >
                    {t.nearMe.expandTo10}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleRadiusChange(20000)}
                  className="bg-navy-800 hover:bg-navy-900 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-sm transition-all"
                >
                  {t.nearMe.expandTo20}
                </button>
              </div>
            </div>
          )}

          {/* Two-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Distance-sorted Results List */}
            <div className="lg:col-span-5 order-2 lg:order-1 space-y-4 max-h-[750px] overflow-y-auto pr-1">
              
              {filteredFacilities.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 text-center border border-slate-200">
                  <p className="text-sm font-semibold text-slate-700">
                    {t.nearMe.noResults}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Try switching filters or expanding the search radius.
                  </p>
                  {radiusMeters < 20000 && (
                    <button
                      type="button"
                      onClick={() => handleRadiusChange(radiusMeters === 5000 ? 10000 : 20000)}
                      className="mt-4 bg-navy-800 hover:bg-navy-900 text-white text-xs font-bold px-4 py-2 rounded-xl"
                    >
                      {radiusMeters === 5000 ? t.nearMe.expandTo10 : t.nearMe.expandTo20}
                    </button>
                  )}
                </div>
              ) : (
                filteredFacilities.map((facility) => (
                  <div
                    key={facility.id}
                    ref={(el) => {
                      if (el) cardRefs.current.set(facility.id, el);
                      else cardRefs.current.delete(facility.id);
                    }}
                  >
                    <ResourceCard
                      facility={facility}
                      lang={lang}
                      isSelected={selectedFacilityId === facility.id}
                      onSelect={handleSelectFacility}
                    />
                  </div>
                ))
              )}

            </div>

            {/* Right Column: Leaflet Interactive Map */}
            <div ref={mapSectionRef} className="lg:col-span-7 order-1 lg:order-2 sticky top-24">
              <HelpMap
                userLocation={userLocation}
                facilities={filteredFacilities}
                selectedFacility={selectedFacility}
                onSelectFacility={handleSelectFacility}
                lang={lang}
              />
              <p className="mt-2 text-[11px] text-slate-400 text-center">
                Map markers and data powered by OpenStreetMap. Straight-line distance shown.
              </p>
            </div>

          </div>

          {/* Crowdsourced data disclaimer */}
          <div className="mt-8 p-4 bg-slate-100 rounded-2xl text-[11px] text-slate-500 leading-relaxed text-center">
            {t.nearMe.unverifiedPhoneDisclaimer}
          </div>

        </div>
      )}

      {/* 7. Initial State before user triggers location or search */}
      {!userLocation && !isLoadingFacilities && !isLocating && (
        <div className="bg-slate-100/70 border border-slate-200/80 rounded-3xl p-8 sm:p-12 text-center my-6">
          <div className="w-16 h-16 rounded-3xl bg-navy-800 text-amber-400 flex items-center justify-center mx-auto mb-5 shadow-lg">
            <Navigation className="w-8 h-8 animate-pulse" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Find Nearest Assistance in Seconds
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            SafeIndia scans OpenStreetMap data to locate the closest Police Stations, Hospitals, and Fire Stations to your location. Click <strong>Use My Location</strong> above or enter your city or PIN code to begin.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-700">
            <span className="flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>Police Stations</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
              <Cross className="w-4 h-4 text-emerald-600" />
              <span>Hospitals & Medical</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
              <Flame className="w-4 h-4 text-orange-600" />
              <span>Fire Stations</span>
            </span>
          </div>
        </div>
      )}

    </section>
  );
};
