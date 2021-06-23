const express = require('express');
const morgan = require('morgan');

const honeyRouter = require('./routes/honeyRoutes');

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
  next();
});

// 3) ROUTES

app.use('/api/v1/honey', honeyRouter);

//it has to be after others routes because that's how middleware works one by another
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
