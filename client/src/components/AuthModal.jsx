import React, { useState } from 'react';
import { X, Mail, Lock, User, AlertCircle, Compass, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalMode, setAuthModalMode, login, register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (authModalMode === 'register') {
        if (!name.trim()) {
          throw new Error('Please enter your full name.');
        }
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setName('');
    setEmail('traveler@tripwise.com');
    setPassword('password123');
    try {
      setLoading(true);
      setError('');
      // Try login or register
      try {
        await login('traveler@tripwise.com', 'password123');
      } catch (e) {
        await register('Demo Traveler', 'traveler@tripwise.com', 'password123');
      }
    } catch (err) {
      setError(err.message || 'Demo sign in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-400 text-white flex items-center justify-center shadow-sm">
              <Compass className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-navy-800">
                {authModalMode === 'register' ? 'Join TripWise' : 'Welcome Back'}
              </h3>
              <p className="text-xs text-slate-500">Save and sync your AI travel itineraries</p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-semibold text-slate-600">
          <button
            type="button"
            onClick={() => { setAuthModalMode('login'); setError(''); }}
            className={`py-2 rounded-lg transition ${
              authModalMode === 'login' ? 'bg-white text-navy-800 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setAuthModalMode('register'); setError(''); }}
            className={`py-2 rounded-lg transition ${
              authModalMode === 'register' ? 'bg-white text-navy-800 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {authModalMode === 'register' && (
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Your Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Harshnandan Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
              />
            </div>
            {authModalMode === 'register' && (
              <p className="text-[10px] text-slate-400 mt-1">Must be at least 6 characters long.</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-md transition disabled:opacity-60 flex items-center justify-center gap-1.5"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{authModalMode === 'register' ? 'Register Account' : 'Sign In'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Login */}
        <div className="pt-2 border-t border-slate-100 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="text-xs text-brand-600 font-semibold hover:underline"
          >
            ⚡ Click here to 1-Click Sign In with Demo Account
          </button>
          <button
            type="button"
            onClick={closeAuthModal}
            className="text-[11px] text-slate-400 hover:text-slate-600"
          >
            Continue as Guest (saves to local browser)
          </button>
        </div>
      </div>
    </div>
  );
}
