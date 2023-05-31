const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
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
    tables: [{
        type: String,
        required: true
    }],

    // expectedTime: {
    //     type: Date,
    //     required: true
    // },
    orderTime: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed'],
        default: 'Pending'
    },
    // paymentMethod: {
    //     type: String,
    //     enum: ['Credit Card', 'Debit Card', 'Mobile Banking', 'Cash On Delivery'],
    //     required: true
    // },
    totalPrice: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Order', orderSchema);
