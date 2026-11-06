import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Compass,
  Calendar,
  Users,
  Wallet,
  Bus,
  Hotel,
  Utensils,
  Share2,
  Download,
  Bookmark,
  BookmarkCheck,
  Edit3,
  Scale,
  MapPin,
  CheckCircle2,
  Navigation,
  ArrowLeft,
  Sparkles,
  Info
} from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';
import ItineraryDayCard from '../components/ItineraryDayCard';
import BudgetBreakdown from '../components/BudgetBreakdown';
import MapView from '../components/MapView';
import TripComparisonModal from '../components/TripComparisonModal';
import ShareModal from '../components/ShareModal';

export default function ItineraryResultPage({ setActivePage }) {
  const { currentTrip, saveTrip, setPrefillData } = useTrip();
  const { isAuthenticated, openAuthModal } = useAuth();

  const [activeTab, setActiveTab] = useState('itinerary');
  const [isSaved, setIsSaved] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  if (!currentTrip) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-[#141C2E] rounded-3xl border border-white/10 text-center space-y-4">
        <Compass className="w-12 h-12 text-accent-cyan mx-auto animate-spin-slow" />
        <h3 className="text-lg font-bold text-white">No Generated Plan Found</h3>
        <p className="text-xs text-slate-400">
          Please use the AI Trip Planner to create an itinerary first.
        </p>
        <button
          onClick={() => setActivePage('planner')}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-primary to-accent-cyan text-white text-xs font-bold"
        >
          Go to AI Trip Planner
        </button>
      </div>
    );
  }

  const {
    tripSummary = {},
    itinerary = [],
    budgetBreakdown = {},
    mapLocations = [],
    comparison = {},
    transportationAdvice = '',
    stayAdvice = '',
    foodAdvice = '',
    budgetAdvice = ''
  } = currentTrip;

  const destination = tripSummary.destination || 'Your Destination';
  const start = tripSummary.startingLocation || 'Origin';
  const days = tripSummary.days || itinerary.length || 3;
  const travellers = tripSummary.travellers || 2;
  const totalBudget = tripSummary.totalBudget || 8000;
  const travelMode = tripSummary.travelMode || 'Train';
  const accommodation = tripSummary.accommodationPreference || 'Dormitory';
  const foodPref = tripSummary.foodPreference || 'Vegetarian';

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSave = async () => {
    try {
      const success = await saveTrip(currentTrip);
      if (success) {
        setIsSaved(true);
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
        showToast('Itinerary saved to My Trips!');
      }
    } catch (e) {
      showToast('Error saving trip.');
    }
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  const handleEdit = () => {
    setPrefillData({
      startingLocation: start,
      destination: destination,
      days: days,
      travellers: travellers,
      totalBudget: totalBudget,
      travelMode: travelMode,
      accommodationPreference: accommodation,
      foodPreference: foodPref,
      interests: tripSummary.interests || []
    });
    setActivePage('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#141C2E] text-white border border-accent-cyan/40 px-4 py-2.5 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-accent-cyan" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar & Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <button
          onClick={() => setActivePage('planner')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white self-start transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Planner</span>
        </button>

        {/* Action Buttons in Dark Theme */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleSave}
            disabled={isSaved}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition border shadow-xs ${
              isSaved
                ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30'
                : 'bg-[#141C2E] text-white border-white/10 hover:bg-[#1A2438]'
            }`}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 text-emerald-400" /> : <Bookmark className="w-4 h-4 text-accent-cyan" />}
            <span>{isSaved ? 'Saved in My Trips' : 'Save Itinerary'}</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#141C2E] text-white border border-white/10 hover:bg-[#1A2438] transition shadow-xs"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={() => setIsComparisonOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#141C2E] text-white border border-white/10 hover:bg-[#1A2438] transition shadow-xs"
          >
            <Scale className="w-4 h-4 text-amber-400" />
            <span>Compare Plans</span>
          </button>

          <button
            onClick={() => setIsShareOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#141C2E] text-white border border-white/10 hover:bg-[#1A2438] transition shadow-xs"
          >
            <Share2 className="w-4 h-4 text-accent-cyan" />
            <span>Share</span>
          </button>

          <button
            onClick={handleEdit}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-accent-primary/20 text-accent-highlight border border-accent-primary/30 hover:bg-accent-primary/30 transition shadow-xs"
          >
            <Edit3 className="w-4 h-4 text-accent-cyan" />
            <span>Edit Trip</span>
          </button>
        </div>
      </div>

      {/* Hero Summary Card in Dark Theme */}
      <div className="bg-gradient-to-r from-[#0E1422] via-[#141C2E] to-[#1A2438] text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-white/10">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-accent-primary/20 to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-accent-primary/20 border border-accent-primary/40 text-accent-highlight text-xs font-black uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-accent-cyan" />
              AI Verified Itinerary
            </span>
            <span className="text-xs text-slate-400">
              Generated for {start} → {destination}
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              {days}-Day {destination} Experience
            </h1>
            {tripSummary.tagline && (
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl italic font-medium">
                "{tripSummary.tagline}"
              </p>
            )}
          </div>

          {/* Quick Metrics Bar in Dark Theme */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#080B14]/60 border border-white/5 backdrop-blur-md">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Budget</span>
              <span className="text-base sm:text-lg font-black text-white">₹{totalBudget.toLocaleString('en-IN')}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#080B14]/60 border border-white/5 backdrop-blur-md">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Est. Expenses</span>
              <span className="text-base sm:text-lg font-black text-emerald-400">
                ₹{budgetBreakdown.totalEstimated?.toLocaleString('en-IN') || totalBudget.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#080B14]/60 border border-white/5 backdrop-blur-md">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Travellers</span>
              <span className="text-base sm:text-lg font-black text-white">{travellers} {travellers > 1 ? 'People' : 'Person'}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#080B14]/60 border border-white/5 backdrop-blur-md">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Travel Mode</span>
              <span className="text-base sm:text-lg font-black text-white">{travelMode}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Switcher in Dark Theme */}
      <div className="flex items-center gap-1.5 p-1.5 bg-[#0E1422] rounded-2xl text-xs font-bold text-slate-400 no-print overflow-x-auto scrollbar-none border border-white/5">
        <button
          onClick={() => setActiveTab('itinerary')}
          className={`px-4 py-2 rounded-xl transition shrink-0 ${
            activeTab === 'itinerary' ? 'bg-[#1A2438] text-white border border-accent-primary/40 shadow-glow-primary font-black' : 'hover:text-white'
          }`}
        >
          📅 Day-by-Day Itinerary ({itinerary.length} Days)
        </button>

        <button
          onClick={() => setActiveTab('budget')}
          className={`px-4 py-2 rounded-xl transition shrink-0 ${
            activeTab === 'budget' ? 'bg-[#1A2438] text-white border border-accent-primary/40 shadow-glow-primary font-black' : 'hover:text-white'
          }`}
        >
          💰 Smart Budget Breakdown (₹{totalBudget.toLocaleString('en-IN')})
        </button>

        <button
          onClick={() => setActiveTab('map')}
          className={`px-4 py-2 rounded-xl transition shrink-0 ${
            activeTab === 'map' ? 'bg-[#1A2438] text-white border border-accent-primary/40 shadow-glow-primary font-black' : 'hover:text-white'
          }`}
        >
          🗺️ Interactive Map ({mapLocations.length} Spots)
        </button>

        <button
          onClick={() => setActiveTab('transit')}
          className={`px-4 py-2 rounded-xl transition shrink-0 ${
            activeTab === 'transit' ? 'bg-[#1A2438] text-white border border-accent-primary/40 shadow-glow-primary font-black' : 'hover:text-white'
          }`}
        >
          🚍 Transit & Stay Logistics
        </button>
      </div>

      {/* TAB CONTENT: Day-by-Day Itinerary */}
      {activeTab === 'itinerary' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Complete Day-Wise Itinerary</h2>
            <span className="text-xs text-slate-400 font-medium">Click any day to expand or collapse</span>
          </div>

          <div className="space-y-4">
            {itinerary.map((dayPlan, index) => (
              <ItineraryDayCard
                key={dayPlan.day || index}
                dayPlan={dayPlan}
                destination={destination}
                defaultExpanded={index === 0 || itinerary.length <= 4}
              />
            ))}
          </div>

          {/* Quick budget summary preview under itinerary */}
          <div className="p-4 rounded-2xl bg-[#141C2E] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent-cyan" />
              <span>All {days} days calculated within budget: <strong>₹{budgetBreakdown.totalEstimated?.toLocaleString('en-IN')}</strong> of ₹{totalBudget.toLocaleString('en-IN')}.</span>
            </div>
            <button
              onClick={() => setActiveTab('budget')}
              className="text-accent-cyan font-bold hover:underline"
            >
              View Full Budget Analysis →
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Smart Budget Breakdown */}
      {activeTab === 'budget' && (
        <BudgetBreakdown
          budgetData={budgetBreakdown}
          travellers={travellers}
          days={days}
        />
      )}

      {/* TAB CONTENT: Interactive Route Map */}
      {activeTab === 'map' && (
        <div className="space-y-4">
          <MapView
            locations={mapLocations}
            destinationName={destination}
          />
        </div>
      )}

      {/* TAB CONTENT: Transit & Stay Guidance */}
      {activeTab === 'transit' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#141C2E] p-6 rounded-3xl border border-white/5 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
              <Bus className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Transit Recommendations</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {transportationAdvice || `Travel from ${start} to ${destination} via ${travelMode}. Check advance bookings for weekend peak rush.`}
            </p>
          </div>

          <div className="bg-[#141C2E] p-6 rounded-3xl border border-white/5 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
              <Hotel className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Accommodation Plan</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {stayAdvice || `Pre-book ${accommodation} lodging near central transit hubs or shrines for easy access.`}
            </p>
          </div>

          <div className="bg-[#141C2E] p-6 rounded-3xl border border-white/5 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Utensils className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Dining & Culinary Advice</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {foodAdvice || `Enjoy ${foodPref} regional delicacies. Don't miss authentic local breakfast joints and prasadam.`}
            </p>
          </div>
        </div>
      )}

      {/* Modals */}
      <TripComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        comparison={comparison}
        currentBudget={totalBudget}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        trip={currentTrip}
      />
    </div>
  );
}
