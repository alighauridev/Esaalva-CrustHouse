const OrderItem = require("../models/OrderItemModel");
const ProductComposition = require("../models/ProductCompositionModel");
const InventoryLevelSchema = require("../models/InventoryLevelModel");
const Product = require("../models/productModel");
const OrderOption = require("../models/orderOptionModel");

// create a new order item and decrease inventory level of item
const createOrderItem = async (req, res) => {
    const { order_id, product_id, quantity, branch_id, order_option_id } = req.body;

    try {
        // get product composition for product
        const productComposition = await ProductComposition.find({
            product_id: product_id,
        });

        // update inventory level for each item in product composition
        for (let item of productComposition) {
            const inventoryLevel = await InventoryLevelSchema.findOne({
                item_code: item.item_code,
                branch_id,
            });

            if (!inventoryLevel) {
                throw new Error(`Inventory level not found for item ${item.item_code} and branch ${req.branch_id}`);
            }

            inventoryLevel.quantity_available -= item.quantity * quantity;
            await inventoryLevel.save();
        }

        // create new order item
        const product = await Product.findById(product_id);
        const orderItem = new OrderItem({
            order_id: order_id,
            product_id: product_id,
            quantity: quantity,
            unit_price: product.price,
        });


        await orderItem.save();
        const orderOption = new OrderOption({
            Option_Id: order_option_id,
            Order_Item_Id: orderItem._id,

        });
        await orderOption.save();
        res.status(201).json({ orderItem, orderOption });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};


// Get all order items
const getAllOrderItems = async (req, res) => {
    try {
        const orderItems = await OrderItem.find();
        res.status(200).json({ orderItems });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error getting order items", error: error.message });
    }
};

// Get an order item by ID
const getOrderItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const orderItem = await OrderItem.findById(id);
        if (!orderItem) {
            return res.status(404).json({ message: "Order item not found" });
        }
        res.status(200).json({ orderItem });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error getting order item", error: error.message });
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
            return res.status(404).json({ message: "Order item not found" });
        }
        res
            .status(200)
            .json({ message: "Order item updated successfully", orderItem });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error updating order item", error: error.message });
    }
};

// Delete an order item
const deleteOrderItem = async (req, res) => {
    try {
        const { id } = req.params;
        const orderItem = await OrderItem.findByIdAndDelete(id);
        if (!orderItem) {
            return res.status(404).json({ message: "Order item not found" });
        }
        res
            .status(200)
            .json({ message: "Order item deleted successfully", orderItem });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error deleting order item", error: error.message });
    }
};

module.exports = {
    createOrderItem,
    getAllOrderItems,
    getOrderItemById,
    updateOrderItem,
    deleteOrderItem,
};
