/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const express = require('express');
const createError = require('http-errors');

const app = express();
const PORT = process.env.PORT || 5000;
const { log } = console;

// import routes
const { weatherRouter } = require('./routes');

app.use('/weather', weatherRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Hello World',
  });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

app.listen(PORT, () => {
  log(`Server listening on port: ${PORT}`);
});
