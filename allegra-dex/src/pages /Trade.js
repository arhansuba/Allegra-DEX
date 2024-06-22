// Trade.js

import React, { useState, useEffect } from 'react';
import { getAllOrders, createOrder } from '../utils/api'; // Replace with actual API functions
import OrderBook from '../components/OrderBook'; // Assuming you have an OrderBook component

const Trade = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({});

  useEffect(() => {
    fetchOrders(); // Fetch orders on component mount
  }, []);

  const fetchOrders = async () => {
    try {
      const ordersData = await getAllOrders(); // Fetch all orders from API
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    try {
      await createOrder(newOrder); // Create new order using API
      setNewOrder({}); // Clear form fields after submission
      fetchOrders(); // Refresh orders list after submission
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="trade-container">
      <h2>Trade</h2>
      <div className="order-book-container">
        <OrderBook orders={orders} />
      </div>
      <form className="order-form" onSubmit={handleSubmitOrder}>
        <h3>Create Order</h3>
        <div className="form-group">
          <label htmlFor="symbol">Symbol:</label>
          <input
            type="text"
            id="symbol"
            name="symbol"
            value={newOrder.symbol || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={newOrder.amount || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={newOrder.price || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default Trade;
