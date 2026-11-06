import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  destination: {
    type: String,
    required: true,
  },
  startingLocation: {
    type: String,
    required: true,
  },
  departureDate: {
    type: String,
    required: true,
  },
  days: {
    type: Number,
    required: true,
  },
  travellers: {
    type: Number,
    required: true,
  },
  totalBudget: {
    type: Number,
    required: true,
  },
  travelMode: {
    type: String,
    required: true,
  },
  accommodationPreference: {
    type: String,
    required: true,
  },
  foodPreference: {
    type: String,
    required: true,
  },
  interests: {
    type: [String],
    default: [],
  },
  itinerary: {
    type: Array,
    required: true,
  },
  budgetBreakdown: {
    type: Object,
    required: true,
  },
  mapLocations: {
    type: Array,
    default: [],
  },
  transportationAdvice: {
    type: String,
  },
  stayAdvice: {
    type: String,
  },
  foodAdvice: {
    type: String,
  },
  budgetAdvice: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Trip = mongoose.model('Trip', tripSchema);
