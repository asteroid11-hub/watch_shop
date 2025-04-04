const express = require('express');
const multer = require('multer');
const WatchController = require('../controllers/WatchController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const watchRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/watch/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

watchRouter
  .route('/')
  .get(WatchController.getAll)
  .post(verifyAccessToken, upload.single('file'), WatchController.createWatch);

watchRouter
  .route('/:id')
  .get(WatchController.getOneWatch)
  .put(verifyAccessToken, upload.single('file'), WatchController.updateWatch)
  .delete(verifyAccessToken, WatchController.deleteWatch);

module.exports = watchRouter;
