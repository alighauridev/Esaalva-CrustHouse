const ProductComposition = require('../models/productComposition');

const createProductComposition = async (req, res) => {
    try {
        const { product_id, item_code, quantity } = req.body;
        const productComposition = new ProductComposition({ product_id, item_code, quantity });
        await productComposition.save();
        res.status(201).json(productComposition);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getProductComposition = async (req, res) => {
    try {
        const productComposition = await ProductComposition.findById(req.params.id).populate('product_id');
        if (!productComposition) {
            return res.status(404).json({ message: 'Product Composition not found' });
        }
        res.json(productComposition);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProductComposition = async (req, res) => {
    try {
        const { product_id, item_code, quantity } = req.body;
        const productComposition = await ProductComposition.findById(req.params.id);
        if (!productComposition) {
            return res.status(404).json({ message: 'Product Composition not found' });
        }
        productComposition.product_id = product_id;
        productComposition.item_code = item_code;
        productComposition.quantity = quantity;
        await productComposition.save();
        res.json(productComposition);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteProductComposition = async (req, res) => {
    try {
        const productComposition = await ProductComposition.findById(req.params.id);
        if (!productComposition) {
            return res.status(404).json({ message: 'Product Composition not found' });
        }
        await productComposition.remove();
        res.json({ message: 'Product Composition deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProductComposition,
    getProductComposition,
    updateProductComposition,
    deleteProductComposition,
};
