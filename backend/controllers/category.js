const Category = require('../models/categoryModel');

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Create a new category
const createCategory = async (req, res) => {
    try {
        const { name, image } = req.body;
        const category = new Category({ name, image });
        await category.save();
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a category by ID
const updateCategory = async (req, res) => {
    try {
        const { name, image } = req.body;
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name, image },
            { new: true }
        );
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndRemove(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory };
