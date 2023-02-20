const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({

    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;