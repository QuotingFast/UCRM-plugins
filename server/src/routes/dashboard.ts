import express from 'express';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  res.json({ message: 'Dashboard endpoint' });
});

export default router;