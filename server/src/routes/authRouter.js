const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/auth/register', AuthController.registerUser);
router.post('/auth/login', AuthController.authenticateUser);
router.get('/auth/refresh', AuthController.refreshToken);
router.delete('/auth/logout', AuthController.logout);

module.exports = router;
