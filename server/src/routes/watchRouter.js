const express = require('express');
const WatchController = require('../controllers/WatchController');

const watchRouter = express.Router();

watchRouter
  .route('/')
  .get(WatchController.getAll)
  .post(WatchController.createWatch);

watchRouter
  .route('/:id')
  .get(WatchController.getOneWatch)
  .put(WatchController.updateWatch)
  .delete(WatchController.deleteWatch);

module.exports = watchRouter;
