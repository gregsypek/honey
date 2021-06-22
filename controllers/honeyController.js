const Honey = require('../models/honeyModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllHoney = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getHoney = async (req, res) => {
  try {
    const honey = await Honey.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: honey,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createHoney = async (req, res) => {
  try {
    const newHoney = await Honey.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        honey: newHoney,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateHoney = async (req, res) => {
  try {
    const honey = await Honey.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        honey,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteHoney = async (req, res) => {
  try {
    await Honey.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
