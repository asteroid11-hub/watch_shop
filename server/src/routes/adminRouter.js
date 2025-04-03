const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');


router.get('/admin/secretKey', verifyAccessToken, AdminController.secretKey);