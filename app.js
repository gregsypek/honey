const express = require('express');
const fs = require('fs');
// const morgan = require('morgan');

const app = express();

const honey = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/honey.json`));

app.get('/api/v1/honey', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: honey.length,
    data: {
      honey,
    },
  });
});

module.exports = app;
