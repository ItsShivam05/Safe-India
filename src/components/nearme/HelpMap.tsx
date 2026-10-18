import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { NearbyFacility, LocationCoordinates } from '../../types';
import { translations } from '../../data/locales';
import { formatDistance, getDirectionsUrl, parseFacilityPhone } from '../../services/locationService';

interface HelpMapProps {
  userLocation: LocationCoordinates | null;
  facilities: NearbyFacility[];
  selectedFacility: NearbyFacility | null;
  onSelectFacility: (facility: NearbyFacility) => void;
}

export const HelpMap: React.FC<HelpMapProps> = ({
  userLocation,
  facilities,
  selectedFacility,
  onSelectFacility,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const facilityMarkersRef = useRef<Map<string, L.Marker>>(new Map());

  const t = translations.en;

  // Helper to create category icons
  const createCategoryIcon = (category: string, isSelected: boolean) => {
    let bgColor = '#2563EB'; // Blue for police
    let svgIcon = `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`; // Shield

    if (category === 'hospital') {
      bgColor = '#059669'; // Emerald for hospital
      svgIcon = `<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`; // Cross
    } else if (category === 'fire_station') {
      bgColor = '#EA580C'; // Orange for fire
      svgIcon = `<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"/>`; // Flame
    }

    const ringStyle = isSelected
      ? `ring-4 ring-amber-400 ring-offset-2 ring-offset-white scale-110 shadow-2xl`
      : `hover:scale-110 shadow-lg`;

    const html = `
      <div class="relative flex items-center justify-center w-9 h-9 rounded-full text-white ${ringStyle} transition-all duration-200" style="background-color: ${bgColor};">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          ${svgIcon}
        </svg>
        <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45" style="background-color: ${bgColor};"></div>
      </div>
    `;

    return L.divIcon({
      className: 'safeindia-marker',
      html,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -36],
    });
  };

  // User location icon
  const createUserLocationIcon = () => {
    const html = `
      <div class="relative flex items-center justify-center w-8 h-8">
        <span class="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60 animate-ping"></span>
        <span class="relative inline-flex rounded-full h-5 w-5 bg-blue-600 border-2 border-white shadow-xl items-center justify-center">
          <span class="h-2 w-2 rounded-full bg-white"></span>
        </span>
      </div>
    `;

    return L.divIcon({
      className: 'safeindia-user-marker',
      html,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });
  };

  // 1. Initialize Map on mount
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Validate initial coordinates
    const initialLat =
      userLocation && typeof userLocation.lat === 'number' && !isNaN(userLocation.lat)
        ? userLocation.lat
        : 28.6139;
    const initialLon =
      userLocation && typeof userLocation.lon === 'number' && !isNaN(userLocation.lon)
        ? userLocation.lon
        : 77.2090;
    const initialZoom = userLocation ? 13 : 5;

    const map = L.map(mapContainerRef.current, {
      center: [initialLat, initialLon],
      zoom: initialZoom,
      zoomControl: true,
    });

    // Standard OpenStreetMap tiles with subdomain distribution & attribution
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      subdomains: ['a', 'b', 'c'],
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
    }).addTo(map);

    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;
    mapInstanceRef.current = map;

    // Invalidate size to guarantee tiles calculate immediately
    const timer1 = setTimeout(() => {
      map.invalidateSize();
    }, 100);
    const timer2 = setTimeout(() => {
      map.invalidateSize();
    }, 400);

    const facilityMarkers = facilityMarkersRef.current;

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      map.remove();
      mapInstanceRef.current = null;
      markersLayerRef.current = null;
      facilityMarkers.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Handle resize observer to keep map sharp and properly sized
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      mapInstanceRef.current?.invalidateSize();
    });

    resizeObserver.observe(mapContainerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // 3. Update User Location Marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !userLocation) return;
    if (typeof userLocation.lat !== 'number' || isNaN(userLocation.lat)) return;
    if (typeof userLocation.lon !== 'number' || isNaN(userLocation.lon)) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
    }

    const userMarker = L.marker([userLocation.lat, userLocation.lon], {
      icon: createUserLocationIcon(),
      zIndexOffset: 1000,
    }).addTo(map);

    const userLabel = userLocation.name || 'Your Location';
    userMarker.bindPopup(`
      <div style="font-family: inherit; font-size: 13px; font-weight: bold; padding: 4px 2px;">
        <span style="color: #2563EB;">📍 ${userLabel}</span>
        <div style="font-size: 11px; font-weight: normal; color: #64748B; margin-top: 2px;">
          ${userLocation.sourceType === 'gps' ? 'Device GPS Location' : 'Selected Search Area'}
        </div>
      </div>
    `);

    userMarkerRef.current = userMarker;
  }, [userLocation]);

  // 4. Update Facility Markers (only on facility list or userLocation change)
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();
    facilityMarkersRef.current.clear();

    const bounds = L.latLngBounds([]);
    if (
      userLocation &&
      typeof userLocation.lat === 'number' &&
      !isNaN(userLocation.lat) &&
      typeof userLocation.lon === 'number' &&
      !isNaN(userLocation.lon)
    ) {
      bounds.extend([userLocation.lat, userLocation.lon]);
    }

    facilities.forEach((facility) => {
      if (
        typeof facility.lat !== 'number' ||
        typeof facility.lon !== 'number' ||
        isNaN(facility.lat) ||
        isNaN(facility.lon)
      ) {
        return;
      }

      const isSelected = selectedFacility?.id === facility.id;
      const marker = L.marker([facility.lat, facility.lon], {
        icon: createCategoryIcon(facility.category, isSelected),
        zIndexOffset: isSelected ? 600 : 100,
      });

      const phoneInfo = parseFacilityPhone(facility.phone);
      const directionsUrl = getDirectionsUrl(facility.lat, facility.lon);

      const categoryLabel = {
        police: t.nearMe.filterPolice,
        hospital: t.nearMe.filterHospital,
        fire_station: t.nearMe.filterFire,
      }[facility.category];

      let phoneSectionHtml = '';
      if (phoneInfo.state === 'valid') {
        phoneSectionHtml = `
          <div style="font-size: 11px; color: #433760; margin-bottom: 6px;">
            📞 <strong>${phoneInfo.displayNumber}</strong> <span style="font-size: 9px; color: #65558F; font-weight: 600;">(unverified)</span>
          </div>
        `;
      } else if (phoneInfo.state === 'invalid') {
        phoneSectionHtml = `
          <div style="font-size: 10px; color: #8E7CB5; font-style: italic; margin-bottom: 6px;">
            ${t.nearMe.invalidPhone}
          </div>
        `;
      } else {
        phoneSectionHtml = `
          <div style="font-size: 10px; color: #8E7CB5; font-style: italic; margin-bottom: 6px;">
            ${t.nearMe.noPhoneListed}
          </div>
        `;
      }

      const popupHtml = `
        <div style="font-family: inherit; min-width: 200px; max-width: 260px; padding: 2px;">
          <div style="font-size: 10px; font-weight: bold; text-transform: uppercase; color: #65558F; margin-bottom: 2px;">
            ${categoryLabel}
          </div>
          <div style="font-size: 14px; font-weight: 800; color: #211D35; line-height: 1.3; margin-bottom: 6px;">
            ${facility.name}
          </div>
          <div style="font-size: 11px; font-weight: 700; color: #65558F; margin-bottom: 6px;">
            ${formatDistance(facility.distanceKm)} ${t.nearMe.distance.toLowerCase()}
          </div>
          ${
            facility.address
              ? `<div style="font-size: 11px; color: #433760; margin-bottom: 8px;">📍 ${facility.address}</div>`
              : ''
          }
          ${phoneSectionHtml}
          <div style="display: flex; gap: 6px; margin-top: 8px;">
            ${
              phoneInfo.state === 'valid' && phoneInfo.dialableNumber
                ? `<a href="tel:${phoneInfo.dialableNumber}" style="flex: 1; text-align: center; background-color: #65558F; color: white; padding: 6px 10px; border-radius: 8px; font-size: 11px; font-weight: bold; text-decoration: none;">📞 ${t.nearMe.call}</a>`
                : ''
            }
            <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" style="flex: 1; text-align: center; background-color: #211D35; color: white; padding: 6px 10px; border-radius: 8px; font-size: 11px; font-weight: bold; text-decoration: none;">🧭 ${t.nearMe.directions}</a>
          </div>
          <div style="font-size: 9px; color: #8E7CB5; margin-top: 8px; text-align: right;">
            ${t.nearMe.sourceAttribution}
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        onSelectFacility(facility);
      });

      marker.addTo(markersGroup);
      facilityMarkersRef.current.set(facility.id, marker);
      bounds.extend([facility.lat, facility.lon]);
    });

    // Auto-fit bounds ONLY when facility list changes or on initial render
    if (facilities.length > 0 && map && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    } else if (
      userLocation &&
      map &&
      typeof userLocation.lat === 'number' &&
      !isNaN(userLocation.lat)
    ) {
      map.setView([userLocation.lat, userLocation.lon], 13);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facilities, userLocation]);

  // 5. React to selected facility change ("View on Map" & card selection)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedFacility) return;

    // Validate coordinates
    if (
      typeof selectedFacility.lat !== 'number' ||
      typeof selectedFacility.lon !== 'number' ||
      isNaN(selectedFacility.lat) ||
      isNaN(selectedFacility.lon)
    ) {
      return;
    }

    // 1. Pan / Zoom smoothly to the facility coordinates
    const currentZoom = Number.isFinite(map.getZoom()) ? map.getZoom() : 15;
    const targetZoom = Math.max(currentZoom, 15);
    map.flyTo([selectedFacility.lat, selectedFacility.lon], targetZoom, {
      duration: 0.8,
    });

    // 2. Synchronize active marker styles (enlarge active marker, reset others)
    facilityMarkersRef.current.forEach((marker, id) => {
      const isCurrent = id === selectedFacility.id;
      const fac = facilities.find((f) => f.id === id);
      if (fac) {
        marker.setIcon(createCategoryIcon(fac.category, isCurrent));
        marker.setZIndexOffset(isCurrent ? 600 : 100);
      }
    });

    // 3. Open the marker popup if it exists
    const marker = facilityMarkersRef.current.get(selectedFacility.id);
    if (marker) {
      marker.openPopup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFacility]);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] md:h-[580px] rounded-3xl overflow-hidden shadow-md border border-lavender/60 bg-ivory-100">
      <div
        ref={mapContainerRef}
        className="absolute inset-0 w-full h-full z-10"
      />

      {/* Floating Map Legend */}
      <div className="absolute top-3 right-3 z-20 bg-white/95 backdrop-blur-xs px-3.5 py-2 rounded-2xl shadow-sm border border-lavender/60 text-[11px] font-bold text-midnight flex items-center space-x-3 pointer-events-none">
        <span className="flex items-center space-x-1">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
          <span>Police</span>
        </span>
        <span className="flex items-center space-x-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
          <span>Hospital</span>
        </span>
        <span className="flex items-center space-x-1">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-600"></span>
          <span>Fire</span>
        </span>
      </div>
    </div>
  );
};
