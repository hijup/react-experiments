(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactExperiments"] = factory(require("react"));
	else
		root["ReactExperiments"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Parametrize = _react2.default.createClass({
  displayName: "Parametrize",

  propTypes: {
    children: _react2.default.PropTypes.node.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      experimentParameters: null
    };
  },


  childContextTypes: {
    experimentParameters: _react2.default.PropTypes.object,
    experimentProps: _react2.default.PropTypes.object.isRequired
  },

  getChildContext: function getChildContext() {
    return {
      experimentParameters: this.state.experimentParameters,
      experimentProps: this.props
    };
  },
  componentWillMount: function componentWillMount() {
    this.fetchParameters();
  },
  fetchParameters: function fetchParameters() {
    var _props = this.props,
        experiment = _props.experiment,
        params = _props.params;


    if (!experiment || !experiment.get) {
      console.error("You must pass in an experiment instance as a prop");
      return;
    } else if (!params) {
      console.error("You mass pass a list of params in as a prop");
      return;
    }

    var paramsObj = {};
    for (var i = 0; i < params.length; i++) {
      var param = params[i];
      var paramVal = experiment.get(param);
      if (paramVal !== null && paramVal !== undefined) {
        paramsObj[param] = paramVal;
      }
    }

    if (Object.keys(paramsObj).length !== 0 && experiment.previouslyLogged() === false) {
      experiment.logExposure({
        params: params,
        name: experiment.getName()
      });
    }

    this.setState({
      experimentParameters: paramsObj
    });
  },
  renderExperiment: function renderExperiment() {
    var experimentParameters = this.state.experimentParameters;

    if (!experimentParameters) {
      return null;
    }

    var _props2 = this.props,
        children = _props2.children,
        passThrough = _props2._passThrough;


    if (_react2.default.Children.count(children) > 1) {
      var renderedChildren = _react2.default.Children.map(children, function (child) {
        if (passThrough) {
          return _react2.default.cloneElement(child, experimentParameters);
        }
        return child;
      });
      return _react2.default.createElement(
        "div",
        null,
        renderedChildren
      );
    } else if (passThrough) {
      return _react2.default.cloneElement(_react2.default.Children.only(children), experimentParameters);
    }
    return children;
  },
  render: function render() {
    return this.renderExperiment();
  }
});

exports.default = Parametrize;
module.exports = exports["default"];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _variationComponents = __webpack_require__(3);

var Variations = _interopRequireWildcard(_variationComponents);

var _Experiment = __webpack_require__(4);

var _Experiment2 = _interopRequireDefault(_Experiment);

var _abtest = __webpack_require__(5);

var _abtest2 = _interopRequireDefault(_abtest);

var _parametrize = __webpack_require__(1);

var _parametrize2 = _interopRequireDefault(_parametrize);

var _withExperimentParams = __webpack_require__(6);

var _withExperimentParams2 = _interopRequireDefault(_withExperimentParams);

var _parametrizeComponent = __webpack_require__(7);

var _parametrizeComponent2 = _interopRequireDefault(_parametrizeComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  ABTest: _abtest2.default,
  When: Variations.When,
  Default: Variations.Default,
  Experiment: _Experiment2.default,
  Parametrize: _parametrize2.default,
  withExperimentParams: _withExperimentParams2.default,
  parametrize: _parametrizeComponent2.default
};
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Default = exports.When = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var When = exports.When = _react2.default.createClass({
  displayName: 'When',
  getInitialState: function getInitialState() {
    return {
      shouldRender: false
    };
  },


  contextTypes: {
    experimentParameters: _react2.default.PropTypes.object.isRequired,
    experimentProps: _react2.default.PropTypes.object.isRequired
  },

  componentWillUpdate: function componentWillUpdate(props, state) {
    if (state.shouldRender) {
      this.context.experimentProps.enrolledInVariation();
    }
  },
  componentDidMount: function componentDidMount() {
    this.shouldRenderVariation();
  },
  shouldRenderVariation: function shouldRenderVariation() {
    var value = this.props.value;
    var paramName = this.context.experimentProps.on;
    if (this.context.experimentParameters && this.context.experimentParameters[paramName] === value) {
      this.setState({
        shouldRender: true
      });
    }
  },
  renderChildren: function renderChildren() {
    return _react2.default.Children.map(this.props.children, function (child) {
      if (_react2.default.isValidElement(child)) {
        return _react2.default.cloneElement(child, {});
      }
      return child;
    });
  },
  render: function render() {
    if (!this.state.shouldRender) {
      return null;
    }

    return _react2.default.createElement(
      'span',
      { className: 'experiment-variation-component' },
      this.renderChildren()
    );
  }
});

var Default = exports.Default = _react2.default.createClass({
  displayName: 'Default',

  contextTypes: {
    experimentProps: _react2.default.PropTypes.object.isRequired
  },

  render: function render() {
    if (this.context.experimentProps.hasRendered) {
      return null;
    }

    return _react2.default.createElement(
      'span',
      null,
      this.props.children
    );
  }
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Experiment = function () {
  function Experiment() {
    _classCallCheck(this, Experiment);
  }

  _createClass(Experiment, [{
    key: "get",
    value: function get(parameter) {
      throw "IMPLEMENT get";
    }
  }, {
    key: "logExposure",
    value: function logExposure(opts) {
      throw "IMPLEMENT logExposure";
    }
  }, {
    key: "getName",
    value: function getName() {
      throw "IMPLEMENT getName";
    }
  }, {
    key: "previouslyLogged",
    value: function previouslyLogged() {
      throw "IMPLEMENT previouslyLogged";
    }
  }, {
    key: "shouldFetchExperimentParameter",
    value: function shouldFetchExperimentParameter(name) {
      throw "IMPLEMENT shouldFetchExperimentParameter";
    }
  }]);

  return Experiment;
}();

exports.default = Experiment;
;
module.exports = exports["default"];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _parametrize = __webpack_require__(1);

var _parametrize2 = _interopRequireDefault(_parametrize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ABTest = _react2.default.createClass({
  displayName: 'ABTest',
  getInitialState: function getInitialState() {
    return {
      hasRendered: false
    };
  },
  enrolledInVariation: function enrolledInVariation() {
    if (!this.state.hasRendered) {
      this.setState({
        hasRendered: true
      });
    }
  },
  renderExposedVariation: function renderExposedVariation() {
    var _props = this.props,
        on = _props.on,
        experiment = _props.experiment;


    if (!experiment) {
      console.error("You must pass in an experiment instance as a prop");
      return null;
    } else if (!on) {
      console.error("You must pass an 'on' prop indicating what parameter you want to branch off");
      return null;
    }

    return _react2.default.createElement(
      _parametrize2.default,
      {
        experiment: experiment,
        params: [on],
        on: on,
        enrolledInVariation: this.enrolledInVariation,
        hasRendered: this.state.hasRendered },
      this.props.children
    );
  },
  render: function render() {
    return this.renderExposedVariation();
  }
});

exports.default = ABTest;
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (Component) {
  return _react2.default.createClass({
    contextTypes: {
      experimentParameters: _react2.default.PropTypes.object.isRequired
    },

    render: function render() {
      return _react2.default.createElement(Component, _extends({}, this.props, this.context.experimentParameters));
    }
  });
};

module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _parametrize = __webpack_require__(1);

var _parametrize2 = _interopRequireDefault(_parametrize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (experiment, experimentParams, Component) {
  return _react2.default.createClass({
    render: function render() {
      return _react2.default.createElement(
        _parametrize2.default,
        { experiment: experiment, params: experimentParams, _passThrough: true },
        _react2.default.createElement(Component, this.props)
      );
    }
  });
};

module.exports = exports['default'];

/***/ })
/******/ ]);
});