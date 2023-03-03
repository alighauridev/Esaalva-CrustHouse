const Customer = require('../models/CustomerModel');

// Create a new customer
exports.createCustomer = async (req, res) => {
    try {
        const customer = new Customer(req.body);
        const savedCustomer = await customer.save();
        res.status(201).json(savedCustomer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all customers
exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().populate('branch_id');
        res.json(customers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single customer
exports.getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id).populate('branch_id');
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(customer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a customer
exports.updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        Object.assign(customer, req.body);
        const updatedCustomer = await customer.save();
        res.json(updatedCustomer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        await customer.remove();
        res.json({ message: 'Customer deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
