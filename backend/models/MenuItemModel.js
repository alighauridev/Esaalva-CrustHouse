const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    menu: {
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
