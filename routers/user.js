const express = require('express');
const { registerUser, handleLogin} = require('../controllers/user');
const router = express.Router();

// POST a new user to register
router.post('/register', registerUser);

// Login route can be added
router.post('/login', handleLogin)

module.exports = router;