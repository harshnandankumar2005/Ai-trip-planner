import { Trip } from '../models/Trip.js';
import { getMongoStatus } from '../config/db.js';
import { fileDb } from '../services/storageService.js';

export const saveTrip = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId || 'guest';
    const tripData = req.body;

    if (!tripData.destination || !tripData.days || !tripData.itinerary) {
      return res.status(400).json({ success: false, message: 'Missing required trip fields.' });
    }

    let saved;
    if (getMongoStatus()) {
      saved = await Trip.create({
        ...tripData,
        userId,
      });
    } else {
      saved = fileDb.saveTrip(userId, tripData);
    }

    res.status(201).json({
      success: true,
      message: 'Trip saved successfully!',
      trip: saved,
    });
  } catch (error) {
    console.error('Save trip error:', error);
    res.status(500).json({ success: false, message: 'Failed to save trip.' });
  }
};

export const getUserTrips = async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required to fetch trips.' });
    }

    let trips;
    if (getMongoStatus()) {
      trips = await Trip.find({ userId }).sort({ createdAt: -1 });
    } else {
      trips = fileDb.getUserTrips(userId);
    }

    res.json({
      success: true,
      trips,
    });
  } catch (error) {
    console.error('Fetch trips error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch saved trips.' });
  }
};

export const getTripById = async (req, res) => {
  try {
    const { id } = req.params;
    let trip;
    if (getMongoStatus()) {
      trip = await Trip.findById(id);
    } else {
      trip = fileDb.getTripById(id);
    }

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found.' });
    }

    res.json({
      success: true,
      trip,
    });
  } catch (error) {
    console.error('Get trip error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch trip.' });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (getMongoStatus()) {
      const trip = await Trip.findById(id);
      if (!trip) {
        return res.status(404).json({ success: false, message: 'Trip not found.' });
      }
      if (userId && trip.userId !== userId && trip.userId !== 'guest') {
        return res.status(403).json({ success: false, message: 'Not authorized to delete this trip.' });
      }
      await Trip.findByIdAndDelete(id);
    } else {
      const deleted = fileDb.deleteTrip(id, userId);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Trip not found or not authorized.' });
      }
    }

    res.json({
      success: true,
      message: 'Trip deleted successfully.',
    });
  } catch (error) {
    console.error('Delete trip error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete trip.' });
  }
};
