const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    short_name: { type: String, required: true },
    price: { type: Number, required: true },
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductClass' },
    option_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductOption' },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
