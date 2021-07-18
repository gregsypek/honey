const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.getHomePage);
router.get('/overview', viewsController.getOverview);
router.get('/honey/:slug', viewsController.getHoney);

module.exports = router;
