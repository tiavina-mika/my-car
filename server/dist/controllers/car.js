"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _car = _interopRequireDefault(require("../models/car"));

/**
 * 
 * find a car by id
 * @param {*} req 
 * @param {*} res 
 * @param {*} res 
 * @param {string} id 
 * @returns {*}
 */
var carById = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next, id) {
    var car;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _car["default"].findById(id).populate('comments.postedBy').exec();

          case 3:
            car = _context.sent;

            if (car) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              error: true,
              message: 'Id not found'
            }));

          case 6:
            req.car = car;
            next();
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(400).json(_context.t0));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function carById(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}(); // ----------------------------------- //
// -------------- WRITE -------------- //
// ----------------------------------- //

/**
 * 
 * creete a car
 * @param {*} req { car, body: { name, shortDesc, year, distance, fuel, gearbox, price, image*, comments* } }
 * @param {*} res 
 * @returns {*}
 */


var create = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var car, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            if (!(!req.body || !req.body.name)) {
              _context2.next = 4;
              break;
            }

            res.status(400).json({
              message: 'Content can not be empty!'
            });
            return _context2.abrupt("return");

          case 4:
            // Create a car
            car = new _car["default"](req.body);
            _context2.next = 7;
            return car.save();

          case 7:
            result = _context2.sent;
            res.status(200).json(result);
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json(_context2.t0);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));

  return function create(_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * 
 * update a car
 * @param {*} req { car, body: { name, shortDesc, year, distance, fuel, gearbox, price, image*, comments* } }
 * @param {*} res 
 * @returns {*}
 */


var edit = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var car, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return req.car;

          case 3:
            car = _context3.sent;
            car.set(req.body);
            car.updatedAt = Date.now();
            _context3.next = 8;
            return car.save();

          case 8:
            result = _context3.sent;
            res.status(200).json(result);
            _context3.next = 15;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](0);
            res.status(400).json(_context3.t0);

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 12]]);
  }));

  return function edit(_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * 
 * delete a car
 * @param {*} req { car }
 * @param {*} res 
 * @returns {*}
 */


var remove = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var car, removedCar;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return req.car;

          case 3:
            car = _context4.sent;
            _context4.next = 6;
            return car.remove();

          case 6:
            removedCar = _context4.sent;
            res.status(200).json(removedCar);
            _context4.next = 13;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            res.status(400).json(_context4.t0);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 10]]);
  }));

  return function remove(_x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}(); // ---------------------------------- //
// -------------- READ -------------- //
// ---------------------------------- //

/**
 * 
 * find all cars
 * @param {*} req 
 * @param {*} res 
 * @returns {*}
 */


var findAll = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var cars;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _car["default"].find().populate('comments.postedBy').exec();

          case 3:
            cars = _context5.sent;
            return _context5.abrupt("return", res.status(200).json(cars));

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            res.status(400).json(_context5.t0);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function findAll(_x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * 
 * find one car
 * @param {*} req { car } 
 * @param {*} res 
 * @returns {*}
 */


var findOne = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var car;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return req.car;

          case 3:
            car = _context6.sent;
            res.status(200).json(car);
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            res.status(400).json(_context6.t0);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));

  return function findOne(_x13, _x14) {
    return _ref6.apply(this, arguments);
  };
}(); // ---------------------------------- //
// ------------- EXPORT ------------- //
// ---------------------------------- //


var _default = {
  carById: carById,
  create: create,
  edit: edit,
  remove: remove,
  findAll: findAll,
  findOne: findOne
};
exports["default"] = _default;