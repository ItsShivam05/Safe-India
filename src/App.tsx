import { useState, useEffect, useLayoutEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate, useNavigationType, useParams } from 'react-router';
import { Loader2, WifiOff } from 'lucide-react';
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
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { NotFoundView } from './components/NotFoundView';
import { ToolsView } from './components/tools/ToolsView';
import { SosView } from './components/tools/SosView';
import { WhereAmIView } from './components/tools/WhereAmIView';
import { AlarmView } from './components/tools/AlarmView';
import { MedicalIdView } from './components/tools/MedicalIdView';
import { ComplaintView } from './components/tools/ComplaintView';
import { useLanguage } from './i18n/language';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { emergencyScenarios } from './data/emergencies';
import { awarenessGuides } from './data/awareness';
import { awarenessPath, getPageMeta, scenarioPath, TAB_PATHS } from './data/site';
import type { EmergencyScenario } from './types';

// Shown if the map code can't be downloaded, so a bad connection never leaves a blank page.
const NearMeLoadFailed = () => {
  const { t } = useLanguage();
  return (
    <div role="alert" className="max-w-xl my-12 mx-4 sm:mx-auto bg-emergency-50 border border-emergency-200 rounded-3xl p-6 sm:p-8 text-center">
      <h1 className="text-lg font-bold text-emergency">{t.nearMe.mapLoadFailedTitle}</h1>
      <p className="mt-1 text-sm text-emergency/90">{t.nearMe.osmError}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="bg-midnight hover:bg-midnight-800 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-xs"
        >
          {t.nearMe.retry}
        </button>
        <a
          href="tel:112"
          className="bg-emergency hover:bg-emergency-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-xs"
        >
          {t.nearMe.call112Button}
        </a>
      </div>
    </div>
  );
};

// The map library is large, so it only loads when someone opens Get Help Near Me.
const HelpNearMeView = lazy(() =>
  import('./components/nearme/HelpNearMeView')
    .then((m) => ({ default: m.HelpNearMeView }))
    .catch(() => ({ default: NearMeLoadFailed }))
);

const tabFromPath = (pathname: string) =>
  Object.keys(TAB_PATHS).find((tab) =>
    tab === 'home'
      ? pathname === TAB_PATHS.home
      : pathname === TAB_PATHS[tab] || pathname.startsWith(`${TAB_PATHS[tab]}/`)
  ) ?? '';

const ScenarioRoute = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const scenario = emergencyScenarios.find((sc) => sc.id === id);
  if (!scenario) return <NotFoundView />;

  return (
    <ScenarioDetailView
      key={scenario.id}
      scenario={scenario}
      // Someone who arrived from a shared link has no page to go back to
      onBack={() => (location.key === 'default' ? navigate(TAB_PATHS.emergencies) : navigate(-1))}
    />
  );
};

const AwarenessGuideRoute = () => {
  const { id } = useParams();
  if (!awarenessGuides.some((guide) => guide.id === id)) return <NotFoundView />;
  return <AwarenessView key={id} guideId={id} />;
};

export function App() {
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();
  const { t } = useLanguage();
  const online = useOnlineStatus();
  const currentTab = tabFromPath(pathname);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [quickHelpOpen, setQuickHelpOpen] = useState<boolean>(false);

  // New pages start at the top. The browser restores the position on Back and Forward.
  useLayoutEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else if (navigationType !== 'POP') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash, navigationType]);

  useEffect(() => {
    document.title = getPageMeta(pathname).title;
  }, [pathname]);

  const handleSelectScenario = (scenario: EmergencyScenario) => {
    navigate(scenarioPath(scenario.id));
  };

  const handleNavigate = (tab: string) => {
    navigate(TAB_PATHS[tab]);
  };

  return (
    <div className="min-h-screen bg-ivory text-midnight font-sans flex flex-col pb-16 lg:pb-0 selection:bg-plum selection:text-white">

      <Navbar
        currentTab={currentTab}
        setCurrentTab={handleNavigate}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {!online && (
        <div role="status" className="bg-midnight-950 text-ivory text-sm px-4 py-2.5 flex items-center justify-center gap-2 text-center">
          <WifiOff className="w-4 h-4 text-lavender shrink-0" />
          <span>{t.offline.banner}</span>
        </div>
      )}

      <main className="grow">
        <Routes>
          <Route
            path={TAB_PATHS.home}
            element={
              <>
                <Hero
                  onNavigate={handleNavigate}
                  onOpenSearch={() => setSearchModalOpen(true)}
                  onSelectScenario={handleSelectScenario}
                />
                <AIProtocolMatcher onSelectScenario={handleSelectScenario} />
                <EmergenciesView embedded />
                <Philosophy />
              </>
            }
          />
          <Route path={TAB_PATHS.emergencies} element={<EmergenciesView />} />
          <Route path={scenarioPath(':id')} element={<ScenarioRoute />} />
          <Route
            path={TAB_PATHS.nearme}
            element={
              <Suspense
                fallback={
                  <div className="py-24 flex justify-center" role="status" aria-label={t.nearMe.loadingTitle}>
                    <Loader2 className="w-10 h-10 animate-spin text-plum" />
                  </div>
                }
              >
                <HelpNearMeView />
              </Suspense>
            }
          />
          <Route path={TAB_PATHS.awareness} element={<AwarenessView />} />
          <Route path={awarenessPath(':id')} element={<AwarenessGuideRoute />} />
          <Route path={TAB_PATHS.resources} element={<ResourcesView />} />
          <Route path={TAB_PATHS.about} element={<AboutView />} />
          <Route path={TAB_PATHS.tools} element={<ToolsView />} />
          <Route path={TAB_PATHS.sos} element={<SosView />} />
          <Route path={TAB_PATHS.whereami} element={<WhereAmIView />} />
          <Route path={TAB_PATHS.alarm} element={<AlarmView />} />
          <Route path={TAB_PATHS.medicalid} element={<MedicalIdView />} />
          <Route path={TAB_PATHS.complaint} element={<ComplaintView />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </main>

      {/* Desktop floating help button and the help sheet */}
      <MobileQuickAccess
        showFloatingButton={currentTab !== 'nearme'}
        isOpen={quickHelpOpen}
        onOpen={() => setQuickHelpOpen(true)}
        onClose={() => setQuickHelpOpen(false)}
        onSelectScenario={handleSelectScenario}
        onNavigate={handleNavigate}
      />

      <MobileBottomNav currentTab={currentTab} onNavigate={handleNavigate} />

      <SearchModal
        isOpen={searchModalOpen}
        onOpen={() => setSearchModalOpen(true)}
        onClose={() => setSearchModalOpen(false)}
        onSelectScenario={handleSelectScenario}
        onSelectCategory={handleNavigate}
        onSelectAwarenessGuide={(guideId) => navigate(awarenessPath(guideId))}
      />

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
