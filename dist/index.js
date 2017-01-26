'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chartist = require('chartist');

var _chartist2 = _interopRequireDefault(_chartist);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChartistAccessibility = function (_Component) {
  _inherits(ChartistAccessibility, _Component);

  function ChartistAccessibility() {
    _classCallCheck(this, ChartistAccessibility);

    return _possibleConstructorReturn(this, (ChartistAccessibility.__proto__ || Object.getPrototypeOf(ChartistAccessibility)).apply(this, arguments));
  }

  _createClass(ChartistAccessibility, [{
    key: 'getId',
    value: function getId() {
      var elementId = this.props.elementId;

      return 'ct-accessibility-table-' + (elementId || _nodeUuid2.default.v4());
    }
  }, {
    key: 'valueTransform',
    value: function valueTransform(value) {
      var valueTransform = this.props.valueTransform;

      var _valueTransform = typeof valueTransform === 'function' ? valueTransform : _chartist2.default.noop;
      return '' + _valueTransform(value);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var data = this.props.data;

      this.multiPoint = data.series.length > 1;
    }
  }, {
    key: 'getSeries',
    value: function getSeries() {
      var _this2 = this;

      var data = this.props.data;

      return this.multiPoint ? data.series.map(function (s) {
        return s.map(function (_s) {
          return _this2.valueTransform(_s);
        });
      }) : data.series.map(function (s) {
        return _this2.valueTransform(s);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          data = _props.data,
          caption = _props.caption,
          seriesHeader = _props.seriesHeader,
          summary = _props.summary,
          elementId = _props.elementId,
          visuallyHiddenStyles = _props.visuallyHiddenStyles;

      var series = this.getSeries();
      return _react2.default.createElement(
        'div',
        { style: visuallyHiddenStyles || { position: 'absolute', left: -10000, top: 'auto', width: 1, height: 1, overflow: 'hidden' }, id: elementId || this.getId() },
        _react2.default.createElement(
          'table',
          { summary: summary },
          _react2.default.createElement(
            'caption',
            null,
            caption || 'A  graphical chart'
          ),
          _react2.default.createElement(
            'tbody',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                { scope: 'col', role: 'columnheader' },
                seriesHeader
              ),
              data.labels.map(function (l, i) {
                return _react2.default.createElement(
                  'th',
                  { key: i, scope: 'col', role: 'columnheader' },
                  l
                );
              })
            ),
            this.multiPoint && data.series.map(function (s, i) {
              return _react2.default.createElement(
                'tr',
                { key: i },
                _react2.default.createElement(
                  'th',
                  { scope: 'row', role: 'rowheader' },
                  i + 1 + '. Series'
                ),
                s.map(function (ss, ii) {
                  return _react2.default.createElement(
                    'td',
                    { key: ii },
                    _this3.valueTransform(ss)
                  );
                })
              );
            }),
            !this.multiPoint && _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                { scope: 'row', role: 'rowheader' },
                '1. Series'
              ),
              series.map(function (s, i) {
                return _react2.default.createElement(
                  'td',
                  { key: i },
                  _this3.valueTransform(s)
                );
              })
            )
          )
        )
      );
    }
  }]);

  return ChartistAccessibility;
}(_react.Component);

exports.default = ChartistAccessibility;
