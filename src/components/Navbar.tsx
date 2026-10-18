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
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span className="font-bold tracking-wide uppercase">{t.emergencySection.criticalNotice}</span>
          </div>
          <a
            href="tel:112"
            className="inline-flex items-center space-x-1.5 bg-white text-emergency hover:bg-ivory px-3 py-0.5 rounded-full font-extrabold transition-all active:scale-95 shadow-sm text-xs"
            aria-label="Call 112 National Emergency"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emergency" />
            <span>{t.nav.quickCall112}</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">

          {/* Logo & Brand Identity */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-lavender rounded-xl p-1 text-left"
            aria-label="SafeIndia Home"
          >
            <div className="bg-white/95 p-1 rounded-xl shadow-sm transition-transform group-hover:scale-105 duration-200">
              <img
                src="/safeindia-logo.png"
                alt="SafeIndia Logo"
                className="h-9 sm:h-10 w-auto object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <span className="block text-sm font-extrabold tracking-tight text-white group-hover:text-lavender transition-colors">
                SafeIndia
              </span>
              <span className="block text-[11px] text-sage font-medium -mt-0.5">
                {t.tagline}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-plum text-white shadow-sm'
                      : 'text-ivory/85 hover:text-white hover:bg-midnight-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-lavender'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Search, Get Help Near Me */}
          <div className="hidden sm:flex items-center space-x-2.5">
            {/* Instant Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="px-2.5 py-1.5 text-ivory/80 hover:text-white hover:bg-midnight-800 rounded-xl transition-colors border border-lavender/20 flex items-center space-x-2 text-xs"
              title="Search protocols (Ctrl+K)"
              aria-label="Search emergency protocols"
            >
              <Search className="w-3.5 h-3.5 text-lavender" />
              <span className="hidden xl:inline text-ivory/70">Search...</span>
              <kbd className="hidden xl:inline bg-midnight-950 text-lavender px-1.5 py-0.5 text-[10px] rounded border border-lavender/20">⌘K</kbd>
            </button>

            {/* Prominent Help Near Me Action Button (Primary Plum) */}
            <button
              onClick={() => handleNavClick('nearme')}
              className="flex items-center space-x-1.5 bg-plum hover:bg-plum-600 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all duration-200 active:scale-95 border border-lavender/30"
            >
              <MapPin className="w-4 h-4 text-white" />
              <span>{t.nav.getHelpNearMe}</span>
            </button>
          </div>

          {/* Mobile Right Controls & Hamburger Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-ivory hover:bg-midnight-800 focus:outline-none focus:ring-2 focus:ring-lavender"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-midnight-950 border-t border-midnight-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="relative mb-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full flex items-center justify-between bg-midnight-800 border border-lavender/20 text-ivory/80 px-4 py-2.5 rounded-xl text-sm"
            >
              <span className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-lavender" />
                <span>Search emergency protocols...</span>
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
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-lavender'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-midnight-800 flex flex-col space-y-2">
            <button
              onClick={() => handleNavClick('nearme')}
              className="w-full flex items-center justify-center space-x-2 bg-plum hover:bg-plum-600 text-white font-bold py-2.5 rounded-xl text-sm shadow-md"
            >
              <MapPin className="w-4 h-4 text-white" />
              <span>{t.nav.getHelpNearMe}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
