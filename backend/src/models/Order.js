// backend/src/models/Order.js

const mongoose = require('mongoose');

// Define the Order schema
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['BUY', 'SELL'],
    required: true
  },
  asset: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'MATCHED', 'CANCELLED'],
    default: 'PENDING'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Create a model using the schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
