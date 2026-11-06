import React from 'react';
import {
  Wallet,
  CheckCircle2,
  AlertTriangle,
  Bus,
  Hotel,
  Utensils,
  Camera,
  ShoppingBag,
  ShieldAlert,
  Users,
  Calendar,
  Sparkles,
  PieChart
} from 'lucide-react';

export default function BudgetBreakdown({ budgetData, travellers = 2, days = 3 }) {
  if (!budgetData) return null;

  const {
    totalBudget = 0,
    totalEstimated = 0,
    costPerPerson = 0,
    dailyAverage = 0,
    remaining = 0,
    utilization = 0,
    isSufficient = true,
    advice = '',
    categories = {}
  } = budgetData;

  const categoryConfigs = [
    {
      key: 'transportation',
      label: 'Transportation',
      icon: Bus,
      color: 'bg-sky-400',
      textColor: 'text-sky-400',
      lightBg: 'bg-sky-500/10',
      borderColor: 'border-sky-500/20',
    },
    {
      key: 'accommodation',
      label: 'Accommodation',
      icon: Hotel,
      color: 'bg-indigo-400',
      textColor: 'text-indigo-400',
      lightBg: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
    },
    {
      key: 'food',
      label: 'Food & Dining',
      icon: Utensils,
      color: 'bg-amber-400',
      textColor: 'text-amber-400',
      lightBg: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    },
    {
      key: 'sightseeing',
      label: 'Sightseeing & Entry',
      icon: Camera,
      color: 'bg-emerald-400',
      textColor: 'text-emerald-400',
      lightBg: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
    {
      key: 'shopping',
      label: 'Shopping & Souvenirs',
      icon: ShoppingBag,
      color: 'bg-pink-400',
      textColor: 'text-pink-400',
      lightBg: 'bg-pink-500/10',
      borderColor: 'border-pink-500/20',
    },
    {
      key: 'emergency',
      label: 'Emergency Reserve',
      icon: ShieldAlert,
      color: 'bg-teal-400',
      textColor: 'text-teal-400',
      lightBg: 'bg-teal-500/10',
      borderColor: 'border-teal-500/20',
    },
  ];

  return (
    <div className="bg-[#141C2E] rounded-3xl shadow-2xl border border-white/10 p-6 sm:p-8 space-y-7 relative overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-2xl bg-gradient-to-tr from-accent-primary to-accent-cyan text-white shadow-glow-primary">
              <Wallet className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-2xl font-black text-white">Smart Budget Dashboard</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Financially optimized spending plan for {travellers} {travellers > 1 ? 'travellers' : 'traveller'} over {days} days
              </p>
            </div>
          </div>
        </div>

        {/* Utilization Circular Badge */}
        <div className="flex items-center gap-3 self-start sm:self-center p-2 rounded-2xl bg-[#0E1422] border border-white/10">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Utilization</div>
            <div className="text-xs font-black text-white">{utilization}% of ₹{totalBudget.toLocaleString('en-IN')}</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-accent-primary to-accent-cyan text-white flex items-center justify-center font-black text-xs shadow-md">
            {utilization}%
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 relative z-10">
        <div className="p-4 rounded-2xl bg-[#1A2438] border border-white/5 shadow-md">
          <div className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5 mb-1">
            <Wallet className="w-3.5 h-3.5 text-slate-400" />
            Total Estimated Cost
          </div>
          <div className="text-2xl font-black text-white">
            ₹{totalEstimated.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-400 font-bold mt-0.5 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            100% within your limit
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#1A2438] border border-white/5 shadow-md">
          <div className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5 mb-1">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            Cost Per Person
          </div>
          <div className="text-2xl font-black text-white">
            ₹{costPerPerson.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-0.5">
            for {travellers} {travellers > 1 ? 'travellers' : 'traveller'}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#1A2438] border border-white/5 shadow-md">
          <div className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5 mb-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            Daily Average Spend
          </div>
          <div className="text-2xl font-black text-white">
            ₹{dailyAverage.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-0.5">
            per day for all
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/25 shadow-md">
          <div className="text-[11px] font-bold text-emerald-300 flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Remaining Buffer
          </div>
          <div className="text-2xl font-black text-emerald-400">
            ₹{remaining.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-300 font-medium mt-0.5">
            safe unspent savings
          </div>
        </div>
      </div>

      {/* Multi-segment Progress Bar with Subtle Glow */}
      <div className="space-y-2 relative z-10">
        <div className="flex justify-between text-xs text-slate-300 font-bold">
          <span className="flex items-center gap-1.5 text-accent-cyan">
            <PieChart className="w-3.5 h-3.5" />
            Spending Distribution
          </span>
          <span className="text-slate-400">Target Budget: ₹{totalBudget.toLocaleString('en-IN')}</span>
        </div>
        <div className="h-4 w-full bg-[#0E1422] rounded-full overflow-hidden flex border border-white/5 p-0.5 shadow-inner">
          {categoryConfigs.map((cat) => {
            const catData = categories[cat.key];
            if (!catData || !catData.amount) return null;
            const pct = (catData.amount / totalBudget) * 100;
            return (
              <div
                key={cat.key}
                style={{ width: `${pct}%` }}
                className={`h-full ${cat.color} rounded-sm first:rounded-l-full last:rounded-r-full hover:opacity-85 transition-all shadow-xs`}
                title={`${cat.label}: ₹${catData.amount.toLocaleString('en-IN')} (${Math.round(pct)}%)`}
              />
            );
          })}
        </div>
      </div>

      {/* Categories Detailed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 relative z-10">
        {categoryConfigs.map((cat) => {
          const catData = categories[cat.key] || { amount: 0, percentage: 0, note: '' };
          const Icon = cat.icon;
          const pct = Math.round((catData.amount / (totalEstimated || 1)) * 100);

          return (
            <div
              key={cat.key}
              className={`p-4 rounded-2xl border ${cat.borderColor} ${cat.lightBg} flex flex-col justify-between hover:border-white/20 transition-all duration-200`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`p-2 rounded-xl bg-[#141C2E] border border-white/5 shadow-xs ${cat.textColor}`}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-bold text-white">{cat.label}</span>
                  </div>
                  <span className="text-xs font-black text-slate-200 bg-[#141C2E] px-2 py-0.5 rounded-lg border border-white/10">
                    {pct}%
                  </span>
                </div>
                <div className="text-xl font-black text-white">
                  ₹{catData.amount.toLocaleString('en-IN')}
                </div>
              </div>
              <p className="text-[11px] text-slate-300 mt-2.5 line-clamp-2 leading-relaxed font-medium">
                {catData.note}
              </p>
            </div>
          );
        })}
      </div>

      {/* AI Financial Advisory Banner */}
      <div className={`p-4 rounded-2xl border flex items-start gap-3 relative z-10 ${
        isSufficient 
          ? 'bg-[#0E1422] border-accent-primary/30 text-slate-200' 
          : 'bg-amber-950/30 border-amber-500/30 text-amber-200'
      }`}>
        {isSufficient ? (
          <CheckCircle2 className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
        ) : (
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        )}
        <div className="text-xs leading-relaxed font-medium">
          <div className="font-bold mb-0.5 text-sm text-white">
            {isSufficient ? 'TripWise Budget Guarantee' : 'Budget Optimization Notice'}
          </div>
          <div className="text-slate-300">{advice}</div>
        </div>
      </div>
    </div>
  );
}
