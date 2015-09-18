"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _jsClone = require("js.clone");

var _jsClone2 = _interopRequireDefault(_jsClone);

var Private = (function () {
  function Private(props) {
    _classCallCheck(this, Private);

    this._key_ = "_" + Math.random().toString(36).substr(2, 7) + "_";
    this._props_ = this.prepare(props);
  }

  _createClass(Private, [{
    key: "prepare",
    value: function prepare(props) {
      for (var attr in props) {
        if (props.hasOwnProperty(attr) && typeof props[attr] === "function") props[attr] = this.bind(this._key_, props[attr]);
      }return props;
    }
  }, {
    key: "bind",
    value: function bind(key, method) {
      return function () {
        return method.apply(this[key], arguments);
      };
    }
  }, {
    key: "get",
    value: function get(context) {
      return context[this._key_] || this.set(context);
    }
  }, {
    key: "set",
    value: function set(context) {
      var props = Object.create(this._props_, this.descriptor(this._key_, context));
      for (var attr in this._props_) {
        if (this._props_.hasOwnProperty(attr) && typeof this._props_[attr] === "object") props[attr] = (0, _jsClone2["default"])(this._props_[attr]);
      }return Object.defineProperties(context, this.descriptor(this._key_, props))[this._key_];
    }
  }, {
    key: "descriptor",
    value: function descriptor(name, value) {
      var configurable = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
      var writable = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
      var enumerable = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];

      return _defineProperty({}, name, { value: value, configurable: configurable, writable: writable, enumerable: enumerable });
    }
  }]);

  return Private;
})();

exports["default"] = function (props) {
  var instance = new Private(props);
  return function (context) {
    return instance.get(context);
  };
};

module.exports = exports["default"];
