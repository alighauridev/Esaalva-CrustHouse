const Menu = require("../models/menuModel");
const MenuItem = require("../models/MenuItemModel");
const FoodPoint = require("../models/FoodPointModel");

// Create a new menu
const createMenu = async (req, res) => {
    try {
        // Create a new menu using the request body
        const menu = new Menu({
            foodPoint: req.body.foodPoint,
            name: req.body.name,
            description: req.body.description,
            menuTypes: req.body.menuTypes,
            categories: req.body.categories,
        });

        // Save the menu item to the database
        await menu.save();

        // Find the menu associated with the menu item
        const foodPoint = await FoodPoint.findById(req.body.foodPoint);

        // Add the menu item to the menu's list of items
        foodPoint.menu = menu._id;

        await FoodPoint.save();

        res.json(menu);
    } catch (error) {
        // Handle any errors that occur during the creation of the menu
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get all menus
const getMenus = async (req, res) => {
    try {
        // Find all menus in the database
        const menus = await Menu.find();

        // Return the menus as a JSON response
        res.json(menus);
    } catch (error) {
        // Handle any errors that occur during the retrieval of the menus
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Create a new menu item
const createMenuItem = async (req, res) => {
    try {
        // Create a new menu item using the request body
        const menuItem = new MenuItem({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            category: req.body.category,
            menu: req.body.menu,
        });

        // Save the menu item to the database
        await menuItem.save();

        // Find the menu associated with the menu item
        const menu = await Menu.findById(req.body.menu);

        // Add the menu item to the menu's list of items
        menu.items.push(menuItem._id);

        // Save the updated menu to the database
        await menu.save();

        // Return the newly created menu item as a JSON response
        res.json(menuItem);
    } catch (error) {
        // Handle any errors that occur during the creation of the menu item
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get all menu items
const getMenuItems = async (req, res) => {
    try {
        // Find all menu items in the database
        const menuItems = await MenuItem.find();

        // Return the menu items as a JSON response
        res.json(menuItems);
    } catch (error) {
        // Handle any errors that occur during the retrieval of the menu items
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
const getMenuItemById = async (req, res) => {
    try {
        // Find all menu items in the database
        const menuItem = await MenuItem.findById(req.params.id);

        // Return the menu items as a JSON response
        res.json(menuItem);
    } catch (error) {
        // Handle any errors that occur during the retrieval of the menu items
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    createMenu,
    getMenus,
    createMenuItem,
    getMenuItems,
    getMenuItemById
};