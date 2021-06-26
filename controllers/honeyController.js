const Honey = require('../models/honeyModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

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
  const honey = await Honey.findById(req.params.id);

  if (!honey) {
    //return and not go to the code below
    return next(new AppError('No honey found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: honey,
  });
});

exports.createHoney = catchAsync(async (req, res, next) => {
  const newHoney = await Honey.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      honey: newHoney,
    },
  });
});

exports.updateHoney = catchAsync(async (req, res, next) => {
  const honey = await Honey.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!honey) {
    return next(new AppError('No honey found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      honey,
    },
  });
});

exports.deleteHoney = catchAsync(async (req, res, next) => {
  const honey = await Honey.findByIdAndDelete(req.params.id);

  if (!honey) {
    return next(new AppError('No honey found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
