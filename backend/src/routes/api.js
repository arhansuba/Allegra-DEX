const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const userController = require('../controllers/userController');

// Routes for orders
router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getAllOrders);
router.get('/orders/:orderId', orderController.getOrderById);
router.put('/orders/:orderId', orderController.updateOrderStatus);
router.delete('/orders/:orderId', orderController.deleteOrderById);

// Routes for users
router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:userId', userController.getUserById);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUserById);

// Routes for transactions
router.post('/transactions', transactionController.createTransaction);
router.get('/transactions', transactionController.getAllTransactions);
router.get('/transactions/:transactionId', transactionController.getTransactionById);
router.put('/transactions/:transactionId', transactionController.updateTransactionStatus);
router.delete('/transactions/:transactionId', transactionController.deleteTransactionById);

module.exports = router;

