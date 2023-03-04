const InventoryClass = require('../models/InventoryClassModel');

// GET all inventory classes
const getAllInventoryClasses = async (req, res) => {

    try {
        const inventoryClasses = await InventoryClass.find({});
        res.status(200).json(inventoryClasses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// GET an inventory class by ID
const getInventoryClassById = async (req, res) => {
    try {
        const inventoryClass = await InventoryClass.findById(req.params.id);
        if (!inventoryClass) {
            return res.status(404).json({ message: 'Inventory class not found' });
        }
        res.status(200).json(inventoryClass);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// POST a new inventory class
const createInventoryClass = async (req, res) => {
    const { class_name } = req.body;

    // Check if a class with the same name already exists
    const existingClass = await InventoryClass.findOne({ class_name });
    if (existingClass) {
        return res.status(400).json({ message: 'Class with this name already exists' });
    }
    try {
        const { class_name } = req.body;
        const inventoryClass = new InventoryClass({ class_name });
        await inventoryClass.save();
        res.status(201).json(inventoryClass);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// PUT (update) an inventory class by ID
const updateInventoryClassById = async (req, res) => {
    try {
        const inventoryClass = await InventoryClass.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!inventoryClass) {
            return res.status(404).json({ message: 'Inventory class not found' });
        }
        res.status(200).json(inventoryClass);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// DELETE an inventory class by ID
const deleteInventoryClassById = async (req, res) => {
    try {
        const inventoryClass = await InventoryClass.findByIdAndDelete(req.params.id);
        if (!inventoryClass) {
            return res.status(404).json({ message: 'Inventory class not found' });
        }
        res.status(204).json();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllInventoryClasses,
    getInventoryClassById,
    createInventoryClass,
    updateInventoryClassById,
    deleteInventoryClassById,
};
