const express = require("express");
const orderRouter = express.Router();
const { createOrder, getOrders, deleteOrder, updateOrder } = require("../controller/order"); 
const { authenticateToken } = require("../middleware/middleware");

// Create a new order (requires authentication)
orderRouter.post("/create-order", authenticateToken, createOrder);

// Retrieve orders (requires authentication)
orderRouter.get("/get-orders", authenticateToken, getOrders);

// Delete an order by order_id (requires authentication)
orderRouter.delete("/delete-order/:order_id", authenticateToken, deleteOrder);

// Update an order by order_id (requires authentication)
orderRouter.put("/update-order/:order_id", authenticateToken, updateOrder);

module.exports = { orderRouter };
