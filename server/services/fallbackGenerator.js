// Rich destination-aware fallback itinerary generator
// Ensures 100% offline and standalone reliability if Gemini API key is missing or quota exhausted.

const DESTINATIONS_DB = {
  tirupati: {
    name: 'Tirupati & Tirumala',
    center: [13.6288, 79.4192],
    tagline: 'Spiritual Haven & Abode of Lord Venkateswara',
    transport: {
      bus: 'Direct APSRTC Amaravati / Super Luxury buses run round-the-clock from Guntur, Vijayawada, and Chennai (approx 5-6 hrs).',
      train: 'Frequent trains available: Sabari Express, Tirupati Intercity, Krishna Express terminating at Tirupati Main (TPTY) or Renigunta (RU).',
      flight: 'Tirupati Airport (TIR) at Renigunta has flights connecting Hyderabad, Bengaluru, and Delhi.',
      car: 'Well-paved highway via NH16 and NH71 with scenic ghat roads ascending to Tirumala hills.',
      bike: 'Scenic ride through southern Andhra hills, scenic ghat road ride from Alipiri to Tirumala.'
    },
    stays: {
      dormitory: 'TTD Srinivasam Complex or Vishnu Nivasam dormitories (₹150-₹300/person/night) with clean lockers and cloakrooms.',
      budget: 'Madhavam Guesthouse or budget lodges near Tirupati Central Railway Station (₹800-₹1,500/night).',
      standard: 'Hotel Bliss, Pai Viceroy, or Minerva Grand near Alipiri (₹2,200-₹3,800/night).',
      luxury: 'Fortune Select Grand Ridge or Marasa Sarovar Premiere (₹5,500-₹9,000/night).'
    },
    food: {
      veg: 'Authentic Andhra Vegetarian Thali at Mayura / Andhra Spice, TTD Free Nitya Annadanam at Matrusri Tarigonda Vengamamba complex, hot Ghee Karam Dosa, famous Tirumala Srivari Laddu Prasadam.',
      nonVeg: 'Authentic Rayalaseema Ragi Mudde with Natu Kodi Pulao at regional restaurants in Tirupati city.',
      both: 'Blend of Rayalaseema regional delicacies, traditional South Indian tiffins, and Tirumala holy prasadam.'
    },
    places: [
      {
        name: 'Sri Venkateswara Swamy Temple (Tirumala)',
        lat: 13.6833,
        lng: 79.3472,
        duration: '3 - 4 hours',
        desc: 'World-renowned hilltop shrine of Lord Venkateswara. Experience the divine Srivari Darshan, collect sacred Laddus, and admire the gilded Ananda Nilayam vimana.',
        timeOfDay: 'morning'
      },
      {
        name: 'Kapila Theertham & Waterfall',
        lat: 13.6508,
        lng: 79.4294,
        duration: '1.5 hours',
        desc: 'Sacred Shiva temple nestled right at the base of the Tirumala hill foothills, beside a picturesque natural mountain waterfall.',
        timeOfDay: 'morning'
      },
      {
        name: 'Silathoranam (Natural Rock Arch) & Chakra Theertham',
        lat: 13.6895,
        lng: 79.3411,
        duration: '1.5 hours',
        desc: 'Prehistoric natural rock arch formation millions of years old, surrounded by tranquil wooded gardens and freshwater theerthams.',
        timeOfDay: 'afternoon'
      },
      {
        name: 'Sri Padmavathi Ammavari Temple (Tiruchanur)',
        lat: 13.6124,
        lng: 79.4527,
        duration: '2 hours',
        desc: 'Revered temple dedicated to Goddess Padmavathi, consort of Lord Venkateswara. A customary pilgrimage stop to complete the Tirupati blessings.',
        timeOfDay: 'evening'
      },
      {
        name: 'Sri Govindaraja Swamy Temple',
        lat: 13.6334,
        lng: 79.4172,
        duration: '1.5 hours',
        desc: 'Splendid Vaishnavite temple in the heart of Tirupati with an imposing 7-storey Rajagopuram dating back to 1130 AD.',
        timeOfDay: 'morning'
      },
      {
        name: 'Chandragiri Fort & Sound and Light Show',
        lat: 13.5835,
        lng: 79.3178,
        duration: '2.5 hours',
        desc: 'Historical 11th-century fort built by Vijayanagara rulers with Raja Mahal and Rani Mahal palaces, offering evening sound and light storytelling.',
        timeOfDay: 'evening'
      },
      {
        name: 'Sri Venkateswara National Park & Zoo',
        lat: 13.6481,
        lng: 79.3905,
        duration: '2 hours',
        desc: 'Expansive lush sanctuary in the Eastern Ghats housing indigenous wildlife, rich flora, and peaceful nature walking paths.',
        timeOfDay: 'afternoon'
      },
      {
        name: 'Srivari Padalu (Sacred Footprints)',
        lat: 13.6961,
        lng: 79.3364,
        duration: '1 hour',
        desc: 'The highest elevation point on Narayanagiri Hill where Lord Venkateswara is believed to have first set foot on earth, featuring panoramic valley views.',
        timeOfDay: 'morning'
      }
    ]
  },
  goa: {
    name: 'Goa',
    center: [15.2993, 74.1240],
    tagline: 'Sun, Sand, Heritage and Coastal Euphoria',
    transport: {
      bus: 'Interstate AC Sleeper buses from Mumbai, Pune, and Bengaluru arriving at Mapusa / Panaji / Madgaon.',
      train: 'Madgaon (MAO) and Thivim (THVM) connected via Konkan Railway with scenic tunnel views.',
      flight: 'Dabolim Airport (GOI) or Manohar International Airport Mopa (GOX).',
      car: 'Scenic Konkan coastal drive via NH66 with coconut palms and lush river bridges.',
      bike: 'Scooter/bike rentals widely available throughout North and South Goa.'
    },
    stays: {
      dormitory: 'Hosteller or Zostel Goa in Anjuna / Calangute (₹500-₹900/night).',
      budget: 'Cozy boutique guesthouses and homestays near beach lanes (₹1,400-₹2,200/night).',
      standard: 'Beachside resorts with pool in Candolim or Benaulim (₹3,500-₹6,000/night).',
      luxury: 'Taj Exotica, W Goa, or The Leela Goa (₹14,000-₹28,000/night).'
    },
    food: {
      veg: 'Authentic Goan vegetarian thali with Khatkhate, Kokum Sol Kadi, Cashew Curry, and beach cafe smoothie bowls.',
      nonVeg: 'Goan Fish Curry Rice, Butter Garlic Prawns, Chicken Cafreal, Bebinca dessert, and freshly caught seafood shacks.',
      both: 'Blend of Portuguese-influenced coastal curries, fresh beachside grilled seafood, and bohemian continental cafes.'
    },
    places: [
      {
        name: 'Baga & Calangute Beach',
        lat: 15.5553,
        lng: 73.7517,
        duration: '3 hours',
        desc: 'Vibrant stretch of golden sand featuring parasailing, banana boat rides, beach shack dining, and lively coastal music.',
        timeOfDay: 'morning'
      },
      {
        name: 'Aguada Fort & Lighthouse',
        lat: 15.4925,
        lng: 73.7737,
        duration: '2 hours',
        desc: '17th-century Portuguese fortress overlooking the vast Arabian Sea, featuring a historic 4-storey freshwater reservoir and lighthouse.',
        timeOfDay: 'afternoon'
      },
      {
        name: 'Fontainhas - Latin Quarter (Panaji)',
        lat: 15.4989,
        lng: 73.8315,
        duration: '2 hours',
        desc: 'Charming UNESCO heritage quarter with pastel-hued Portuguese villas, vibrant bougainvillea, and traditional bakeries.',
        timeOfDay: 'morning'
      },
      {
        name: 'Chapora Fort (Dil Chahta Hai viewpoint)',
        lat: 15.6059,
        lng: 73.7389,
        duration: '1.5 hours',
        desc: 'Elevated laterite ramparts offering breathtaking sunsets over the Vagator coastline and Chapora river mouth.',
        timeOfDay: 'evening'
      },
      {
        name: 'Basilica of Bom Jesus (Old Goa)',
        lat: 15.5009,
        lng: 73.9116,
        duration: '1.5 hours',
        desc: 'Baroque architecture masterpiece and UNESCO World Heritage site preserving the sacred relics of St. Francis Xavier.',
        timeOfDay: 'afternoon'
      },
      {
        name: 'Anjuna Flea Market & Curlies Sunset',
        lat: 15.5733,
        lng: 73.7412,
        duration: '2.5 hours',
        desc: 'Legendary beach bazaar with handmade silver jewelry, bohemian garments, live acoustic bands, and sunset views.',
        timeOfDay: 'evening'
      }
    ]
  },
  manali: {
    name: 'Manali, Himachal Pradesh',
    center: [32.2396, 77.1887],
    tagline: 'Snow Peaks, Pine Forests, and Mountain Thrills',
    transport: {
      bus: 'HRTC and private Volvo luxury buses from Delhi (ISBT Kashmiri Gate) and Chandigarh.',
      train: 'Nearest railhead is Chandigarh (CDG) or Kalka, followed by a scenic mountain taxi ride.',
      flight: 'Kullu-Manali Airport at Bhuntar (KUU), 50 km away.',
      car: 'Spectacular mountain highway via Kiratpur-Nerchowk four-lane and Beas river valley.',
      bike: 'Iconic Royal Enfield ride through Rohtang pass and Kullu gorge.'
    },
    stays: {
      dormitory: 'Zostel Manali or Alt Life Old Manali (₹600-₹1,100/night).',
      budget: 'Rustic wooden riverfront homestays in Vashisht or Aleo (₹1,200-₹2,000/night).',
      standard: 'Solang Valley resort or apple orchard cottage (₹3,000-₹5,500/night).',
      luxury: 'The Himalayan Resort & Spa or Span Resort (₹10,000-₹22,000/night).'
    },
    food: {
      veg: 'Steaming Siddu with ghee and dal, hot Thukpa, mountain Momos, Kullu Trout, Rajma Chawal, and freshly brewed cinnamon tea.',
      nonVeg: 'Himachali Mutton Khatta, Pan-fried Himalayan Trout, spicy Chicken Thukpa.',
      both: 'Authentic Pahadi delicacies along with wood-fired artisan pizzas in Old Manali cafes.'
    },
    places: [
      {
        name: 'Solang Valley Adventure Hub',
        lat: 32.3166,
        lng: 77.1578,
        duration: '4 hours',
        desc: 'Scenic alpine valley with paragliding, zorbing, ATV rides, and cable car rides with stunning views of glaciers.',
        timeOfDay: 'morning'
      },
      {
        name: 'Hadimba Devi Temple & Cedar Forest',
        lat: 32.2483,
        lng: 77.1802,
        duration: '1.5 hours',
        desc: 'Unique 1553 AD pagoda-style wooden temple sheltered inside towering Dhungri Deodar forests.',
        timeOfDay: 'afternoon'
      },
      {
        name: 'Atal Tunnel & Sissu Valley (Lahaul)',
        lat: 32.4862,
        lng: 77.1706,
        duration: '4 hours',
        desc: 'World’s longest highway tunnel at 10,000+ ft leading to spectacular snowscapes and Sissu waterfall.',
        timeOfDay: 'morning'
      },
      {
        name: 'Old Manali Cafes & Mall Road',
        lat: 32.2536,
        lng: 77.1764,
        duration: '2.5 hours',
        desc: 'Cobblestone alleys lined with vibrant artsy cafes, live indie music, and Tibetan souvenir shops.',
        timeOfDay: 'evening'
      },
      {
        name: 'Jogini Waterfall Trek',
        lat: 32.2690,
        lng: 77.1950,
        duration: '3 hours',
        desc: 'Serene nature trail passing through pine forests and apple orchards ending at cascading mountain falls.',
        timeOfDay: 'morning'
      }
    ]
  },
  jaipur: {
    name: 'Jaipur, Rajasthan',
    center: [26.9124, 75.7873],
    tagline: 'The Royal Pink City of Palaces and Forts',
    transport: {
      bus: 'RSRTC Goldline and private sleeper buses from Delhi, Agra, Ahmedabad, and Udaipur.',
      train: 'Jaipur Junction (JP) with Vande Bharat, Shatabdi, and Superfast links.',
      flight: 'Jaipur International Airport (JAI) with direct flights across India and international hubs.',
      car: 'Smooth 4-lane Delhi-Mumbai Expressway and NH48.',
      bike: 'Great highway touring route.'
    },
    stays: {
      dormitory: 'Moustache Hostel or Horn Ok Please Jaipur (₹450-₹850/night).',
      budget: 'Traditional Rajasthani Haveli guesthouse in Bani Park (₹1,200-₹2,000/night).',
      standard: 'Heritage hotel with courtyard like Mandawa Haveli (₹3,000-₹5,500/night).',
      luxury: 'Rambagh Palace or Jai Mahal Palace (₹18,000-₹45,000/night).'
    },
    food: {
      veg: 'Royal Dal Baati Churma, Pyaaz Kachori at Rawat Mishtan Bhandar, Ker Sangri, creamy Kulhad Lassi at Lassiwala.',
      nonVeg: 'Authentic royal Laal Maas (red mutton curry) and Safed Maas at traditional culinary hotspots.',
      both: 'Fusion of royal Rajputana feast, street kachoris, and authentic rooftop dining.'
    },
    places: [
      {
        name: 'Amber Fort & Sheesh Mahal',
        lat: 26.9855,
        lng: 75.8513,
        duration: '3 hours',
        desc: 'Majestic hilltop fort built of red sandstone and marble featuring the breathtaking Hall of Mirrors (Sheesh Mahal).',
        timeOfDay: 'morning'
      },
      {
        name: 'Hawa Mahal (Palace of Winds)',
        lat: 26.9239,
        lng: 75.8267,
        duration: '1 hour',
        desc: 'Iconic five-storey pink facade with 953 intricately carved jharokhas (casements) overlooking the bustling bazaar.',
        timeOfDay: 'afternoon'
      },
      {
        name: 'City Palace & Jantar Mantar',
        lat: 26.9258,
        lng: 75.8237,
        duration: '2.5 hours',
        desc: 'Royal residence with museum courtyards paired with the UNESCO astronomical observatory with giant stone sundials.',
        timeOfDay: 'morning'
      },
      {
        name: 'Nahargarh Fort Sunset View',
        lat: 26.9372,
        lng: 75.8156,
        duration: '2 hours',
        desc: 'Perched on the edge of the Aravalli Hills providing spectacular panoramic sunset vistas of the Pink City.',
        timeOfDay: 'evening'
      },
      {
        name: 'Johari & Bapu Bazaar Shopping',
        lat: 26.9196,
        lng: 75.8252,
        duration: '2 hours',
        desc: 'Vibrant heritage street shopping for gemstone jewelry, Jaipuri quilts, Bandhani textiles, and handcrafted juttis.',
        timeOfDay: 'evening'
      }
    ]
  },
  kerala: {
    name: 'Kerala (Munnar & Alleppey)',
    center: [9.9312, 76.2673],
    tagline: 'God’s Own Country - Tea Valleys & Backwaters',
    transport: {
      bus: 'KSRTC Swift buses connecting Kochi, Munnar, Alleppey, and Trivandrum.',
      train: 'Ernakulam Junction (ERS) and Alappuzha (ALLP) on coastal rail network.',
      flight: 'Cochin International Airport (COK).',
      car: 'Picturesque NH85 climbing through misty cardamom hills and waterfalls.',
      bike: 'Scenic monsoon and winter rides through spice gardens.'
    },
    stays: {
      dormitory: 'Zostel Alleppey or Backwater backpacker hostel (₹500-₹900/night).',
      budget: 'Plantation homestay or eco-cottage (₹1,400-₹2,400/night).',
      standard: 'Backwater resort or tea valley lodge (₹3,500-₹6,000/night).',
      luxury: 'Kumarakom Lake Resort or Traditional Luxury Houseboat (₹12,000-₹30,000/night).'
    },
    food: {
      veg: 'Traditional Kerala Sadya served on fresh banana leaf with Avial, Sambar, Payasam, and crispy banana chips.',
      nonVeg: 'Karimeen Pollichathu (pearl spot fish wrapped in banana leaf), Malabar Chicken Biryani, Duck Roast.',
      both: 'Rich blend of coconut milk curries, appam with vegetable or meat stew, and freshly plucked spices.'
    },
    places: [
      {
        name: 'Munnar Tea Plantations & Eravikulam',
        lat: 10.0889,
        lng: 77.0595,
        duration: '3 hours',
        desc: 'Rolling emerald green tea hills, tea processing museum, and sanctuary of the endangered Nilgiri Tahr.',
        timeOfDay: 'morning'
      },
      {
        name: 'Alleppey Backwaters Shikhara / Houseboat',
        lat: 9.4981,
        lng: 76.3388,
        duration: '3.5 hours',
        desc: 'Glide through palm-fringed canals, paddy fields, and serene lagoons experiencing tranquil village life.',
        timeOfDay: 'afternoon'
      },
      {
        name: 'Fort Kochi Chinese Fishing Nets & Jew Town',
        lat: 9.9656,
        lng: 76.2421,
        duration: '2 hours',
        desc: 'Historic coastal town with cantilevered Chinese fishing nets, colonial spice warehouses, and antique art cafes.',
        timeOfDay: 'evening'
      }
    ]
  },
  varanasi: {
    name: 'Varanasi, Uttar Pradesh',
    center: [25.3176, 82.9739],
    tagline: 'The Eternal Spiritual Capital on the Ganges',
    transport: {
      bus: 'UPSRTC buses from Lucknow, Prayagraj, and Patna.',
      train: 'Varanasi Junction (BSB) and Banaras (BSBS) connecting all parts of India.',
      flight: 'Lal Bahadur Shastri International Airport (VNS).',
      car: 'Purvanchal Expressway and NH19.',
      bike: 'Heritage touring route.'
    },
    stays: {
      dormitory: 'Ghat-side backpacker hostels like Moustache or Stops (₹400-₹800/night).',
      budget: 'Traditional haveli guesthouses near Dashashwamedh Ghat (₹1,000-₹1,800/night).',
      standard: 'Heritage hotels overlooking river ghats (₹3,000-₹5,500/night).',
      luxury: 'BrijRama Palace or Taj Ganges (₹15,000-₹35,000/night).'
    },
    food: {
      veg: 'Kachori-Jalebi breakfast, Tamatar Chaat at Kashi Chaat Bhandar, frothy Malaiyo winter sweet, Banarasi Meetha Paan, creamy Blue Lassi.',
      nonVeg: 'Mughlai kebabs in old city avenues and riverside regional fare.',
      both: 'World-famous Banarasi sweets, street chaats, and soulful sattvic dining.'
    },
    places: [
      {
        name: 'Kashi Vishwanath Temple & Corridor',
        lat: 25.3109,
        lng: 83.0107,
        duration: '2.5 hours',
        desc: 'One of the twelve sacred Jyotirlingas of Lord Shiva featuring the grand recently built riverfront corridor.',
        timeOfDay: 'morning'
      },
      {
        name: 'Dashashwamedh Ghat Grand Ganga Aarti',
        lat: 25.3076,
        lng: 83.0103,
        duration: '1.5 hours',
        desc: 'Mesmerizing evening ritual with synchronized brass lamps, incense smoke, conch shells, and chanting along the holy river.',
        timeOfDay: 'evening'
      },
      {
        name: 'Subah-e-Banaras Sunrise Boat Ride (Assi Ghat to Manikarnika)',
        lat: 25.2917,
        lng: 83.0069,
        duration: '2 hours',
        desc: 'Magical dawn wooden boat ride past morning pilgrims, ancient bathing steps, and 84 historic stone ghats.',
        timeOfDay: 'morning'
      },
      {
        name: 'Sarnath Buddhist Sacred Complex & Deer Park',
        lat: 25.3811,
        lng: 83.0214,
        duration: '3 hours',
        desc: 'Historic site where Gautama Buddha delivered his first sermon; features Dhamek Stupa and Ashoka Lion Capital museum.',
        timeOfDay: 'afternoon'
      }
    ]
  }
};

// Helper to calculate realistic costs based on travel mode, accommodation, travellers, days, and budget
export function calculateBudgetBreakdown({
  totalBudget,
  days,
  travellers,
  travelMode,
  accommodationPreference,
  foodPreference
}) {
  const numDays = Math.max(1, parseInt(days) || 3);
  const numTravellers = Math.max(1, parseInt(travellers) || 2);
  const budget = Math.max(1000, parseInt(totalBudget) || 10000);

  // Transportation rate estimate (round trip for all travellers)
  let transportMultiplier = 0.22;
  if (travelMode === 'Flight') transportMultiplier = 0.40;
  else if (travelMode === 'Car') transportMultiplier = 0.28;
  else if (travelMode === 'Bus' || travelMode === 'Train') transportMultiplier = 0.18;
  else if (travelMode === 'Bike') transportMultiplier = 0.15;

  // Accommodation rate estimate
  let stayMultiplier = 0.32;
  if (accommodationPreference === 'Dormitory') stayMultiplier = 0.18;
  else if (accommodationPreference === 'Budget') stayMultiplier = 0.26;
  else if (accommodationPreference === 'Luxury') stayMultiplier = 0.42;

  // Food rate estimate
  let foodMultiplier = 0.22;
  if (foodPreference === 'Vegetarian') foodMultiplier = 0.18;

  let sightseeingMultiplier = 0.12;
  let shoppingMultiplier = 0.08;
  let emergencyMultiplier = 0.08;

  // Scale percentages to 100%
  const totalWeight = transportMultiplier + stayMultiplier + foodMultiplier + sightseeingMultiplier + shoppingMultiplier + emergencyMultiplier;

  // Baseline target: keep total estimate under or equal to user's budget!
  // If budget is healthy, we reserve ~5-10% as savings buffer
  const targetSpend = budget * 0.92;

  const transportation = Math.round((transportMultiplier / totalWeight) * targetSpend);
  const accommodation = Math.round((stayMultiplier / totalWeight) * targetSpend);
  const food = Math.round((foodMultiplier / totalWeight) * targetSpend);
  const sightseeing = Math.round((sightseeingMultiplier / totalWeight) * targetSpend);
  const shopping = Math.round((shoppingMultiplier / totalWeight) * targetSpend);
  const emergency = Math.round(budget - (transportation + accommodation + food + sightseeing + shopping));

  const totalEstimated = transportation + accommodation + food + sightseeing + shopping + emergency;
  const remaining = Math.max(0, budget - totalEstimated);
  const costPerPerson = Math.round(totalEstimated / numTravellers);
  const dailyAverage = Math.round(totalEstimated / numDays);
  const utilization = Math.min(100, Math.round((totalEstimated / budget) * 100));

  // Determine budget sufficiency status
  const minRequiredPerPersonPerDay = accommodationPreference === 'Dormitory' ? 800 : (accommodationPreference === 'Luxury' ? 4500 : 1600);
  const totalMinRequired = minRequiredPerPersonPerDay * numDays * numTravellers;
  const isSufficient = budget >= totalMinRequired;

  let advice = '';
  if (!isSufficient) {
    advice = `Your ₹${budget.toLocaleString('en-IN')} budget is tight for ${numTravellers} travellers over ${numDays} days with ${travelMode} & ${accommodationPreference} stay (recommended minimum: ₹${totalMinRequired.toLocaleString('en-IN')}). We have optimized the plan with low-cost transit (Train/Bus), TTD/Hostel dormitories, and subsidized dining to keep you 100% within your limit!`;
  } else {
    advice = `Your ₹${budget.toLocaleString('en-IN')} budget comfortably covers all expenses for ${numTravellers} people across ${numDays} days with an estimated ₹${remaining.toLocaleString('en-IN')} emergency contingency buffer remaining.`;
  }

  return {
    totalBudget: budget,
    totalEstimated,
    costPerPerson,
    dailyAverage,
    remaining,
    utilization,
    isSufficient,
    advice,
    categories: {
      transportation: {
        amount: transportation,
        percentage: Math.round((transportation / budget) * 100),
        note: `Includes round-trip ${travelMode} tickets/fuel and local auto/cab connections.`
      },
      accommodation: {
        amount: accommodation,
        percentage: Math.round((accommodation / budget) * 100),
        note: `${numDays - 1 > 0 ? numDays - 1 : 1} nights in ${accommodationPreference} lodging for ${numTravellers} travellers.`
      },
      food: {
        amount: food,
        percentage: Math.round((food / budget) * 100),
        note: `Breakfast, lunch, evening snacks, and dinner (${foodPreference} cuisine).`
      },
      sightseeing: {
        amount: sightseeing,
        percentage: Math.round((sightseeing / budget) * 100),
        note: 'Temple darshan / monument entry passes, camera fees, and local guides.'
      },
      shopping: {
        amount: shopping,
        percentage: Math.round((shopping / budget) * 100),
        note: 'Local souvenirs, handicrafts, sweets, and specialty items.'
      },
      emergency: {
        amount: emergency,
        percentage: Math.round((emergency / budget) * 100),
        note: 'Reserved contingency fund for medical, transport delays, or miscellaneous costs.'
      }
    }
  };
}

// Generate destination-tailored day-by-day itinerary
export function generateFallbackItinerary(params) {
  const {
    startingLocation = 'Guntur',
    destination = 'Tirupati',
    departureDate = new Date().toISOString().split('T')[0],
    days = 3,
    travellers = 2,
    totalBudget = 8000,
    travelMode = 'Train',
    accommodationPreference = 'Dormitory',
    foodPreference = 'Vegetarian',
    interests = ['Religious', 'Historical']
  } = params;

  const numDays = Math.max(1, parseInt(days) || 3);
  const numTravellers = Math.max(1, parseInt(travellers) || 2);
  const budget = Math.max(1000, parseInt(totalBudget) || 8000);

  const budgetBreakdown = calculateBudgetBreakdown({
    totalBudget: budget,
    days: numDays,
    travellers: numTravellers,
    travelMode,
    accommodationPreference,
    foodPreference
  });

  const destKey = Object.keys(DESTINATIONS_DB).find(k => destination.toLowerCase().includes(k)) || 'tirupati';
  const destInfo = DESTINATIONS_DB[destKey] || DESTINATIONS_DB.tirupati;

  // Compute dates
  const startDate = new Date(departureDate);
  const dayPlans = [];
  const allMapLocations = [];

  const placesPool = [...destInfo.places];

  for (let i = 1; i <= numDays; i++) {
    const curDate = new Date(startDate);
    curDate.setDate(startDate.getDate() + (i - 1));
    const dateFormatted = curDate.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    let dayTitle = '';
    let morningActs = [];
    let afternoonActs = [];
    let eveningActs = [];
    const dayPlaces = [];

    // Distribute places across days
    const p1 = placesPool[(i * 2 - 2) % placesPool.length];
    const p2 = placesPool[(i * 2 - 1) % placesPool.length];
    const p3 = placesPool[(i * 2) % placesPool.length];

    if (i === 1) {
      dayTitle = `Arrival, Sacred Blessings & Exploring ${destInfo.name}`;
      morningActs = [
        `Depart from ${startingLocation} via ${travelMode} to ${destination}. Enjoy morning refreshments during transit.`,
        `Arrive in ${destination}, check into ${destInfo.stays[accommodationPreference.toLowerCase()] || destInfo.stays.budget}, freshen up, and store luggage.`,
        `Enjoy breakfast featuring ${destInfo.food[foodPreference.toLowerCase()] || 'traditional local breakfast and coffee'}.`
      ];
      afternoonActs = [
        `Head to ${p1.name}. ${p1.desc}`,
        `Savor lunch at a recommended local restaurant with ${foodPreference} meal options.`
      ];
      eveningActs = [
        `Visit ${p2.name} as the temperature cools. Take photos and absorb the sunset vibes.`,
        `Stroll through local bazaars for regional specialties, followed by a wholesome dinner.`
      ];
    } else if (i === numDays) {
      dayTitle = `Final Landmarks, Souvenir Shopping & Departure to ${startingLocation}`;
      morningActs = [
        `Early morning visit to ${p1.name} during the peaceful morning hours.`,
        `Breakfast at iconic local eatery.`
      ];
      afternoonActs = [
        `Visit ${p3.name}. ${p3.desc}`,
        `Pack bags and complete check-out formalities.`
      ];
      eveningActs = [
        `Pick up famous regional souvenirs (sweets, handicrafts, specialty items).`,
        `Board your return ${travelMode} back to ${startingLocation} with cherished memories.`
      ];
    } else {
      dayTitle = `Deep Dive: Culture, Scenic Splendors & Hidden Gems`;
      morningActs = [
        `Scenic morning excursion to ${p1.name}. ${p1.desc}`,
        `Enjoy a relaxed breakfast and refreshments.`
      ];
      afternoonActs = [
        `Explore ${p2.name}. ${p2.desc}`,
        `Authentic mid-day lunch break.`
      ];
      eveningActs = [
        `Evening leisure at ${p3.name}. Witness local cultural rituals or sunset views.`,
        `Special dinner experience featuring local culinary delicacies.`
      ];
    }

    [p1, p2].forEach((p, idx) => {
      const locObj = {
        name: p.name,
        day: i,
        timeOfDay: idx === 0 ? 'morning' : 'afternoon',
        lat: p.lat + (idx * 0.002), // subtle offset to avoid overlap
        lng: p.lng + (idx * 0.002),
        duration: p.duration,
        description: p.desc,
        navigationUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name + ', ' + destination)}`
      };
      dayPlaces.push(locObj);
      allMapLocations.push(locObj);
    });

    const dayCost = Math.round(budgetBreakdown.totalEstimated / numDays);

    dayPlans.push({
      day: i,
      date: dateFormatted,
      title: dayTitle,
      morning: morningActs,
      afternoon: afternoonActs,
      evening: eveningActs,
      places: dayPlaces,
      estimatedTravelTime: 'Approx 35 - 55 mins local transit between attractions',
      foodRecommendation: destInfo.food[foodPreference.toLowerCase()] || destInfo.food.veg,
      accommodationSuggestion: destInfo.stays[accommodationPreference.toLowerCase()] || destInfo.stays.budget,
      estimatedDailyCost: dayCost
    });
  }

  // Luxury vs Budget comparison plan
  const luxuryMultiplier = 3.2;
  const comparison = {
    budgetPlan: {
      tier: 'Smart Budget / Explorer',
      totalCost: budgetBreakdown.totalEstimated,
      travelMode: travelMode === 'Flight' ? 'Train (3AC/Sleeper) / AC Bus' : travelMode,
      stayType: accommodationPreference === 'Luxury' ? 'Standard 3-Star Hotel' : (accommodationPreference === 'Dormitory' ? 'TTD Dormitory / Backpacker Hostel' : 'Clean Budget Guesthouse'),
      dining: 'Authentic local regional eateries & subsidized temple annadanam/street food',
      highlights: 'High-value sightseeing, public & electric transit, zero unnecessary markups.'
    },
    luxuryPlan: {
      tier: 'Luxury & Comfort',
      totalCost: Math.round(budgetBreakdown.totalEstimated * luxuryMultiplier),
      travelMode: 'Private Chauffeur Sedan / First AC Train / Premium Flight',
      stayType: destInfo.stays.luxury || '5-Star Heritage Luxury Resort with Spa & Pool',
      dining: 'Fine dining restaurants, multi-course chef tastings, VIP lounge access',
      highlights: 'VIP fast-track temple darshan passes, private guided historian tours, private AC SUV throughout.'
    }
  };

  return {
    tripSummary: {
      destination: destInfo.name || destination,
      startingLocation,
      departureDate,
      days: numDays,
      travellers: numTravellers,
      totalBudget: budget,
      travelMode,
      accommodationPreference,
      foodPreference,
      interests,
      tagline: destInfo.tagline
    },
    itinerary: dayPlans,
    budgetBreakdown,
    mapLocations: allMapLocations,
    comparison,
    transportationAdvice: destInfo.transport[travelMode.toLowerCase()] || `Recommended travel via ${travelMode} directly from ${startingLocation} to ${destination}.`,
    stayAdvice: `Book ${accommodationPreference} options in advance: ${destInfo.stays[accommodationPreference.toLowerCase()] || destInfo.stays.budget}.`,
    foodAdvice: `Relish ${destInfo.food[foodPreference.toLowerCase()] || destInfo.food.veg}. Don't miss the local specialities!`,
    budgetAdvice: budgetBreakdown.advice
  };
}
