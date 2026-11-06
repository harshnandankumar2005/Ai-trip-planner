# TripWise – AI Smart Trip Planner ✈️

**TripWise** is a modern, responsive, full-stack travel-planning web application built with React (Vite), Node.js, Express, MongoDB (with built-in zero-dependency disk fallback), and Google Gemini AI.

---

## 🌟 Key Features

1. **AI-Powered Itinerary Generation**
   - Real destination awareness (Tirupati, Goa, Manali, Jaipur, Kerala, Varanasi, etc.).
   - Structured day-by-day itineraries (Morning, Afternoon, Evening activities).
   - Real transit commute time estimates between stops.
   - Recommended regional foods (Vegetarian, Non-Vegetarian, Both) and lodging suggestions.
   - Intelligent fallback engine ensures 100% availability even without an external API key.

2. **Smart Budget Breakdown & Mathematical Guarantee**
   - **Never silently exceeds the user's budget**.
   - Category breakdowns: Transportation, Accommodation, Food, Sightseeing, Shopping, and Emergency Reserve.
   - Cost per person, daily averages, remaining contingency buffer, and progress visualization.
   - Intelligent financial guidance for tight budgets (e.g. suggesting dormitories or trains).

3. **Interactive OpenStreetMap with Route Coordinates**
   - Numbered attraction markers displaying visiting sequence.
   - Polylines tracing travel routes.
   - Clickable popups with descriptions, visit duration, and one-click "Open in Google Maps" turn-by-turn navigation.

4. **Comprehensive Travel Suite**
   - **Compare Budget vs. Luxury Plans**: View side-by-side cost and comfort differences.
   - **Download as PDF**: Print-ready, styled travel itinerary for offline access.
   - **Save & Manage Itineraries**: Saved trips dashboard with instant reload and delete options.
   - **Share**: One-click sharing via WhatsApp, Twitter, and clipboard.
   - **Authentication**: JWT-based login/signup with guest mode support.

---

## 🚀 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Leaflet (OpenStreetMap), Framer Motion, Lucide React, Canvas Confetti
- **Backend**: Node.js, Express.js, MongoDB / Mongoose (with automated local JSON engine fallback)
- **AI Engine**: Google Gemini API (`@google/generative-ai`) + Destination-Aware Heuristics
- **Security**: JWT Authentication, Bcrypt password hashing

---

## 🛠️ Quick Start Guide

### 1. Prerequisites
- Node.js (v18+)
- npm (v9+)

### 2. Setup Environment Variables
In `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/tripwise
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key_here # Optional: app uses high-accuracy fallback if omitted
```

### 3. Run the Application

#### Start Backend Server:
```bash
cd server
npm start
# Server runs on http://localhost:5000
```

#### Start Frontend Client:
```bash
cd client
npm run dev
# Vite runs on http://localhost:5173
```

---

## 🧪 Benchmark Test Case

Try the built-in benchmark directly from the AI Trip Planner dashboard:
> **"Plan a 3-day Tirupati trip from Guntur for 2 people with a total budget of ₹8,000."**

TripWise automatically calculates:
- Round-trip train transit from Guntur
- TTD Srinivasam / Vishnu Nivasam dormitory stay
- Sri Venkateswara Swamy Temple darshan & Srivari Laddu Prasadam
- Kapila Theertham, Silathoranam natural rock arch, and Padmavathi Temple
- Authentic Andhra Bhojanam and Nitya Annadanam
- Complete expense breakdown strictly under ₹8,000 for 2 people
- Interactive map with coordinates and route lines
