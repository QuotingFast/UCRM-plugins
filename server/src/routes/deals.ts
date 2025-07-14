import express from 'express';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  res.json({ message: 'Deals endpoint' });
});

export default router;