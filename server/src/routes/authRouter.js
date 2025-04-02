const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/auth/register', AuthController.registerUser);
router.post('/auth/login', AuthController.authenticateUser);

module.exports = router;
