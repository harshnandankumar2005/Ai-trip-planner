import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Sparkles,
  BookmarkCheck,
  User,
  LogOut,
  Menu,
  X,
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTrip } from '../context/TripContext';

export default function Navbar({ activePage, setActivePage, onOpenTour }) {
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const { savedTrips } = useTrip();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'explore', label: 'Explore Destinations' },
    { id: 'planner', label: 'AI Trip Planner', badge: 'AI' },
    { id: 'my-trips', label: 'My Trips', count: savedTrips.length },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#080B14]/85 backdrop-blur-xl border-b border-white/10 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo with Glow */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-accent-primary via-accent-cyan to-accent-highlight text-white flex items-center justify-center shadow-lg shadow-accent-primary/25 group-hover:scale-105 group-hover:shadow-glow-primary transition-all duration-300">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black text-white tracking-tight">
                Trip<span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-highlight">Wise</span>
              </span>
              <span className="px-1.5 py-0.5 bg-gradient-to-r from-accent-primary to-accent-cyan text-white text-[9px] font-black rounded-md tracking-wider shadow-xs">
                AI
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-bold tracking-wider -mt-0.5">SMART TRAVEL PLANNER</p>
          </div>
        </div>

        {/* Desktop Navigation with Pill Active Indicator */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#0E1422] p-1.5 rounded-2xl border border-white/5 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 relative flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white bg-[#1A2438] border border-accent-primary/40 shadow-glow-primary font-black'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.2 bg-gradient-to-r from-accent-primary to-accent-cyan text-white text-[9px] font-black rounded-full">
                    {item.badge}
                  </span>
                )}
                {typeof item.count === 'number' && item.count > 0 && (
                  <span className="w-4 h-4 rounded-full bg-accent-cyan text-slate-950 text-[10px] font-black flex items-center justify-center shadow-xs">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA / Auth controls */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Interactive Onboarding Tour button */}
          <button
            onClick={onOpenTour}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold transition border border-white/10"
            title="Take a 1-minute guided tour"
          >
            <HelpCircle className="w-3.5 h-3.5 text-accent-cyan" />
            <span>Tour</span>
          </button>

          <button
            onClick={() => handleNavClick('planner')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1A2438] hover:bg-[#202c44] text-white text-xs font-bold transition-all border border-white/10 hover:border-accent-primary/50 hover:scale-[1.02] active:scale-95"
          >
            <PlusCircle className="w-3.5 h-3.5 text-accent-cyan" />
            <span>New Trip</span>
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200 bg-[#0E1422] px-3 py-1.5 rounded-xl border border-white/10">
                <span className="w-6 h-6 rounded-lg bg-gradient-to-tr from-accent-primary to-accent-cyan text-white flex items-center justify-center text-xs font-black uppercase">
                  {user?.name ? user.name[0] : 'U'}
                </span>
                <span className="max-w-[100px] truncate">{user?.name}</span>
              </div>
              <button
                onClick={logout}
                title="Log out"
                className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-950/30 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-accent-primary to-accent-cyan hover:from-accent-hover hover:to-accent-cyan text-white text-xs font-black shadow-lg shadow-accent-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          {typeof savedTrips.length === 'number' && savedTrips.length > 0 && (
            <button
              onClick={() => handleNavClick('my-trips')}
              className="relative p-2 text-slate-300"
            >
              <BookmarkCheck className="w-5 h-5 text-accent-cyan" />
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-accent-primary text-white text-[9px] font-black flex items-center justify-center">
                {savedTrips.length}
              </span>
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-300 hover:bg-white/5 transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0E1422] border-b border-white/10 px-4 pt-2 pb-6 space-y-3 animate-fade-in shadow-2xl">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between ${
                  activePage === item.id
                    ? 'bg-[#1A2438] text-white border border-accent-primary/40 font-black'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span>{item.label}</span>
                {item.count ? (
                  <span className="px-2 py-0.5 rounded-full bg-accent-cyan text-slate-950 text-[10px] font-black">
                    {item.count} saved
                  </span>
                ) : null}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTour();
              }}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs border border-white/10 flex items-center justify-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4 text-accent-cyan" />
              <span>Take Guided Tour</span>
            </button>

            <button
              onClick={() => handleNavClick('planner')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-accent-primary to-accent-cyan text-white font-black text-xs shadow-md"
            >
              ⚡ Plan New Trip
            </button>

            {isAuthenticated ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#141C2E] border border-white/10">
                <div className="text-xs">
                  <div className="font-bold text-white">{user?.name}</div>
                  <div className="text-slate-400 text-[11px]">{user?.email}</div>
                </div>
                <button
                  onClick={logout}
                  className="px-3 py-1.5 text-xs text-red-400 font-bold bg-red-950/40 rounded-lg hover:bg-red-900/40"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="w-full py-2.5 rounded-xl border border-white/10 bg-[#141C2E] text-white font-bold text-xs"
              >
                Sign In / Join
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
