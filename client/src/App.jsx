import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { TripProvider } from './context/TripContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import FloatingActions from './components/FloatingActions';

import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import PlannerPage from './pages/PlannerPage';
import ItineraryResultPage from './pages/ItineraryResultPage';
import MyTripsPage from './pages/MyTripsPage';

function MainApp() {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage setActivePage={setActivePage} />;
      case 'explore':
        return <ExplorePage setActivePage={setActivePage} />;
      case 'planner':
        return <PlannerPage setActivePage={setActivePage} />;
      case 'result':
        return <ItineraryResultPage setActivePage={setActivePage} />;
      case 'my-trips':
        return <MyTripsPage setActivePage={setActivePage} />;
      default:
        return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-brand-500 selection:text-white relative">
      {/* Sticky Navigation Bar */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Page View */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Global Authentication Modal */}
      <AuthModal />

      {/* Modern Floating Action Buttons Suite */}
      <FloatingActions activePage={activePage} setActivePage={setActivePage} />

      {/* Footer */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TripProvider>
        <MainApp />
      </TripProvider>
    </AuthProvider>
  );
}
