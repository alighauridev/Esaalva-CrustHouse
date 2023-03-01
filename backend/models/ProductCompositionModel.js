const mongoose = require("mongoose");

const productCompositionSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    item_code: {
        type: String,
        required: true,
    },
    quantity: { type: Number, required: true },
});

const Product = mongoose.model("ProductComposition", productCompositionSchema);

module.exports = Product;
