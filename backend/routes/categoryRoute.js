const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');

// GET all categories
router.get('/', categoryController.getAllCategories);

// POST create a new category
router.post('/', categoryController.createCategory);

// PUT update a category by ID
router.put('/:id', categoryController.updateCategory);

// DELETE delete a category by ID
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
