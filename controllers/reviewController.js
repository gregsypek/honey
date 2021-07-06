const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.honeyId) filter = { honey: req.params.honeyId }; // if not empty object  = all reviews

  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    results: reviews.lenght,
    data: {
      reviews,
    },
  });
});

exports.setHoneyUserIds = (req, res, next) => {
  //Allow neste routes
  //define if they are not in body
  // req.user is from protect midlleware};
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.honey) req.body.honey = req.params.honeyId;
  next();
};

exports.createReview = factory.createOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
