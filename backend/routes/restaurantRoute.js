const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurant");

// get all res
router.get("/", restaurantController.getAllRestaurants);
// Create a new restaurant
router.post("/", restaurantController.createRestaurant);

// Get a single restaurant by ID
router.get("/:id", restaurantController.getRestaurantById);

// Update a restaurant by ID
router.put("/:id", restaurantController.updateRestaurant);

// Delete a restaurant by ID
router.delete("/:id", restaurantController.deleteRestaurant);

module.exports = router;
