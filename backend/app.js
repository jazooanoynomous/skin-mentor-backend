const { exec } = require('child_process');
const userModel=require('mongoose')
const axios = require('axios');
var createError = require('http-errors');
var express = require('express');
// const io = require("")
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
// Set 'strictQuery' to false
mongoose.set('strictQuery', false);

var doctorRouter = require('./app_server/routes/doctorRoutes');
var patientRouter = require('./app_server/routes/Helper/patientRoutes')
var appointmentRouter = require('./app_server/routes/appointmentRoutes')
var reportRouter = require('./app_server/routes/reportRotes')
const orderRouter = require("./app_server/routes/Helper/order");
const productRouter = require("./app_server/routes/Helper/products");
const cartRouter = require("./app_server/routes/Helper/cart");
const paymentRoutes=require("./app_server/routes/paymentRoutes")
const dotenv= require('dotenv')
dotenv.config()
var app = express();
var cors = require('cors');
app.use(cors('*'));
// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/doctor', doctorRouter);
app.use('/patient' , patientRouter);
app.use('/appointment' , appointmentRouter);
app.use('/report' , reportRouter);
app.use('/api/order',orderRouter);
app.use('/api/cart',cartRouter);
app.use('/api/products',productRouter);
app.use('/payments', paymentRoutes);

app.use(express.json());
app.use(cors());
async function connectserver(){
  try {
    await userModel.connect("mongodb+srv://jahangirameen0:database@cluster0.lodvuf2.mongodb.net/skinmentor?retryWrites=true&w=majority")
    console.log("connected to the database");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
connectserver()
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
