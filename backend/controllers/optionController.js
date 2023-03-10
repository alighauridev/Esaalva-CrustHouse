const ProductOption = require("../models/ProductOptionModel");

// create a new product option
exports.createProductOption = async (req, res) => {
    const { option_name } = req.body;

    const existingOption = await ProductOption.findOne({ option_name });
    if (existingOption) {
        return res
            .status(400)
            .json({ message: "Option with this name already exists" });
    }
    try {
        const productOption = new ProductOption(req.body);
        await productOption.save();
        res.status(201).json(productOption);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// get all product options by class_id
exports.getProductOptionsByClassId = async (req, res) => {
    try {
        const productOptions = await ProductOption.find({ class_id: req.params.class_id });
        res.status(200).json(productOptions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// get all product options
exports.getProductOptions = async (req, res) => {
    try {
        const productOptions = await ProductOption.find();
        res.status(200).json(productOptions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// get a single product option
exports.getProductOptionById = async (req, res) => {
    try {
        const productOption = await ProductOption.findById(req.params.id);
        if (!productOption) {
            return res.status(404).json({ message: "Product option not found" });
        }
        res.status(200).json(productOption);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// update a product option
exports.updateProductOption = async (req, res) => {
    try {
        const productOption = await ProductOption.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!productOption) {
            return res.status(404).json({ message: "Product option not found" });
        }
        res.status(200).json(productOption);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// delete a product option
exports.deleteProductOption = async (req, res) => {
    try {
        const productOption = await ProductOption.findByIdAndDelete(req.params.id);
        if (!productOption) {
            return res.status(404).json({ message: "Product option not found" });
        }
        res.status(200).json({ message: "Product option deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
