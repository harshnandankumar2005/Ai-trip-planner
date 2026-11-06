import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial structure
const initialData = {
  users: [],
  trips: []
};

// Read database
function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
      return initialData;
    }
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content || JSON.stringify(initialData));
  } catch (err) {
    console.error('Error reading JSON DB, reinitializing:', err);
    return initialData;
  }
}

// Write database atomically
function writeDb(data) {
  try {
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('Error writing to JSON DB:', err);
  }
}

export const fileDb = {
  // Users
  findUserByEmail(email) {
    const db = readDb();
    return db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  findUserById(id) {
    const db = readDb();
    return db.users.find(u => u._id === id || u.id === id);
  },

  createUser(userData) {
    const db = readDb();
    const newUser = {
      _id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      name: userData.name,
      email: userData.email.toLowerCase(),
      password: userData.password,
      createdAt: new Date().toISOString()
    };
    db.users.push(newUser);
    writeDb(db);
    return newUser;
  },

  // Trips
  getUserTrips(userId) {
    const db = readDb();
    return db.trips.filter(t => t.userId === userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  getTripById(tripId) {
    const db = readDb();
    return db.trips.find(t => t._id === tripId || t.id === tripId);
  },

  saveTrip(userId, tripData) {
    const db = readDb();
    const newTrip = {
      _id: 'trip_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      userId: userId || 'guest',
      ...tripData,
      createdAt: new Date().toISOString()
    };
    db.trips.push(newTrip);
    writeDb(db);
    return newTrip;
  },

  deleteTrip(tripId, userId) {
    const db = readDb();
    const initialLen = db.trips.length;
    db.trips = db.trips.filter(t => {
      const isMatch = (t._id === tripId || t.id === tripId);
      if (!isMatch) return true;
      if (userId && t.userId && t.userId !== userId && t.userId !== 'guest') return true;
      return false;
    });
    writeDb(db);
    return db.trips.length < initialLen;
  }
};
