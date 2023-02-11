const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },


});

module.exports = mongoose.model("ProductTest", productSchema);
