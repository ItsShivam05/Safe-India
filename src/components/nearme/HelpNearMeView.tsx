import React, { useEffect, useRef, useState } from 'react';
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
  WifiOff,
} from 'lucide-react';
import type {
  LocationCoordinates,
  NearbyFacility,
  FacilityCategory,
  GeocodedLocation,
} from '../../types';
import { fill, useLanguage } from '../../i18n/language';
import { getCurrentLocation, GeolocationError } from '../../services/locationService';
import { findNearbyFacilities } from '../../services/overpassService';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { EmergencyBanner } from './EmergencyBanner';
import { LocationSearch } from './LocationSearch';
import { ResourceFilters } from './ResourceFilters';
import { ResourceCard } from './ResourceCard';
import { NearestHelp } from './NearestHelp';
import { HelpMap } from './HelpMap';

// If nothing is found nearby, the search widens through these distances on its own.
const SEARCH_RADII = [5000, 10000, 20000];

export const HelpNearMeView: React.FC = () => {
  const { t } = useLanguage();
  const online = useOnlineStatus();

  // Geolocation & Search State
  const [userLocation, setUserLocation] = useState<LocationCoordinates | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Overpass Discovery State
  const [facilities, setFacilities] = useState<NearbyFacility[]>([]);
  const [isLoadingFacilities, setIsLoadingFacilities] = useState<boolean>(false);
  const [facilitiesError, setFacilitiesError] = useState<string | null>(null);
  const [radiusMeters, setRadiusMeters] = useState<number>(SEARCH_RADII[0]);
  const [widenedFrom, setWidenedFrom] = useState<number | null>(null);

  // Interaction State
  const [activeCategory, setActiveCategory] = useState<FacilityCategory | 'all'>('all');
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);

  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const mapSectionRef = useRef<HTMLDivElement>(null);
  // Prevents race conditions from rapid searches
  const searchRequestIdRef = useRef<number>(0);

  const fetchFacilities = async (coords: LocationCoordinates, radius: number, autoWiden = true) => {
    const requestId = ++searchRequestIdRef.current;
    setIsLoadingFacilities(true);
    setFacilitiesError(null);
    setSelectedFacilityId(null);
    setWidenedFrom(null);

    try {
      let usedRadius = radius;
      let results = await findNearbyFacilities(coords.lat, coords.lon, usedRadius);
      // Nothing close by (common in rural areas): try the next distance before giving up
      while (autoWiden && results.length === 0 && usedRadius < SEARCH_RADII[SEARCH_RADII.length - 1]) {
        if (requestId !== searchRequestIdRef.current) return;
        usedRadius = SEARCH_RADII[SEARCH_RADII.indexOf(usedRadius) + 1];
        results = await findNearbyFacilities(coords.lat, coords.lon, usedRadius);
      }
      if (requestId !== searchRequestIdRef.current) return;
      if (usedRadius !== radius) setWidenedFrom(radius);
      setRadiusMeters(usedRadius);
      setFacilities(results);
    } catch (err) {
      if (requestId !== searchRequestIdRef.current) return;
      console.error('Failed to discover facilities:', err);
      setFacilitiesError(t.nearMe.osmError);
    } finally {
      if (requestId === searchRequestIdRef.current) {
        setIsLoadingFacilities(false);
      }
    }
  };

  const handleUseMyLocation = async () => {
    setIsLocating(true);
    setLocationError(null);

    try {
      const coords = await getCurrentLocation();
      setUserLocation(coords);
      await fetchFacilities(coords, SEARCH_RADII[0]);
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

  // Someone who opens this page wants help nearby, so look up their location straight away,
  // unless they have already blocked it. Then the area search below is the way in.
  useEffect(() => {
    if (!navigator.onLine || !navigator.permissions?.query) return;
    let cancelled = false;
    navigator.permissions
      .query({ name: 'geolocation' })
      .then((status) => {
        if (!cancelled && status.state !== 'denied') handleUseMyLocation();
      })
      .catch(() => {
        // Browser can't report permission state; the button still works
      });
    return () => {
      cancelled = true;
    };
    // Runs once when the page opens
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectManualLocation = (loc: GeocodedLocation) => {
    setLocationError(null);
    const coords: LocationCoordinates = {
      lat: loc.lat,
      lon: loc.lon,
      name: loc.displayName.split(',')[0],
      sourceType: 'manual',
    };
    setUserLocation(coords);
    fetchFacilities(coords, SEARCH_RADII[0]);
  };

  const handleRadiusChange = (newRadius: number) => {
    setRadiusMeters(newRadius);
    if (userLocation) {
      fetchFacilities(userLocation, newRadius, false);
    }
  };

  const handleSelectFacility = (facility: NearbyFacility, isFromViewOnMapButton: boolean = false) => {
    setSelectedFacilityId(facility.id);
    if (isFromViewOnMapButton && typeof window !== 'undefined' && window.innerWidth < 1024) {
      mapSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      cardRefs.current.get(facility.id)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const counts = {
    all: facilities.length,
    police: facilities.filter((f) => f.category === 'police').length,
    hospital: facilities.filter((f) => f.category === 'hospital').length,
    fire_station: facilities.filter((f) => f.category === 'fire_station').length,
  };

  const filteredFacilities = facilities.filter((f) => activeCategory === 'all' || f.category === activeCategory);
  const selectedFacility = facilities.find((f) => f.id === selectedFacilityId) || null;
  const busy = isLocating || isLoadingFacilities;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-ivory text-midnight">

      {/* 1. Prominent Emergency 112 Banner - Visible at all times */}
      <EmergencyBanner />

      {/* 2. Header & Privacy Explainer */}
      <div className="mb-8 max-w-3xl">
        <div className="inline-flex items-center space-x-2 bg-lavender/30 text-plum text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full border border-lavender mb-3">
          <Navigation className="w-4 h-4 text-plum" />
          <span>{t.nearMe.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-midnight tracking-tight">
          {t.nearMe.title}
        </h1>
        <p className="mt-2 text-midnight/75 text-sm sm:text-base leading-relaxed">
          {t.nearMe.subheading}
        </p>

        <div className="mt-4 flex items-start space-x-2.5 p-3.5 bg-lavender/20 rounded-2xl border border-lavender/50 text-xs text-midnight/80">
          <Lock className="w-4 h-4 text-plum shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-midnight block">{t.nearMe.privacyTitle}</span>
            <span className="leading-relaxed">{t.nearMe.privacyNotice}</span>
          </div>
        </div>
      </div>

      {!online && (
        <div role="status" className="mb-6 p-4 bg-midnight text-ivory rounded-2xl flex items-start space-x-3 text-sm">
          <WifiOff className="w-5 h-5 text-lavender shrink-0 mt-0.5" />
          <span>{t.offline.nearMe}</span>
        </div>
      )}

      {/* 3. Location Trigger & Manual Search Bar */}
      <div className="bg-white rounded-3xl p-6 border border-lavender/60 shadow-xs mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-5">
            <button
              type="button"
              onClick={handleUseMyLocation}
              disabled={busy}
              className="w-full inline-flex items-center justify-center space-x-2.5 bg-plum hover:bg-plum-600 disabled:opacity-60 text-white font-bold px-6 py-4 rounded-2xl text-base shadow-xs transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-plum/30 border border-plum-600"
            >
              {isLocating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-lavender" />
                  <span>{t.nearMe.requestingLocation}</span>
                </>
              ) : (
                <>
                  <MapPin className="w-5 h-5 text-lavender" />
                  <span>{t.nearMe.useMyLocation}</span>
                </>
              )}
            </button>
          </div>

          <div className="md:col-span-2 text-center text-xs font-bold uppercase tracking-wider text-midnight/70">
            <span>{t.nearMe.or}</span>
          </div>

          <div className="md:col-span-5">
            <LocationSearch onSelectLocation={handleSelectManualLocation} disabled={busy} />
          </div>
        </div>

        {locationError && (
          <div role="alert" className="mt-4 p-3.5 bg-emergency-50 border border-emergency-200 rounded-2xl flex items-start space-x-3 text-xs sm:text-sm text-emergency animate-in fade-in">
            <AlertTriangle className="w-4 h-4 text-emergency shrink-0 mt-0.5" />
            <div className="grow">
              <span className="font-bold block">{t.nearMe.notice}</span>
              <span>{locationError}</span>
            </div>
          </div>
        )}

        {userLocation && (
          <div className="mt-4 pt-4 border-t border-lavender/30 flex flex-wrap items-center justify-between text-xs text-midnight/70 gap-2">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0" />
              <span>
                <strong>{t.nearMe.showingResults}:</strong>{' '}
                <span className="text-midnight font-bold">
                  {userLocation.name || `${userLocation.lat.toFixed(4)}, ${userLocation.lon.toFixed(4)}`}
                </span>{' '}
                ({userLocation.sourceType === 'gps' ? t.nearMe.yourLocation : t.nearMe.searchedArea})
                {userLocation.accuracyMeters !== undefined && (
                  <span className="block sm:inline sm:ml-2">{fill(t.nearMe.accuracy, { m: userLocation.accuracyMeters })}</span>
                )}
              </span>
            </div>
            <span>{fill(t.nearMe.areaWithin, { km: radiusMeters / 1000 })}</span>
          </div>
        )}
      </div>

      {/* 4. Loading */}
      {isLoadingFacilities && (
        <div role="status" className="bg-white rounded-3xl p-12 text-center border border-lavender/60 shadow-xs my-8">
          <Loader2 className="w-10 h-10 animate-spin text-plum mx-auto mb-4" />
          <h2 className="text-xl font-bold text-midnight">{t.nearMe.loadingTitle}</h2>
          <p className="mt-1.5 text-xs sm:text-sm text-midnight/70 max-w-md mx-auto leading-relaxed">
            {t.nearMe.loadingSubtitle}
          </p>
        </div>
      )}

      {/* 5. Error */}
      {!isLoadingFacilities && facilitiesError && (
        <div role="alert" className="bg-emergency-50 border border-emergency-200 rounded-3xl p-6 sm:p-8 text-center my-8">
          <AlertTriangle className="w-10 h-10 text-emergency mx-auto mb-3" />
          <h2 className="text-lg font-bold text-emergency">{t.nearMe.unableToLoad}</h2>
          <p className="mt-1 text-sm text-emergency/90 max-w-xl mx-auto">{facilitiesError}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {userLocation && (
              <button
                type="button"
                onClick={() => fetchFacilities(userLocation, radiusMeters)}
                className="inline-flex items-center space-x-2 bg-midnight hover:bg-midnight-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-xs transition-all active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.nearMe.retry}</span>
              </button>
            )}
            <a
              href="tel:112"
              className="inline-flex items-center space-x-2 bg-emergency hover:bg-emergency-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-xs"
            >
              <span>{t.nearMe.call112Button}</span>
            </a>
          </div>
        </div>
      )}

      {/* 6. Results */}
      {!isLoadingFacilities && !facilitiesError && userLocation && (
        <div className="space-y-6">
          {widenedFrom !== null && (
            <p role="status" className="bg-lavender/25 border border-lavender/60 rounded-2xl p-4 text-sm text-midnight">
              {fill(t.nearMe.widened, { from: widenedFrom / 1000, to: radiusMeters / 1000 })}
            </p>
          )}

          <NearestHelp facilities={facilities} onSelect={handleSelectFacility} />

          <ResourceFilters
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            counts={counts}
            radiusMeters={radiusMeters}
            onRadiusChange={handleRadiusChange}
          />

          {facilities.length > 0 && facilities.length < 3 && radiusMeters < 20000 && (
            <div className="bg-lavender/25 border border-lavender/60 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-midnight">
              <span>{t.nearMe.expandPrompt}</span>
              <div className="flex items-center space-x-2 shrink-0">
                {radiusMeters === 5000 && (
                  <button
                    type="button"
                    onClick={() => handleRadiusChange(10000)}
                    className="bg-plum hover:bg-plum-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-xs transition-all"
                  >
                    {t.nearMe.expandTo10}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleRadiusChange(20000)}
                  className="bg-midnight hover:bg-midnight-800 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-xs transition-all"
                >
                  {t.nearMe.expandTo20}
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Results list: scrolls on its own only on large screens, so phones have one scroll */}
            <div className="lg:col-span-5 order-2 lg:order-1 space-y-4 lg:max-h-[750px] lg:overflow-y-auto lg:pr-1">
              {filteredFacilities.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 text-center border border-lavender/60">
                  <p className="text-sm font-semibold text-midnight/80">{t.nearMe.noResults}</p>
                  <p className="text-xs text-midnight/70 mt-1">{t.nearMe.tryWider}</p>
                  {radiusMeters < 20000 && (
                    <button
                      type="button"
                      onClick={() => handleRadiusChange(radiusMeters === 5000 ? 10000 : 20000)}
                      className="mt-4 bg-plum hover:bg-plum-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
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
                      isSelected={selectedFacilityId === facility.id}
                      onSelect={handleSelectFacility}
                    />
                  </div>
                ))
              )}
            </div>

            <div ref={mapSectionRef} className="lg:col-span-7 order-1 lg:order-2 lg:sticky lg:top-24">
              <HelpMap
                userLocation={userLocation}
                facilities={filteredFacilities}
                selectedFacility={selectedFacility}
                onSelectFacility={handleSelectFacility}
              />
              <p className="mt-2 text-xs text-midnight/70 text-center">{t.nearMe.mapNote}</p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-white/70 border border-lavender/50 rounded-2xl text-xs text-midnight/70 leading-relaxed text-center">
            {t.nearMe.unverifiedPhoneDisclaimer}
          </div>
        </div>
      )}

      {/* 7. Before a location is chosen */}
      {!userLocation && !isLoadingFacilities && !isLocating && (
        <div className="bg-white border border-lavender/60 rounded-3xl p-8 sm:p-12 text-center my-6 shadow-xs">
          <div className="w-16 h-16 rounded-3xl bg-plum text-white flex items-center justify-center mx-auto mb-5 shadow-sm">
            <Navigation className="w-8 h-8 text-lavender" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-midnight">{t.nearMe.introTitle}</h2>
          <p className="mt-2 text-xs sm:text-sm text-midnight/70 max-w-lg mx-auto leading-relaxed">{t.nearMe.introBody}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-midnight/80">
            <span className="flex items-center space-x-1.5 bg-ivory px-3 py-1.5 rounded-xl border border-lavender">
              <Shield className="w-4 h-4 text-plum" />
              <span>{t.nearMe.introPolice}</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-ivory px-3 py-1.5 rounded-xl border border-lavender">
              <Cross className="w-4 h-4 text-sage-700" />
              <span>{t.nearMe.introHospitals}</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-ivory px-3 py-1.5 rounded-xl border border-lavender">
              <Flame className="w-4 h-4 text-emergency" />
              <span>{t.nearMe.introFire}</span>
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
