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

export const HelpNearMeView: React.FC = () => {
  const t = translations.en;

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
  // Ref to track ongoing search requests and prevent race conditions from rapid toggles
  const searchRequestIdRef = useRef<number>(0);

  // Trigger search when coordinates or radius change
  const fetchFacilities = async (coords: LocationCoordinates, radius: number) => {
    const requestId = ++searchRequestIdRef.current;
    setIsLoadingFacilities(true);
    setFacilitiesError(null);
    setSelectedFacilityId(null);

    try {
      const results = await findNearbyFacilities(coords.lat, coords.lon, radius);
      if (requestId !== searchRequestIdRef.current) return;
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-ivory text-midnight">
      
      {/* 1. Prominent Emergency 112 Banner - Visible at all times */}
      <EmergencyBanner />

      {/* 2. Header & Privacy Explainer */}
      <div className="mb-8 max-w-3xl">
        <div className="inline-flex items-center space-x-2 bg-lavender/30 text-plum text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full border border-lavender mb-3">
          <Navigation className="w-4 h-4 text-plum" />
          <span>Find Nearby Emergency Services</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-midnight tracking-tight">
          {t.nearMe.title}
        </h1>
        <p className="mt-2 text-midnight/75 text-sm sm:text-base leading-relaxed">
          {t.nearMe.subheading}
        </p>

        {/* Privacy Note Badge */}
        <div className="mt-4 flex items-start space-x-2.5 p-3.5 bg-lavender/20 rounded-2xl border border-lavender/50 text-xs text-midnight/80">
          <Lock className="w-4 h-4 text-plum shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-midnight block">
              {t.nearMe.privacyTitle}
            </span>
            <span className="leading-relaxed">
              {t.nearMe.privacyNotice}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Location Trigger & Manual Search Bar */}
      <div className="bg-white rounded-3xl p-6 border border-lavender/60 shadow-xs mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Primary Action: Use My Location */}
          <div className="md:col-span-5">
            <button
              type="button"
              onClick={handleUseMyLocation}
              disabled={isLocating || isLoadingFacilities}
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

          {/* Divider */}
          <div className="md:col-span-2 text-center text-xs font-bold uppercase tracking-wider text-midnight/40">
            <span>— OR —</span>
          </div>

          {/* Secondary Action: Manual Search by city, area, or PIN */}
          <div className="md:col-span-5">
            <LocationSearch
              onSelectLocation={handleSelectManualLocation}
              disabled={isLocating || isLoadingFacilities}
            />
          </div>

        </div>

        {/* Location Error feedback */}
        {locationError && (
          <div className="mt-4 p-3.5 bg-emergency-50 border border-emergency-200 rounded-2xl flex items-start space-x-3 text-xs sm:text-sm text-emergency animate-in fade-in">
            <AlertTriangle className="w-4 h-4 text-emergency shrink-0 mt-0.5" />
            <div className="grow">
              <span className="font-bold block">Notice</span>
              <span>{locationError}</span>
            </div>
          </div>
        )}

        {/* Current Active Location Label */}
        {userLocation && (
          <div className="mt-4 pt-4 border-t border-lavender/30 flex flex-wrap items-center justify-between text-xs text-midnight/70 gap-2">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-sage-600" />
              <span>
                <strong>{t.nearMe.showingResults}:</strong>{' '}
                <span className="text-midnight font-bold">
                  {userLocation.name || `${userLocation.lat.toFixed(4)}, ${userLocation.lon.toFixed(4)}`}
                </span>{' '}
                ({userLocation.sourceType === 'gps' ? 'Your Current Location' : 'Searched Area'})
              </span>
            </div>

            <span className="text-[11px] text-midnight/50">
              Area: Within {(radiusMeters / 1000)} km
            </span>
          </div>
        )}
      </div>

      {/* 4. Loading Facilities State: Heading: Finding help near you… */}
      {isLoadingFacilities && (
        <div className="bg-white rounded-3xl p-12 text-center border border-lavender/60 shadow-xs my-8">
          <Loader2 className="w-10 h-10 animate-spin text-plum mx-auto mb-4" />
          <h2 className="text-xl font-bold text-midnight">
            {t.nearMe.loadingTitle}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-midnight/70 max-w-md mx-auto leading-relaxed">
            {t.nearMe.loadingSubtitle}
          </p>
        </div>
      )}

      {/* 5. API Error State */}
      {!isLoadingFacilities && facilitiesError && (
        <div className="bg-emergency-50 border border-emergency-200 rounded-3xl p-6 sm:p-8 text-center my-8">
          <AlertTriangle className="w-10 h-10 text-emergency mx-auto mb-3" />
          <h2 className="text-lg font-bold text-emergency">
            Unable to load nearby places
          </h2>
          <p className="mt-1 text-sm text-emergency/90 max-w-xl mx-auto">
            {facilitiesError}
          </p>
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

      {/* 6. Success State: Interactive Map & Results List */}
      {!isLoadingFacilities && !facilitiesError && userLocation && (
        <div className="space-y-6">
          
          {/* Filter Bar with Radius Selector */}
          <ResourceFilters
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            counts={counts}
            radiusMeters={radiusMeters}
            onRadiusChange={handleRadiusChange}
          />

          {/* Insufficient results prompt to expand radius */}
          {facilities.length < 3 && radiusMeters < 20000 && (
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

          {/* Two-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Distance-sorted Results List */}
            <div className="lg:col-span-5 order-2 lg:order-1 space-y-4 max-h-[750px] overflow-y-auto pr-1">
              
              {filteredFacilities.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 text-center border border-lavender/60">
                  <p className="text-sm font-semibold text-midnight/80">
                    {t.nearMe.noResults}
                  </p>
                  <p className="text-xs text-midnight/50 mt-1">
                    Try switching categories or searching a wider area.
                  </p>
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

            {/* Right Column: Leaflet Interactive Map */}
            <div ref={mapSectionRef} className="lg:col-span-7 order-1 lg:order-2 sticky top-24">
              <HelpMap
                userLocation={userLocation}
                facilities={filteredFacilities}
                selectedFacility={selectedFacility}
                onSelectFacility={handleSelectFacility}
              />
              <p className="mt-2 text-[11px] text-midnight/50 text-center">
                Map data from OpenStreetMap. Approximate direct distance shown.
              </p>
            </div>

          </div>

          {/* Crowdsourced data disclaimer */}
          <div className="mt-8 p-4 bg-white/70 border border-lavender/50 rounded-2xl text-[11px] text-midnight/60 leading-relaxed text-center">
            {t.nearMe.unverifiedPhoneDisclaimer}
          </div>

        </div>
      )}

      {/* 7. Initial State before user triggers location or search */}
      {!userLocation && !isLoadingFacilities && !isLocating && (
        <div className="bg-white border border-lavender/60 rounded-3xl p-8 sm:p-12 text-center my-6 shadow-xs">
          <div className="w-16 h-16 rounded-3xl bg-plum text-white flex items-center justify-center mx-auto mb-5 shadow-sm">
            <Navigation className="w-8 h-8 animate-pulse text-lavender" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-midnight">
            Find Help Nearby in Seconds
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-midnight/70 max-w-lg mx-auto leading-relaxed">
            Locate the nearest police stations, hospitals, and fire stations around you. Tap <strong>Use My Location</strong> above or enter your city, area, or PIN code to begin.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-midnight/80">
            <span className="flex items-center space-x-1.5 bg-ivory px-3 py-1.5 rounded-xl border border-lavender">
              <Shield className="w-4 h-4 text-plum" />
              <span>Police Stations</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-ivory px-3 py-1.5 rounded-xl border border-lavender">
              <Cross className="w-4 h-4 text-sage-700" />
              <span>Hospitals & Medical</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-ivory px-3 py-1.5 rounded-xl border border-lavender">
              <Flame className="w-4 h-4 text-emergency" />
              <span>Fire Stations</span>
            </span>
          </div>
        </div>
      )}

    </section>
  );
};
