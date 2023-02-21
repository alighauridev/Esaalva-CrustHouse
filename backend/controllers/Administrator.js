const Administrator = require('../models/AdministratorModel');

const administratorController = {};

// Create a new administrator
administratorController.createAdministrator = async (req, res) => {
    try {
        const administrator = new Administrator(req.body);
        await administrator.save();
        res.status(201).send(administrator);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

// Get all administrators
administratorController.getAllAdministrators = async (req, res) => {
    try {
        const administrators = await Administrator.find();
        res.status(200).send(administrators);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

// Get an administrator by ID
administratorController.getAdministratorById = async (req, res) => {
    try {
        const administrator = await Administrator.findById(req.params.id);
        if (!administrator) {
            return res.status(404).send();
        }
        res.status(200).send(administrator);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

// Update an administrator by ID
administratorController.updateAdministratorById = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const administrator = await Administrator.findById(req.params.id);
        if (!administrator) {
            return res.status(404).send();
        }

        updates.forEach((update) => (administrator[update] = req.body[update]));
        await administrator.save();

        res.status(200).send(administrator);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

// Delete an administrator by ID
administratorController.deleteAdministratorById = async (req, res) => {
    try {
        const administrator = await Administrator.findByIdAndDelete(req.params.id);
        if (!administrator) {
            return res.status(404).send();
        }
        res.status(200).send(administrator);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

module.exports = administratorController;
