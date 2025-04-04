const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

router.post('/secretkey', verifyAccessToken, AdminController.secretToken);
router.post('/aidescription', verifyAccessToken, AdminController.aiDescription);
router.get('/getcsv', AdminController.getCSV);

module.exports = router;
