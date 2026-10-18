import React, { useState } from 'react';
import { Menu, X, PhoneCall, ShieldAlert, BookOpen, MapPin, Info, Search } from 'lucide-react';

import { translations } from '../data/locales';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenSearch: () => void;
  onQuickEmergency: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenSearch,
  onQuickEmergency: _onQuickEmergency,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations.en;

  const navLinks = [
    { id: 'emergencies', label: t.nav.emergencies, icon: ShieldAlert },
    { id: 'nearme', label: t.nav.getHelpNearMe, icon: MapPin },
    { id: 'awareness', label: t.nav.awareness, icon: BookOpen },
    { id: 'resources', label: t.nav.resources, icon: Info },
    { id: 'about', label: t.nav.about, icon: Info },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-midnight text-ivory shadow-md transition-all duration-200">
      {/* Top Urgent Alert Bar: High-contrast red #B42318 */}
      <div className="bg-emergency text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center space-x-2 min-w-0">
            <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse shrink-0"></span>
            <span className="font-bold tracking-wide uppercase truncate">{t.emergencySection.criticalNotice}</span>
          </div>
          <a
            href="tel:112"
            className="inline-flex items-center space-x-1.5 bg-white text-emergency hover:bg-ivory px-3 py-0.5 rounded-full font-extrabold transition-all active:scale-95 shadow-sm text-xs shrink-0 whitespace-nowrap"
            aria-label="Call 112 National Emergency"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emergency shrink-0" />
            <span>{t.nav.quickCall112}</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-4">

          {/* Logo & Brand Identity */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2.5 sm:space-x-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender focus-visible:ring-offset-2 focus-visible:ring-offset-midnight rounded-xl p-1 text-left shrink-0"
            aria-label="SafeIndia — Know what to do when it matters"
          >
            <img
              src="/images/safeindia-emblem.png"
              alt="SafeIndia — Know what to do when it matters"
              className="h-10 sm:h-11 w-10 sm:w-11 object-contain shrink-0 group-hover:scale-105 transition-transform duration-200"
            />
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-lavender transition-colors whitespace-nowrap">
                  SafeIndia
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-sage-400 shrink-0"></span>
              </div>
              <span className="hidden xl:block text-[10px] text-lavender/80 font-semibold tracking-wide uppercase -mt-0.5 whitespace-nowrap">
                {t.tagline}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 shrink-0" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center space-x-1.5 px-2.5 xl:px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold whitespace-nowrap shrink-0 transition-all duration-200 ${
                    isActive
                      ? 'bg-plum text-white shadow-sm'
                      : 'text-ivory/85 hover:text-white hover:bg-midnight-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-lavender'}`} />
                  <span className="whitespace-nowrap">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Search & Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="px-2.5 py-1.5 text-ivory/80 hover:text-white hover:bg-midnight-800 rounded-xl transition-colors border border-lavender/20 flex items-center space-x-2 text-xs whitespace-nowrap"
              title="Search guides & helplines (Ctrl+K)"
              aria-label="Search emergency guides & helplines"
            >
              <Search className="w-3.5 h-3.5 text-lavender shrink-0" />
              <span className="hidden sm:inline text-ivory/70">Search...</span>
              <kbd className="hidden md:inline bg-midnight-950 text-lavender px-1.5 py-0.5 text-[10px] rounded border border-lavender/20">⌘K</kbd>
            </button>

            {/* Mobile / Tablet Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-ivory hover:bg-midnight-800 focus:outline-none focus:ring-2 focus:ring-lavender shrink-0"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Slide-down Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-midnight-950 border-t border-midnight-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="relative mb-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full flex items-center justify-between bg-midnight-800 border border-lavender/20 text-ivory/80 px-4 py-2.5 rounded-xl text-sm"
            >
              <span className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-lavender shrink-0" />
                <span>Search emergency guides & helplines...</span>
              </span>
              <kbd className="bg-midnight-950 text-lavender text-xs px-2 py-0.5 rounded border border-lavender/20">Search</kbd>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-plum text-white shadow-sm'
                      : 'text-ivory/80 hover:bg-midnight-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-lavender'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
