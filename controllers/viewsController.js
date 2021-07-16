const Honey = require('../models/honeyModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  // Get honey data from collection
  const honey = await Honey.find();
  //Build template

  //Render that template using honey data from collection
  res.status(200).render('overview', {
    title: 'Wszystkie miody',
    honey,
  });
  // next();
});
exports.getHoney = catchAsync(async (req, res) => {
  // I need all honey to display offer in table
  const allHoney = await Honey.find();
  // 1 Get the data. fot the requested honey
  const honey = await Honey.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  //2 Build template

  //3 Render template using data from  1
  res.status(200).render('honey', {
    title: 'Miód malinowy',
    honey,
    allHoney,
  });
});
