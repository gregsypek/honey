const Honey = require('../models/honeyModel');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.getAllHoney = factory.getAll(Honey);
exports.getHoney = factory.getOne(Honey, { path: 'reviews' });
exports.createHoney = factory.createOne(Honey);
exports.updateHoney = factory.updateOne(Honey);
exports.deleteHoney = factory.deleteOne(Honey);
