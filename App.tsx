import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Company, ViewState } from './types';
import HomeView from './views/HomeView';
import HubView from './views/HubView';
import JuniorHubView from './views/JuniorHubView';
import DetailView from './views/DetailView';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  // Navigation Handlers
  const handleEnterHub = () => {
    setView('HUB');
  };

  const handleEnterJuniorHub = () => {
    setView('JUNIOR_HUB');
  };

  const handleSelectCompany = (company: Company) => {
    setSelectedCompany(company);
    setView('DETAIL');
  };

  const handleBackToHub = () => {
    setView('HUB');
    // We keep selectedCompany for a moment if we wanted to animate back to scroll position, 
    // but for now we just switch view.
  };

  const handleGoHome = () => {
    setView('HOME');
    setSelectedCompany(null);
  };

  return (
    <div className="antialiased text-slate-900 bg-slate-50 min-h-screen font-sans">
      <AnimatePresence mode="wait">
        
        {view === 'HOME' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-30"
          >
            <HomeView onEnterHub={handleEnterHub} onEnterJuniorHub={handleEnterJuniorHub} />
          </motion.div>
        )}

        {view === 'JUNIOR_HUB' && (
          <motion.div
            key="junior-hub"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 z-20 overflow-y-auto no-scrollbar"
          >
            <JuniorHubView onGoHome={handleGoHome} />
          </motion.div>
        )}

        {view === 'HUB' && (
          <motion.div
            key="hub"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 z-20 overflow-y-auto no-scrollbar"
          >
            <HubView onSelectCompany={handleSelectCompany} onGoHome={handleGoHome} />
          </motion.div>
        )}

        {view === 'DETAIL' && selectedCompany && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="absolute inset-0 z-40 overflow-y-auto no-scrollbar bg-white"
          >
            <DetailView company={selectedCompany} onBack={handleBackToHub} onGoHome={handleGoHome} />
          </motion.div>
        )}
        
      </AnimatePresence>
    </div>
  );
};

export default App;