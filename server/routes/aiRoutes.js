import express from 'express';
import { createTripPlan } from '../controllers/aiController.js';

const router = express.Router();

router.post('/generate-plan', createTripPlan);

export default router;
