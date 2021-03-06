var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var compression = require('compression')
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const helmet = require("helmet");
const config = require('config');
const cors = require('cors');
const corsOptions = {
  origin: 'https://test-payment-cbd9c.firebaseapp.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet())
app.use(compression());


app.use('/', require('./routes/index'));
app.use('/payment', require('./routes/Payment'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.environment === 'staging' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    status: err.status,
    reason: err
  })
});

module.exports = app;
