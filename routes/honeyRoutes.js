const express = require('express');
const honeyController = require('../controllers/honeyController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

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
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    honeyController.deleteHoney
  );

router.use('/:honeyId/reviews', reviewRouter);

module.exports = router;
