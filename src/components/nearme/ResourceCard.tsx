import React from 'react';
import {
  Shield,
  Cross,
  Flame,
  PhoneCall,
  Navigation,
  MapPin,
  ExternalLink,
  Info,
} from 'lucide-react';
import type { NearbyFacility } from '../../types';
import { translations } from '../../data/locales';
import { formatDistance, getDirectionsUrl, parseFacilityPhone } from '../../services/locationService';

interface ResourceCardProps {
  facility: NearbyFacility;
  isSelected?: boolean;
  onSelect: (facility: NearbyFacility, isFromButton?: boolean) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  facility,
  isSelected = false,
  onSelect,
}) => {
  const t = translations.en;

  const categoryMeta = {
    police: {
      label: t.nearMe.filterPolice,
      icon: Shield,
      badgeClass: 'bg-blue-100 text-blue-900 border-blue-200',
      iconClass: 'text-blue-700',
    },
    hospital: {
      label: t.nearMe.filterHospital,
      icon: Cross,
      badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-200',
      iconClass: 'text-emerald-700',
    },
    fire_station: {
      label: t.nearMe.filterFire,
      icon: Flame,
      badgeClass: 'bg-orange-100 text-orange-900 border-orange-200',
      iconClass: 'text-orange-700',
    },
  }[facility.category];

  const Icon = categoryMeta.icon;
  const phoneInfo = parseFacilityPhone(facility.phone);
  const directionsUrl = getDirectionsUrl(facility.lat, facility.lon);

  return (
    <div
      onClick={() => onSelect(facility)}
      className={`rounded-2xl p-5 border transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'bg-lavender/30 border-plum shadow-md ring-2 ring-plum/20'
          : 'bg-white border-lavender/60 hover:border-plum hover:shadow-xs'
      }`}
    >
      {/* Header: Category Badge & Distance */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span
          className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${categoryMeta.badgeClass}`}
        >
          <Icon className="w-3.5 h-3.5" />
          <span>{categoryMeta.label}</span>
        </span>

        {/* Straight-line distance tag */}
        <span
          className="text-xs font-extrabold text-midnight bg-ivory px-2.5 py-0.5 rounded-lg border border-lavender/60"
          title={t.nearMe.straightLineNote}
        >
          {formatDistance(facility.distanceKm)} {t.nearMe.distance.toLowerCase()}
        </span>
      </div>

      {/* Facility Name */}
      <h3 className="text-base sm:text-lg font-bold text-midnight leading-snug mb-2">
        {facility.name}
      </h3>

      {/* Address */}
      <div className="flex items-start space-x-2 text-xs text-midnight/70 mb-3">
        <MapPin className="w-4 h-4 text-midnight/40 shrink-0 mt-0.5" />
        <span className="leading-relaxed">
          {facility.address || (
            <span className="text-midnight/40 italic">
              {t.nearMe.addressUnavailable}
            </span>
          )}
        </span>
      </div>

      {/* Contact Telephone States: A (Valid), B (Missing), C (Unverified Note), D (Invalid) */}
      <div className="mb-4 text-xs">
        {phoneInfo.state === 'valid' ? (
          <div className="flex flex-wrap items-center gap-2 text-midnight/80">
            <span className="text-midnight/50 font-semibold">Phone:</span>
            <span className="font-mono font-bold text-midnight">{phoneInfo.displayNumber}</span>
            <span className="text-[10px] bg-lavender/30 text-plum font-medium px-2 py-0.5 rounded-full border border-lavender/40">
              {t.nearMe.unverifiedNotice}
            </span>
          </div>
        ) : phoneInfo.state === 'invalid' ? (
          <p className="text-midnight/50 text-xs italic flex items-center space-x-1">
            <Info className="w-3.5 h-3.5 text-midnight/40 shrink-0" />
            <span>{t.nearMe.invalidPhone}: {phoneInfo.displayNumber}</span>
          </p>
        ) : (
          <p className="text-midnight/40 text-xs italic flex items-center space-x-1">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>{t.nearMe.noPhoneListed}</span>
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-lavender/30">
        
        {/* Dial Button: Only rendered when a valid, dialable phone exists */}
        {phoneInfo.state === 'valid' && phoneInfo.dialableNumber ? (
          <a
            href={`tel:${phoneInfo.dialableNumber}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center space-x-1.5 bg-plum hover:bg-plum-600 text-white font-extrabold px-3.5 py-2 rounded-xl text-xs shadow-xs transition-all active:scale-95"
            aria-label={`Call ${facility.name} at ${phoneInfo.dialableNumber}`}
          >
            <PhoneCall className="w-3.5 h-3.5 text-lavender" />
            <span>{t.nearMe.call} ({phoneInfo.dialableNumber})</span>
          </a>
        ) : null}

        {/* Directions Link */}
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center space-x-1.5 bg-midnight hover:bg-midnight-800 text-white font-bold px-3.5 py-2 rounded-xl text-xs shadow-xs transition-all active:scale-95"
          aria-label={`Get directions to ${facility.name}`}
        >
          <Navigation className="w-3.5 h-3.5 text-lavender" />
          <span>{t.nearMe.directions}</span>
          <ExternalLink className="w-3 h-3 text-lavender/60" />
        </a>

        {/* View on Map trigger */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(facility, true);
          }}
          className="ml-auto text-xs font-bold text-plum hover:text-midnight hover:underline px-2 py-1"
        >
          {t.nearMe.focusOnMap} →
        </button>

      </div>

      {/* Attribution footer */}
      <div className="mt-3 pt-2 border-t border-lavender/25 flex items-center justify-between text-[10px] text-midnight/50">
        <span>{t.nearMe.sourceAttribution}</span>
        <span className="font-mono">OSM #{facility.osmId}</span>
      </div>

    </div>
  );
};
