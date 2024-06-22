const Transaction = require('../models/transaction'); // Assuming you have a Transaction model
const transactionService = require('../services/blockchainService'); // Assuming blockchainService handles transaction logic

// Create a new transaction
exports.createTransaction = async (req, res) => {
    try {
        const { from, to, amount, asset } = req.body;

        // Perform validation if needed

        // Create the transaction
        const transaction = await transactionService.createTransaction(from, to, amount, asset);

        // Save transaction to database (if needed)
        const savedTransaction = await Transaction.create(transaction);

        res.status(201).json(savedTransaction);
    } catch (err) {
        console.error('Error creating transaction:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all transactions
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();

        res.status(200).json(transactions);
    } catch (err) {
        console.error('Error getting all transactions:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get transaction by ID
exports.getTransactionById = async (req, res) => {
    try {
        const { transactionId } = req.params;

        const transaction = await Transaction.findById(transactionId);

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.status(200).json(transaction);
    } catch (err) {
        console.error(`Error getting transaction with ID ${transactionId}:`, err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update transaction status by ID
exports.updateTransactionStatus = async (req, res) => {
    try {
        const { transactionId } = req.params;
        const { status } = req.body;

        const updatedTransaction = await Transaction.findByIdAndUpdate(transactionId, { status }, { new: true });

        if (!updatedTransaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.status(200).json(updatedTransaction);
    } catch (err) {
        console.error(`Error updating transaction status for transaction with ID ${transactionId}:`, err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete transaction by ID
exports.deleteTransactionById = async (req, res) => {
    try {
        const { transactionId } = req.params;

        const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);

        if (!deletedTransaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.status(200).json({ message: `Transaction with ID ${transactionId} deleted successfully` });
    } catch (err) {
        console.error(`Error deleting transaction with ID ${transactionId}:`, err);
        res.status(500).json({ error: 'Server error' });
    }
};
