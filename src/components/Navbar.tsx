import React, { useState } from 'react';
import { Menu, X, PhoneCall, Globe, ShieldAlert, BookOpen, MapPin, Info, Search } from 'lucide-react';
import type { Language } from '../types';

import { translations } from '../data/locales';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenSearch: () => void;
  onQuickEmergency: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  onOpenSearch,
  onQuickEmergency,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  const navLinks = [
    { id: 'emergencies', label: t.nav.emergencies, icon: ShieldAlert },
    { id: 'awareness', label: t.nav.awareness, icon: BookOpen },
    { id: 'resources', label: t.nav.resources, icon: MapPin },
    { id: 'about', label: t.nav.about, icon: Info },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-navy-900/95 backdrop-blur-md border-b border-navy-800 text-white shadow-lg transition-all duration-200">
      {/* Top Urgent Alert Bar */}
      <div className="bg-emergency-600 text-white text-xs py-1 px-4 font-medium flex items-center justify-between">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-white animate-ping"></span>
            <span className="font-semibold tracking-wide uppercase">{t.emergencySection.criticalNotice}</span>
          </div>
          <a
            href="tel:112"
            className="inline-flex items-center space-x-1 bg-white text-emergency-700 hover:bg-slate-100 px-2.5 py-0.5 rounded-full font-bold transition-transform active:scale-95 shadow-sm"
            aria-label="Call 112 National Emergency"
          >
            <PhoneCall className="w-3 h-3" />
            <span>{t.nav.quickCall112}</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo & Brand Identity */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg p-1 text-left"
            aria-label="SafeIndia Home"
          >
            <img
              src="/safeindia-logo.png"
              alt="SafeIndia Logo"
              className="h-12 sm:h-14 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
            />
            <div className="hidden lg:block border-l border-navy-700 pl-3">
              <span className="block text-xs font-medium text-amber-400 tracking-wider uppercase">Public Safety</span>
              <span className="block text-[11px] text-slate-300 italic">{t.tagline}</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive
                      ? 'bg-navy-800 text-amber-400 border border-navy-700 shadow-inner'
                      : 'text-slate-200 hover:text-white hover:bg-navy-800/60'
                    }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Search, Language Switcher, Emergency Action */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Instant Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-300 hover:text-white hover:bg-navy-800 rounded-lg transition-colors border border-navy-700/60 flex items-center space-x-2 text-xs"
              title="Search protocols (Ctrl+K)"
              aria-label="Search emergency protocols"
            >
              <Search className="w-4 h-4 text-slate-300" />
              <span className="hidden xl:inline text-slate-400">Search...</span>
              <kbd className="hidden xl:inline bg-navy-950 text-slate-400 px-1.5 py-0.5 text-[10px] rounded border border-navy-700">⌘K</kbd>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-navy-700 bg-navy-950/60 hover:bg-navy-800 text-xs font-semibold text-slate-200 transition-colors"
              title="Switch Language / भाषा बदलें"
              aria-label="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* Prominent Emergency Action Button */}
            <button
              onClick={onQuickEmergency}
              className="flex items-center space-x-2 bg-gradient-to-r from-emergency-600 to-emergency-700 hover:from-emergency-500 hover:to-emergency-600 text-white font-bold px-4 py-2 rounded-lg text-sm shadow-md transition-all duration-200 hover:shadow-emergency-600/30 active:scale-95"
            >
              <ShieldAlert className="w-4 h-4 animate-pulse" />
              <span>{t.nav.emergencyHelp}</span>
            </button>
          </div>

          {/* Mobile Right Controls & Hamburger Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="p-2 rounded-lg bg-navy-800 border border-navy-700 text-amber-400 text-xs font-bold"
              aria-label="Switch Language"
            >
              {lang === 'en' ? 'हिन्दी' : 'EN'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-200 hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-950 border-b border-navy-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="relative mb-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full flex items-center justify-between bg-navy-900 border border-navy-800 text-slate-300 px-4 py-2.5 rounded-lg text-sm"
            >
              <span className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-slate-400" />
                <span>Search emergency protocols...</span>
              </span>
              <kbd className="bg-navy-950 text-slate-400 text-xs px-2 py-0.5 rounded">Search</kbd>
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
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${isActive
                      ? 'bg-navy-800 text-amber-400 border border-navy-700'
                      : 'text-slate-200 hover:bg-navy-900'
                    }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-navy-800 flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onQuickEmergency();
              }}
              className="w-full flex items-center justify-center space-x-2 bg-emergency-600 hover:bg-emergency-500 text-white font-bold py-3 rounded-lg text-base shadow-md"
            >
              <ShieldAlert className="w-5 h-5" />
              <span>{t.nav.emergencyHelp}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
