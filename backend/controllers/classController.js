const ProductClass = require('../models/ProductClassModel');

// Get all product classes
exports.getProductClasses = async (req, res) => {
    try {
        const productClasses = await ProductClass.find();
        res.status(200).json(productClasses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new product class
exports.createProductClass = async (req, res) => {
    const productClass = new ProductClass({
        class_name: req.body.class_name
    });

    try {
        const newProductClass = await productClass.save();
        res.status(201).json(newProductClass);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a single product class
exports.getProductClass = async (req, res) => {
    try {
        const productClass = await ProductClass.findById(req.params.id);
        if (!productClass) {
            return res.status(404).json({ message: 'Product class not found' });
        }
        res.status(200).json(productClass);

        // Handle errors
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a product class
exports.updateProductClass = async (req, res) => {
    try {
        const productClass = await ProductClass.findById(req.params.id);
        if (!productClass) {
            return res.status(404).json({ message: 'Product class not found' });
        }
        productClass.class_name = req.body.class_name;
        const updatedProductClass = await productClass.save();
        res.status(200).json(updatedProductClass);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a product class
exports.deleteProductClass = async (req, res) => {
    try {
        const productClass = await ProductClass.findById(req.params.id);
        if (!productClass) {
            return res.status(404).json({ message: 'Product class not found' });
        }
        await productClass.remove();
        res.status(200).json({ message: 'Product class deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};