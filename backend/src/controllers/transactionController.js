import Transaction from '../models/Transactions.js';
import moment from 'moment';

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
    //    we want to have two queries category and frequency

    const {category, frequency, type} = req.query;
    const filter = { userId: req.user.id };

    if (category) {
        filter.category = category;
    }
    if (type === 'income' || type === 'expense') {
        filter.type = type;
    }
    else{
        filter.type = {$in: ['income', 'expense']};
    }

    if (frequency === "weekly"){
        filter.date = {$gte: moment().subtract(7, 'days').toDate()};
    }
    else if (frequency === "monthly"){
        filter.date = {$gte: moment().subtract(30, 'days').toDate()};
    }
    const transactions = await Transaction.find(filter).sort({ date: -1 });
    return res.status(200).json( transactions );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        
    }
}



export const getCategoryBreakdown = async (req, res) => {
    try{
    const {type, frequency, startDate, endDate} = req.query;
    // console.log(req.user._id)
    const matchState = {
        userId: req.user._id,
        type: type,
    }
    if(frequency === "weekly"){
        matchState.date = {
            $gte: moment().subtract(7, 'days').toDate(),
        }
    }
    else if(frequency === "monthly"){
        matchState.date={
            $gte: moment().subtract(30,'days').toDate(),
        }
    }

    if(startDate && endDate){
        matchState.date = {
            $gte: moment(startDate).toDate(),
            $lte: moment(endDate).toDate(),
        }
    }

    const breakdown = await Transaction.aggregate([
        { $match : matchState },
        { $group : {
            _id: "$category",
            total: { $sum: "$amount" },
            },
        },
        {
            $sort: { total: -1 },
        },
        { $project: {
            _id: 0,
            category: "$_id",
            total: 1,
            }
        },
    ]);
    return res.status(200).json(breakdown);
        
}catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

}

/*
    @desc Delete a transaction
    @route DELETE /api/transactions/:id
    @access Private

*/

export const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findById(id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        await Transaction.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

/*
    @desc Update a transaction
    @route PUT /api/transactions/:id
    @access Private
*/

export const updateTransaction = async (req, res) => {
    try {
        const {id} = req.params;
        const { type, category, amount, description, date } = req.body;
        const transaction = await Transaction.findById(id);
        if(!transaction){
            return res.status(404).json({ message: 'Transaction not found' });
        }
        const updatedTransaction = await Transaction.findByIdAndUpdate(id, {
            type,
            category,
            amount,
            description,
            date,
        }, { new: true, runValidators: true });
        return res.status(200).json({ message: 'Transaction updated successfully', transaction: updatedTransaction });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


/*
    @desc Get a transaction by id
    @route GET /api/transactions/:id
    @access Private
*/

export const getTransactionById = async (req, res) => {
    try {
        const {id} = req.params;
        const transaction = await Transaction.findById(id);
        if(!transaction){
            return res.status(404).json({ message: 'Transaction not found' });
        }
        return res.status(200).json(transaction);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        
    }
}