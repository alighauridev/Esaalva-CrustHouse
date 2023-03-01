const mongoose = require('mongoose');

const productOptionSchema = new mongoose.Schema({
    option_name: { type: String, required: true },
    option_set: { type: Number, required: true },
    price: { type: Number, required: true },
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductClass' },
});

const ProductOption = mongoose.model('ProductOption', productOptionSchema);

module.exports = ProductOption;
