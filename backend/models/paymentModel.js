const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesOrder' },
    payment_time: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    status: { type: Number, required: true }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
