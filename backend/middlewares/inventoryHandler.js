const OrderItem = require('../models/orderItem');
const InventoryLevel = require('../models/inventoryLevel');

// Middleware function to update inventory level when an order item is saved
OrderItem.post('save', async function (doc, next) {
    try {
        // Find the corresponding inventory level entry
        const inventoryLevel = await InventoryLevel.findOne({
            Item_Code: doc.product_id,
            Branch_Id: doc.order_id.branch_id
        });

        if (!inventoryLevel) {
            // Inventory level entry doesn't exist, create a new one
            const newInventoryLevel = new InventoryLevel({
                Item_Code: doc.product_id,
                Branch_Id: doc.order_id.branch_id,
                Quantity_Available: -doc.quantity
            });
            await newInventoryLevel.save();
        } else {
            // Update the existing inventory level entry
            inventoryLevel.Quantity_Available -= doc.quantity;
            await inventoryLevel.save();
        }
        next();
    } catch (error) {
        next(error);
    }
});

// Other controller methods for OrderItem
