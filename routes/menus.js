const express = require('express');
const router = express.Router();

// Assume you have a MenuController with relevant methods
const MenuController = require('../controllers/menusController');
const authJwt = require('../middleware/auth');

// Get list of menus
router.get('/get-all', MenuController.getAllMenuItems);

router.get('/get-single/:id', MenuController.getSingleMenuItem);

// Add a new menu item (typically for chefs or admins)
router.post('/create',[authJwt.verifyToken,authJwt.isChef], MenuController.addMenu);

// Update a menu item
router.put('/update', [authJwt.verifyToken,authJwt.isChef],MenuController.updateMenu);

// Delete a menu item
router.delete('/delete/:id',[authJwt.verifyToken,authJwt.isChef], MenuController.deleteMenu);

module.exports = router;
