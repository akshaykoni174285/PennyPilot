import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

import {
  addTransaction,
  getTransactions,

} from '../controllers/transactionController.js';

router.post('/', authMiddleware, addTransaction);
router.get('/', authMiddleware, getTransactions);

export default router;