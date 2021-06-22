const express = require('express');
const honeyController = require('../controllers/honeyController');

const router = express.Router();

router
  .route('/')
  .get(honeyController.getAllHoney)
  .post(honeyController.createHoney);

router
  .route('/:id')
  .get(honeyController.getHoney)
  .patch(honeyController.updateHoney)
  .delete(honeyController.deleteHoney);

module.exports = router;
