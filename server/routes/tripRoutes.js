import express from 'express';
import { saveTrip, getUserTrips, getTripById, deleteTrip } from '../controllers/tripController.js';
import { optionalAuth, requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', optionalAuth, saveTrip);
router.get('/', optionalAuth, getUserTrips);
router.get('/:id', optionalAuth, getTripById);
router.delete('/:id', optionalAuth, deleteTrip);

export default router;
