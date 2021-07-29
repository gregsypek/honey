const express = require('express');
const honeyController = require('../controllers/honeyController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:honeyId/reviews', reviewRouter);

router.post('/signup', authController.signup);

router
  .route('/')
  .get(honeyController.getAllHoney)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    honeyController.createHoney
  );

router
  .route('/:id')
  .get(honeyController.getHoney)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    honeyController.uploadHoneyImage,
    honeyController.resizeHoneyImage,
    honeyController.updateHoney
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),

    honeyController.deleteHoney
  );

module.exports = router;
