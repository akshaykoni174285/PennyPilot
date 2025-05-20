import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

import {
  addTransaction,
  getTransactions,
  getCategoryBreakdown,
  deleteTransaction,
  updateTransaction,
  getTransactionById,


} from '../controllers/transactionController.js';

router.post('/', authMiddleware, addTransaction);
router.get('/', authMiddleware, getTransactions);
router.get('/category', authMiddleware, getCategoryBreakdown);
router.delete('/:id', authMiddleware, deleteTransaction);
router.put('/:id', authMiddleware, updateTransaction);
router.get('/:id', authMiddleware, getTransactionById);

export default router;