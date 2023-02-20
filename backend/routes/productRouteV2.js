const express = require("express");
const router = express.Router();
const Product = require("../models/ProductTextModel");

// Get all products
// router.get("/", async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.json(products);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// Get a single product
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        const relatedProducts = await Product.find({ category: product.category });
        res.json({
            product,
            relatedProducts
        });
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

// edit a product
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json({
            success: true,
            data: updatedProduct,
        });
    } catch (error) {
        res.status(500);
    }
});
// delete a product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndRemove(req.params.id);
        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'Product not found'
            });
        }
        res.send({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        });
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
// Get the Menu
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        const categories = [...new Set(products.map((product) => product.category))];

        const menu = categories.map((category) => {
            const filteredProducts = products.filter((product) => product.category === category);
            return {
                category,
                image: filteredProducts[0].image,
                products: filteredProducts,
            };
        });

        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});






module.exports = router;
