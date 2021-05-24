"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _db = require("../config/db");

var UserSchema = new _mongoose["default"].Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    maxLength: 100
  },
  active: {
    type: Boolean,
    "default": false
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 100
  },
  roles: [{
    type: String,
    "default": 'USER',
    "enum": ['USER', 'ADMINISTRATOR']
  }],
  token: {
    type: String
  }
}, {
  timestamps: true
}); // return id instead of _id

(0, _db.formatReturnedJSON)(UserSchema);
/**
 * hash the password before save
 */

UserSchema.pre('save', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(next) {
    var user, salt, hash;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = this; // only hash the password if it has been modified (or is new)

            if (user.isModified('password')) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", next());

          case 3:
            _context.prev = 3;
            _context.next = 6;
            return _bcrypt["default"].genSalt(10);

          case 6:
            salt = _context.sent;
            _context.next = 9;
            return _bcrypt["default"].hash(user.password, salt);

          case 9:
            hash = _context.sent;
            user.password = hash;
            return _context.abrupt("return", next());

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](3);
            console.error('pre save error: ', _context.t0);
            return _context.abrupt("return", next(_context.t0));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 14]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
/**
 * 
 * generate token when loggin
 * @returns {string}
 */

UserSchema.methods.generateToken = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
  var user, token;
  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          user = this;
          token = _jsonwebtoken["default"].sign({
            id: user._id
          }, process.env.JWT_SECRET);
          user.token = token;
          _context2.next = 6;
          return user.save();

        case 6:
          return _context2.abrupt("return", token);

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.error('generateToken error: ', _context2.t0);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this, [[0, 9]]);
}));
/**
 * compare the input password and the saved crypted password
 * @param {string} toCompare 
 * @returns {boolean}
 */

UserSchema.methods.comparePassword = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(toCompare) {
    var user, isMatch;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            user = this;
            _context3.next = 4;
            return _bcrypt["default"].compare(toCompare, user.password);

          case 4:
            isMatch = _context3.sent;
            return _context3.abrupt("return", isMatch);

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            console.error('findByToken error: ', _context3.t0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 8]]);
  }));

  return function (_x2) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * validating token for auth routes middleware
 * @returns {Object}
 */


UserSchema["static"]('findByToken', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(token) {
    var user, decode, newUser;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            user = this;
            decode = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);

            if (decode) {
              _context4.next = 5;
              break;
            }

            throw new Error('Invalid token');

          case 5:
            _context4.next = 7;
            return user.findOne({
              "_id": decode.id,
              token: token
            });

          case 7:
            newUser = _context4.sent;
            return _context4.abrupt("return", newUser);

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](0);
            console.error('findByToken error: ', _context4.t0);

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 11]]);
  }));

  return function (_x3) {
    return _ref4.apply(this, arguments);
  };
}());

var User = _mongoose["default"].model('User', UserSchema);

var _default = User;
exports["default"] = _default;