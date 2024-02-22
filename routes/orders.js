const express = require('express');
const router = express.Router();

// Assume you have an OrderController with relevant methods
const OrderController = require('../controllers/ordersController');

// Place a new order
router.post('/', OrderController.placeOrder);

// Get order All Orders
router.get('/', OrderController.getOrders);

// Get all orders for a user
router.get('/user/:userId', OrderController.getUserOrders);

// Update an order status
router.put('/:orderId', OrderController.updateOrder);

module.exports = router;
