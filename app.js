const express = require('express');
const morgan = require('morgan');

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

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

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
