import User from '../models/User.js';
import Transaction from '../models/Transactions.js';

/*
    @desc Add a new transaction
    @route POST /api/transactions/add
    @access Private
*/
export const addTransaction = async (req, res) => {
    try {
        const transactionData = {
        userId: req.user.id,
        type: req.body.type,
        category: req.body.category,
        amount: req.body.amount,
        description: req.body.description,
        date: req.body.date || new Date(),  
        };
        const transaction = new Transaction(transactionData);
        await transaction.save();
        return res.status(201).json({ message: 'Transaction added successfully', transaction });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });  
    }
}

/*
    @desc Get all transactions
    @route GET /api/transactions
    @access Private
*/

export const getTransactions = async (req,res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
        return res.status(200).json(transactions);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        
    }
}