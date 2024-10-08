var express = require("express");
const cors = require("cors")
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const {dbAuth} = require("./config/dbConnection");
const router = express.Router();
var router1 = require("./routes/index");
const globalErrorHandler = require("./middlewares/globalErrorHandler")
const fileUpload = require('express-fileupload');

var app = express();
app.use(fileUpload({
    createParentPath: true
}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors({
    origin: "*"
}));
app.use(logger("dev"));
app.use(express.json({ limit: '10Mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('public'));
app.use('/public/uploads', express.static('public/uploads'));

var passport = require("passport");
var { getJwtStrategy } = require("./config/passport");

app.use("/api/v1", router1(router));
passport.use(getJwtStrategy());
app.use(globalErrorHandler);

dbAuth();

module.exports = app;
