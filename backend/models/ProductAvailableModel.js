const mongoose = require('mongoose');

const productAvailableSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
    quantity_available: { type: Boolean, required: true }
});

const ProductAvailable = mongoose.model('ProductAvailable', productAvailableSchema);

module.exports = ProductAvailable;
