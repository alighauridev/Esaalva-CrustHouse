const Branch = require('../models/BranchModel');

// Create a new branch
exports.createBranch = async (req, res) => {
    const { branch_name } = req.body;

    const existingBranch = await Branch.findOne({ branch_name });
    if (existingBranch) {
        return res
            .status(400)
            .json({ message: "Branch with this name already exists" });
    }
    try {
        const branch = new Branch(req.body);
        await branch.save();
        res.status(201).json(branch);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all branches
exports.getAllBranches = async (req, res) => {
    try {
        const branches = await Branch.find();
        res.status(200).json(branches);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get a single branch by id
exports.getBranchById = async (req, res) => {
    try {
        const branch = await Branch.findById(req.params.id);
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }
        res.status(200).json(branch);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update a branch by id
exports.updateBranchById = async (req, res) => {
    try {
        const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }
        res.status(200).json(branch);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete a branch by id
exports.deleteBranchById = async (req, res) => {
    try {
        const branch = await Branch.findByIdAndDelete(req.params.id);
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }
        res.status(200).json({ message: 'Branch deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
