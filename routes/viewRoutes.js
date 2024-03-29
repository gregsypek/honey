const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewsController.getHomePage);
router.get('/overview', viewsController.getOverview);
router.get('/honey/:slug', authController.isLoggedIn, viewsController.getHoney);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get(
  '/message',
  authController.isLoggedIn,
  viewsController.getContactMessage
);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/gallery', authController.isLoggedIn, viewsController.getGallery);
router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
