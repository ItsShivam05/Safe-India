import React from 'react';
import { Shield, Cross, Flame, PhoneCall, Navigation } from 'lucide-react';
import type { FacilityCategory, NearbyFacility } from '../../types';
import { useLanguage } from '../../i18n/language';
import { formatDistance, getDirectionsUrl, parseFacilityPhone } from '../../services/locationService';

interface NearestHelpProps {
  facilities: NearbyFacility[];
  onSelect: (facility: NearbyFacility, isFromButton?: boolean) => void;
}

/**
 * The closest police station, hospital and fire station at a glance,
 * so nobody has to scan a long list in an emergency.
 */
export const NearestHelp: React.FC<NearestHelpProps> = ({ facilities, onSelect }) => {
  const { t } = useLanguage();

  const rows: Array<{ category: FacilityCategory; label: string; icon: React.ElementType; color: string }> = [
    { category: 'police', label: t.nearMe.labelPolice, icon: Shield, color: 'text-blue-700' },
    { category: 'hospital', label: t.nearMe.labelHospital, icon: Cross, color: 'text-emerald-700' },
    { category: 'fire_station', label: t.nearMe.labelFire, icon: Flame, color: 'text-orange-700' },
  ];

  // Facilities arrive sorted by distance, so the first match is the nearest
  const nearest = rows
    .map((row) => ({ ...row, facility: facilities.find((f) => f.category === row.category) }))
    .filter((row): row is typeof row & { facility: NearbyFacility } => row.facility !== undefined);

  if (nearest.length === 0) return null;

  return (
    <section aria-labelledby="nearest-help-title" className="bg-white rounded-3xl border-2 border-plum/30 p-5 sm:p-6 shadow-xs">
      <h2 id="nearest-help-title" className="text-lg font-black text-midnight mb-4">{t.nearMe.nearestTitle}</h2>
      <ul className="space-y-3">
        {nearest.map(({ category, label, icon: Icon, color, facility }) => {
          const phone = parseFacilityPhone(facility.phone);
          return (
            <li key={category} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-ivory border border-lavender/60">
              <button type="button" onClick={() => onSelect(facility, true)} className="flex items-start space-x-3 text-left min-w-0">
                <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${color}`} />
                <span className="min-w-0">
                  <span className="block text-xs font-bold text-midnight/70">
                    {facility.category === 'hospital' && facility.isClinic ? t.nearMe.labelClinic : label} · {t.nearMe.approx} {formatDistance(facility.distanceKm)}
                  </span>
                  <span className="block font-bold text-midnight truncate">{facility.name}</span>
                </span>
              </button>
              <span className="flex items-center gap-2 shrink-0">
                {phone.state === 'valid' && phone.dialableNumber && (
                  <a
                    href={`tel:${phone.dialableNumber}`}
                    className="inline-flex items-center space-x-1.5 bg-plum hover:bg-plum-600 text-white font-bold px-3 py-2 rounded-xl text-xs"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{t.nearMe.call}</span>
                  </a>
                )}
                <a
                  href={getDirectionsUrl(facility.lat, facility.lon)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 bg-midnight hover:bg-midnight-800 text-white font-bold px-3 py-2 rounded-xl text-xs"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{t.nearMe.directions}</span>
                </a>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
