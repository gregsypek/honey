const Honey = require('../models/honeyModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  // Get honey data from collection
  const honey = await Honey.find();
  //Build template

  //Render that template using honey data from collection
  res.status(200).render('overview', {
    title: 'Wszystkie miody',
    honey,
  });
});
exports.getHoney = (req, res) => {
  res.status(200).render('honey', {
    title: 'Miód malinowy',
  });
};
