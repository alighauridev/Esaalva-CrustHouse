const SalesOrder = require('../models/SalesOrderModel');

// Create a new sales order
const createSalesOrder = async (req, res) => {
    try {
        const salesOrder = new SalesOrder(req.body);
        await salesOrder.save();
        res.status(201).json(salesOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all sales orders
const getSalesOrders = async (req, res) => {
    try {
        const salesOrders = await SalesOrder.find()
            .populate('branch_id')
            .populate('customer_id');
        res.json(salesOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single sales order by ID
const getSalesOrderById = async (req, res) => {
    try {
        const salesOrder = await SalesOrder.findById(req.params.id)
            .populate('branch_id')
            .populate('customer_id');
        if (!salesOrder) {
            return res.status(404).json({ message: 'Sales order not found' });
        }
        res.json(salesOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a sales order by ID
const updateSalesOrderById = async (req, res) => {
    try {
        const salesOrder = await SalesOrder.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!salesOrder) {
            return res.status(404).json({ message: 'Sales order not found' });
        }
        res.json(salesOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a sales order by ID
const deleteSalesOrderById = async (req, res) => {
    try {
        const salesOrder = await SalesOrder.findByIdAndDelete(req.params.id);
        if (!salesOrder) {
            return res.status(404).json({ message: 'Sales order not found' });
        }
        res.json({ message: 'Sales order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createSalesOrder,
    getSalesOrders,
    getSalesOrderById,
    updateSalesOrderById,
    deleteSalesOrderById,
};
