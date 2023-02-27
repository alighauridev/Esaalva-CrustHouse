const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    city: { type: String },
    sector: { type: String },
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
    address: { type: String }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
