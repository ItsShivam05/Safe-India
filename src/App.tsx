import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { EmergenciesView } from './components/EmergenciesView';
import { ScenarioDetailView } from './components/ScenarioDetailView';
import { AwarenessView } from './components/AwarenessView';
import { ResourcesView } from './components/ResourcesView';
import { AIProtocolMatcher } from './components/AIProtocolMatcher';
import { AboutView } from './components/AboutView';
import { SearchModal } from './components/SearchModal';
import { MobileQuickAccess } from './components/MobileQuickAccess';
import { Footer } from './components/Footer';
import type { Language, EmergencyScenario } from './types';


export function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedScenario, setSelectedScenario] = useState<EmergencyScenario | null>(null);
  const [lang, setLang] = useState<Language>('en');
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [quickEmergencyOpen, setQuickEmergencyOpen] = useState<boolean>(false);

  // Scroll to top on view state change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab, selectedScenario]);

  const handleSelectScenario = (scenario: EmergencyScenario) => {
    setSelectedScenario(scenario);
  };

  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    setSelectedScenario(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-navy-800 selection:text-white">
      
      {/* Sticky Header / Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={handleNavigate}
        lang={lang}
        setLang={setLang}
        onOpenSearch={() => setSearchModalOpen(true)}
        onQuickEmergency={() => setQuickEmergencyOpen(true)}
      />

      {/* Main Content Area */}
      <main className="grow">
        
        {/* Scenario Detail View takes precedence when a scenario is selected */}
        {selectedScenario ? (
          <ScenarioDetailView
            scenario={selectedScenario}
            onBack={() => setSelectedScenario(null)}
            lang={lang}
          />
        ) : (
          <>
            {/* Home Tab */}
            {currentTab === 'home' && (
              <>
                <Hero
                  onNavigate={handleNavigate}
                  lang={lang}
                  onOpenSearch={() => setSearchModalOpen(true)}
                />
                <AIProtocolMatcher
                  onSelectScenario={handleSelectScenario}
                  lang={lang}
                />
                <Philosophy lang={lang} />
                <EmergenciesView
                  onSelectScenario={handleSelectScenario}
                  lang={lang}
                />
              </>
            )}

            {/* Emergencies Tab */}
            {currentTab === 'emergencies' && (
              <EmergenciesView
                onSelectScenario={handleSelectScenario}
                lang={lang}
              />
            )}

            {/* Awareness Tab */}
            {currentTab === 'awareness' && (
              <AwarenessView lang={lang} />
            )}

            {/* Resources Tab */}
            {currentTab === 'resources' && (
              <ResourcesView lang={lang} />
            )}

            {/* About Tab */}
            {currentTab === 'about' && (
              <AboutView lang={lang} />
            )}
          </>
        )}
      </main>

      {/* Persistent Floating Emergency Button & Quick Help Modal */}
      <MobileQuickAccess
        lang={lang}
        onSelectScenario={handleSelectScenario}
        isOpenExternal={quickEmergencyOpen}
        onCloseExternal={() => setQuickEmergencyOpen(false)}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectScenario={handleSelectScenario}
        onSelectCategory={handleNavigate}
        lang={lang}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} lang={lang} />

    </div>
  );
}

export default App;
