"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _db = require("../config/db");

var Schema = _mongoose["default"].Schema;
var CarSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  comments: [{
    text: String,
    createdAt: {
      type: Date,
      "default": Date.now
    },
    updatedAt: {
      type: Date
    },
    postedBy: {
      type: Schema.ObjectId,
      ref: 'User'
    }
  }]
}, {
  timestamps: true
}); // return id instead of _id

(0, _db.formatReturnedJSON)(CarSchema);

var Car = _mongoose["default"].model('Car', CarSchema);

var _default = Car;
exports["default"] = _default;