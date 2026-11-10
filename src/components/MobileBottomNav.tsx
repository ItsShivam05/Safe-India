import React from 'react';
import { Home, ShieldAlert, MapPin, PhoneCall, Siren } from 'lucide-react';
import { useLanguage } from '../i18n/language';

interface MobileBottomNavProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentTab, onNavigate }) => {
  const { t } = useLanguage();

  const items = [
    { id: 'home', label: t.nav.bottomHome, icon: Home },
    { id: 'emergencies', label: t.nav.bottomGuides, icon: ShieldAlert },
    { id: 'nearme', label: t.nav.bottomNearMe, icon: MapPin },
    { id: 'resources', label: t.nav.bottomHelplines, icon: PhoneCall },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-midnight border-t border-lavender/20 pb-[env(safe-area-inset-bottom)]"
      aria-label={t.nav.quickNav}
    >
      <div className="grid grid-cols-5 h-16">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-1 text-xs font-semibold transition-colors ${
                isActive ? 'text-white bg-plum' : 'text-ivory/85 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onNavigate('sos')}
          aria-current={currentTab === 'sos' ? 'page' : undefined}
          className="flex flex-col items-center justify-center gap-1 text-xs font-extrabold text-white bg-emergency hover:bg-emergency-600 transition-colors"
        >
          <Siren className="w-5 h-5 shrink-0" />
          <span>{t.nav.bottomSos}</span>
        </button>
      </div>
    </nav>
  );
};
