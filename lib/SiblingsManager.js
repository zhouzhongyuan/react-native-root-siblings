'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _AppRegistryInjection = require('./AppRegistryInjection');

var _AppRegistryInjection2 = _interopRequireDefault(_AppRegistryInjection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var styles = _reactNative.StyleSheet.create({
    offStream: {
        position: 'absolute'
    }
});
var uid = 0;

var _class = function () {
    function _class(element, callback) {
        _classCallCheck(this, _class);

        this._id = null;

        Object.defineProperty(this, '_id', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: uid++
        });

        this.update(element, callback);
    }

    _createClass(_class, [{
        key: '_offStreamElement',
        value: function _offStreamElement(element) {
            return (0, _react.cloneElement)(element, {
                style: [element.props.style, styles.offStream]
            });
        }
    }, {
        key: 'update',
        value: function update(element, callback) {
            _AppRegistryInjection2.default.emit('siblings.update', this._id, this._offStreamElement(element), callback);
        }
    }, {
        key: 'destroy',
        value: function destroy(callback) {
            _AppRegistryInjection2.default.emit('siblings.update', this._id, null, callback);
        }
    }]);

    return _class;
}();

exports.default = _class;