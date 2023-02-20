const Restaurant = require("../models/restaurantModel");
const Category = require("../models/categoryModel");
exports.getAllRestaurants = async (req, res) => {
    try {
        const categories = await Category.find({});

        const restaurants = await Restaurant.find()
            .populate("menu", "name")
            .populate({
                path: "menu",
                populate: {
                    path: "items",
                    model: "Item",
                },
            });
        const data = categories.map((category) => {
            const filteredProducts = restaurants[0].menu.items.filter(
                (product) => product.category === category.name
            );
            return {
                category,
                products: filteredProducts,
            };
        });
        res.status(200).json(restaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Create a new restaurant
exports.createRestaurant = async (req, res) => {
    try {
        const restaurant = new Restaurant(req.body);
        await restaurant.save();
        res.status(201).json({ restaurant });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single restaurant by ID
exports.getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id).populate(
            "menu ratings"
        );
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }
        res.json({ restaurant });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a restaurant by ID
exports.updateRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }
        res.json({ restaurant });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a restaurant by ID
exports.deleteRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }
        res.json({ message: "Restaurant deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
