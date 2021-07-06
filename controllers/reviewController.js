const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

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

exports.createReview = catchAsync(async (req, res, next) => {
  //Allow neste routes
  //define if they are not in body
  if (!req.body.honey) req.body.honey = req.params.honeyId;
  if (!req.body.user) req.body.user = req.user.id; // req.user is from protect midlleware
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
