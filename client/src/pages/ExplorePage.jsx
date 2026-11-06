import React, { useState } from 'react';
import {
  Compass,
  Search,
  Filter,
  MapPin,
  Calendar,
  IndianRupee,
  Star,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useTrip } from '../context/TripContext';

const ALL_DESTINATIONS = [
  {
    id: 'tirupati',
    name: 'Tirupati & Tirumala',
    state: 'Andhra Pradesh',
    category: 'Spiritual',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    description: 'The sacred abode of Lord Sri Venkateswara on the holy Tirumala hills, Kapila Theertham waterfall, and Vijayanagara heritage.',
    topSpots: ['Tirumala Temple', 'Kapila Theertham', 'Silathoranam', 'Padmavathi Temple'],
    days: 3,
    budgetNum: 8000,
    budgetRange: '₹8,000 - ₹14,000',
    bestTime: 'September to March',
    startingLocation: 'Guntur',
    travelMode: 'Train',
    accommodationPreference: 'Dormitory',
    foodPreference: 'Vegetarian',
    interests: ['Religious', 'Historical']
  },
  {
    id: 'goa',
    name: 'Goa Coastal Getaway',
    state: 'Goa',
    category: 'Beaches',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    description: 'Sun-drenched beaches, Portuguese colonial heritage in Fontainhas, beachside shacks, water adventures, and lively evening markets.',
    topSpots: ['Baga Beach', 'Aguada Fort', 'Fontainhas Panaji', 'Chapora Fort'],
    days: 4,
    budgetNum: 16000,
    budgetRange: '₹14,000 - ₹24,000',
    bestTime: 'November to February',
    startingLocation: 'Mumbai',
    travelMode: 'Train',
    accommodationPreference: 'Budget',
    foodPreference: 'Both',
    interests: ['Beaches', 'Food', 'Photography']
  },
  {
    id: 'manali',
    name: 'Manali & Solang Valley',
    state: 'Himachal Pradesh',
    category: 'Mountains',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    description: 'Towering cedar pine forests, paragliding in Solang Valley, Atal Tunnel snowscapes, and tranquil wooden Hadimba temple.',
    topSpots: ['Solang Valley', 'Hadimba Temple', 'Atal Tunnel & Sissu', 'Jogini Falls'],
    days: 5,
    budgetNum: 20000,
    budgetRange: '₹18,000 - ₹30,000',
    bestTime: 'October to June',
    startingLocation: 'Delhi',
    travelMode: 'Bus',
    accommodationPreference: 'Standard',
    foodPreference: 'Vegetarian',
    interests: ['Adventure', 'Nature', 'Photography']
  },
  {
    id: 'jaipur',
    name: 'Jaipur - Royal Pink City',
    state: 'Rajasthan',
    category: 'Heritage',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    description: 'Magnificent sandstone forts, the intricately perforated Hawa Mahal, authentic Dal Baati Churma, and vibrant handicraft souks.',
    topSpots: ['Amber Fort', 'Hawa Mahal', 'City Palace', 'Nahargarh Fort'],
    days: 3,
    budgetNum: 12000,
    budgetRange: '₹10,000 - ₹18,000',
    bestTime: 'October to March',
    startingLocation: 'Delhi',
    travelMode: 'Train',
    accommodationPreference: 'Standard',
    foodPreference: 'Vegetarian',
    interests: ['Historical', 'Shopping', 'Food']
  },
  {
    id: 'kerala',
    name: 'Kerala Backwaters & Tea Hills',
    state: 'Kerala',
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    description: 'Emerald green Munnar tea slopes, serene Alleppey houseboat lagoons, spice plantations, and banana leaf Sadya feasts.',
    topSpots: ['Munnar Tea Hills', 'Alleppey Backwaters', 'Fort Kochi', 'Eravikulam'],
    days: 4,
    budgetNum: 18000,
    budgetRange: '₹16,000 - ₹26,000',
    bestTime: 'September to March',
    startingLocation: 'Bengaluru',
    travelMode: 'Train',
    accommodationPreference: 'Standard',
    foodPreference: 'Vegetarian',
    interests: ['Nature', 'Food', 'Photography']
  },
  {
    id: 'varanasi',
    name: 'Varanasi - The Eternal City',
    state: 'Uttar Pradesh',
    category: 'Spiritual',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    description: 'The ancient spiritual heart of India along the sacred Ganges, divine evening Ganga Aarti, sunrise boat rituals, and Kashi Vishwanath.',
    topSpots: ['Kashi Vishwanath', 'Dashashwamedh Aarti', 'Assi Ghat Sunrise', 'Sarnath Complex'],
    days: 3,
    budgetNum: 9000,
    budgetRange: '₹7,500 - ₹13,000',
    bestTime: 'October to March',
    startingLocation: 'Lucknow',
    travelMode: 'Train',
    accommodationPreference: 'Budget',
    foodPreference: 'Vegetarian',
    interests: ['Religious', 'Historical', 'Food']
  },
  {
    id: 'ooty',
    name: 'Ooty & Nilgiri Hills',
    state: 'Tamil Nadu',
    category: 'Mountains',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    description: 'Charming UNESCO Nilgiri toy train ride, sprawling botanical gardens, Pykara lake waterfalls, and homemade chocolate factories.',
    topSpots: ['Doddabetta Peak', 'Botanical Gardens', 'Pykara Lake', 'Toy Train'],
    days: 3,
    budgetNum: 11000,
    budgetRange: '₹10,000 - ₹17,000',
    bestTime: 'All Year Round',
    startingLocation: 'Chennai',
    travelMode: 'Train',
    accommodationPreference: 'Budget',
    foodPreference: 'Vegetarian',
    interests: ['Nature', 'Photography']
  },
  {
    id: 'puri',
    name: 'Puri & Konark Coast',
    state: 'Odisha',
    category: 'Spiritual',
    image: 'https://images.unsplash.com/photo-1600100397608-f010f443b77a?auto=format&fit=crop&w=800&q=80',
    description: 'The sacred abode of Lord Jagannath, pristine Golden Beach, UNESCO Konark Sun Temple chariot, and Chilika lake dolphin cruise.',
    topSpots: ['Jagannath Temple', 'Konark Sun Temple', 'Golden Beach', 'Chilika Lake'],
    days: 3,
    budgetNum: 8500,
    budgetRange: '₹8,000 - ₹14,000',
    bestTime: 'October to February',
    startingLocation: 'Kolkata',
    travelMode: 'Train',
    accommodationPreference: 'Budget',
    foodPreference: 'Vegetarian',
    interests: ['Religious', 'Beaches', 'Historical']
  }
];

export default function ExplorePage({ setActivePage }) {
  const { setPresetDestination } = useTrip();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Spiritual', 'Beaches', 'Mountains', 'Heritage', 'Nature'];

  const filtered = ALL_DESTINATIONS.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = selectedCategory === 'All' || d.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  const handleSelect = (dest) => {
    setPresetDestination({
      destination: dest.name.split(' ')[0],
      startingLocation: dest.startingLocation || 'Guntur',
      days: dest.days,
      totalBudget: dest.budgetNum,
      travellers: 2,
      travelMode: dest.travelMode || 'Train',
      accommodationPreference: dest.accommodationPreference || 'Budget',
      foodPreference: dest.foodPreference || 'Vegetarian',
      interests: dest.interests || ['Religious']
    });
    setActivePage('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent-primary/10 text-accent-highlight text-xs font-bold border border-accent-primary/25">
          <Compass className="w-3.5 h-3.5 text-accent-cyan" />
          <span>Curated Travel Inspirations</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Explore Top Destinations
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-medium">
          Discover verified travel routes with realistic budgets. Click any destination to customize and generate an AI itinerary.
        </p>
      </div>

      {/* Search & Filter Toolbar in Dark Theme */}
      <div className="space-y-4">
        <div className="relative flex-1 w-full max-w-2xl mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search destination, city, or state (e.g. Tirupati, Goa, Manali, Jaipur)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm rounded-2xl bg-[#141C2E] border border-white/10 text-white placeholder:text-slate-500 focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 outline-none shadow-lg"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none flex-wrap">
          <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-accent-primary to-accent-cyan text-white shadow-glow-primary'
                  : 'bg-[#141C2E] border border-white/5 text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Destinations Grid in Dark Theme */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-[#141C2E] rounded-3xl border border-white/10 p-8 space-y-3">
          <MapPin className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No destinations match your search</h3>
          <p className="text-xs text-slate-400">
            You can still plan a trip to any place in India or worldwide directly using the AI Trip Planner!
          </p>
          <button
            onClick={() => setActivePage('planner')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-primary to-accent-cyan text-white text-xs font-bold shadow-md"
          >
            Go to AI Trip Planner
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((dest) => (
            <div
              key={dest.id}
              className="bg-[#141C2E] rounded-3xl overflow-hidden border border-white/5 shadow-xl hover:border-accent-primary/40 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141C2E] via-[#141C2E]/20 to-black/40" />

                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-accent-primary/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                    {dest.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-xs text-accent-cyan font-bold block">{dest.state}</span>
                  <h3 className="text-xl font-extrabold leading-tight">{dest.name}</h3>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {dest.description}
                </p>

                {/* Top Spots tags */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Top Attractions:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.topSpots.map((spot, i) => (
                      <span key={i} className="text-[10px] px-2.5 py-0.5 rounded-lg bg-[#1A2438] text-slate-300 font-medium border border-white/5">
                        {spot}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block font-semibold uppercase">Est. Budget</span>
                    <span className="font-extrabold text-white">{dest.budgetRange}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block font-semibold uppercase">Duration</span>
                    <span className="font-extrabold text-white">{dest.days} Days</span>
                  </div>
                </div>

                <button
                  onClick={() => handleSelect(dest)}
                  className="w-full py-3 rounded-2xl bg-white/5 hover:bg-gradient-to-r hover:from-accent-primary hover:to-accent-cyan hover:text-white text-slate-200 font-bold text-xs transition flex items-center justify-center gap-1.5 border border-white/5 hover:border-transparent group-hover:shadow-glow-primary"
                >
                  <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
                  <span>Customize with AI</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
