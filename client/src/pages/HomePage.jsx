import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Calendar,
  Wallet,
  Users,
  Navigation,
  CheckCircle2,
  Star,
  Hotel,
  TrendingUp,
  Award,
  Zap,
  Plane,
  HelpCircle
} from 'lucide-react';
import { useTrip } from '../context/TripContext';

const POPULAR_DESTINATIONS = [
  {
    id: 'tirupati',
    name: 'Tirupati & Tirumala',
    state: 'Andhra Pradesh',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    description: 'Sacred Seven Hills shrine of Lord Venkateswara, ancient waterfalls, and divine prasadam.',
    days: 3,
    budget: '₹8,000 - ₹12,000',
    budgetNum: 8000,
    daysNum: 3,
    tag: 'Spiritual & Heritage',
    rating: '4.9',
    badgeColor: 'from-accent-primary to-accent-highlight',
    startingLocation: 'Guntur',
    travelMode: 'Train',
    accommodationPreference: 'Dormitory',
    foodPreference: 'Vegetarian',
    interests: ['Religious', 'Historical']
  },
  {
    id: 'goa',
    name: 'Goa Golden Coast',
    state: 'Goa',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    description: 'Pristine beaches, Portuguese colonial Latin quarters, sunset beach shacks, and water sports.',
    days: 4,
    budget: '₹14,000 - ₹22,000',
    budgetNum: 16000,
    daysNum: 4,
    tag: 'Beaches & Vibe',
    rating: '4.8',
    badgeColor: 'from-accent-cyan to-accent-primary',
    startingLocation: 'Mumbai',
    travelMode: 'Train',
    accommodationPreference: 'Budget',
    foodPreference: 'Both',
    interests: ['Beaches', 'Food', 'Photography']
  },
  {
    id: 'manali',
    name: 'Manali & Solang Valley',
    state: 'Himachal Pradesh',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    description: 'Snow-capped peaks, pine forest treks, paragliding adventures, and cozy mountain cafes.',
    days: 5,
    budget: '₹18,000 - ₹28,000',
    budgetNum: 20000,
    daysNum: 5,
    tag: 'Alpine Mountain',
    rating: '4.9',
    badgeColor: 'from-indigo-500 to-purple-600',
    startingLocation: 'Delhi',
    travelMode: 'Bus',
    accommodationPreference: 'Standard',
    foodPreference: 'Vegetarian',
    interests: ['Adventure', 'Nature', 'Photography']
  },
  {
    id: 'jaipur',
    name: 'Jaipur - The Pink City',
    state: 'Rajasthan',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    description: 'Majestic Amber Fort, Hawa Mahal, royal palaces, street food kachoris, and heritage bazaars.',
    days: 3,
    budget: '₹10,000 - ₹16,000',
    budgetNum: 12000,
    daysNum: 3,
    tag: 'Royal Heritage',
    rating: '4.9',
    badgeColor: 'from-rose-500 to-accent-primary',
    startingLocation: 'Delhi',
    travelMode: 'Train',
    accommodationPreference: 'Standard',
    foodPreference: 'Vegetarian',
    interests: ['Historical', 'Shopping', 'Food']
  },
  {
    id: 'kerala',
    name: 'Kerala Munnar & Alleppey',
    state: 'Kerala',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    description: 'Misty emerald tea estates, traditional houseboat cruises on backwaters, and ayurvedic dining.',
    days: 4,
    budget: '₹16,000 - ₹26,000',
    budgetNum: 18000,
    daysNum: 4,
    tag: 'Nature & Lagoons',
    rating: '4.9',
    badgeColor: 'from-emerald-500 to-accent-cyan',
    startingLocation: 'Bengaluru',
    travelMode: 'Train',
    accommodationPreference: 'Standard',
    foodPreference: 'Vegetarian',
    interests: ['Nature', 'Food', 'Photography']
  },
  {
    id: 'varanasi',
    name: 'Varanasi - Holy Kashi',
    state: 'Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    description: 'Timeless Ganga Aarti at Dashashwamedh Ghat, sunrise boat rides, and sacred temple corridors.',
    days: 3,
    budget: '₹7,500 - ₹12,000',
    budgetNum: 9000,
    daysNum: 3,
    tag: 'Sacred Ganges',
    rating: '4.8',
    badgeColor: 'from-amber-500 to-accent-primary',
    startingLocation: 'Lucknow',
    travelMode: 'Train',
    accommodationPreference: 'Budget',
    foodPreference: 'Vegetarian',
    interests: ['Religious', 'Historical', 'Food']
  }
];

export default function HomePage({ setActivePage, onOpenTour }) {
  const { setPresetDestination } = useTrip();
  const [quickSearch, setQuickSearch] = useState('');

  const handleDestinationPlan = (dest) => {
    setPresetDestination({
      destination: dest.name.split(' ')[0],
      startingLocation: dest.startingLocation || 'Guntur',
      days: dest.daysNum || 3,
      totalBudget: dest.budgetNum || 8000,
      travellers: 2,
      travelMode: dest.travelMode || 'Train',
      accommodationPreference: dest.accommodationPreference || 'Budget',
      foodPreference: dest.foodPreference || 'Vegetarian',
      interests: dest.interests || ['Religious']
    });
    setActivePage('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickSearchSubmit = (e) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      setPresetDestination({
        destination: quickSearch.trim(),
        startingLocation: 'Guntur',
        days: 3,
        totalBudget: 8000,
        travellers: 2,
        travelMode: 'Train',
        accommodationPreference: 'Budget',
        foodPreference: 'Vegetarian',
        interests: ['Sightseeing']
      });
      setActivePage('planner');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section with Dark Theme, Animated Floating Elements & Parallax Overlays */}
      <section className="relative min-h-[640px] lg:min-h-[700px] flex items-center justify-center rounded-3xl overflow-hidden mx-4 sm:mx-6 lg:mx-8 mt-4 shadow-2xl border border-white/10 bg-[#0E1422]">
        {/* Background Image with Dark Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 transform scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2000&q=85')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080B14]/90 via-[#080B14]/75 to-[#080B14]" />

        {/* Ambient Glowing Light Orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-accent-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent-cyan/15 rounded-full blur-3xl pointer-events-none" />

        {/* Animated Floating Travel Badges (Parallax decoration) */}
        <div className="hidden lg:block absolute top-24 left-16 animate-float p-3 rounded-2xl bg-[#141C2E]/80 backdrop-blur-xl border border-white/10 shadow-2xl text-xs text-slate-200 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-accent-primary/20 text-accent-highlight flex items-center justify-center font-bold">
              <Compass className="w-4 h-4" />
            </span>
            <div>
              <div className="font-bold text-white">Tirupati Pilgrimage</div>
              <div className="text-[10px] text-accent-cyan">3 Days • ₹8,000 Budget</div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block absolute bottom-28 right-16 animate-float-slow p-3 rounded-2xl bg-[#141C2E]/80 backdrop-blur-xl border border-white/10 shadow-2xl text-xs text-slate-200 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <div>
              <div className="font-bold text-white">100% Budget Guard</div>
              <div className="text-[10px] text-emerald-400">Zero Silent Overspend</div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center text-white space-y-7">
          {/* Animated Indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A2438]/90 backdrop-blur-xl border border-accent-primary/30 text-accent-highlight text-xs font-bold shadow-glow-primary">
            <Sparkles className="w-4 h-4 text-accent-cyan animate-pulse" />
            <span>AI-Powered Travel Planning</span>
          </div>

          {/* Large Animated Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
            Your Journey, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-accent-highlight to-accent-cyan">
              Your Way.
            </span>
          </h1>

          <p className="text-lg sm:text-2xl text-slate-300 font-bold max-w-2xl mx-auto tracking-wide">
            Plan smarter. Travel better. Explore more.
          </p>

          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed font-medium">
            Personalized day-wise itineraries, realistic transit routes, dormitory & hotel recommendations, and mathematical budget control that never exceeds your limit.
          </p>

          {/* Quick Search Bar */}
          <form onSubmit={handleQuickSearchSubmit} className="max-w-lg mx-auto pt-2">
            <div className="p-1.5 rounded-2xl bg-[#141C2E]/90 border border-white/10 flex items-center gap-2 shadow-2xl backdrop-blur-2xl">
              <div className="pl-3 text-slate-400">
                <MapPin className="w-5 h-5 text-accent-cyan" />
              </div>
              <input
                type="text"
                placeholder="Where do you want to travel? (e.g. Tirupati, Goa, Manali)..."
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                className="flex-1 bg-transparent border-none text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none font-medium px-2 py-2"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-primary to-accent-cyan hover:opacity-90 text-white font-bold text-xs shadow-md transition-all shrink-0 hover:scale-[1.02] active:scale-95"
              >
                Plan It ⚡
              </button>
            </div>
          </form>

          {/* Hero Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setActivePage('planner');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-accent-primary via-accent-cyan to-accent-highlight hover:opacity-95 text-white font-black text-sm shadow-xl shadow-accent-primary/30 transition-all transform hover:-translate-y-1 hover:shadow-glow-primary active:scale-95 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Planning</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setActivePage('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-white font-bold text-sm transition-all hover:-translate-y-0.5"
            >
              Explore Destinations
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left border-t border-white/10 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs text-slate-300 font-semibold">100% Budget Guard</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5">
              <Navigation className="w-4 h-4 text-accent-cyan shrink-0" />
              <span className="text-xs text-slate-300 font-semibold">Interactive Route Maps</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5">
              <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs text-slate-300 font-semibold">Day-Wise Timing</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5">
              <Sparkles className="w-4 h-4 text-accent-highlight shrink-0" />
              <span className="text-xs text-slate-300 font-semibold">Powered by Gemini AI</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benchmark Promo Banner with Dark Gradient */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0E1422] border border-accent-primary/25 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-radial from-accent-primary/10 to-transparent pointer-events-none" />

          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-primary/20 text-accent-highlight text-[10px] font-black uppercase tracking-wider border border-accent-primary/30">
              <Zap className="w-3 h-3 text-amber-400" />
              Featured Benchmark Trip
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              3-Day Tirupati Pilgrimage from Guntur for 2 People
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed font-medium">
              See our AI engine in action: 3-day sacred itinerary, TTD Srinivasam dormitory stay, train transit from Guntur, Srivari Laddu Prasadam, Kapila Theertham, and full expense accounting strictly within <strong>₹8,000</strong>.
            </p>
          </div>

          <button
            onClick={() => handleDestinationPlan(POPULAR_DESTINATIONS[0])}
            className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-accent-primary to-accent-cyan hover:from-accent-hover hover:to-accent-cyan text-white text-xs font-bold shadow-xl shadow-accent-primary/20 transition-all transform hover:scale-105 active:scale-95 shrink-0 flex items-center gap-2 relative z-10"
          >
            <span>Run Benchmark (₹8,000)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Popular Destinations Cards in Dark Theme */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-accent-cyan uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              Handpicked Explorations
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Popular Travel Destinations
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select any destination to instantly pre-fill your AI travel plan.
            </p>
          </div>

          <button
            onClick={() => {
              setActivePage('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-accent-cyan hover:text-accent-highlight flex items-center gap-1 group"
          >
            <span>Browse All Destinations</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="bg-[#141C2E] rounded-3xl overflow-hidden border border-white/5 shadow-xl hover:border-accent-primary/40 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col group"
            >
              {/* Image & Badges */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141C2E] via-[#141C2E]/20 to-black/40" />

                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${dest.badgeColor} text-white text-[10px] font-black uppercase tracking-wider shadow-md`}>
                    {dest.tag}
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>{dest.rating}</span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-xs text-accent-cyan font-semibold block">{dest.state}</span>
                  <h3 className="text-xl font-extrabold leading-tight">{dest.name}</h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {dest.description}
                </p>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block font-semibold uppercase">Estimated Budget</span>
                    <span className="font-extrabold text-white text-sm">{dest.budget}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block font-semibold uppercase">Duration</span>
                    <span className="font-extrabold text-white">{dest.days} Days</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDestinationPlan(dest)}
                  className="w-full py-3 rounded-2xl bg-white/5 hover:bg-gradient-to-r hover:from-accent-primary hover:to-accent-cyan hover:text-white text-slate-200 font-bold text-xs transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-accent-primary group-hover:to-accent-cyan group-hover:text-white group-hover:shadow-glow-primary border border-white/5 hover:border-transparent"
                >
                  <Sparkles className="w-3.5 h-3.5 text-accent-cyan group-hover:text-white" />
                  <span>Plan This Trip with AI</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose TripWise Section in Dark Theme */}
      <section className="bg-[#0E1422] py-16 border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-bold text-accent-cyan uppercase tracking-wider">
              Engineered For Modern Travelers
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Why TripWise is Built Different
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Most planners give generic lists. TripWise calculates actual budgets, balances transit logistics, and ensures you never run out of funds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#141C2E] p-7 rounded-3xl border border-white/5 shadow-md hover:border-accent-primary/40 transition-all duration-300 space-y-3 transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-accent-primary/20 text-accent-highlight flex items-center justify-center font-bold">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Mathematically Budgeted</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Zero silent overspending. Our engine distributes your funds across travel, lodging, food, sightseeing, and shopping, with an emergency contingency buffer.
              </p>
            </div>

            <div className="bg-[#141C2E] p-7 rounded-3xl border border-white/5 shadow-md hover:border-accent-cyan/40 transition-all duration-300 space-y-3 transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-accent-cyan/20 text-accent-cyan flex items-center justify-center font-bold">
                <Navigation className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Interactive OpenStreetMap</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every landmark is plotted with real geographic coordinates, transit lines, and a one-click launcher for Google Maps turn-by-turn navigation.
              </p>
            </div>

            <div className="bg-[#141C2E] p-7 rounded-3xl border border-white/5 shadow-md hover:border-amber-500/40 transition-all duration-300 space-y-3 transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Tailored To Your Style</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Whether you prefer TTD dormitories & vegetarian bhojanam or 5-star heritage resorts & fine dining, the plan adjusts to your preferences instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready To Plan CTA in Dark Theme */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0E1422] via-[#141C2E] to-[#1A2438] text-white p-8 sm:p-14 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left relative overflow-hidden border border-accent-primary/20">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-accent-primary/15 to-transparent pointer-events-none" />

          <div className="space-y-2 relative z-10">
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
              Ready to begin your journey?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed">
              Enter your budget and destination to generate a customized day-by-day travel plan in under 5 seconds.
            </p>
          </div>

          <button
            onClick={() => {
              setActivePage('planner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-9 py-4 rounded-2xl bg-gradient-to-r from-accent-primary to-accent-cyan hover:opacity-95 text-white font-black text-xs shadow-xl shadow-accent-primary/30 transition-all transform hover:scale-105 active:scale-95 shrink-0 relative z-10 flex items-center gap-2"
          >
            <span>Start Planning Now ✈️</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
