const Honey = require('../models/honeyModel');
const User = require('../models/userModel');
const Info = require('../models/infoModel');
const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// exports.getHomePage = catchAsync(async (req, res) => {
//   const reviews = await Review.find();
//   res.status(200).render('home', {
//     title: 'Miodek',
//     reviews,
//   });
// });
exports.getHomePage = catchAsync(async (req, res, next) => {
  const reviews = await Review.where('rating').gte(4);
  // .populate({ path: 'user', select: 'name' });
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('home', {
      title: 'Miodek',
      reviews,
    });
});

exports.getOverview = catchAsync(async (req, res, next) => {
  // Get honey data from collection
  const honey = await Honey.find();
  //Build template

  //Render that template using honey data from collection
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('overview', {
      title: 'Wszystkie miody',
      honey,
    });
  // next();
});
exports.getHoney = catchAsync(async (req, res, next) => {
  // I need all honey to display offer in table
  const allHoney = await Honey.find();
  const info = await Info.find();
  // 1 Get the data. fot the requested honey
  const honey = await Honey.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!honey) {
    return next(new AppError('Nie ma takiego produktu', 404));
  }

  //2 Build template

  //3 Render template using data from  1
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('honey', {
      title: `${honey.name}`,

      honey,
      allHoney,
      info,
    });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  const info = await Info.find();

  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('login', {
      title: 'Zaloguj się',
      info,
    });
});
exports.getAccount = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('account', {
      title: 'Twoje konto',
    });
};
exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('account', {
      title: 'Twoje konto',
      user: updatedUser,
    });
});
