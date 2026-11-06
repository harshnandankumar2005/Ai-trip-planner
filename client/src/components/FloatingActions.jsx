import React, { useState, useEffect } from 'react';
import {
  Compass,
  Sparkles,
  ArrowUp,
  MapPin,
  BookmarkCheck,
  MessageSquare,
  X,
  Zap,
  HelpCircle,
  CheckCircle2,
  ChevronRight,
  Shield,
  Layers,
  Heart
} from 'lucide-react';
import { useTrip } from '../context/TripContext';

export default function FloatingActions({ activePage, setActivePage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isTipsModalOpen, setIsTipsModalOpen] = useState(false);
  const { savedTrips, setPresetDestination } = useTrip();

  // Scroll listener for Back to Top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickBenchmark = () => {
    setPresetDestination({
      destination: 'Tirupati',
      startingLocation: 'Guntur',
      days: 3,
      totalBudget: 8000,
      travellers: 2,
      travelMode: 'Train',
      accommodationPreference: 'Dormitory',
      foodPreference: 'Vegetarian',
      interests: ['Religious', 'Historical']
    });
    setActivePage('planner');
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const travelHacks = [
    { title: 'Tirupati Pilgrimage Tip', text: 'Book TTD Special Entry Darshan (₹300) 3 months in advance on the official TTD portal for quickest queue times.' },
    { title: 'Smart Budget Transport', text: 'Combine sleeper/3AC trains with local state RTC electric buses to reduce transit cost by up to 60%.' },
    { title: 'Free Authentic Meals', text: 'Temples like Tirumala (Matrusri Tarigonda Vengamamba) and Golden Temple provide wholesome, hygienic, free Anna Prasadam daily.' },
    { title: 'Emergency Contingency', text: 'Always reserve 8-10% of your total budget untouched for local autos, luggage cloakrooms, or minor unexpected needs.' }
  ];

  return (
    <>
      {/* Floating Action Suite Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 no-print select-none">
        {/* Expanded Speed-Dial Options */}
        {isOpen && (
          <div className="flex flex-col items-end gap-2.5 mb-1 animate-fade-in">
            {/* Quick Action 1: 1-Click Benchmark */}
            <div className="flex items-center gap-2 group">
              <span className="px-3 py-1 bg-navy-900/90 text-white text-[11px] font-semibold rounded-xl shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition duration-200">
                1-Click Tirupati Benchmark (₹8,000)
              </span>
              <button
                onClick={handleQuickBenchmark}
                className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-sunset-500 text-white shadow-glow-sunset flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300"
                title="1-Click Tirupati Plan"
              >
                <Zap className="w-5 h-5 fill-white" />
              </button>
            </div>

            {/* Quick Action 2: AI Travel Tips Drawer */}
            <div className="flex items-center gap-2 group">
              <span className="px-3 py-1 bg-navy-900/90 text-white text-[11px] font-semibold rounded-xl shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition duration-200">
                Smart Travel Hacks & Guide
              </span>
              <button
                onClick={() => {
                  setIsTipsModalOpen(true);
                  setIsOpen(false);
                }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-500 text-white shadow-lg shadow-indigo-500/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300"
                title="Travel Hacks"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action 3: My Trips */}
            <div className="flex items-center gap-2 group relative">
              <span className="px-3 py-1 bg-navy-900/90 text-white text-[11px] font-semibold rounded-xl shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition duration-200">
                Saved Itineraries ({savedTrips.length})
              </span>
              <button
                onClick={() => {
                  setActivePage('my-trips');
                  setIsOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-glow-emerald flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 relative"
                title="My Saved Trips"
              >
                <BookmarkCheck className="w-5 h-5" />
                {savedTrips.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-sunset-500 text-white text-[10px] font-black flex items-center justify-center shadow-md border-2 border-white">
                    {savedTrips.length}
                  </span>
                )}
              </button>
            </div>

            {/* Quick Action 4: New Trip Planner */}
            <div className="flex items-center gap-2 group">
              <span className="px-3 py-1 bg-navy-900/90 text-white text-[11px] font-semibold rounded-xl shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition duration-200">
                AI Trip Planner
              </span>
              <button
                onClick={() => {
                  setActivePage('planner');
                  setIsOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-brand-600 text-white shadow-glow-sky flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300"
                title="Plan New Trip"
              >
                <Compass className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Bottom Row: Back to Top + Main Toggle Button */}
        <div className="flex items-center gap-3">
          {/* Back To Top Button */}
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="w-11 h-11 rounded-2xl bg-white/90 hover:bg-white text-navy-800 border border-slate-200 shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200"
              title="Scroll to Top"
            >
              <ArrowUp className="w-5 h-5 text-brand-600" />
            </button>
          )}

          {/* Main FAB Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-14 h-14 rounded-2xl text-white shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              isOpen
                ? 'bg-navy-900 rotate-90 shadow-navy-900/40'
                : 'bg-gradient-to-tr from-brand-600 via-sky-500 to-sunset-500 shadow-glow-sky fab-pulse'
            }`}
            title="TripWise Quick Actions"
            aria-label="TripWise Quick Actions"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <div className="relative flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-sunset-400 animate-ping" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Floating Travel Hacks Modal */}
      {isTipsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy-800">TripWise Travel Hacks</h3>
                  <p className="text-xs text-slate-500">Insider advice to travel better for less</p>
                </div>
              </div>
              <button
                onClick={() => setIsTipsModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {travelHacks.map((hack, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h4 className="text-xs font-bold text-navy-800">{hack.title}</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-7">
                    {hack.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={handleQuickBenchmark}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <span>Try Tirupati Benchmark (₹8,000)</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsTipsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-navy-800 text-white text-xs font-semibold hover:bg-navy-900 transition"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
