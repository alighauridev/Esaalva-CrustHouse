// Import necessary modules
const express = require('express');
const router = express.Router();

// Import controllers
const administratorController = require('../controllers/Administrator');
const employeeController = require('../controllers/Employee');
const customerController = require('../controllers/Customer');
const menuController = require('../controllers/Menu');
const foodPointController = require('../controllers/FoodPoint');

// Administrator routes
// router.get('/administrators', administratorController.getAdministrators);
router.get('/administrators/:id', administratorController.getAdministratorById);
router.post('/administrators', administratorController.createAdministrator);
// router.put('/administrators/:id', administratorController.updateAdministrator);
// router.delete('/administrators/:id', administratorController.deleteAdministrator);

// Employee routes
// router.get('/employees', employeeController.getEmployees);
router.get('/employees/:id', employeeController.getEmployeeById);
router.post('/employees', employeeController.createEmployee);
// router.put('/employees/:id', employeeController.updateEmployee);
// router.delete('/employees/:id', employeeController.deleteEmployee);

// Customer routes
// router.get('/customers', customerController.getCustomers);
router.get('/customers/:id', customerController.getCustomerById);
router.post('/customers', customerController.createCustomer);
router.put('/customers/:id', customerController.updateCustomer);
router.delete('/customers/:id', customerController.deleteCustomer);

// Menu routes
router.get('/menus', menuController.getMenus);
// router.get('/menus/:id', menuController.getMenuById);
router.post('/menus', menuController.createMenu);
router.post('/menu-item', menuController.createMenuItem);
router.get('/menu-item/:id', menuController.getMenuItemById);
// router.put('/menus/:id', menuController.updateMenu);
// router.delete('/menus/:id', menuController.deleteMenu);

// FoodPoint routes
router.get('/foodpoints', foodPointController.getAllFoodPoints);
router.get('/foodpoints/:id', foodPointController.getFoodPointById);
router.post('/foodpoints', foodPointController.createFoodPoint);
router.put('/foodpoints/:id', foodPointController.updateFoodPoint);
router.delete('/foodpoints/:id', foodPointController.deleteFoodPoint);

// Export router
module.exports = router;
