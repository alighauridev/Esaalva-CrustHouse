const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    foodPoint: {
        type: Schema.Types.ObjectId,
        ref: 'FoodPoint'
    },
    items: [{
        item: {
            type: Schema.Types.ObjectId,
            ref: 'MenuItem'
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    table: {
        type: Number
    },
    expectedTime: {
        type: Date,
        required: true
    },
    orderTime: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Delivered'],
        default: 'Pending'
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'Mobile Banking', 'Cash On Delivery'],
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Order', orderSchema);
