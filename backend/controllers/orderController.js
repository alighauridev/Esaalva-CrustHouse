const OrderItem = require('../models/orderItem');

// Create a new order item
const createOrderItem = async (req, res) => {
    try {
        const { order_id, product_id, quantity, unit_price } = req.body;
        const orderItem = new OrderItem({ order_id, product_id, quantity, unit_price });
        await orderItem.save();
        res.status(201).json({ message: 'Order item created successfully', orderItem });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order item', error: error.message });
    }
};

// Get all order items
const getAllOrderItems = async (req, res) => {
    try {
        const orderItems = await OrderItem.find();
        res.status(200).json({ orderItems });
    } catch (error) {
        res.status(500).json({ message: 'Error getting order items', error: error.message });
    }
};

// Get an order item by ID
const getOrderItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const orderItem = await OrderItem.findById(id);
        if (!orderItem) {
            return res.status(404).json({ message: 'Order item not found' });
        }
        res.status(200).json({ orderItem });
    } catch (error) {
        res.status(500).json({ message: 'Error getting order item', error: error.message });
    }
};

// Update an order item
const updateOrderItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { order_id, product_id, quantity, unit_price } = req.body;
        const orderItem = await OrderItem.findByIdAndUpdate(
            id,
            { order_id, product_id, quantity, unit_price },
            { new: true }
        );
        if (!orderItem) {
            return res.status(404).json({ message: 'Order item not found' });
        }
        res.status(200).json({ message: 'Order item updated successfully', orderItem });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order item', error: error.message });
    }
};

// Delete an order item
const deleteOrderItem = async (req, res) => {
    try {
        const { id } = req.params;
        const orderItem = await OrderItem.findByIdAndDelete(id);
        if (!orderItem) {
            return res.status(404).json({ message: 'Order item not found' });
        }
        res.status(200).json({ message: 'Order item deleted successfully', orderItem });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order item', error: error.message });
    }
};

module.exports = { createOrderItem, getAllOrderItems, getOrderItemById, updateOrderItem, deleteOrderItem };
