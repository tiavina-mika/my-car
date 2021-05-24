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
    required: true,
    trim: true,
    maxLength: 50
  },
  shortDesc: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true,
    maxLength: 4
  },
  distance: {
    type: String,
    required: true
  },
  fuel: {
    type: String,
    "default": 'Essence',
    "enum": ['Essence', 'Diesel', 'Electrique', 'Hybride', 'Solaire', 'Hydrogène']
  },
  gearbox: {
    type: String,
    "default": 'Manuelle',
    "enum": ['Manuelle', 'Automatique']
  },
  price: {
    type: String,
    required: true
  },
  image: {
    type: String
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