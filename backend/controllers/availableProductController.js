const ProductAvailable = require('../models/ProductAvailableModel');

// Get all product availables
exports.getProductAvailables = async (req, res) => {
    try {
        const productAvailables = await ProductAvailable.find()
            .populate({
                path: "product_id",
                model: "Product",
                populate: {
                    path: "class_id",
                    model: "ProductClass"
                }
            })
            .populate("branch_id class_id");

        res.json(productAvailables);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAvailableProductsByBranchAndClass = async (req, res) => {
    try {
        const branchId = req.params.branchId;
        const classId = req.params.classId;

        const products = await ProductAvailable.find({
            branch_id: branchId,
            quantity_available: true
        })
            .populate({
                path: "product_id",
                model: "Product",
                populate: {
                    path: "class_id",
                    model: "ProductClass",
                    match: { _id: classId } // filter by class
                }
            });

        // Remove products without a matching class
        const filteredProducts = products.filter((product) => {
            return product.product_id.class_id != null;
        });

        res.json(filteredProducts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getAvailableProductsByBranch = async (req, res) => {
    try {
        const branchId = req.params.id;
        const products = await ProductAvailable.find({ branch_id: branchId, is_available: true })
            .populate({
                path: "product_id",
                model: "Product",
                populate: {
                    path: "class_id",
                    model: "ProductClass"
                }
            })

        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};



// Get a single product available by ID
exports.getProductAvailableById = async (req, res) => {
    try {
        const productAvailable = await ProductAvailable.findById(req.params.id);
        res.json(productAvailable);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new product available
exports.createProductAvailable = async (req, res) => {
    const productAvailable = new ProductAvailable({
        product_id: req.body.product_id,
        branch_id: req.body.branch_id,
        quantity_available: req.body.quantity_available
    });

    try {
        const newProductAvailable = await productAvailable.save();
        res.status(201).json(newProductAvailable);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a product available by ID
exports.updateProductAvailableById = async (req, res) => {
    try {
        const productAvailable = await ProductAvailable.findById(req.params.id);
        if (req.body.product_id != null) {
            productAvailable.product_id = req.body.product_id;
        }
        if (req.body.branch_id != null) {
            productAvailable.branch_id = req.body.branch_id;
        }
        if (req.body.quantity_available != null) {
            productAvailable.quantity_available = req.body.quantity_available;
        }
        const updatedProductAvailable = await productAvailable.save();
        res.json(updatedProductAvailable);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a product available by ID
exports.deleteProductAvailableById = async (req, res) => {
    try {
        const deletedProductAvailable = await ProductAvailable.findByIdAndDelete(req.params.id);
        res.json(deletedProductAvailable);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
