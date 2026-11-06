import React, { useState } from 'react';
import {
  Sun,
  Sunset,
  Moon,
  Clock,
  MapPin,
  Utensils,
  Hotel,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  IndianRupee,
  Navigation
} from 'lucide-react';

export default function ItineraryDayCard({ dayPlan, destination = '', defaultExpanded = true }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (!dayPlan) return null;

  const {
    day = 1,
    date = '',
    title = '',
    morning = [],
    afternoon = [],
    evening = [],
    places = [],
    estimatedTravelTime = '',
    foodRecommendation = '',
    accommodationSuggestion = '',
    estimatedDailyCost = 0
  } = dayPlan;

  return (
    <div className="bg-[#141C2E] rounded-3xl shadow-xl border border-white/10 overflow-hidden transition-all duration-200 hover:border-accent-primary/40">
      {/* Card Header (Collapsible toggle) */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-5 sm:p-6 cursor-pointer bg-[#0E1422]/70 hover:bg-[#0E1422] transition flex items-center justify-between border-b border-white/5 select-none"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-accent-primary to-accent-cyan text-white flex flex-col items-center justify-center font-bold shadow-glow-primary">
            <span className="text-[9px] tracking-wider uppercase opacity-85 leading-none">Day</span>
            <span className="text-xl leading-tight font-black">{day}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-accent-cyan uppercase tracking-wider">
                {date || `Day ${day}`}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <IndianRupee className="w-3 h-3" />
                Est. ₹{estimatedDailyCost.toLocaleString('en-IN')}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white line-clamp-1 mt-0.5">{title}</h3>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="hidden sm:inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-slate-300">
            {places.length} {places.length === 1 ? 'Attraction' : 'Attractions'}
          </span>
          <button
            type="button"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition"
            aria-label="Toggle details"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5 text-accent-cyan" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-5 sm:p-7 space-y-6">
          {/* Vertical Timeline of Day Activities */}
          <div className="space-y-4">
            {/* Morning */}
            {morning && morning.length > 0 && (
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-xs">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div className="w-0.5 flex-1 bg-amber-500/20 my-1" />
                </div>
                <div className="flex-1 pb-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 mb-2">
                    Morning (07:00 AM – 12:00 PM)
                  </h4>
                  <ul className="space-y-2">
                    {morning.map((act, i) => (
                      <li key={i} className="text-xs text-slate-200 leading-relaxed flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Afternoon */}
            {afternoon && afternoon.length > 0 && (
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-accent-cyan/15 border border-accent-cyan/30 text-accent-cyan flex items-center justify-center shadow-xs">
                    <Sunset className="w-4 h-4" />
                  </div>
                  <div className="w-0.5 flex-1 bg-accent-cyan/20 my-1" />
                </div>
                <div className="flex-1 pb-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-accent-cyan mb-2">
                    Afternoon (12:00 PM – 05:00 PM)
                  </h4>
                  <ul className="space-y-2">
                    {afternoon.map((act, i) => (
                      <li key={i} className="text-xs text-slate-200 leading-relaxed flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan mt-1.5 shrink-0" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Evening */}
            {evening && evening.length > 0 && (
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-accent-primary/20 border border-accent-primary/40 text-accent-highlight flex items-center justify-center shadow-xs">
                    <Moon className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-black uppercase tracking-wider text-accent-highlight mb-2">
                    Evening & Night (05:00 PM Onwards)
                  </h4>
                  <ul className="space-y-2">
                    {evening.map((act, i) => (
                      <li key={i} className="text-xs text-slate-200 leading-relaxed flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-primary mt-1.5 shrink-0" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Key Attractions Cards */}
          {places && places.length > 0 && (
            <div className="border-t border-white/5 pt-5">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-accent-cyan" />
                Key Attractions on Day {day}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {places.map((place, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#1A2438] border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="text-xs font-bold text-white line-clamp-1">
                          {place.name}
                        </span>
                        {place.duration && (
                          <span className="text-[10px] bg-[#0E1422] border border-white/10 text-slate-300 px-2 py-0.5 rounded-md shrink-0 flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5 text-accent-cyan" />
                            {place.duration}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                        {place.description}
                      </p>
                    </div>

                    <a
                      href={place.navigationUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + destination)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-accent-cyan hover:text-accent-highlight transition"
                    >
                      <Navigation className="w-3 h-3" />
                      Get Directions ↗
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Travel time, Food & Stay Notes Footer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-white/5 pt-5 text-xs">
            {estimatedTravelTime && (
              <div className="p-3.5 rounded-2xl bg-[#0E1422] border border-white/5 text-slate-300 flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white mb-0.5">Estimated Transit</div>
                  <div className="text-[11px] text-slate-400 leading-snug">{estimatedTravelTime}</div>
                </div>
              </div>
            )}

            {foodRecommendation && (
              <div className="p-3.5 rounded-2xl bg-[#0E1422] border border-white/5 text-slate-300 flex items-start gap-2.5">
                <Utensils className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white mb-0.5">Food Recommendation</div>
                  <div className="text-[11px] text-slate-400 leading-snug line-clamp-2">{foodRecommendation}</div>
                </div>
              </div>
            )}

            {accommodationSuggestion && (
              <div className="p-3.5 rounded-2xl bg-[#0E1422] border border-white/5 text-slate-300 flex items-start gap-2.5">
                <Hotel className="w-4 h-4 text-accent-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white mb-0.5">Lodging Suggestion</div>
                  <div className="text-[11px] text-slate-400 leading-snug line-clamp-2">{accommodationSuggestion}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
