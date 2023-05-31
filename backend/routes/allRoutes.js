// Import necessary modules
const express = require("express");
const router = express.Router();

// Import controllers
const administratorController = require("../controllers/Administrator");
const employeeController = require("../controllers/Employee");
const customerController = require("../controllers/Customer");
const menuController = require("../controllers/Menu");
const orderController = require("../controllers/Order");
const foodPointController = require("../controllers/FoodPoint");

// Administrator routes
// router.get('/administrators', administratorController.getAdministrators);
router.get("/administrators/:id", administratorController.getAdministratorById);
router.post("/administrators", administratorController.createAdministrator);
// router.put('/administrators/:id', administratorController.updateAdministrator);
// router.delete('/administrators/:id', administratorController.deleteAdministrator);

// Employee routes
// router.get('/employees', employeeController.getEmployees);
router.get("/employees/:id", employeeController.getEmployeeById);
router.post("/employees", employeeController.createEmployee);
// router.put('/employees/:id', employeeController.updateEmployee);
// router.delete('/employees/:id', employeeController.deleteEmployee);

// Customer routes
// router.get('/customers', customerController.getCustomers);
router.get("/customers/:id", customerController.getCustomerById);
router.post("/customers", customerController.createCustomer);
router.put("/customers/:id", customerController.updateCustomer);
router.delete("/customers/:id", customerController.deleteCustomer);

// Menu routes
router.get("/menus", menuController.getMenus);
router.post("/menus", menuController.createMenu);
router.put("/menu/:id", menuController.editMenu);
router.post("/menu-item", menuController.createMenuItem);
router.put("/menu-item/:id", menuController.updateMenuItem);
router.get("/menu-items", menuController.getMenuItems);
router.get("/menu-item/:id", menuController.getMenuItemById);
router.get("/menu-itemm/:category", menuController.getMenuItemsByCategory);
// router.put('/menus/:id', menuController.updateMenu);
// router.get('/menus/:id', menuController.getMenuById);
// router.delete('/menus/:id', menuController.deleteMenu);

// FoodPoint routes
router.get("/foodpoints", foodPointController.getAllFoodPoints);
router.get("/foodpoints/:id", foodPointController.getFoodPointById);
router.get(
    "/foodpoints/:foodPointId/products",
    foodPointController.getProductsByMealAndFoodPointId
);
router.post("/foodpoints", foodPointController.createFoodPoint);
router.put("/foodpoints/:id", foodPointController.updateFoodPoint);
router.delete("/foodpoints/:id", foodPointController.deleteFoodPoint);

// order routes
router.get("/order", orderController.getAllOrders);
router.get("/order/:id", orderController.getOrdersByUser);
router.post("/order", orderController.createOrder);
router.put("/order/:id", orderController.updateOrderStatus);
router.delete("/order/:id", orderController.deleteOrder);

// Export router
// easypaisa integration

router.post("/easypaisa/initiate-transaction", async (req, res) => {
    const { signature, request } = req.body;

    if (!signature || !request) {
        return res
            .status(400)
            .json({ message: "Signature and request are required" });
    }

    const response = await initiateTransaction(signature, request);

    if (!response) {
        return res.status(500).json({ message: "Error initiating transaction" });
    }

    return res.json(response);
});

module.exports = router;
