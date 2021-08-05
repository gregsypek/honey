const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const photoController = require('../controllers/photoController');

const router = express.Router();

router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(photoController.getAllPhoto)
  .post(photoController.createPhoto);

router
  .route('/:id')
  .get(photoController.getPhoto)
  .patch(
    photoController.uploadPhotoImage,
    photoController.resizePhotoImage,
    photoController.updatePhoto
  )
  .delete(photoController.deletePhoto);

module.exports = router;
