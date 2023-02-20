const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

// Get all products
router.get('/', productController.getAllProducts);

// Get product by id
router.get('/:id', productController.getProductById);

// Create new product
router.post('/', productController.createProduct);

// Update existing product
router.put('/:id', productController.updateProduct);

// Delete product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
