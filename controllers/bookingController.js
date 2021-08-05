const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Honey = require('../models/honeyModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  //1 Get the currently booked honey

  const honey = await Honey.findById(req.params.honeyId);
  console.log(honey);
  //2 Create checkout session

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/honey/${honey.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.honeyId,
    line_items: [
      {
        name: `${honey.name} Honey`,
        description: honey.shortDescription,
        images: [`https://gregsypek.github.io/honey/${honey.image}`],
        amount: honey.prices[0] * 100,
        currency: 'pln',
        quantity: 1,
      },
    ],
  });
  //3 Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});
