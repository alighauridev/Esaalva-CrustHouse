// Import necessary modules
const express = require("express");
const { getProductAvailables, getProductAvailableById, createProductAvailable, getAvailableProductsByBranch } = require("../controllers/availableProductController");
const { getAllBranches, getBranchById, createBranch } = require("../controllers/branchController");
const {
    createProductClass,
    getProductClass,
    getProductClasses,
} = require("../controllers/classController");
const { getCustomers, getCustomer, createCustomer } = require("../controllers/customerController");
const { getAllInventoryClasses, getInventoryClassById, createInventoryClass } = require("../controllers/InventoryClassControllers");
const { createInventoryItem, getInventoryItemById, getAllInventoryItems } = require("../controllers/InventoryItemController");
const { getInventoryLevels, getInventoryLevelById, createInventoryLevel } = require("../controllers/InventoryLevelController");
const {
    getProductOptions,
    getProductOptionById,
    createProductOption,
} = require("../controllers/optionController");
const { getAllOrderItems, getOrderItemById, createOrderItem } = require("../controllers/orderController");
const { getProductComposition, createProductComposition } = require("../controllers/productCompositionController");
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
const { getSalesOrders, getSalesOrderById, createSalesOrder } = require("../controllers/SalesOrderController");
const router = express.Router();

// class controllers
router.get("/class", getProductClasses);
router.get("/class/:id", getProductClass);
router.post("/class", createProductClass);
// inventory class controllers
router.get("/inventory-class", getAllInventoryClasses);
router.get("/inventory-class/:id", getInventoryClassById);
router.post("/inventory-class", createInventoryClass);
// inventory item controllers
router.get("/inventory-items", getAllInventoryItems);
router.get("/inventory-items/:id", getInventoryItemById);
router.post("/inventory-items", createInventoryItem);
// inventory level controllers
router.get("/inventory-level", getInventoryLevels);
router.get("/inventory-level/:id", getInventoryLevelById);
router.post("/inventory-level", createInventoryLevel);
// Customer controllers
router.get("/customer", getCustomers);
router.get("/customer/:id", getCustomer);
router.post("/customer", createCustomer);
// product composition controllers
router.get("/product-composition/:id", getProductComposition);
router.post("/product-composition", createProductComposition);
// recepie controllers
router.get("/recipe", getAllProductRecipes);
router.get("/recipe/:id", getProductRecipeById);
router.post("/recipe", createProductRecipe);
// sales order controllers
router.get("/sales-order", getSalesOrders);
router.get("/sales-order/:id", getSalesOrderById);
router.post("/sales-order", createSalesOrder);
// sales order controllers
router.get("/order-items", getAllOrderItems);
router.get("/order-items/:id", getOrderItemById);
router.post("/order-items", createOrderItem);
// order item controllers
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
router.get("/available-product/:id", getProductAvailableById);
router.post("/available", createProductAvailable);
router.get("/available-products/:id", getAvailableProductsByBranch);
// Export router
module.exports = router;
