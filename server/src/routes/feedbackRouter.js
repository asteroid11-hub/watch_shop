const express = require('express');
const FeedbackController = require('../controllers/FeedbackController');

const feedbackRouter = express.Router();

feedbackRouter
  .route('/')
  .get(FeedbackController.getAllFeedbacks)
  .post(FeedbackController.createFeedback);

feedbackRouter.route('/:id').delete(FeedbackController.deleteFeedback);

module.exports = feedbackRouter;
