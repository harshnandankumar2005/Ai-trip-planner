import React from 'react';
import { Compass, Heart, Shield, Sparkles, MapPin, ExternalLink } from 'lucide-react';

export default function Footer({ setActivePage }) {
  const quickLinks = [
    { label: 'Tirupati (3-Day Spiritual)', preset: { destination: 'Tirupati', days: 3, budget: 8000, travellers: 2, interests: ['Religious', 'Historical'] } },
    { label: 'Goa (4-Day Beaches)', preset: { destination: 'Goa', days: 4, budget: 15000, travellers: 2, interests: ['Beaches', 'Food'] } },
    { label: 'Manali (5-Day Mountain)', preset: { destination: 'Manali', days: 5, budget: 20000, travellers: 2, interests: ['Adventure', 'Nature'] } },
    { label: 'Jaipur (3-Day Royal Heritage)', preset: { destination: 'Jaipur', days: 3, budget: 12000, travellers: 2, interests: ['Historical', 'Photography'] } },
  ];

  return (
    <footer className="bg-navy-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-sky-500 to-sunset-500 text-white flex items-center justify-center shadow-lg">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">Trip<span className="text-sky-400">Wise</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              TripWise is an intelligent AI travel companion that generates realistic day-by-day itineraries with accurate local transport, hotel suggestions, and 100% budget precision.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-800/60 px-3 py-1.5 rounded-xl w-fit">
              <Shield className="w-3.5 h-3.5" />
              <span>Zero Silent Overspend Guarantee</span>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition">Home</button>
              </li>
              <li>
                <button onClick={() => { setActivePage('explore'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition">Explore Top Destinations</button>
              </li>
              <li>
                <button onClick={() => { setActivePage('planner'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition">AI Smart Trip Planner</button>
              </li>
              <li>
                <button onClick={() => { setActivePage('my-trips'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition">Saved Itineraries</button>
              </li>
            </ul>
          </div>

          {/* Quick Presets */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Popular Itineraries</h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => {
                      setActivePage('planner');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-sky-400 transition text-left flex items-center gap-1.5"
                  >
                    <MapPin className="w-3 h-3 text-brand-500" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Engine & Technology</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Powered by Google Gemini API, React 19, Leaflet OpenStreetMap, Tailwind CSS, and Express.js with resilient file & MongoDB storage.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Gemini AI', 'React Vite', 'Leaflet', 'Tailwind', 'Node.js', 'MongoDB'].map((tech) => (
                <span key={tech} className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-300 font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} TripWise – AI Smart Trip Planner. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with precision for travelers worldwide</span>
            <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
