const FoodPoint = require("../models/FoodPointModel");
const MenuItem = require("../models/MenuItemModel");
const foodPointController = {};

foodPointController.createFoodPoint = async (req, res) => {
    const { name, location, phone, email, gpsCoordinates, services, owner } = req.body;

    try {
        const foodPoint = await FoodPoint.create({
            name,
            location,
            phone,
            email,
            gpsCoordinates,
            services,
            owner,
        });

        res.send({ foodPoint });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

foodPointController.getAllFoodPoints = async (req, res) => {
    try {
        const foodPoints = await FoodPoint.find();


        res.send({ foodPoints });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

foodPointController.getFoodPointById = async (req, res) => {
    try {
        const foodPoint = await FoodPoint.findById(req.params.id).populate({
            path: "menu",
            populate: {
                path: "items",
                model: "MenuItem"
            }
        });

        if (!foodPoint) {
            return res.status(404).send({ message: "Food point not found" });
        }

        const filterProducts = foodPoint.menu.menuTypes.map((type) => {
            const filteredProducts = foodPoint.menu.items.filter(
                (product) => product.type === type
            );
            if (filteredProducts.length === 0) {
                return null; // Filter out categories with no products
            }
            return {
                type,
                products: filteredProducts,
            };
        }).filter(Boolean); // Filter out null values

        res.send({ name: foodPoint.name, filterProducts });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


foodPointController.getProductsByMealAndFoodPointId = async (req, res) => {
    const { mealType } = req.query;
    const { foodPointId } = req.params;

    if (!['Breakfast', 'Lunch', 'Dinner'].includes(mealType)) {
        return res.status(400).send({ message: 'Invalid meal type' });
    }

    try {
        const foodPoint = await FoodPoint.findById(foodPointId).populate({
            path: "menu",
            populate: {
                path: "items",
                model: "MenuItem",
                match: { meal: mealType }
            }
        });

        if (!foodPoint) {
            return res.status(404).send({ message: "Food point not found" });
        }

        const products = foodPoint.menu.items.filter((item) => item.meal === mealType);

        const filterProducts = foodPoint.menu.menuTypes.map((type) => {
            const filteredProducts = products.filter(
                (product) => product.type === type
            );
            if (filteredProducts.length === 0) {
                return null; // Filter out categories with no products
            }
            return {
                type,
                products: filteredProducts,
            };
        }).filter(Boolean); // Filter out null values

        res.send({ name: foodPoint.name, filterProducts });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


foodPointController.updateFoodPoint = async (req, res) => {
    const { name, location, phone, email, owner, gpsCoordinates, services } = req.body;

    try {
        const foodPoint = await FoodPoint.findByIdAndUpdate(
            req.params.id,
            {
                name,
                location,
                phone,
                gpsCoordinates,
                services,
                email,
                owner,
            },
            { new: true }
        )

        if (!foodPoint) {
            return res.status(404).send({ message: "Food point not found" });
        }

        res.send({ foodPoint });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

foodPointController.deleteFoodPoint = async (req, res) => {
    try {
        const foodPoint = await FoodPoint.findByIdAndDelete(req.params.id);
        if (!foodPoint) {
            return res.status(404).send({ message: "Food point not found" });
        }
        res.send({ message: "Food point deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

module.exports = foodPointController;
