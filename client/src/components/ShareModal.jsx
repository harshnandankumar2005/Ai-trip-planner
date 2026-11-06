import React, { useState } from 'react';
import { X, Copy, Check, Share2, MessageCircle, Send } from 'lucide-react';

export default function ShareModal({ isOpen, onClose, trip }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  if (!isOpen || !trip) return null;

  const destination = trip.tripSummary?.destination || trip.destination || 'My Trip';
  const days = trip.tripSummary?.days || trip.days || 3;
  const budget = trip.tripSummary?.totalBudget || trip.totalBudget || 8000;
  const start = trip.tripSummary?.startingLocation || trip.startingLocation || 'Home';

  const shareUrl = window.location.href;
  const shareText = `Check out my ${days}-day AI trip plan to ${destination} from ${start} within ₹${budget.toLocaleString('en-IN')} created on TripWise! ✈️`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopySummary = () => {
    const summaryText = `🎒 TripWise Itinerary: ${destination} (${days} Days)
From: ${start}
Budget: ₹${budget.toLocaleString('en-IN')}
Travel Mode: ${trip.tripSummary?.travelMode || 'Train'}

Day Highlights:
${(trip.itinerary || []).map(d => `• Day ${d.day}: ${d.title} (Est: ₹${d.estimatedDailyCost})`).join('\n')}

Plan created with TripWise AI Smart Trip Planner.`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`;
    window.open(url, '_blank');
  };

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `TripWise: ${days}-Day ${destination} Itinerary`,
        text: shareText,
        url: shareUrl,
      }).catch(() => {});
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-sky-100 text-brand-600 rounded-xl">
              <Share2 className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-navy-800">Share Itinerary</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          Share your customized travel plan to <strong>{destination}</strong> with your travel buddies and family.
        </p>

        {/* Quick Share Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition border border-emerald-200 text-xs font-semibold"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleTwitter}
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition border border-slate-200 text-xs font-semibold"
          >
            <Send className="w-4 h-4 text-slate-600" />
            <span>Twitter / X</span>
          </button>
        </div>

        {/* Copy Link input */}
        <div>
          <label className="text-xs font-medium text-slate-700 block mb-1.5">Trip Link</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-600 outline-none select-all"
            />
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-2 rounded-xl bg-brand-600 text-white hover:bg-brand-700 text-xs font-medium transition flex items-center gap-1.5 shrink-0"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Copy Summary text */}
        <div className="pt-2 border-t border-slate-100">
          <button
            onClick={handleCopySummary}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition flex items-center justify-center gap-2"
          >
            {copiedSummary ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copiedSummary ? 'Summary Copied to Clipboard!' : 'Copy Full Text Summary'}</span>
          </button>
        </div>

        {typeof navigator !== 'undefined' && navigator.share && (
          <button
            onClick={handleNativeShare}
            className="w-full py-2.5 px-4 rounded-xl bg-brand-50 text-brand-700 hover:bg-brand-100 text-xs font-semibold transition"
          >
            More System Share Options...
          </button>
        )}
      </div>
    </div>
  );
}
