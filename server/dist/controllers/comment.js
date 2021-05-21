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
 * comment a car
 * @param {*} req 
 * @param {*} res 
 */
var create = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var text, car, user, newComment, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            text = req.body.text;
            car = req.car;
            user = req.user;
            newComment = {
              text: text,
              postedBy: user.id
            };
            _context.next = 7;
            return _car["default"].findByIdAndUpdate(car._id, {
              $push: {
                comments: newComment
              }
            }, {
              "new": true
            }).populate('comments.postedBy').exec();

          case 7:
            result = _context.sent;
            res.status(200).json(result);
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            res.status(400).json(_context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function create(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * comment a car
 * @param {*} req 
 * @param {*} res 
 */


var remove = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var car, commentId, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            car = req.car;
            commentId = req.params.commentId;
            _context2.next = 5;
            return _car["default"].findByIdAndUpdate(car._id, {
              $pull: {
                comments: {
                  _id: commentId
                }
              }
            }, {
              "new": true
            }).populate('comments.postedBy').exec();

          case 5:
            result = _context2.sent;
            res.status(200).json(result);
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            res.status(400).json(_context2.t0);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function remove(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * 
 * comment a car
 * @param {*} req 
 * @param {*} res 
 */


var edit = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var text, car, commentId, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            text = req.body.text;
            car = req.car;
            commentId = req.params.commentId;
            _context3.next = 6;
            return _car["default"].findOneAndUpdate({
              _id: car._id,
              "comments._id": commentId
            }, {
              $set: {
                "comments.$.text": text,
                "comments.$.updatedAt": Date.now()
              }
            }, {
              "new": true
            }).populate('comments.postedBy').exec();

          case 6:
            result = _context3.sent;
            res.status(200).json(result);
            _context3.next = 14;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            console.log('comment edit error: ', _context3.t0);
            res.status(400).json(_context3.t0);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));

  return function edit(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); // ---------------------------------- //
// ------------- EXPORT ------------- //
// ---------------------------------- //


var _default = {
  create: create,
  edit: edit,
  remove: remove
};
exports["default"] = _default;