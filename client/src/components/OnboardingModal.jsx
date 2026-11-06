import React, { useState, useEffect } from 'react';
import {
  Compass,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Wallet,
  MapPin,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Users,
  Navigation,
  Eye,
  Sliders
} from 'lucide-react';

export default function OnboardingModal({ isOpen, onClose, onStartPlanning }) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('tripwise_onboarded', 'true');
    onClose();
    if (onStartPlanning) onStartPlanning();
  };

  const handleSkip = () => {
    localStorage.setItem('tripwise_onboarded', 'true');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#141C2E] rounded-3xl border border-white/10 shadow-2xl max-w-xl w-full overflow-hidden flex flex-col relative text-slate-100">
        {/* Glow orb */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-accent-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-accent-cyan/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="p-5 border-b border-white/5 flex items-center justify-between relative z-10 bg-[#0E1422]/60">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-accent-primary to-accent-cyan text-white flex items-center justify-center font-bold text-xs shadow-md">
              <Compass className="w-4 h-4" />
            </span>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Quick Interactive Onboarding ({step}/{totalSteps})
            </div>
          </div>

          <button
            onClick={handleSkip}
            className="text-xs text-slate-400 hover:text-white transition px-2 py-1 rounded-lg hover:bg-white/5 flex items-center gap-1"
          >
            <span>Skip Tour</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#080B14] h-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent-primary via-accent-cyan to-accent-highlight transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Step Content */}
        <div className="p-6 sm:p-8 space-y-6 flex-1 relative z-10 min-h-[340px] flex flex-col justify-between">
          {/* STEP 1: Welcome Message */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in text-center my-auto">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-accent-primary via-accent-highlight to-accent-cyan text-white mx-auto flex items-center justify-center shadow-glow-primary">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 rounded-full bg-accent-primary/20 text-accent-highlight text-[11px] font-bold border border-accent-primary/30">
                  Welcome to TripWise
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Let's plan your next adventure!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  TripWise is an intelligent AI travel platform engineered to craft realistic, day-wise itineraries tailored precisely to your budget and travel preferences.
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: Briefly explain the platform */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in my-auto">
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-[10px] uppercase font-black tracking-wider text-accent-cyan">
                  How TripWise Works
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Intelligent Travel Without Overspending
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Tell us where you want to go, your budget, and travel duration. Our AI models every day with local timing, verified food, and stay recommendations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#1A2438]/80 border border-white/5 space-y-1.5">
                  <MapPin className="w-5 h-5 text-accent-cyan" />
                  <div className="text-xs font-bold text-white">1. Destination</div>
                  <div className="text-[11px] text-slate-400 leading-snug">Choose your origin, destination, and travel dates.</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#1A2438]/80 border border-white/5 space-y-1.5">
                  <Wallet className="w-5 h-5 text-accent-primary" />
                  <div className="text-xs font-bold text-white">2. Your Budget</div>
                  <div className="text-[11px] text-slate-400 leading-snug">Set your exact budget. We guarantee zero silent overspending.</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#1A2438]/80 border border-white/5 space-y-1.5">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <div className="text-xs font-bold text-white">3. AI Itinerary</div>
                  <div className="text-[11px] text-slate-400 leading-snug">Get an instant day-wise schedule with maps and transit.</div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Multi-step Smart Form Tour */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in my-auto">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black tracking-wider text-accent-highlight">
                  Multi-Step Smart Wizard
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Designed for Effortless Planning
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Instead of overwhelming you with a huge form, our planner guides you step by step with live progress:
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-[#1A2438] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-accent-primary/20 text-accent-primary flex items-center justify-center font-bold text-[11px]">1</span>
                    <span className="font-bold text-slate-200">Destination & Origin</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">Start city, end destination, dates</span>
                </div>

                <div className="p-3 rounded-xl bg-[#1A2438] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-accent-cyan/20 text-accent-cyan flex items-center justify-center font-bold text-[11px]">2</span>
                    <span className="font-bold text-slate-200">Travel Details & Mode</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">Days, travellers, Train/Bus/Flight</span>
                </div>

                <div className="p-3 rounded-xl bg-[#1A2438] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px]">3</span>
                    <span className="font-bold text-slate-200">Budget Controls</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">Interactive slider & live per-person math</span>
                </div>

                <div className="p-3 rounded-xl bg-[#1A2438] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[11px]">4</span>
                    <span className="font-bold text-slate-200">Preferences & Interests</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">Dormitory/Hotel, Veg/Non-Veg, Temples/Adventure</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Explain Tooltips and Info Icons */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in my-auto">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black tracking-wider text-accent-cyan">
                  Interactive Guidance
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Look for Tooltips & Helpful Hints
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Every field includes contextual tooltips <span className="text-accent-cyan font-bold">ℹ️</span> explaining options like TTD dormitories, sleeper train budgets, or temple darshans.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0E1422] border border-accent-primary/20 space-y-3">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>The 100% Budget Guard Promise</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  If your entered budget is tight (e.g. ₹8,000 for 2 people over 3 days), TripWise automatically allocates funds into low-cost transit (Train/Bus), subsidized dining (Annadanam/Thali), and budget stays so you never overspend.
                </p>
              </div>
            </div>
          )}

          {/* STEP 5: Sample Itinerary Preview */}
          {step === 5 && (
            <div className="space-y-4 animate-fade-in my-auto">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black tracking-wider text-emerald-400">
                  Sample Expected Output
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Tirupati 3-Day Pilgrimage (₹8,000 Budget)
                </h3>
                <p className="text-xs text-slate-300">
                  Here is what your generated itinerary looks like once you click "Generate My Itinerary":
                </p>
              </div>

              {/* Sample card preview */}
              <div className="p-4 rounded-2xl bg-[#1A2438] border border-accent-primary/30 space-y-2 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <div className="font-bold text-accent-highlight">Day 1: Arrival & Srivari Darshan</div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                    Est: ₹2,600
                  </span>
                </div>
                <div className="text-slate-300 text-[11px] space-y-1">
                  <div>☀️ <strong>Morning:</strong> Reach Tirupati via Train, check in at TTD Srinivasam dormitory.</div>
                  <div>🌤️ <strong>Afternoon:</strong> Ascent to Tirumala hills, Sri Venkateswara Swamy Temple darshan.</div>
                  <div>🌙 <strong>Evening:</strong> Srivari Laddu Prasadam, Kapila Theertham waterfall, dinner.</div>
                </div>
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span>🗺️ 6 GPS Mapped Locations</span>
                  <span>🚍 Train Transit from Guntur</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSkip}
                className="text-xs text-slate-400 hover:text-white transition"
              >
                Skip Onboarding
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-primary to-accent-cyan hover:from-accent-hover hover:to-accent-cyan text-white text-xs font-black shadow-lg shadow-accent-primary/25 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-1.5"
            >
              <span>{step === totalSteps ? "Start Planning Now ⚡" : "Next Step"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
