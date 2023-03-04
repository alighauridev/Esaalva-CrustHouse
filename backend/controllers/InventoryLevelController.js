const InventoryLevel = require('../models/InventoryLevelModel');

// create a new inventory level record
exports.createInventoryLevel = async (req, res) => {
    try {
        const { item_code, branch_id, quantity_available } = req.body;
        const inventoryLevel = new InventoryLevel({
            item_code,
            branch_id,
            quantity_available
        });
        await inventoryLevel.save();
        res.status(201).json(inventoryLevel);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// get all inventory level records
exports.getInventoryLevels = async (req, res) => {
    try {
        const inventoryLevels = await InventoryLevel.find().populate('branch_id');
        res.status(200).json(inventoryLevels);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// get a single inventory level record by ID
exports.getInventoryLevelById = async (req, res) => {
    try {
        const inventoryLevel = await InventoryLevel.findById(req.params.id).populate('branch_id');
        if (!inventoryLevel) {
            return res.status(404).json({ message: 'Inventory level not found' });
        }
        res.status(200).json(inventoryLevel);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// update an existing inventory level record
exports.updateInventoryLevel = async (req, res) => {
    try {
        const { item_code, branch_id, quantity_available } = req.body;
        const inventoryLevel = await InventoryLevel.findByIdAndUpdate(
            req.params.id,
            { item_code, branch_id, quantity_available },
            { new: true }
        );
        if (!inventoryLevel) {
            return res.status(404).json({ message: 'Inventory level not found' });
        }
        res.status(200).json(inventoryLevel);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// delete an existing inventory level record
exports.deleteInventoryLevel = async (req, res) => {
    try {
        const inventoryLevel = await InventoryLevel.findByIdAndDelete(req.params.id);
        if (!inventoryLevel) {
            return res.status(404).json({ message: 'Inventory level not found' });
        }
        res.status(204).json();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
