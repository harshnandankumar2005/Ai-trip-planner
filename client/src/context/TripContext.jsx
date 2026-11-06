import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';
import { useAuth } from './AuthContext';

const TripContext = createContext(null);

export const TripProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [currentTrip, setCurrentTrip] = useState(null);
  const [savedTrips, setSavedTrips] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [error, setError] = useState(null);
  const [prefillData, setPrefillData] = useState(null);

  // Load saved trips from API or localStorage
  const loadSavedTrips = async () => {
    try {
      if (isAuthenticated && user?.id) {
        const res = await api.getTrips(user.id);
        if (res.success) {
          setSavedTrips(res.trips || []);
        }
      } else {
        const local = localStorage.getItem('tripwise_guest_trips');
        if (local) {
          setSavedTrips(JSON.parse(local));
        }
      }
    } catch (err) {
      console.error('Failed to load trips:', err);
    }
  };

  useEffect(() => {
    loadSavedTrips();
  }, [isAuthenticated, user?.id]);

  // Generate itinerary with step transitions
  const generateTrip = async (formValues) => {
    setIsGenerating(true);
    setError(null);
    setGenerationStep('Analyzing travel preferences & budget parameters...');

    const timer1 = setTimeout(() => {
      setGenerationStep('Scanning destination landmarks, temple schedules & timing...');
    }, 1200);

    const timer2 = setTimeout(() => {
      setGenerationStep('Optimizing day-wise route order & local transit times...');
    }, 2400);

    const timer3 = setTimeout(() => {
      setGenerationStep('Balancing expenses and calculating contingency buffer...');
    }, 3600);

    try {
      const res = await api.generatePlan(formValues);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);

      if (res.success && res.data) {
        setCurrentTrip(res.data);
        // Persist latest generated trip in session
        sessionStorage.setItem('tripwise_latest_plan', JSON.stringify(res.data));
        return res.data;
      } else {
        throw new Error(res.message || 'Failed to generate itinerary');
      }
    } catch (err) {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      setError(err.message || 'Something went wrong while planning your trip.');
      throw err;
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  // Save current trip to account / local database
  const saveTrip = async (tripToSave) => {
    const data = tripToSave || currentTrip;
    if (!data) return false;

    try {
      const tripPayload = {
        userId: user?.id || 'guest',
        destination: data.tripSummary?.destination || data.destination,
        startingLocation: data.tripSummary?.startingLocation || data.startingLocation,
        departureDate: data.tripSummary?.departureDate || data.departureDate,
        days: data.tripSummary?.days || data.days,
        travellers: data.tripSummary?.travellers || data.travellers,
        totalBudget: data.tripSummary?.totalBudget || data.totalBudget,
        travelMode: data.tripSummary?.travelMode || data.travelMode,
        accommodationPreference: data.tripSummary?.accommodationPreference || data.accommodationPreference,
        foodPreference: data.tripSummary?.foodPreference || data.foodPreference,
        interests: data.tripSummary?.interests || data.interests || [],
        itinerary: data.itinerary,
        budgetBreakdown: data.budgetBreakdown,
        mapLocations: data.mapLocations || [],
        comparison: data.comparison || {},
        transportationAdvice: data.transportationAdvice || '',
        stayAdvice: data.stayAdvice || '',
        foodAdvice: data.foodAdvice || '',
        budgetAdvice: data.budgetAdvice || '',
      };

      if (isAuthenticated) {
        const res = await api.saveTrip(tripPayload);
        if (res.success) {
          await loadSavedTrips();
          return true;
        }
      } else {
        // Save as guest in localStorage
        const guestTrip = {
          _id: 'guest_' + Date.now(),
          ...tripPayload,
          createdAt: new Date().toISOString()
        };
        const currentList = JSON.parse(localStorage.getItem('tripwise_guest_trips') || '[]');
        const updated = [guestTrip, ...currentList];
        localStorage.setItem('tripwise_guest_trips', JSON.stringify(updated));
        setSavedTrips(updated);
        return true;
      }
    } catch (err) {
      console.error('Failed to save trip:', err);
      return false;
    }
  };

  // Delete trip
  const deleteTrip = async (id) => {
    try {
      if (isAuthenticated) {
        await api.deleteTrip(id);
      }
      // Also update local list
      const filtered = savedTrips.filter(t => (t._id !== id && t.id !== id));
      setSavedTrips(filtered);
      localStorage.setItem('tripwise_guest_trips', JSON.stringify(filtered));
      return true;
    } catch (err) {
      console.error('Failed to delete trip:', err);
      return false;
    }
  };

  // Prefill planner with destination preset
  const setPresetDestination = (destData) => {
    setPrefillData(destData);
  };

  return (
    <TripContext.Provider
      value={{
        currentTrip,
        setCurrentTrip,
        savedTrips,
        isGenerating,
        generationStep,
        error,
        setError,
        prefillData,
        setPrefillData,
        setPresetDestination,
        generateTrip,
        saveTrip,
        deleteTrip,
        loadSavedTrips,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};
