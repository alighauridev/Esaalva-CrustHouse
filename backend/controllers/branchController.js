const Branch = require('../models/Branch');

// Get all branches
exports.getBranches = async (req, res) => {
    try {
        const branches = await Branch.find();
        res.status(200).json(branches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new branch
exports.createBranch = async (req, res) => {
    const branch = new Branch({
        branch_name: req.body.branch_name
    });

    try {
        const newBranch = await branch.save();
        res.status(201).json(newBranch);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a single branch
exports.getBranch = async (req, res) => {
    try {
        const branch = await Branch.findById(req.params.id);
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }
        res.status(200).json(branch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a branch
exports.updateBranch = async (req, res) => {
    try {
        const branch = await Branch.findById(req.params.id);
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }
        branch.branch_name = req.body.branch_name;
        const updatedBranch = await branch.save();
        res.status(200).json(updatedBranch);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a branch
exports.deleteBranch = async (req, res) => {
    try {
        const branch = await Branch.findById(req.params.id);
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }
        await branch.remove();
        res.status(200).json({ message: 'Branch deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
