const express = require("express");
const productRouter = express.Router();
const { createProduct, getProducts, deleteProduct, updateProduct } = require("../controller/product");
const { authenticateToken } = require("../middleware/middleware");

// Create a new product (requires authentication)
productRouter.post("/create-product", authenticateToken, createProduct);

// Fetch products from Printful API (requires authentication)
productRouter.get("/get-products", authenticateToken, getProducts);

// Delete a product by external ID (requires authentication)
productRouter.delete("/delete-product/:id", authenticateToken, deleteProduct);

// Update a product by external ID (requires authentication)
productRouter.put("/update-product/:id", authenticateToken, updateProduct);

module.exports = { productRouter };