const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu');

// Get all menus
router.get('/', menuController.getAllMenus);

// Get a menu by id
router.get('/:id', menuController.getMenuById);

// Create a new menu
router.post('/', menuController.createMenu);

// Update a menu by id
router.put('/:id', menuController.updateMenuById);

// Delete a menu by id
router.delete('/:id', menuController.deleteMenuById);

module.exports = router;
