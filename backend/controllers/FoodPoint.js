const FoodPoint = require("../models/FoodPointModel");

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
        });;

        if (!foodPoint) {
            return res.status(404).send({ message: "Food point not found" });
        }

        const filterProducts = foodPoint.menu.menuTypes.map((type) => {
            const filteredProducts = foodPoint.menu.items.filter(
                (product) => product.type === type
            );
            return {
                type,
                products: filteredProducts,
            };
        })

        res.send({ filterProducts });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

foodPointController.updateFoodPoint = async (req, res) => {
    const { name, location, phone, email, owner } = req.body;

    try {
        const foodPoint = await FoodPoint.findByIdAndUpdate(
            req.params.id,
            {
                name,
                location,
                phone,
                email,
                owner,
            },
            { new: true }
        ).populate("owner");

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
