const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const honeyRouter = require('./routes/honeyRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// const honey = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/honey.json`));

// app.get('/api/v1/honey', (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     results: honey.length,
//     data: {
//       honey,
//     },
//   });
// });

// 1. Global middlewares
//set security http headers
app.use(helmet());

//development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

//body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());
// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'ratingsQuantity',
      'rating',
      'ratingsAverage',
      'price350',
      'price700',
      'price900',
    ],
  })
);

//serving static files
app.use(express.static(`${__dirname}/public`));
//test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

// 3) ROUTES

app.use('/api/v1/honey', honeyRouter);
app.use('/api/v1/users', userRouter);

//it has to be after others routes because that's how middleware works one by another
app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statucCode = 404;
  // next(err);

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
