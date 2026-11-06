import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, MapPin, ShieldCheck, Wallet } from 'lucide-react';

const TIPS = [
  'Checking optimal transit routes & local timing...',
  'Curating authentic regional cuisines and street food spots...',
  'Calculating day-wise travel budgets to prevent overspending...',
  'Mapping landmark coordinates for interactive GPS navigation...',
  'Reviewing temple darshan timings and historical site entry passes...',
  'Reserving emergency financial buffer for peace of mind...',
  'Personalizing day-wise morning, afternoon & evening plans...'
];

export default function LoadingState({ step = '' }) {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TIPS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[500px] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl text-center space-y-6">
        {/* Animated Icon Ring */}
        <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-sky-100 animate-ping opacity-35" />
          <div className="absolute inset-0 rounded-full border-4 border-dashed border-brand-500 animate-spin" style={{ animationDuration: '6s' }} />
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-600 to-sky-400 text-white flex items-center justify-center shadow-lg transform hover:scale-105 transition">
            <Compass className="w-8 h-8 animate-pulse" />
          </div>
        </div>

        {/* Status text */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-brand-700 text-xs font-semibold mb-2 border border-sky-100">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            AI Travel Architect Working
          </div>
          <h3 className="text-xl font-extrabold text-navy-800">
            Designing Your Custom Itinerary
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {step || 'Synthesizing local attractions, transit, and budget constraints...'}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div className="bg-gradient-to-r from-brand-500 via-sky-400 to-sunset-500 h-full rounded-full animate-pulse w-3/4" />
        </div>

        {/* Rotating travel tips */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-left flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-white text-brand-600 shadow-xs shrink-0 mt-0.5">
            <MapPin className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-800 block text-[11px] uppercase tracking-wider mb-0.5">
              Live Planning Step:
            </span>
            <span>{TIPS[tipIndex]}</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 flex items-center justify-center gap-4">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-500" /> 100% Budget Guard
          </span>
          <span className="flex items-center gap-1">
            <Wallet className="w-3 h-3 text-brand-500" /> Realistic Estimates
          </span>
        </div>
      </div>
    </div>
  );
}
