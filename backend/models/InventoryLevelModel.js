const mongoose = require('mongoose');

const inventoryLevelSchema = new mongoose.Schema({
    item_code: { type: String, required: true },
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
    quantity_available: { type: Number, required: true }
});

const InventoryLevel = mongoose.model('InventoryLevel', inventoryLevelSchema);

module.exports = InventoryLevel;
