const express = require('express');
const router = express.Router();

// Assume you have a UserController with relevant methods
const UserController = require('../controllers/usersController');
const authJwt = require('../middleware/auth');

// Register a new user
router.post('/register', UserController.register);



// Register a new chef user
router.post('/register-chef', UserController.registerChef);

// User login
router.post('/login', UserController.login);


// Update user profile
router.put('/profile',[authJwt.verifyToken], UserController.updateProfile);

// get analytics
router.get('/get-analytics',[authJwt.verifyToken,authJwt.isChef], UserController.getAnalytics);

module.exports = router;
