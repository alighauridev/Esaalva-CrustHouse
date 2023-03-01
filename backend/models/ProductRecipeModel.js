const mongoose = require('mongoose');

const productRecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductClass' },
});

const ProductRecipe = mongoose.model('ProductRecipe', productRecipeSchema);

module.exports = ProductRecipe;
