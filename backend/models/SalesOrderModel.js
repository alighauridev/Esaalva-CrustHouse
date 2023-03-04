const mongoose = require('mongoose');

const salesOrderSchema = new mongoose.Schema({
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    time_initiated: { type: Date, default: Date.now },
    status: { type: String, required: true },
    amount: { type: Number, required: true },
    payment_status: { type: String, required: true }
});

const SalesOrder = mongoose.model('SalesOrder', salesOrderSchema);

module.exports = SalesOrder;
