// Test suite for TripWise API & Generation Engine
import http from 'http';
import { generateItinerary } from './services/geminiService.js';
import { fileDb } from './services/storageService.js';
import bcrypt from 'bcryptjs';

async function runTests() {
  console.log('🧪 Running TripWise Verification Tests...\n');

  // Test 1: Fallback / AI Generator with user prompt benchmark:
  console.log('Test 1: Benchmark Itinerary (Guntur -> Tirupati, 3 days, 2 people, ₹8,000 budget)');
  const plan = await generateItinerary({
    startingLocation: 'Guntur',
    destination: 'Tirupati',
    departureDate: '2026-11-15',
    days: 3,
    travellers: 2,
    totalBudget: 8000,
    travelMode: 'Train',
    accommodationPreference: 'Dormitory',
    foodPreference: 'Vegetarian',
    interests: ['Religious', 'Historical']
  });

  if (!plan || !plan.itinerary || plan.itinerary.length !== 3) {
    throw new Error('❌ Failed: Itinerary does not contain 3 days.');
  }
  console.log(`✅ Itinerary Days: ${plan.itinerary.length}`);

  if (plan.budgetBreakdown.totalEstimated > 8000) {
    throw new Error(`❌ Failed: Estimated cost ₹${plan.budgetBreakdown.totalEstimated} exceeds budget ₹8,000!`);
  }
  console.log(`✅ Budget Constraint: Total Estimated ₹${plan.budgetBreakdown.totalEstimated} <= ₹8,000`);

  if (!plan.mapLocations || plan.mapLocations.length < 3) {
    throw new Error('❌ Failed: Map locations missing or insufficient.');
  }
  console.log(`✅ Map Locations: ${plan.mapLocations.length} locations with GPS coordinates.`);

  // Test 2: Storage & Auth persistence
  console.log('\nTest 2: User Registration & Persistence');
  const testEmail = `test_${Date.now()}@tripwise.com`;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash('secret123', salt);
  const createdUser = fileDb.createUser({
    name: 'Test Traveler',
    email: testEmail,
    password: hash
  });
  console.log(`✅ User created: ${createdUser.email} (ID: ${createdUser._id})`);

  const fetchedUser = fileDb.findUserByEmail(testEmail);
  if (!fetchedUser || fetchedUser.email !== testEmail) {
    throw new Error('❌ Failed: User could not be retrieved from DB.');
  }
  console.log('✅ User lookup by email verified.');

  // Test 3: Trip Saving & Retrieval
  console.log('\nTest 3: Save Trip & Retrieval');
  const savedTrip = fileDb.saveTrip(createdUser._id, {
    destination: 'Tirupati & Tirumala',
    startingLocation: 'Guntur',
    days: 3,
    travellers: 2,
    totalBudget: 8000,
    itinerary: plan.itinerary,
    budgetBreakdown: plan.budgetBreakdown,
    mapLocations: plan.mapLocations
  });
  console.log(`✅ Trip saved with ID: ${savedTrip._id}`);

  const userTrips = fileDb.getUserTrips(createdUser._id);
  if (userTrips.length !== 1 || userTrips[0]._id !== savedTrip._id) {
    throw new Error('❌ Failed: Saved trip not found in user trips list.');
  }
  console.log(`✅ User trips retrieved: ${userTrips.length} trip found.`);

  // Test 4: Delete Trip
  const deleted = fileDb.deleteTrip(savedTrip._id, createdUser._id);
  if (!deleted) {
    throw new Error('❌ Failed to delete trip.');
  }
  const remainingTrips = fileDb.getUserTrips(createdUser._id);
  if (remainingTrips.length !== 0) {
    throw new Error('❌ Failed: Trip was not deleted.');
  }
  console.log('✅ Trip deletion verified.');

  console.log('\n🎉 ALL VERIFICATION TESTS PASSED SUCCESSFULLY!');
}

runTests().catch(err => {
  console.error('Test Suite Failed:', err);
  process.exit(1);
});
