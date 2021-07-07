const Review = require('../models/reviewModel');
// const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.setHoneyUserIds = (req, res, next) => {
  //Allow neste routes
  //define if they are not in body
  // req.user is from protect midlleware};
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.honey) req.body.honey = req.params.honeyId;
  next();
};
exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
