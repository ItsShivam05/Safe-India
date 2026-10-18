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
import { HelpNearMeView } from './components/nearme/HelpNearMeView';
import { SearchModal } from './components/SearchModal';
import { MobileQuickAccess } from './components/MobileQuickAccess';
import { Footer } from './components/Footer';
import type { EmergencyScenario } from './types';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedScenario, setSelectedScenario] = useState<EmergencyScenario | null>(null);
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
    <div className="min-h-screen bg-ivory text-midnight font-sans flex flex-col selection:bg-plum selection:text-white">
      
      {/* Sticky Header / Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={handleNavigate}
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
          />
        ) : (
          <>
            {/* Home Tab */}
            {currentTab === 'home' && (
              <>
                <Hero
                  onNavigate={handleNavigate}
                  onOpenSearch={() => setSearchModalOpen(true)}
                />
                <AIProtocolMatcher
                  onSelectScenario={handleSelectScenario}
                />
                <Philosophy />
                <EmergenciesView
                  onSelectScenario={handleSelectScenario}
                />
              </>
            )}

            {/* Emergencies Tab */}
            {currentTab === 'emergencies' && (
              <EmergenciesView
                onSelectScenario={handleSelectScenario}
              />
            )}

            {/* Get Help Near Me Tab */}
            {currentTab === 'nearme' && (
              <HelpNearMeView />
            )}

            {/* Awareness Tab */}
            {currentTab === 'awareness' && (
              <AwarenessView />
            )}

            {/* Resources Tab */}
            {currentTab === 'resources' && (
              <ResourcesView />
            )}

            {/* About Tab */}
            {currentTab === 'about' && (
              <AboutView />
            )}
          </>
        )}
      </main>

      {/* Persistent Floating Emergency Button & Quick Help Modal */}
      <MobileQuickAccess
        showFloatingButton={currentTab !== 'nearme'}
        onSelectScenario={handleSelectScenario}
        onNavigate={handleNavigate}
        isOpenExternal={quickEmergencyOpen}
        onCloseExternal={() => setQuickEmergencyOpen(false)}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectScenario={handleSelectScenario}
        onSelectCategory={handleNavigate}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}

export default App;
