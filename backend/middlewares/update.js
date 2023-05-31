const Restaurant = require("../models/restaurantModel");
const Menu = require("../models/menuModel");
const Item = require("../models/productModel");

// Define the middleware function
const updateMenuAndItems = function (next) {
    // Get the current category list for the restaurant
    const currentCategories = this.categories;

    // Find the corresponding menu document for this restaurant
    Menu.findOne({ restaurantId: this._id }, function (err, menu) {
        if (err) {
            return next(err);
        }

        // Update the menu document's categories to match the current categories
        menu.categories = currentCategories;

        // Save the updated menu document
        menu.save(function (err) {
            if (err) {
                return next(err);
            }

            // Update the items in the database to match the new menu
            Item.updateMany(
                { category: { $nin: currentCategories } },
                { $set: { active: false } },
                function (err) {
                    if (err) {
                        return next(err);
                    }

                    Item.updateMany(
                        { category: { $in: currentCategories } },
                        { $set: { active: true } },
                        function (err) {
                            if (err) {
                                return next(err);
                            }

                            // Continue with the next middleware or route handler
                            next();
                        }
                    );
                }
            );
        });
    });
};

module.exports = updateMenuAndItems;
