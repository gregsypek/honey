const Honey = require('../models/honeyModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.getAllHoney = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Honey.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const honey = await features.query;

  res.status(200).json({
    status: 'success',
    results: honey.length,
    data: {
      honey,
    },
  });
});

exports.getHoney = catchAsync(async (req, res, next) => {
  //'populate' will fill with actual data but only in query not in a database!
  const honey = await Honey.findById(req.params.id).populate('reviews');

  if (!honey) {
    //return and not go to the code below
    return next(new AppError('No honey found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: honey,
  });
});

exports.createHoney = factory.createOne(Honey);
exports.updateHoney = factory.updateOne(Honey);
exports.deleteHoney = factory.deleteOne(Honey);
