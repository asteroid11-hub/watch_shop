const express = require('express');
const MarketingController = require('../controllers/MarketingController');
const multer = require('multer');

const marketingRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/marketing/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

marketingRouter
  .route('/')
  .get(MarketingController.getAll)
  .post(upload.single('image'), MarketingController.create);

marketingRouter
  .route('/:id')
  .get(MarketingController.getOne)
  .put(upload.single('image'), MarketingController.update)
  .delete(MarketingController.delete);

module.exports = marketingRouter;
