const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    menu: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
});

const Product = mongoose.model("Item", itemSchema);

module.exports = Product;
