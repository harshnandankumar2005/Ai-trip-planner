import React, { useState, useEffect } from 'react';
import {
  Compass,
  MapPin,
  Calendar,
  Users,
  IndianRupee,
  Bus,
  Train,
  Plane,
  Car,
  Bike,
  Hotel,
  Utensils,
  Sparkles,
  ShieldCheck,
  Zap,
  AlertCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sliders,
  Check
} from 'lucide-react';
import { useTrip } from '../context/TripContext';
import LoadingState from '../components/LoadingState';
import Tooltip from '../components/Tooltip';

const TRAVEL_MODES = [
  { id: 'Train', label: 'Train', icon: Train, desc: 'Cost-effective & comfortable travel' },
  { id: 'Bus', label: 'Bus', icon: Bus, desc: 'Frequent state RTC & AC sleepers' },
  { id: 'Flight', label: 'Flight', icon: Plane, desc: 'Fastest for long interstate trips' },
  { id: 'Car', label: 'Car / Cab', icon: Car, desc: 'Door-to-door flexible road trip' },
  { id: 'Bike', label: 'Bike', icon: Bike, desc: 'Scenic touring and adventure ride' },
];

const ACCOMMODATIONS = [
  { id: 'Dormitory', label: 'Dormitory', desc: 'TTD complexes, Zostel, backpacker dorms (₹200 - ₹600/night)' },
  { id: 'Budget', label: 'Budget Stay', desc: 'Clean lodges, guesthouses & standard OYO (₹800 - ₹1,800/night)' },
  { id: 'Standard', label: 'Standard Hotel', desc: '3-star comfort, breakfast & AC amenities (₹2,200 - ₹4,500/night)' },
  { id: 'Luxury', label: 'Luxury Resort', desc: '4/5-star heritage hotels, pool & dining (₹6,000 - ₹18,000+/night)' },
];

const FOOD_PREFERENCES = [
  { id: 'Vegetarian', label: 'Vegetarian', desc: 'Pure veg Andhra bhojanam, tiffins, sattvic & temple annadanam' },
  { id: 'Non-Vegetarian', label: 'Non-Vegetarian', desc: 'Authentic regional chicken, mutton, biryani & coastal seafood' },
  { id: 'Both', label: 'Both / Flexible', desc: 'All regional specialties and local street foods' },
];

const INTEREST_OPTIONS = [
  { id: 'Religious', label: 'Religious & Temples', icon: '🛕' },
  { id: 'Adventure', label: 'Adventure & Treks', icon: '🧗' },
  { id: 'Nature', label: 'Nature & Waterfalls', icon: '🌿' },
  { id: 'Historical', label: 'Historical & Forts', icon: '🏰' },
  { id: 'Shopping', label: 'Shopping & Bazaars', icon: '🛍️' },
  { id: 'Food', label: 'Food & Street Eats', icon: '🍲' },
  { id: 'Beaches', label: 'Beaches & Watersports', icon: '🏖️' },
  { id: 'Photography', label: 'Scenic Photography', icon: '📸' },
];

const BUDGET_PRESETS = [5000, 8000, 15000, 25000, 50000];

export default function PlannerPage({ setActivePage, onOpenTour }) {
  const { generateTrip, isGenerating, generationStep, error, prefillData, setPrefillData } = useTrip();

  // Multi-step Wizard State (1: Destination, 2: Travel Details, 3: Budget, 4: Preferences)
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [startingLocation, setStartingLocation] = useState('Guntur');
  const [destination, setDestination] = useState('Tirupati');
  const [departureDate, setDepartureDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [days, setDays] = useState(3);
  const [travellers, setTravellers] = useState(2);
  const [totalBudget, setTotalBudget] = useState(8000);
  const [travelMode, setTravelMode] = useState('Train');
  const [accommodationPreference, setAccommodationPreference] = useState('Dormitory');
  const [foodPreference, setFoodPreference] = useState('Vegetarian');
  const [interests, setInterests] = useState(['Religious', 'Historical']);
  const [formError, setFormError] = useState('');

  // Handle pre-fill if navigated from Explore or Hero
  useEffect(() => {
    if (prefillData) {
      if (prefillData.startingLocation) setStartingLocation(prefillData.startingLocation);
      if (prefillData.destination) setDestination(prefillData.destination);
      if (prefillData.days) setDays(prefillData.days);
      if (prefillData.totalBudget) setTotalBudget(prefillData.totalBudget);
      if (prefillData.travellers) setTravellers(prefillData.travellers);
      if (prefillData.travelMode) setTravelMode(prefillData.travelMode);
      if (prefillData.accommodationPreference) setAccommodationPreference(prefillData.accommodationPreference);
      if (prefillData.foodPreference) setFoodPreference(prefillData.foodPreference);
      if (prefillData.interests) setInterests(prefillData.interests);
      setPrefillData(null);
    }
  }, [prefillData, setPrefillData]);

  // Quick Benchmark Test loader
  const loadBenchmarkTest = () => {
    setStartingLocation('Guntur');
    setDestination('Tirupati');
    setDays(3);
    setTravellers(2);
    setTotalBudget(8000);
    setTravelMode('Train');
    setAccommodationPreference('Dormitory');
    setFoodPreference('Vegetarian');
    setInterests(['Religious', 'Historical']);
    setFormError('');
    setCurrentStep(1);
  };

  const toggleInterest = (id) => {
    if (interests.includes(id)) {
      if (interests.length > 1) {
        setInterests(interests.filter((i) => i !== id));
      }
    } else {
      setInterests([...interests, id]);
    }
  };

  // Step Validation before proceeding to next step
  const validateCurrentStep = () => {
    setFormError('');
    if (currentStep === 1) {
      if (!startingLocation.trim()) {
        setFormError('Please enter your starting location.');
        return false;
      }
      if (!destination.trim()) {
        setFormError('Please enter your travel destination.');
        return false;
      }
      if (!departureDate) {
        setFormError('Please pick a departure date.');
        return false;
      }
    } else if (currentStep === 2) {
      if (days < 1 || days > 30) {
        setFormError('Number of days must be between 1 and 30.');
        return false;
      }
      if (travellers < 1 || travellers > 20) {
        setFormError('Number of travellers must be between 1 and 20.');
        return false;
      }
      if (!travelMode) {
        setFormError('Please select a travel mode.');
        return false;
      }
    } else if (currentStep === 3) {
      if (totalBudget < 500) {
        setFormError('Total budget must be at least ₹500.');
        return false;
      }
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(4, prev + 1));
    }
  };

  const handlePrevStep = () => {
    setFormError('');
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    if (!validateCurrentStep()) return;

    try {
      await generateTrip({
        startingLocation,
        destination,
        departureDate,
        days: parseInt(days),
        travellers: parseInt(travellers),
        totalBudget: parseInt(totalBudget),
        travelMode,
        accommodationPreference,
        foodPreference,
        interests,
      });
      setActivePage('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      // Handled in TripContext
    }
  };

  // Calculations for live budget display
  const perPersonCost = Math.round(totalBudget / (travellers || 1));
  const perDayPerPersonCost = Math.round(totalBudget / ((travellers || 1) * (days || 1)));

  // Real-time sufficiency advice
  const estimatedMin = accommodationPreference === 'Dormitory' ? 800 : (accommodationPreference === 'Luxury' ? 4500 : 1600);
  const minRequired = estimatedMin * days * travellers;
  const isBudgetGenerous = totalBudget >= minRequired;

  const stepsMeta = [
    { num: 1, title: 'Destination', subtitle: 'Where & When' },
    { num: 2, title: 'Travel Details', subtitle: 'Duration & Transit' },
    { num: 3, title: 'Budget', subtitle: 'Total & Per Person' },
    { num: 4, title: 'Preferences', subtitle: 'Stay, Food & Vibe' },
  ];

  if (isGenerating) {
    return <LoadingState step={generationStep} />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent-primary/10 text-accent-highlight text-xs font-bold border border-accent-primary/25 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
          <span>Interactive AI Travel Wizard</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          AI Smart Trip Planner
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-medium">
          Plan your customized trip in 4 easy steps. Zero silent overspending guaranteed.
        </p>
      </div>

      {/* 1-Click Benchmark Promo Card */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#141C2E] via-[#1A2438] to-[#141C2E] border border-accent-primary/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-accent-primary to-accent-cyan flex items-center justify-center font-bold text-lg text-white shadow-md">
            ⚡
          </div>
          <div>
            <div className="text-[10px] font-black text-accent-cyan uppercase tracking-wider">Benchmark Test Case</div>
            <div className="text-xs sm:text-sm font-bold text-white">Plan 3-day Tirupati trip from Guntur for 2 people with ₹8,000 budget</div>
          </div>
        </div>

        <button
          type="button"
          onClick={loadBenchmarkTest}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 transition-all shadow-sm shrink-0 hover:scale-105 active:scale-95"
        >
          Load Tirupati Benchmark
        </button>
      </div>

      {/* Step Progress Indicators */}
      <div className="p-4 sm:p-6 rounded-3xl bg-[#0E1422] border border-white/5 space-y-4 shadow-xl">
        <div className="grid grid-cols-4 gap-2">
          {stepsMeta.map((s) => {
            const isDone = currentStep > s.num;
            const isCurrent = currentStep === s.num;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => {
                  if (s.num < currentStep) setCurrentStep(s.num);
                }}
                className={`flex flex-col items-center sm:items-start text-left p-2 sm:p-2.5 rounded-2xl transition-all ${
                  isCurrent
                    ? 'bg-[#1A2438] border border-accent-primary/40 shadow-glow-primary'
                    : isDone
                    ? 'bg-white/5 hover:bg-white/10 text-slate-300'
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                    isDone
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-gradient-to-r from-accent-primary to-accent-cyan text-white'
                      : 'bg-white/10 text-slate-400'
                  }`}>
                    {isDone ? <Check className="w-3 h-3" /> : s.num}
                  </span>
                  <span className="text-[11px] font-bold text-white hidden sm:inline">{s.title}</span>
                </div>
                <span className="text-[10px] text-slate-400 hidden sm:block truncate w-full">{s.subtitle}</span>
              </button>
            );
          })}
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full bg-[#1A2438] h-1.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent-primary via-accent-cyan to-accent-highlight transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Error Banner */}
      {formError && (
        <div className="p-4 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5 animate-fade-in">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span className="font-semibold">{formError}</span>
        </div>
      )}

      {/* Multi-Step Form Container */}
      <div className="bg-[#141C2E] rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
        {/* Glow orb */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-primary/15 rounded-full blur-3xl pointer-events-none" />

        {/* STEP 1: DESTINATION & ORIGIN */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in relative z-10">
            <div>
              <span className="text-[10px] uppercase font-black text-accent-cyan tracking-wider">Step 1 of 4</span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">Destination & Dates</h3>
              <p className="text-xs text-slate-400 mt-0.5">Where is your journey starting from, and where do you want to explore?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Field 1: Starting Location */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1.5">
                  Starting Location
                  <Tooltip text="The city, town, or railhead you are departing from (e.g. Guntur, Hyderabad, Delhi)." />
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Guntur, Vijayawada, Delhi"
                    value={startingLocation}
                    onChange={(e) => setStartingLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-2xl bg-[#0E1422] border border-white/10 text-white placeholder:text-slate-500 focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 outline-none transition font-medium"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">TripWise will compute realistic commute routes from here.</p>
              </div>

              {/* Field 2: Destination */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1.5">
                  Travel Destination
                  <Tooltip text="Where you want to travel. Enter a city, pilgrimage site, beach, or hill station." />
                </label>
                <div className="relative">
                  <Compass className="w-4 h-4 text-accent-cyan absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tirupati, Goa, Manali, Jaipur"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-2xl bg-[#0E1422] border border-white/10 text-white placeholder:text-slate-500 focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 outline-none transition font-medium"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Authentic destination attractions will be mapped.</p>
              </div>

              {/* Field 3: Departure Date */}
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-200 block mb-1.5">
                  Departure Date
                  <Tooltip text="When your journey begins. Helps determine day of week and weekend temple darshan rush." />
                </label>
                <div className="relative max-w-sm">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="date"
                    required
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-2xl bg-[#0E1422] border border-white/10 text-white focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 outline-none transition font-medium"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: TRAVEL DETAILS */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in relative z-10">
            <div>
              <span className="text-[10px] uppercase font-black text-accent-cyan tracking-wider">Step 2 of 4</span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">Duration & Travel Mode</h3>
              <p className="text-xs text-slate-400 mt-0.5">How many days, how many people, and your preferred way to travel?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Field 4: Days */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1.5">
                  Number of Travel Days (1–30)
                  <Tooltip text="Duration of your trip. Day 1 covers arrival, and final day covers departure." />
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={30}
                    required
                    value={days}
                    onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl bg-[#0E1422] border border-white/10 text-white focus:border-accent-primary outline-none transition font-bold"
                  />
                  <span className="text-xs text-slate-400 font-bold shrink-0">Days</span>
                </div>
              </div>

              {/* Field 5: Travellers */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1.5">
                  Number of Travellers
                  <Tooltip text="Total people travelling. Expenses will be divided per person." />
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={20}
                    required
                    value={travellers}
                    onChange={(e) => setTravellers(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl bg-[#0E1422] border border-white/10 text-white focus:border-accent-primary outline-none transition font-bold"
                  />
                  <span className="text-xs text-slate-400 font-bold shrink-0">People</span>
                </div>
              </div>
            </div>

            {/* Field 7: Travel Mode */}
            <div>
              <label className="text-xs font-bold text-slate-200 block mb-2">
                Preferred Travel Mode
                <Tooltip text="Train and Bus offer maximum budget efficiency. Flights are factored for long distances." />
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {TRAVEL_MODES.map((mode) => {
                  const Icon = mode.icon;
                  const isSelected = travelMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setTravelMode(mode.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'border-accent-primary bg-[#1A2438] text-white shadow-glow-primary ring-1 ring-accent-primary'
                          : 'border-white/5 bg-[#0E1422] text-slate-400 hover:border-white/15 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`p-2 rounded-xl ${isSelected ? 'bg-accent-primary text-white' : 'bg-white/5 text-slate-400'}`}>
                          <Icon className="w-4 h-4" />
                        </span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-accent-cyan shadow-glow-cyan" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{mode.label}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">{mode.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: BUDGET */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in relative z-10">
            <div>
              <span className="text-[10px] uppercase font-black text-accent-cyan tracking-wider">Step 3 of 4</span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">Total Trip Budget</h3>
              <p className="text-xs text-slate-400 mt-0.5">Set your total budget in ₹ INR. Our AI will never generate a plan that exceeds this.</p>
            </div>

            <div className="space-y-4">
              {/* Budget amount input & presets */}
              <div className="p-6 rounded-3xl bg-[#0E1422] border border-white/5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <label className="text-xs font-bold text-slate-200">
                    Total Trip Budget (₹ INR)
                    <Tooltip text="Covers transit, lodging, food, sightseeing passes, and shopping reserve for all travellers combined." />
                  </label>
                  <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-highlight">
                    ₹{totalBudget.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Interactive Slider */}
                <input
                  type="range"
                  min="2000"
                  max="100000"
                  step="500"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(parseInt(e.target.value))}
                  className="w-full h-2.5 bg-[#1A2438] rounded-lg appearance-none cursor-pointer accent-accent-cyan"
                />

                {/* Quick Presets */}
                <div className="flex items-center gap-2 flex-wrap pt-2">
                  <span className="text-[11px] font-bold text-slate-400 mr-1">Quick Select:</span>
                  {BUDGET_PRESETS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setTotalBudget(p)}
                      className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all ${
                        totalBudget === p
                          ? 'bg-gradient-to-r from-accent-primary to-accent-cyan text-white shadow-md'
                          : 'bg-[#1A2438] text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      ₹{p.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Live Financial Breakdown Card */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-[#0E1422] border border-white/5">
                  <div className="text-[11px] text-slate-400 font-bold mb-1">Per Person Share</div>
                  <div className="text-lg sm:text-xl font-black text-white">
                    ₹{perPersonCost.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-slate-500">for {travellers} {travellers > 1 ? 'people' : 'person'}</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0E1422] border border-white/5">
                  <div className="text-[11px] text-slate-400 font-bold mb-1">Per Person Daily</div>
                  <div className="text-lg sm:text-xl font-black text-white">
                    ₹{perDayPerPersonCost.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-slate-500">per person / day</div>
                </div>

                <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-[#0E1422] border border-white/5">
                  <div className="text-[11px] text-slate-400 font-bold mb-1">Budget Health</div>
                  <div className={`text-sm sm:text-base font-black ${isBudgetGenerous ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {isBudgetGenerous ? '✓ Well Balanced' : '⚡ Smart Budget Mode'}
                  </div>
                  <div className="text-[10px] text-slate-500">Guaranteed within limit</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: PREFERENCES */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in relative z-10">
            <div>
              <span className="text-[10px] uppercase font-black text-accent-cyan tracking-wider">Step 4 of 4</span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">Preferences & Vibe</h3>
              <p className="text-xs text-slate-400 mt-0.5">Customize lodging types, meal styles, and the themes of attractions you want to experience.</p>
            </div>

            {/* Accommodation */}
            <div>
              <label className="text-xs font-bold text-slate-200 block mb-2">
                Accommodation Preference
                <Tooltip text="Dormitory (TTD/hostels) suits low budgets; standard hotels provide private rooms; luxury offers 5-star resorts." />
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {ACCOMMODATIONS.map((acc) => {
                  const isSelected = accommodationPreference === acc.id;
                  return (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => setAccommodationPreference(acc.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'border-accent-primary bg-[#1A2438] text-white shadow-glow-primary ring-1 ring-accent-primary'
                          : 'border-white/5 bg-[#0E1422] text-slate-400 hover:border-white/15 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-white">{acc.label}</span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-accent-cyan shadow-glow-cyan" />}
                      </div>
                      <div className="text-[11px] text-slate-400 leading-snug">{acc.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Food Preference */}
            <div>
              <label className="text-xs font-bold text-slate-200 block mb-2">
                Food Preference
                <Tooltip text="Pure veg emphasizes temple annadanam, regional thalis, and pure-veg tiffin spots." />
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {FOOD_PREFERENCES.map((food) => {
                  const isSelected = foodPreference === food.id;
                  return (
                    <button
                      key={food.id}
                      type="button"
                      onClick={() => setFoodPreference(food.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-accent-primary bg-[#1A2438] text-white shadow-glow-primary ring-1 ring-accent-primary'
                          : 'border-white/5 bg-[#0E1422] text-slate-400 hover:border-white/15 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white">{food.label}</span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-accent-cyan shadow-glow-cyan" />}
                      </div>
                      <div className="text-[11px] text-slate-400 leading-snug">{food.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Travel Interests (Multi-select) */}
            <div>
              <label className="text-xs font-bold text-slate-200 block mb-2">
                Travel Interests (Select all that inspire you)
                <Tooltip text="We pick attractions matching these themes (e.g. temples, waterfalls, shopping markets)." />
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {INTEREST_OPTIONS.map((item) => {
                  const isSelected = interests.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleInterest(item.id)}
                      className={`p-3 rounded-2xl border text-xs font-bold transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'border-accent-primary bg-gradient-to-r from-accent-primary to-accent-cyan text-white shadow-md'
                          : 'border-white/5 bg-[#0E1422] text-slate-300 hover:border-white/15 hover:text-white'
                      }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-3 relative z-10">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-5 py-3 rounded-2xl bg-[#0E1422] hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold border border-white/10 transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenTour}
              className="text-xs text-accent-cyan hover:underline font-bold flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Need help? Open 5-Step Tour</span>
            </button>
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-accent-primary to-accent-cyan hover:from-accent-hover hover:to-accent-cyan text-white font-extrabold text-xs shadow-lg shadow-accent-primary/25 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Next: {stepsMeta[currentStep].title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleGenerate}
              className="px-9 py-4 rounded-2xl bg-gradient-to-r from-accent-primary via-accent-cyan to-accent-highlight hover:opacity-95 text-white font-black text-sm shadow-xl shadow-accent-primary/30 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 shimmer-dark-btn"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Generate My Itinerary ✈️</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
