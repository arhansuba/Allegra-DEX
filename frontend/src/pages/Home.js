// home.js

// Function to fetch and display recent orders
async function fetchRecentOrders() {
    try {
        const response = await fetch('/api/orders/recent');
        if (!response.ok) {
            throw new Error('Failed to fetch recent orders');
        }
        const orders = await response.json();
        displayRecentOrders(orders);
    } catch (error) {
        console.error('Error fetching recent orders:', error);
        // Handle error: display error message to user, retry fetch, etc.
    }
}

// Function to display recent orders in the UI
function displayRecentOrders(orders) {
    const ordersList = document.getElementById('recent-orders-list');
    ordersList.innerHTML = ''; // Clear previous content

    orders.forEach(order => {
        const orderItem = document.createElement('li');
        orderItem.textContent = `Order ID: ${order.id}, Amount: ${order.amount}`;
        ordersList.appendChild(orderItem);
    });
}

// Event listener to fetch recent orders when the page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchRecentOrders();
});
