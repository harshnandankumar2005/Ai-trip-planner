import React, { useState } from 'react';
import {
  Bookmark,
  Calendar,
  Users,
  IndianRupee,
  MapPin,
  Trash2,
  ArrowRight,
  Download,
  PlusCircle,
  Clock,
  Compass
} from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';

export default function MyTripsPage({ setActivePage }) {
  const { savedTrips, setCurrentTrip, deleteTrip } = useTrip();
  const { isAuthenticated, openAuthModal, user } = useAuth();
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const handleOpenTrip = (trip) => {
    setCurrentTrip(trip);
    setActivePage('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    await deleteTrip(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent-primary/10 text-accent-highlight text-xs font-bold border border-accent-primary/25 mb-1">
            <Bookmark className="w-3.5 h-3.5 text-accent-cyan" />
            <span>Personal Travel Vault</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">My Saved Itineraries</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
            {isAuthenticated
              ? `Saved trips associated with account ${user?.email}`
              : 'Trips stored locally on your device. Sign in to sync across devices.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {!isAuthenticated && (
            <button
              onClick={() => openAuthModal('register')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#141C2E] border border-white/10 text-slate-200 hover:text-white hover:bg-[#1A2438] transition shadow-xs"
            >
              Sign In to Cloud Sync
            </button>
          )}

          <button
            onClick={() => setActivePage('planner')}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-primary to-accent-cyan hover:opacity-90 text-white text-xs font-black shadow-lg shadow-accent-primary/25 transition-all hover:scale-105 active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Plan New Trip</span>
          </button>
        </div>
      </div>

      {/* Trips Grid or Empty State in Dark Theme */}
      {savedTrips.length === 0 ? (
        <div className="text-center py-20 bg-[#141C2E] rounded-3xl border border-white/10 p-8 space-y-4 max-w-xl mx-auto shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-accent-primary/15 text-accent-cyan mx-auto flex items-center justify-center border border-accent-primary/30">
            <Compass className="w-8 h-8 animate-spin-slow" />
          </div>
          <h3 className="text-lg font-bold text-white">No Saved Trips Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            Generate your first day-by-day travel plan using our AI planner and click "Save Itinerary" to store it here.
          </p>
          <button
            onClick={() => setActivePage('planner')}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-accent-primary to-accent-cyan hover:opacity-95 text-white font-black text-xs shadow-md transition"
          >
            Start Planning Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedTrips.map((trip) => {
            const id = trip._id || trip.id;
            const dest = trip.destination || trip.tripSummary?.destination || 'Destination';
            const startLoc = trip.startingLocation || trip.tripSummary?.startingLocation || 'Origin';
            const daysCount = trip.days || trip.tripSummary?.days || (trip.itinerary ? trip.itinerary.length : 3);
            const budget = trip.totalBudget || trip.tripSummary?.totalBudget || 8000;
            const travellersCount = trip.travellers || trip.tripSummary?.travellers || 2;
            const created = trip.createdAt ? new Date(trip.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently';

            return (
              <div
                key={id}
                onClick={() => handleOpenTrip(trip)}
                className="bg-[#141C2E] rounded-3xl overflow-hidden border border-white/5 shadow-xl hover:border-accent-primary/40 transition-all duration-300 p-6 flex flex-col justify-between cursor-pointer group transform hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-accent-primary/20 text-accent-highlight text-[10px] font-black uppercase tracking-wider border border-accent-primary/30">
                      {daysCount} Days Trip
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirmId(deleteConfirmId === id ? null : id);
                      }}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/30 transition"
                      title="Delete trip"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {deleteConfirmId === id && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="mb-3 p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-xs text-red-200 space-y-2 animate-fade-in"
                    >
                      <div className="font-semibold">Delete this saved itinerary?</div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleDelete(id, e)}
                          className="px-3 py-1 bg-red-600 text-white rounded-lg text-[11px] font-bold hover:bg-red-700"
                        >
                          Confirm Delete
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="px-3 py-1 bg-white/10 text-slate-200 rounded-lg text-[11px]"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  <h3 className="text-xl font-black text-white group-hover:text-accent-cyan transition">
                    {dest}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-accent-cyan" />
                    <span>From {startLoc}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/5 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block font-semibold uppercase">Budget</span>
                      <span className="font-extrabold text-white">₹{budget.toLocaleString('en-IN')}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 block font-semibold uppercase">Travellers</span>
                      <span className="font-extrabold text-white">{travellersCount} People</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">Saved {created}</span>
                  <span className="font-bold text-accent-cyan flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>View Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
