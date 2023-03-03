const InventoryItem = require('../models/inventoryItem');

// Get all inventory items
exports.getAllInventoryItems = async (req, res) => {
    try {
        const inventoryItems = await InventoryItem.find().populate('class_id');
        res.json(inventoryItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single inventory item by ID
exports.getInventoryItemById = async (req, res) => {
    try {
        const inventoryItem = await InventoryItem.findById(req.params.id).populate('class_id');
        if (!inventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.json(inventoryItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new inventory item
exports.createInventoryItem = async (req, res) => {
    const inventoryItem = new InventoryItem({
        item_code: req.body.item_code,
        item_name: req.body.item_name,
        class_id: req.body.class_id,
        unit: req.body.unit
    });

    try {
        const newInventoryItem = await inventoryItem.save();
        res.status(201).json(newInventoryItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing inventory item
exports.updateInventoryItem = async (req, res) => {
    try {
        const inventoryItem = await InventoryItem.findById(req.params.id);
        if (!inventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        inventoryItem.item_code = req.body.item_code || inventoryItem.item_code;
        inventoryItem.item_name = req.body.item_name || inventoryItem.item_name;
        inventoryItem.class_id = req.body.class_id || inventoryItem.class_id;
        inventoryItem.unit = req.body.unit || inventoryItem.unit;

        const updatedInventoryItem = await inventoryItem.save();
        res.json(updatedInventoryItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an inventory item
exports.deleteInventoryItem = async (req, res) => {
    try {
        const inventoryItem = await InventoryItem.findById(req.params.id);
        if (!inventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        await inventoryItem.remove();
        res.json({ message: 'Inventory item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
