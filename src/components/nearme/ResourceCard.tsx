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
import type { NearbyFacility, Language } from '../../types';
import { translations } from '../../data/locales';
import { formatDistance, getDirectionsUrl, normalizePhoneNumber } from '../../services/locationService';

interface ResourceCardProps {
  facility: NearbyFacility;
  lang: Language;
  isSelected?: boolean;
  onSelect: (facility: NearbyFacility, isFromButton?: boolean) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  facility,
  lang,
  isSelected = false,
  onSelect,
}) => {
  const t = translations[lang];

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
  const dialablePhone = normalizePhoneNumber(facility.phone);
  const directionsUrl = getDirectionsUrl(facility.lat, facility.lon);

  return (
    <div
      onClick={() => onSelect(facility)}
      className={`rounded-2xl p-5 border-2 transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'bg-blue-50/50 border-navy-700 shadow-md ring-2 ring-navy-700/20'
          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
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
          className="text-xs font-extrabold text-navy-800 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200/80"
          title={t.nearMe.straightLineNote}
        >
          {formatDistance(facility.distanceKm)} {t.nearMe.distance.toLowerCase()}
        </span>
      </div>

      {/* Facility Name */}
      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug mb-2">
        {facility.name}
      </h3>

      {/* Address */}
      <div className="flex items-start space-x-2 text-xs text-slate-600 mb-3">
        <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <span className="leading-relaxed">
          {facility.address || (
            <span className="text-slate-400 italic">
              {t.nearMe.addressUnavailable}
            </span>
          )}
        </span>
      </div>

      {/* Contact Telephone */}
      <div className="mb-4 text-xs">
        {dialablePhone ? (
          <div className="flex items-center space-x-2 text-slate-700">
            <span className="text-slate-500 font-semibold">Phone:</span>
            <span className="font-mono font-bold text-slate-900">{facility.phone}</span>
          </div>
        ) : (
          <p className="text-slate-400 text-xs italic flex items-center space-x-1">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>{t.nearMe.phoneUnavailable}</span>
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
        
        {/* Dial Button (Only when phone number is available) */}
        {dialablePhone ? (
          <a
            href={`tel:${dialablePhone}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-3.5 py-2 rounded-xl text-xs shadow-sm transition-all active:scale-95"
            aria-label={`Call ${facility.name} at ${dialablePhone}`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{t.nearMe.call} ({dialablePhone})</span>
          </a>
        ) : null}

        {/* Directions Link */}
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center space-x-1.5 bg-navy-800 hover:bg-navy-900 text-white font-bold px-3.5 py-2 rounded-xl text-xs shadow-sm transition-all active:scale-95"
          aria-label={`Get directions to ${facility.name}`}
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>{t.nearMe.directions}</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>

        {/* View on Map trigger */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(facility, true);
          }}
          className="ml-auto text-xs font-semibold text-navy-700 hover:text-navy-900 hover:underline px-2 py-1"
        >
          {t.nearMe.focusOnMap} →
        </button>

      </div>

      {/* Attribution footer */}
      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
        <span>{t.nearMe.sourceAttribution}</span>
        <span className="font-mono">OSM #{facility.osmId}</span>
      </div>

    </div>
  );
};
