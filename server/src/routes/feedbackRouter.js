const express = require('express');
const multer = require('multer');
const FeedbackController = require('../controllers/FeedbackController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/feedback/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

const feedbackRouter = express.Router();

feedbackRouter
  .route('/')
  .get(FeedbackController.getAllFeedbacks)
  .post(upload.single('file'), FeedbackController.createFeedback);

feedbackRouter.route('/:id').delete(FeedbackController.deleteFeedback);

module.exports = feedbackRouter;
