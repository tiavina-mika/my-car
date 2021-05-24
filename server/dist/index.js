"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _expressValidation = require("express-validation");

var _db = _interopRequireDefault(require("./config/db"));

var _car = _interopRequireDefault(require("./routes/car"));

var _auth = _interopRequireDefault(require("./routes/auth"));

var _comment = _interopRequireDefault(require("./routes/comment"));

var _utils = require("./utils/utils");

var mongoSanitize = require('express-mongo-sanitize');

_dotenv["default"].config();

var app = (0, _express["default"])(); // connect and run database

(0, _db["default"])();
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
})); // To remove data, use:

app.use(mongoSanitize());
app.use(_express["default"]["static"]('dist/public'));
app.use('/test', function (req, res) {
  res.send('Hello Word');
});
app.use('/api', _car["default"]);
app.use('/api', _comment["default"]);
app.use('/users', _auth["default"]);
app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/dist/public/index.html');
}); // ---------------------------- //
// ---------- Errors ---------- //
// ---------------------------- //
// params and body validation middleware

app.use(function (err, req, res, next) {
  if (err instanceof _expressValidation.ValidationError) {
    // custom error
    var errorResponse = (0, _utils.getApiCustomError)(err);
    res.status(err.statusCode).json(errorResponse);
  } else {
    res.status(500).json(err);
  }
});
var PORT = process.env.PORT || 4200;
app.listen(PORT, function () {
  console.log('server running at port ' + PORT);
});