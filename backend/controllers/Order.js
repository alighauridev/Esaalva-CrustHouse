const Order = require("../models/OrderModel");

const Table = require("../models/TableModel");
// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get single order by ID
const getOrdersByUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const orders = await Order.find({ user: userId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new order

const createOrder = async (req, res) => {
    const expectedNumberOfGuests = req.body.expectedNumberOfGuests;
    let assignedTables = [];

    try {
        // Find available tables of the requested type and with sufficient capacity
        let remainingCapacity = expectedNumberOfGuests;
        while (remainingCapacity > 0) {
            const table = await Table.findOneAndUpdate({
                tableType: req.body.tableType,
                capacity: { $gte: remainingCapacity },
                isAvailable: true
            }, { $set: { isAvailable: false } });

            if (!table) {
                // If no available table is found, undo all assignments and throw an error
                assignedTables.forEach(async (assignedTable) => {
                    await Table.findByIdAndUpdate(assignedTable._id, { $set: { isAvailable: true } });
                });
                throw new Error('No available table found');
            }

            assignedTables.push(table);
            remainingCapacity -= table.capacity;
        }

        // Create the order with the assigned tables
        const order = new Order({
            user: req.body.user,
            items: req.body.items,
            status: req.body.status,
            tables: assignedTables.map(table => table._id),
            totalPrice: req.body.totalPrice
        });
        const newOrder = await order.save();

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};




// Delete order by ID
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        await order.remove();
        res.status(200).json({ message: "Order deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update order status by ID
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('tables');
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        const previousStatus = order.status;
        order.status = req.body.status;
        const updatedOrder = await order.save();

        // Check if the status was updated to 'Completed'
        if (previousStatus !== 'Completed' && req.body.status === 'Completed') {
            // Update the tables' availability
            for (const table of order.tables) {
                await Table.findByIdAndUpdate(table._id, { $set: { isAvailable: true } });
            }
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    deleteOrder,
    getOrdersByUser
};
