const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Transaction schema
const TransactionSchema = new Schema({
    txHash: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
    // Add more fields as per your application's requirements
});

// Create and export the Transaction model
const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;
