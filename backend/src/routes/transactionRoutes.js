import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

import {
  addTransaction,
  getTransactions,
  getCategoryBreakdown

} from '../controllers/transactionController.js';

router.post('/', authMiddleware, addTransaction);
router.get('/', authMiddleware, getTransactions);
router.get('/category', authMiddleware, getCategoryBreakdown);

export default router;