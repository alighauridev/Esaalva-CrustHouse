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

        await foodPoint.save();

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
const editMenu = async (req, res) => {
    try {
        // Find the menu to update by its ID
        const menuId = req.params.id;
        const menu = await Menu.findById(menuId);

        if (!menu) {
            return res.status(404).json({ message: "Menu not found" });
        }

        // Update the menu with the new data from the request body
        menu.name = req.body.name || menu.name;
        menu.description = req.body.description || menu.description;
        menu.menuTypes = req.body.menuTypes || menu.menuTypes;
        menu.items = req.body.items || menu.items;

        // Save the updated menu
        await menu.save();

        res.json(menu);
    } catch (error) {
        // Handle any errors that occur during the update of the menu
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
const getMenuItemsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        // const menuItems = await MenuItem.find({ category }).populate('menu');
        const menuItems = await MenuItem.find({ category }).populate({
            path: "menu",
            populate: {
                path: "foodPoint",
                model: "FoodPoint",
            },
        });
        res.status(200).json({ menuItems });
    } catch (err) {
        res.status(500).json({ error: err.message });
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
            meal: req.body.meal,
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
        // Find the menu item in the database by ID and populate its "foodPoint" field with the desired fields from the "FoodPoint" model
        const menuItem = await MenuItem.findById(req.params.id).populate(
            "foodPoint",
            "name gpsCoordinates"
        );

        // Find all menu items in the database that have the same category and type as the selected menu item, but exclude the selected menu item itself
        const similarItems = await MenuItem.find({
            name: menuItem.name,
            _id: { $ne: menuItem._id },
        }).populate("foodPoint", "name gpsCoordinates");
        const uniqueItems = [];
        for (const item of similarItems) {


            uniqueItems.push(item);

        }
        // Return the menu item and the similar items as a JSON response
        res.json({ menuItem, uniqueItems });
    } catch (error) {
        // Handle any errors that occur during the retrieval of the menu items
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
const updateMenuItem = async (req, res) => {
    try {
        // Find the menu item to be updated
        const menuItem = await MenuItem.findById(req.params.id);

        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        // Update the menu item using the request body
        menuItem.name = req.body.name;
        menuItem.description = req.body.description;
        menuItem.price = req.body.price;
        menuItem.image = req.body.image;
        menuItem.meal = req.body.meal;
        menuItem.foodPoint = req.body.foodPoint;

        // Save the updated menu item to the database
        await menuItem.save();

        // Return the updated menu item as a JSON response
        res.json(menuItem);
    } catch (error) {
        // Handle any errors that occur during the update of the menu item
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


// exports.getItemById = async (req, res, next) => {
//     try {
//         const item = await Item.findById(req.params.id);
//         if (!item) {
//             return res.status(404).json({ message: "Item not found" });
//         }
//         const similarItems = await Item.find({
//             $and: [
//                 { _id: { $ne: item._id } },
//                 { type: item.type },
//                 { category: item.category }
//             ]
//         }).limit(3);

//         res.status(200).json({ item, similarItems });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

module.exports = {
    createMenu,
    getMenus,
    createMenuItem,
    getMenuItems,
    getMenuItemById,
    getMenuItemsByCategory,
    editMenu,
    updateMenuItem
};
