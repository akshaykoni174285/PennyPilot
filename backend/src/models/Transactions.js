import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const transactionSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
   
},{
    timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;