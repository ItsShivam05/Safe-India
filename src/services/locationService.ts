import type { LocationCoordinates, GeocodedLocation } from '../types';

export class GeolocationError extends Error {
  code: 'PERMISSION_DENIED' | 'POSITION_UNAVAILABLE' | 'TIMEOUT' | 'NOT_SUPPORTED';
  constructor(code: 'PERMISSION_DENIED' | 'POSITION_UNAVAILABLE' | 'TIMEOUT' | 'NOT_SUPPORTED', message: string) {
    super(message);
    this.name = 'GeolocationError';
    this.code = code;
  }
}

/**
 * Requests the user's current GPS location strictly on demand.
 * Never tracks continuously or stores coordinates.
 */
export function getCurrentLocation(): Promise<LocationCoordinates> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      reject(new GeolocationError('NOT_SUPPORTED', 'Geolocation is not supported by your browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          sourceType: 'gps',
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(
              new GeolocationError(
                'PERMISSION_DENIED',
                'Location access is turned off. You can search by city, area, or PIN code instead.'
              )
            );
            break;
          case error.POSITION_UNAVAILABLE:
            reject(
              new GeolocationError(
                'POSITION_UNAVAILABLE',
                "We couldn't detect your location. Please check your device location settings or search by area."
              )
            );
            break;
          case error.TIMEOUT:
            reject(
              new GeolocationError(
                'TIMEOUT',
                'Finding your location took too long. Please try again or search by area.'
              )
            );
            break;
          default:
            reject(
              new GeolocationError(
                'POSITION_UNAVAILABLE',
                "We couldn't detect your location right now. Please try again or search by area."
              )
            );
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0,
      }
    );
  });
}

/**
 * Searches a city, area, or PIN code using OpenStreetMap Nominatim.
 * Strictly respects usage limits and prioritizes Indian regions.
 */
export async function searchLocation(query: string): Promise<GeocodedLocation[]> {
  const cleanQuery = query.trim();
  if (!cleanQuery) return [];

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    cleanQuery
  )}&countrycodes=in&limit=6&addressdetails=1`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Geocoding failed with status: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) return [];

    return data.map((item: { display_name: string; lat: string; lon: string; type?: string }) => ({
      displayName: item.display_name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      type: item.type,
    }));
  } catch (err) {
    console.error('Error during Nominatim geocoding:', err);
    throw err;
  }
}

/**
 * Calculates straight-line distance in kilometers between two coordinates using the Haversine formula.
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 100) / 100; // 2 decimal places
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Formats straight-line distance into human-friendly string (e.g. "850 m" or "2.4 km").
 */
export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    const meters = Math.round(distanceKm * 1000);
    return `${meters} m`;
  }
  return `${distanceKm.toFixed(1)} km`;
}

/**
 * Builds an external directions URL using the facility coordinates.
 */
export function getDirectionsUrl(lat: number, lon: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
}

export interface PhoneInfo {
  state: 'valid' | 'missing' | 'invalid';
  displayNumber?: string;
  dialableNumber?: string;
}

/**
 * Normalizes and validates phone numbers found in OSM tags.
 * Accurately determines:
 * - valid: Has a dialable telephone number with valid digits
 * - missing: Tag is absent or contains placeholder terms like 'none', 'n/a', '0'
 * - invalid: Text is present but not dialable or malformed
 */
export function parseFacilityPhone(rawPhone?: string): PhoneInfo {
  if (!rawPhone || !rawPhone.trim()) {
    return { state: 'missing' };
  }

  const trimmed = rawPhone.trim();
  const lower = trimmed.toLowerCase();
  if (['none', 'no', 'n/a', 'na', 'nil', 'null', '0', 'not available', 'unknown', '-'].includes(lower)) {
    return { state: 'missing' };
  }

  // Split on multiple numbers if separated by semicolon, comma, slash, or 'or'
  const candidates = trimmed.split(/[;,/|]|\bor\b/i).map((s) => s.trim()).filter(Boolean);
  if (candidates.length === 0) {
    return { state: 'missing' };
  }

  const primary = candidates[0];
  // Extract dialable characters: digits and optional leading '+'
  let dialable = primary.replace(/[^\d+]/g, '');

  // Handle '+' correctly (only retain at the start if present)
  if (dialable.includes('+')) {
    dialable = (dialable.startsWith('+') ? '+' : '') + dialable.replace(/\+/g, '');
  }

  const digitCount = dialable.replace(/\D/g, '').length;

  // Indian standard: emergency numbers (3-4 digits e.g. 112, 100, 108), local landlines / mobiles (7-15 digits)
  if (digitCount < 3 || digitCount > 15) {
    return { state: 'invalid', displayNumber: trimmed };
  }

  return {
    state: 'valid',
    displayNumber: primary,
    dialableNumber: dialable,
  };
}

/**
 * Normalizes phone numbers found in OSM tags for safe 'tel:' links.
 * Returns null if no valid telephone number can be dialed.
 */
export function normalizePhoneNumber(rawPhone?: string): string | null {
  const parsed = parseFacilityPhone(rawPhone);
  return parsed.state === 'valid' ? (parsed.dialableNumber ?? null) : null;
}

