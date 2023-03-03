const ProductRecipe = require("../models/ProductRecipeModel");

// Create a new product recipe
exports.createProductRecipe = async (req, res) => {
    const { name } = req.body;

    const existingRecipe = await ProductRecipe.findOne({ name });
    if (existingRecipe) {
        return res
            .status(400)
            .json({ message: "recipe with this name already exists" });
    }
    //
    try {
        const newRecipe = await ProductRecipe.create(req.body);
        res.status(201).json(newRecipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all product recipes
exports.getAllProductRecipes = async (req, res) => {
    try {
        const recipes = await ProductRecipe.find().populate("class_id");
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single product recipe by ID
exports.getProductRecipeById = async (req, res) => {
    try {
        const recipe = await ProductRecipe.findById(req.params.id).populate(
            "class_id"
        );
        res.status(200).json(recipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a product recipe by ID
exports.updateProductRecipeById = async (req, res) => {
    try {
        const updatedRecipe = await ProductRecipe.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate("class_id");
        res.status(200).json(updatedRecipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a product recipe by ID
exports.deleteProductRecipeById = async (req, res) => {
    try {
        const deletedRecipe = await ProductRecipe.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedRecipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
