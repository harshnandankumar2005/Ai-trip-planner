import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateFallbackItinerary, calculateBudgetBreakdown } from './fallbackGenerator.js';

export async function generateItinerary(params) {
  const apiKey = process.env.GEMINI_API_KEY;

  // If no Gemini API key is configured, return the intelligent fallback itinerary directly
  if (!apiKey || apiKey.trim() === '' || apiKey === 'your_gemini_api_key_here') {
    console.log('ℹ️ No GEMINI_API_KEY provided in environment. Using TripWise Intelligent Fallback Generator.');
    return generateFallbackItinerary(params);
  }

  try {
    console.log('🤖 Invoking Gemini API for smart itinerary generation...');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
You are TripWise, an elite travel architect and financial travel planner.
Generate a comprehensive, realistic, day-by-day travel itinerary for:
- Starting Location: ${params.startingLocation}
- Destination: ${params.destination}
- Departure Date: ${params.departureDate}
- Number of Days: ${params.days}
- Number of Travellers: ${params.travellers}
- Total Budget: ₹${params.totalBudget} (INR)
- Travel Mode: ${params.travelMode}
- Accommodation Preference: ${params.accommodationPreference}
- Food Preference: ${params.foodPreference}
- Travel Interests: ${Array.isArray(params.interests) ? params.interests.join(', ') : params.interests}

CRITICAL RULES:
1. BUDGET ENFORCEMENT: The total estimated cost of all activities, stays, meals, and transit across all days MUST NOT exceed the total budget of ₹${params.totalBudget}. If the budget is tight, suggest cost-saving choices (e.g. Dormitories, Train/Bus, subsidized food) and explain how to stay within budget.
2. DESTINATION AWARE: Mention real, authentic, iconic places, temple darshans (if religious, e.g. Tirumala Srivari Temple, Kapila Theertham for Tirupati), real local dishes, and real transit routes from ${params.startingLocation}.
3. FORMAT: You MUST return strictly valid JSON (no markdown formatting, no \`\`\`json tags, just raw JSON text) with this exact schema:

{
  "tripSummary": {
    "destination": "${params.destination}",
    "startingLocation": "${params.startingLocation}",
    "departureDate": "${params.departureDate}",
    "days": ${params.days},
    "travellers": ${params.travellers},
    "totalBudget": ${params.totalBudget},
    "travelMode": "${params.travelMode}",
    "accommodationPreference": "${params.accommodationPreference}",
    "foodPreference": "${params.foodPreference}",
    "interests": ${JSON.stringify(params.interests || [])},
    "tagline": "A compelling 1-line summary of the trip"
  },
  "transportationAdvice": "Detailed travel route advice from ${params.startingLocation} to ${params.destination} via ${params.travelMode}",
  "stayAdvice": "Specific hotel/dormitory names and recommendations fitting ${params.accommodationPreference}",
  "foodAdvice": "Specific regional dishes and restaurant recommendations for ${params.foodPreference} food",
  "budgetAdvice": "Practical tips on keeping expenses within the ₹${params.totalBudget} budget",
  "itinerary": [
    {
      "day": 1,
      "date": "Formatted Date e.g. Sat, Nov 15",
      "title": "Engaging theme for Day 1",
      "morning": ["Point 1", "Point 2"],
      "afternoon": ["Point 1", "Point 2"],
      "evening": ["Point 1", "Point 2"],
      "places": [
        {
          "name": "Specific Attraction Name",
          "day": 1,
          "timeOfDay": "morning",
          "lat": 13.6833,
          "lng": 79.3472,
          "duration": "2 - 3 hours",
          "description": "Engaging 1-2 sentence description",
          "navigationUrl": "https://www.google.com/maps/search/?api=1&query=..."
        }
      ],
      "estimatedTravelTime": "e.g. 40 mins local travel",
      "foodRecommendation": "Dish and eatery suggestion",
      "accommodationSuggestion": "Where to stay for this day",
      "estimatedDailyCost": 2500
    }
  ],
  "mapLocations": [
    {
      "name": "Attraction Name",
      "day": 1,
      "timeOfDay": "morning",
      "lat": 13.6833,
      "lng": 79.3472,
      "duration": "2 hours",
      "description": "Highlights",
      "navigationUrl": "https://www.google.com/maps/search/?api=1&query=..."
    }
  ],
  "comparison": {
    "budgetPlan": {
      "tier": "Smart Budget",
      "totalCost": 7500,
      "travelMode": "Train/Bus",
      "stayType": "Dormitory / Guesthouse",
      "dining": "Local Bhojanam / Street specialities",
      "highlights": "Budget-optimized itinerary with maximum cultural immersion"
    },
    "luxuryPlan": {
      "tier": "Luxury Comfort",
      "totalCost": 22000,
      "travelMode": "Chauffeur Driven AC Sedan / Flight",
      "stayType": "4-5 Star Luxury Resort",
      "dining": "Fine dining & curated multi-course meals",
      "highlights": "VIP Darshan, private tour guide, luxury wellness stays"
    }
  }
}
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Clean JSON if needed
    const cleanedJson = responseText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    const parsed = JSON.parse(cleanedJson);

    // Calculate or sanitize budget breakdown to ensure mathematical consistency
    const budgetBreakdown = calculateBudgetBreakdown({
      totalBudget: params.totalBudget,
      days: params.days,
      travellers: params.travellers,
      travelMode: params.travelMode,
      accommodationPreference: params.accommodationPreference,
      foodPreference: params.foodPreference
    });

    parsed.budgetBreakdown = budgetBreakdown;
    console.log('✅ Gemini API generated itinerary successfully!');
    return parsed;
  } catch (error) {
    console.warn('⚠️ Gemini API error or parsing failed:', error.message);
    console.log('🔄 Engaging TripWise Intelligent Fallback Generator...');
    return generateFallbackItinerary(params);
  }
}
