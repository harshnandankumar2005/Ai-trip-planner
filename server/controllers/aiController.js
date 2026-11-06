import { generateItinerary } from '../services/geminiService.js';

export const createTripPlan = async (req, res) => {
  try {
    const {
      startingLocation,
      destination,
      departureDate,
      days,
      travellers,
      totalBudget,
      travelMode,
      accommodationPreference,
      foodPreference,
      interests
    } = req.body;

    // Validate required fields
    if (!startingLocation || !destination || !days || !totalBudget) {
      return res.status(400).json({
        success: false,
        message: 'Please provide Starting Location, Destination, Days, and Total Budget.'
      });
    }

    if (parseInt(days) <= 0 || parseInt(days) > 30) {
      return res.status(400).json({
        success: false,
        message: 'Number of days must be between 1 and 30.'
      });
    }

    if (parseInt(totalBudget) < 500) {
      return res.status(400).json({
        success: false,
        message: 'Total budget must be at least ₹500.'
      });
    }

    const plan = await generateItinerary({
      startingLocation,
      destination,
      departureDate: departureDate || new Date().toISOString().split('T')[0],
      days: parseInt(days),
      travellers: parseInt(travellers) || 1,
      totalBudget: parseInt(totalBudget),
      travelMode: travelMode || 'Train',
      accommodationPreference: accommodationPreference || 'Budget',
      foodPreference: foodPreference || 'Vegetarian',
      interests: Array.isArray(interests) && interests.length > 0 ? interests : ['Sightseeing', 'Food']
    });

    res.json({
      success: true,
      data: plan
    });
  } catch (error) {
    console.error('Error generating trip plan:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate itinerary. Please try again.'
    });
  }
};
