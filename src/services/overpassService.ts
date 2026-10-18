import type { FacilityCategory, NearbyFacility } from '../types';
import { calculateDistance } from './locationService';

interface OverpassElement {
  type: 'node' | 'way';
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

interface OverpassResponse {
  elements: OverpassElement[];
}

interface NominatimAmenityItem {
  osm_type: 'node' | 'way' | 'relation';
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  name?: string;
  display_name: string;
  address?: Record<string, string>;
  extratags?: Record<string, string>;
}

const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://lz4.overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
];

/**
 * Builds the Overpass QL query string for a given center coordinate and radius in meters.
 */
function buildOverpassQuery(lat: number, lon: number, radiusMeters: number): string {
  return `[out:json][timeout:15];
(
  node["amenity"="police"](around:${radiusMeters},${lat},${lon});
  way["amenity"="police"](around:${radiusMeters},${lat},${lon});
  node["amenity"="hospital"](around:${radiusMeters},${lat},${lon});
  way["amenity"="hospital"](around:${radiusMeters},${lat},${lon});
  node["amenity"="clinic"](around:${radiusMeters},${lat},${lon});
  way["amenity"="clinic"](around:${radiusMeters},${lat},${lon});
  node["amenity"="fire_station"](around:${radiusMeters},${lat},${lon});
  way["amenity"="fire_station"](around:${radiusMeters},${lat},${lon});
);
out center tags;`;
}

/**
 * Formats a clean, readable address from OSM tags if available.
 */
function formatOsmAddress(tags?: Record<string, string>): string | undefined {
  if (!tags) return undefined;

  if (tags['addr:full']) {
    return tags['addr:full'];
  }

  const parts: string[] = [];
  if (tags['addr:housenumber'] || tags['addr:housename']) {
    parts.push(tags['addr:housenumber'] || tags['addr:housename']);
  }
  if (tags['addr:street']) {
    parts.push(tags['addr:street']);
  }
  if (tags['addr:suburb'] || tags['addr:neighbourhood']) {
    parts.push(tags['addr:suburb'] || tags['addr:neighbourhood']);
  }
  if (tags['addr:city'] || tags['addr:district']) {
    parts.push(tags['addr:city'] || tags['addr:district']);
  }
  if (tags['addr:postcode']) {
    parts.push(tags['addr:postcode']);
  }

  if (parts.length > 0) {
    return parts.join(', ');
  }

  return undefined;
}

/**
 * Categorizes an OSM element based on tags.
 */
function determineCategory(tags?: Record<string, string>): FacilityCategory | null {
  if (!tags) return null;

  if (tags.amenity === 'police') {
    return 'police';
  }
  if (tags.amenity === 'fire_station') {
    return 'fire_station';
  }
  if (tags.amenity === 'hospital' || tags.amenity === 'clinic' || tags.healthcare === 'hospital') {
    return 'hospital';
  }

  return null;
}

/**
 * Fallback to OpenStreetMap's Nominatim index for emergency amenities within viewbox.
 * Guarantees resilience when Overpass servers are congested or returning 502/429 errors.
 */
async function findFacilitiesViaNominatim(
  userLat: number,
  userLon: number,
  radiusMeters: number
): Promise<NearbyFacility[]> {
  // 1 degree latitude is approx 111,000 meters
  const delta = Math.max(0.02, (radiusMeters / 111000) * 1.1);
  const minLon = userLon - delta;
  const maxLon = userLon + delta;
  const minLat = userLat - delta;
  const maxLat = userLat + delta;
  const viewbox = `${minLon.toFixed(5)},${maxLat.toFixed(5)},${maxLon.toFixed(5)},${minLat.toFixed(5)}`;

  const categoriesToSearch: Array<{ q: string; cat: FacilityCategory }> = [
    { q: 'police', cat: 'police' },
    { q: 'hospital', cat: 'hospital' },
    { q: 'fire station', cat: 'fire_station' },
  ];

  const facilities: NearbyFacility[] = [];
  const seenIds = new Set<string>();

  for (const { q, cat } of categoriesToSearch) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      q
    )}&viewbox=${viewbox}&bounded=1&limit=10&addressdetails=1&extratags=1&countrycodes=in`;

    try {
      const res = await fetch(url);
      if (!res.ok) continue;

      const data: NominatimAmenityItem[] = await res.json();
      if (!Array.isArray(data)) continue;

      for (const item of data) {
        const itemLat = parseFloat(item.lat);
        const itemLon = parseFloat(item.lon);
        if (isNaN(itemLat) || isNaN(itemLon)) continue;

        const distanceKm = calculateDistance(userLat, userLon, itemLat, itemLon);
        // Ensure distance is within radius (+ 15% tolerance for bounding box edge)
        if (distanceKm > (radiusMeters / 1000) * 1.15) continue;

        const uniqueKey = `${item.osm_type}-${item.osm_id}`;
        if (seenIds.has(uniqueKey)) continue;
        seenIds.add(uniqueKey);

        const tags = item.extratags || {};
        const phone =
          tags.phone ||
          tags['contact:phone'] ||
          tags.emergency_phone ||
          tags['contact:mobile'];

        // Address formatting
        let address: string | undefined;
        if (item.address) {
          const parts: string[] = [];
          if (item.address.road) parts.push(item.address.road);
          if (item.address.neighbourhood || item.address.suburb) {
            parts.push(item.address.neighbourhood || item.address.suburb);
          }
          if (item.address.city || item.address.town || item.address.state_district) {
            parts.push(item.address.city || item.address.town || item.address.state_district);
          }
          if (item.address.postcode) parts.push(item.address.postcode);
          if (parts.length > 0) address = parts.join(', ');
        }
        if (!address && item.display_name) {
          const parts = item.display_name.split(',').map((s) => s.trim());
          if (parts.length > 2) address = parts.slice(1, 4).join(', ');
        }

        let name = item.name;
        if (!name && item.display_name) {
          name = item.display_name.split(',')[0].trim();
        }
        if (!name) {
          if (cat === 'police') name = 'Police Station (Unnamed)';
          else if (cat === 'hospital') name = 'Hospital / Medical Facility (Unnamed)';
          else name = 'Fire Station (Unnamed)';
        }

        facilities.push({
          id: uniqueKey,
          name,
          category: cat,
          lat: itemLat,
          lon: itemLon,
          distanceKm,
          address,
          phone,
          dataSource: 'OpenStreetMap contributors',
          osmType: item.osm_type === 'way' ? 'way' : 'node',
          osmId: item.osm_id,
        });
      }
    } catch (err) {
      console.warn(`Nominatim amenity search for ${q} failed:`, err);
    }
  }

  return facilities;
}

/**
 * Queries OpenStreetMap data for nearby police, hospitals, and fire stations.
 * First tries Overpass API mirrors; if unreachable or busy, falls back seamlessly
 * to OpenStreetMap Nominatim amenity index.
 */
export async function findNearbyFacilities(
  userLat: number,
  userLon: number,
  radiusMeters: number = 5000
): Promise<NearbyFacility[]> {
  const query = buildOverpassQuery(userLat, userLon, radiusMeters);

  // 1. Try Overpass API mirrors
  for (const endpoint of OVERPASS_ENDPOINTS) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `data=${encodeURIComponent(query)}`,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        continue;
      }

      const data: OverpassResponse = await response.json();
      if (!data || !Array.isArray(data.elements)) {
        continue;
      }

      const facilities: NearbyFacility[] = [];
      const seenIds = new Set<string>();

      for (const el of data.elements) {
        const category = determineCategory(el.tags);
        if (!category) continue;

        const elLat = el.lat ?? el.center?.lat;
        const elLon = el.lon ?? el.center?.lon;
        if (
          elLat === undefined ||
          elLon === undefined ||
          typeof elLat !== 'number' ||
          typeof elLon !== 'number' ||
          isNaN(elLat) ||
          isNaN(elLon)
        ) {
          continue;
        }

        const uniqueKey = `${el.type.toLowerCase()}-${el.id}`;
        if (seenIds.has(uniqueKey)) continue;
        seenIds.add(uniqueKey);

        const tags = el.tags || {};

        let name = tags.name || tags['name:en'] || tags['name:hi'];
        if (!name) {
          if (category === 'police') name = 'Police Station (Unnamed)';
          else if (category === 'hospital') name = 'Hospital / Medical Facility (Unnamed)';
          else if (category === 'fire_station') name = 'Fire Station (Unnamed)';
          else name = 'Emergency Facility';
        }

        const phone =
          tags.phone ||
          tags['contact:phone'] ||
          tags.emergency_phone ||
          tags['contact:mobile'];
        const address = formatOsmAddress(tags);
        const distanceKm = calculateDistance(userLat, userLon, elLat, elLon);

        facilities.push({
          id: uniqueKey,
          name,
          category,
          lat: elLat,
          lon: elLon,
          distanceKm,
          address,
          phone,
          dataSource: 'OpenStreetMap contributors',
          osmType: el.type,
          osmId: el.id,
        });
      }

      facilities.sort((a, b) => a.distanceKm - b.distanceKm);
      return facilities;
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      console.warn(`Overpass mirror ${endpoint} failed, checking next mirror:`, err);
    }
  }

  // 2. Fallback to OpenStreetMap Nominatim amenity index
  console.log('Overpass mirrors unavailable or timed out; falling back to OpenStreetMap Nominatim index...');
  try {
    const fallbackFacilities = await findFacilitiesViaNominatim(userLat, userLon, radiusMeters);
    if (fallbackFacilities.length > 0) {
      fallbackFacilities.sort((a, b) => a.distanceKm - b.distanceKm);
      return fallbackFacilities;
    }
  } catch (fallbackErr) {
    console.error('Nominatim fallback also encountered an error:', fallbackErr);
  }

  throw new Error('Unable to discover nearby facilities from OpenStreetMap servers at this moment. Please try again.');
}
