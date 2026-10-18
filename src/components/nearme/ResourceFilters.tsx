import React from 'react';
import { Shield, Cross, Flame, Layers } from 'lucide-react';
import type { FacilityCategory, Language } from '../../types';
import { translations } from '../../data/locales';

interface ResourceFiltersProps {
  lang: Language;
  activeCategory: FacilityCategory | 'all';
  onCategoryChange: (category: FacilityCategory | 'all') => void;
  counts: {
    all: number;
    police: number;
    hospital: number;
    fire_station: number;
  };
  radiusMeters: number;
  onRadiusChange: (radiusMeters: number) => void;
  disabled?: boolean;
}

export const ResourceFilters: React.FC<ResourceFiltersProps> = ({
  lang,
  activeCategory,
  onCategoryChange,
  counts,
  radiusMeters,
  onRadiusChange,
  disabled = false,
}) => {
  const t = translations[lang];

  const filterTabs: Array<{
    id: FacilityCategory | 'all';
    label: string;
    icon: React.ElementType;
    count: number;
    badgeColor: string;
  }> = [
    {
      id: 'all',
      label: t.nearMe.filterAll,
      icon: Layers,
      count: counts.all,
      badgeColor: 'bg-slate-200 text-slate-800',
    },
    {
      id: 'police',
      label: t.nearMe.filterPolice,
      icon: Shield,
      count: counts.police,
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'hospital',
      label: t.nearMe.filterHospital,
      icon: Cross,
      count: counts.hospital,
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'fire_station',
      label: t.nearMe.filterFire,
      icon: Flame,
      count: counts.fire_station,
      badgeColor: 'bg-orange-100 text-orange-800',
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
      
      {/* Category Tabs */}
      <div className="flex items-center overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 gap-1.5 scrollbar-none">
        {filterTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              disabled={disabled}
              onClick={() => onCategoryChange(tab.id)}
              className={`shrink-0 flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                isActive
                  ? 'bg-navy-800 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-1 ${
                  isActive ? 'bg-navy-950 text-amber-300' : tab.badgeColor
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Radius Selector */}
      <div className="flex items-center space-x-2 self-end sm:self-auto shrink-0 text-xs">
        <span className="text-slate-500 font-medium hidden md:inline">
          {t.nearMe.radiusLabel}:
        </span>
        <select
          value={radiusMeters}
          disabled={disabled}
          onChange={(e) => onRadiusChange(Number(e.target.value))}
          className="bg-slate-50 border border-slate-300 text-slate-800 font-bold rounded-xl px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-navy-700 cursor-pointer"
        >
          <option value={5000}>{t.nearMe.radius5}</option>
          <option value={10000}>{t.nearMe.radius10}</option>
          <option value={20000}>{t.nearMe.radius20}</option>
        </select>
      </div>

    </div>
  );
};
