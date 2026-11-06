import React from 'react';
import { X, Check, Sparkles, Shield, IndianRupee, Compass, Award } from 'lucide-react';

export default function TripComparisonModal({ isOpen, onClose, comparison, currentBudget = 0 }) {
  if (!isOpen || !comparison) return null;

  const { budgetPlan, luxuryPlan } = comparison;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-brand-100 text-brand-600 rounded-xl">
              <Compass className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-navy-800">Compare Travel Styles</h3>
              <p className="text-xs text-slate-500">Smart Budget Plan vs. Premium Luxury Experience</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content - Side by Side Cards */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Smart Budget Plan */}
            <div className="p-5 rounded-2xl border-2 border-brand-500 bg-sky-50/30 flex flex-col justify-between relative shadow-sm">
              <div className="absolute -top-3 left-4 px-3 py-0.5 bg-brand-500 text-white text-[11px] font-bold rounded-full uppercase tracking-wider">
                Current Chosen Plan
              </div>
              <div>
                <div className="flex items-center justify-between mb-3 mt-1">
                  <h4 className="font-bold text-navy-800 text-base">{budgetPlan?.tier || 'Smart Budget Plan'}</h4>
                  <Shield className="w-4 h-4 text-brand-600" />
                </div>

                <div className="text-2xl font-black text-brand-700 mb-4 flex items-center">
                  <IndianRupee className="w-5 h-5" />
                  {budgetPlan?.totalCost?.toLocaleString('en-IN')}
                </div>

                <div className="space-y-3 text-xs text-slate-600">
                  <div className="pb-2 border-b border-sky-100">
                    <span className="font-semibold text-slate-800 block mb-0.5">Transit:</span>
                    <span>{budgetPlan?.travelMode}</span>
                  </div>

                  <div className="pb-2 border-b border-sky-100">
                    <span className="font-semibold text-slate-800 block mb-0.5">Stay Type:</span>
                    <span>{budgetPlan?.stayType}</span>
                  </div>

                  <div className="pb-2 border-b border-sky-100">
                    <span className="font-semibold text-slate-800 block mb-0.5">Dining:</span>
                    <span>{budgetPlan?.dining}</span>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-800 block mb-0.5">Key Highlights:</span>
                    <span className="leading-relaxed">{budgetPlan?.highlights}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-sky-200/60 flex items-center gap-2 text-xs text-brand-700 font-semibold">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Zero financial strain & optimal local immersion</span>
              </div>
            </div>

            {/* Luxury Comfort Plan */}
            <div className="p-5 rounded-2xl border border-amber-300 bg-amber-50/30 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-navy-800 text-base">{luxuryPlan?.tier || 'Luxury Comfort Plan'}</h4>
                  <Award className="w-4 h-4 text-amber-500" />
                </div>

                <div className="text-2xl font-black text-amber-700 mb-4 flex items-center">
                  <IndianRupee className="w-5 h-5" />
                  {luxuryPlan?.totalCost?.toLocaleString('en-IN')}
                </div>

                <div className="space-y-3 text-xs text-slate-600">
                  <div className="pb-2 border-b border-amber-100">
                    <span className="font-semibold text-slate-800 block mb-0.5">Transit:</span>
                    <span>{luxuryPlan?.travelMode}</span>
                  </div>

                  <div className="pb-2 border-b border-amber-100">
                    <span className="font-semibold text-slate-800 block mb-0.5">Stay Type:</span>
                    <span>{luxuryPlan?.stayType}</span>
                  </div>

                  <div className="pb-2 border-b border-amber-100">
                    <span className="font-semibold text-slate-800 block mb-0.5">Dining:</span>
                    <span>{luxuryPlan?.dining}</span>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-800 block mb-0.5">Key Highlights:</span>
                    <span className="leading-relaxed">{luxuryPlan?.highlights}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-amber-200/60 flex items-center gap-2 text-xs text-amber-800 font-semibold">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Premium indulgence with VIP accessibility</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition shadow-xs"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
