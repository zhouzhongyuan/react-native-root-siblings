'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactNative = require('react-native');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _staticContainer = require('static-container');

var _staticContainer2 = _interopRequireDefault(_staticContainer);

var _wolfy87Eventemitter = require('wolfy87-eventemitter');

var _wolfy87Eventemitter2 = _interopRequireDefault(_wolfy87Eventemitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = _reactNative.StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    }
});

var emitter = _reactNative.AppRegistry.rootSiblingsEmitter;

if (!(emitter instanceof _wolfy87Eventemitter2.default)) {
    emitter = new _wolfy87Eventemitter2.default();
    // inject modals into app entry component
    var originRegister = _reactNative.AppRegistry.registerComponent;

    _reactNative.AppRegistry.registerComponent = function (appKey, getAppComponent) {
        var siblings = new Map();
        var updates = new Set();

        return originRegister(appKey, function () {
            var _class, _temp;

            var OriginAppComponent = getAppComponent();

            return _temp = _class = function (_Component) {
                _inherits(_class, _Component);

                function _class() {
                    _classCallCheck(this, _class);

                    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
                }

                _createClass(_class, [{
                    key: 'componentWillMount',
                    value: function componentWillMount() {
                        this._update = this._update.bind(this);
                        emitter.addListener('siblings.update', this._update);
                    }
                }, {
                    key: 'componentWillUnmount',
                    value: function componentWillUnmount() {
                        emitter.removeListener('siblings.update', this._update);
                        siblings.clear();
                        updates.clear();
                    }
                }, {
                    key: '_update',
                    value: function _update(id, element, callback) {
                        if (siblings.has(id) && !element) {
                            siblings.delete(id);
                        } else {
                            siblings.set(id, element);
                        }
                        updates.add(id);
                        this.forceUpdate(callback);
                    }
                }, {
                    key: 'render',
                    value: function render() {
                        var elements = [];
                        siblings.forEach(function (element, id) {
                            elements.push(_react2.default.createElement(
                                _staticContainer2.default,
                                {
                                    key: 'root-sibling-' + id,
                                    shouldUpdate: updates.has(id)
                                },
                                element
                            ));
                        });
                        updates.clear();

                        return _react2.default.createElement(
                            _reactNative.View,
                            { style: styles.container },
                            _react2.default.createElement(
                                _staticContainer2.default,
                                { shouldUpdate: false },
                                _react2.default.createElement(OriginAppComponent, this.props)
                            ),
                            elements
                        );
                    }
                }]);

                return _class;
            }(_react.Component), _class.displayName = 'Root(' + appKey + ')', _temp;
        });
    };

    _reactNative.AppRegistry.rootSiblingsEmitter = emitter;
}

exports.default = emitter;