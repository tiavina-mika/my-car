"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../models/user"));

/**
 * 
 * signup the user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
var signup = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, email, password, user, newUser;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context.prev = 1;
            _context.next = 4;
            return _user["default"].findOne({
              email: email
            });

          case 4:
            user = _context.sent;

            if (!user) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              error: true,
              message: 'Email is already used'
            }));

          case 7:
            newUser = new _user["default"]({
              email: email,
              password: password
            });
            _context.next = 10;
            return newUser.save();

          case 10:
            return _context.abrupt("return", res.status(200).json({
              success: true,
              message: 'Registration Success'
            }));

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](1);
            console.error('signup error', _context.t0);
            return _context.abrupt("return", res.status(500).json({
              error: true,
              message: 'Cannot Register'
            }));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 13]]);
  }));

  return function signup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * 
 * login the user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */


var login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body2, email, password, user, isMatch, token;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
            _context2.prev = 1;
            _context2.next = 4;
            return _user["default"].findOne({
              email: email
            });

          case 4:
            user = _context2.sent;

            if (user) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              error: true,
              message: 'Email does not exist'
            }));

          case 7:
            _context2.next = 9;
            return user.comparePassword(password);

          case 9:
            isMatch = _context2.sent;

            if (isMatch) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              error: true,
              message: 'Password does not match'
            }));

          case 12:
            _context2.next = 14;
            return user.generateToken();

          case 14:
            token = _context2.sent;
            return _context2.abrupt("return", res.status(200).json({
              success: true,
              user: {
                id: user._id,
                email: user.email,
                token: token
              }
            }));

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](1);
            console.error('login error', _context2.t0);
            return _context2.abrupt("return", res.status(500).json({
              error: true,
              message: 'Cannot login'
            }));

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 18]]);
  }));

  return function login(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * logout the current connected user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */


var logout = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _user["default"].findByIdAndUpdate({
              _id: req.user._id
            }, {
              token: ''
            });

          case 3:
            user = _context3.sent;

            if (user) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              error: true,
              message: 'User not found'
            }));

          case 6:
            return _context3.abrupt("return", res.status(200).json({
              success: true,
              message: 'Logged out successfully'
            }));

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            console.error('logout error: ', _context3.t0);
            return _context3.abrupt("return", res.status(500).json({
              error: true,
              message: 'Cannot logout'
            }));

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));

  return function logout(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * 
 * test if the user is connected
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */


var isAuth = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var authHeader, token, user;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            authHeader = req.headers['authorization'];
            token = authHeader && authHeader.split(' ')[1];
            _context4.next = 5;
            return _user["default"].findByToken(token);

          case 5:
            user = _context4.sent;

            if (user) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", res.json({
              isAuth: false,
              error: true,
              message: 'No User connected'
            }));

          case 8:
            if (!(user && user.token !== token)) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", res.json({
              isAuth: false,
              error: true,
              message: 'Invalid Token'
            }));

          case 10:
            req.token = token;
            req.user = user;
            next();
            _context4.next = 18;
            break;

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](0);
            console.error('isAuth error: ', _context4.t0);

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 15]]);
  }));

  return function isAuth(_x7, _x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}(); // ---------------------------------- //
// ------------- EXPORT ------------- //
// ---------------------------------- //


var _default = {
  signup: signup,
  login: login,
  logout: logout,
  isAuth: isAuth
};
exports["default"] = _default;