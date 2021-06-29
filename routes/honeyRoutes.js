const express = require('express');
const honeyController = require('../controllers/honeyController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);

router
  .route('/')
  .get(authController.protect, honeyController.getAllHoney)
  .post(honeyController.createHoney);

router
  .route('/:id')
  .get(honeyController.getHoney)
  .patch(honeyController.updateHoney)
  .delete(honeyController.deleteHoney);

module.exports = router;
