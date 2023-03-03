// Import necessary modules
const express = require("express");
const { getProductAvailables, getProductAvailableById, createProductAvailable } = require("../controllers/availableProductController");
const { getAllBranches, getBranchById, createBranch } = require("../controllers/branchController");
const {
    createProductClass,
    getProductClass,
    getProductClasses,
} = require("../controllers/classController");
const {
    getProductOptions,
    getProductOptionById,
    createProductOption,
} = require("../controllers/optionController");
const {
    getProducts,
    getProductById,
    createProduct,
} = require("../controllers/productController");
const {
    getAllProductRecipes,
    getProductRecipeById,
    createProductRecipe,
} = require("../controllers/recepieController");
const router = express.Router();

// class controllers
router.get("/class", getProductClasses);
router.get("/class/:id", getProductClass);
router.post("/class", createProductClass);
// recepie controllers
router.get("/recipe", getAllProductRecipes);
router.get("/recipe/:id", getProductRecipeById);
router.post("/recipe", createProductRecipe);
// productOptions controllers
router.get("/option", getProductOptions);
router.get("/option/:id", getProductOptionById);
router.post("/option", createProductOption);
// product controllers
router.get("/product", getProducts);
router.get("/product/:id", getProductById);
router.post("/product", createProduct);
// branch controllers
router.get("/branch", getAllBranches);
router.get("/branch/:id", getBranchById);
router.post("/branch", createBranch);
// branch controllers
router.get("/available", getProductAvailables);
router.get("/available/:id", getProductAvailableById);
router.post("/available", createProductAvailable);
// Export router
module.exports = router;
