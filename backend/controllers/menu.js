const Menu = require('../models/menuModel');
const Category = require('../models/categoryModel');
const Product = require('../models/productModel');

// Get all menus
exports.getAllMenus = async (req, res) => {
    try {
        const menusData = await Menu.find().populate('items');
        const categories = await Category.find({})

        const data = categories.map((category) => {
            const filteredProducts = menusData[0].items.filter((product) => product.category === category.name);
            return {
                category,
                products: filteredProducts,
            };
        });
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get a menu by id
exports.getMenuById = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id).populate('restaurant items')
        if (!menu) {
            return res.status(404).json({ message: 'Menu not found' });
        }
        res.json(menu);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create a new menu
exports.createMenu = async (req, res) => {
    const { categories, image } = req.body;

    try {
        const menu = new Menu({ categories, image });
        await menu.save();
        res.json(menu);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update a menu by id
exports.updateMenuById = async (req, res) => {
    const { categories, image } = req.body;

    try {
        const menu = await Menu.findByIdAndUpdate(
            req.params.id,
            { categories, image },
            { new: true }
        );
        if (!menu) {
            return res.status(404).json({ message: 'Menu not found' });
        }
        res.json(menu);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete a menu by id
exports.deleteMenuById = async (req, res) => {
    try {
        const menu = await Menu.findByIdAndDelete(req.params.id);
        if (!menu) {
            return res.status(404).json({ message: 'Menu not found' });
        }
        res.json({ message: 'Menu deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
