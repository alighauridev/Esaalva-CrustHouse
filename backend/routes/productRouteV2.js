const express = require("express");
const router = express.Router();
const Product = require("../models/ProductTextModel");

// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single product
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new product
router.post("/", async (req, res) => {
    const product = new Product({
        name: req.body.name,
        id: req.body.id,
        category: req.body.category,
        img: req.body.img,
        price: req.body.price,
        stock: req.body.stock,
        branch: req.body.branch,
        description: req.body.description,
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get products by branch 
router.get("/branch/:branch", async (req, res) => {
    try {
        const products = await Product.find({ branch: req.params.branch });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Get products by category
router.get("/category/:category", async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
