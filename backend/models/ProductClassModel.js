const mongoose = require('mongoose');

const productClassSchema = new mongoose.Schema({
    class_name: { type: String, required: true },
});

const ProductClass = mongoose.model('ProductClass', productClassSchema);

module.exports = ProductClass;
