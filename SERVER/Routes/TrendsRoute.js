import express from 'express';
import { createTrend, getTrends } from '../Controllers/TrendsController.js';

const router = express.Router();

router.post('/', createTrend);
router.get('/:userId', getTrends);

export default router;







