const mongoose = require("mongoose");

const inventoryClassSchema = new mongoose.Schema({
    class_name: { type: String, required: true },
});

const InventoryClass = mongoose.model("InventoryClass", inventoryClassSchema);

module.exports = InventoryClass;
