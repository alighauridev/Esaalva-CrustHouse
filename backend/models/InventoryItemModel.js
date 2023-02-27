const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
    item_code: { type: String, required: true },
    item_name: { type: String, required: true },
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryClass' },
    unit: { type: String }
});

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);

module.exports = InventoryItem;
