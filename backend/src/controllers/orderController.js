// backend/src/controllers/orderController.js

const Order = require('../models/Order');  // Assuming Order model is defined

// Example controller methods
const orderController = {
  // Create a new order
  createOrder: async (req, res) => {
    try {
      const { userId, pair, type, price, amount } = req.body;
      
      // Create a new order instance
      const newOrder = new Order({
        userId,
        pair,
        type,
        price,
        amount,
        status: 'pending'  // Initial status could be pending, etc.
      });
      
      // Save the order to the database
      await newOrder.save();

      res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (err) {
      console.error('Error creating order:', err);
      res.status(500).json({ error: 'Failed to create order' });
    }
  },

  // Get all orders
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find().populate('userId');  // Assuming userId is a reference to User model

      res.status(200).json(orders);
    } catch (err) {
      console.error('Error fetching orders:', err);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  },

  // Get order by ID
  getOrderById: async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await Order.findById(orderId).populate('userId');

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.status(200).json(order);
    } catch (err) {
      console.error('Error fetching order by ID:', err);
      res.status(500).json({ error: 'Failed to fetch order' });
    }
  },

  // Update order status
  updateOrderStatus: async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

      if (!updatedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
    } catch (err) {
      console.error('Error updating order status:', err);
      res.status(500).json({ error: 'Failed to update order status' });
    }
  },

  // Delete order by ID
  deleteOrderById: async (req, res) => {
    try {
      const { orderId } = req.params;
      const deletedOrder = await Order.findByIdAndDelete(orderId);

      if (!deletedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
      console.error('Error deleting order:', err);
      res.status(500).json({ error: 'Failed to delete order' });
    }
  }
};

module.exports = orderController;
