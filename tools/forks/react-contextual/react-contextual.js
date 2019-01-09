'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var hoistNonReactStatic = _interopDefault(require('hoist-non-react-statics'));
var uuid = _interopDefault(require('tiny-uuid'));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var createContext = React__default.createContext;
var providers =
/*#__PURE__*/
new Map();
var ProviderContext =
/*#__PURE__*/
createContext();
function createNamedContext(name, initialState) {
  var context = createContext(initialState);
  providers.set(name, context);
  return context;
}
function getNamedContext(name) {
  return providers.get(name);
}
function removeNamedContext(name) {
  providers.delete(name);
}
function resolveContext(context, props, defaultContext) {
  if (defaultContext === void 0) {
    defaultContext = ProviderContext;
  }

  if (context && context.Provider && context.Consumer) return context;
  var result;

  if (typeof context === 'function') {
    // Test against component-symbol first, then assume a user function
    result = getNamedContext(context);
    /*|| resolveContext(context(props), props, defaultContext)*/
  } else if (typeof context === 'string') {
    result = getNamedContext(context);
  } else if (typeof context === 'object') {
    result = context.context;
  }

  return result && result.Provider && result.Consumer ? result : defaultContext;
}

var toArray = function toArray(obj) {
  return Array.isArray(obj) ? obj : [obj];
};

function subscribe() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (Wrapped) {
    var SubscribeWrap =
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(SubscribeWrap, _Component);

      function SubscribeWrap() {
        return _Component.apply(this, arguments) || this;
      }

      var _proto = SubscribeWrap.prototype;

      _proto.render = function render() {
        var props = this.props; // Filter undefined args (can happen if Subscribe injects them)

        args = args.filter(function (a) {
          return a;
        });

        var contextRefs = ProviderContext,
            mapContextToProps = function mapContextToProps(props) {
          return props;
        };

        if (args.length === 1) {
          // Check if the argument is a valid context first, if not, assume mapContextToProps
          if (resolveContext(args[0], props, null)) contextRefs = args[0];else mapContextToProps = args[0];
        } else if (args.length === 2) {
          // subscribe(Context, mapContextToProps)
          contextRefs = args[0];
          mapContextToProps = args[1];
        }

        if (typeof mapContextToProps !== 'function') {
          // 'theme' or ['theme', 'user', 'language']
          var values = mapContextToProps;

          mapContextToProps = function mapContextToProps() {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            return toArray(values).reduce(function (acc, key, index) {
              var _objectSpread2;

              return _objectSpread({}, acc, (_objectSpread2 = {}, _objectSpread2[key] = args[index], _objectSpread2));
            }, {});
          };
        }

        contextRefs = toArray(contextRefs).map(function (context) {
          return resolveContext(context, props);
        });
        return contextRefs.reduceRight(function (inner, ctx) {
          return function () {
            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }

            return React__default.createElement(ctx.Consumer, null, function (value) {
              return inner.apply(void 0, args.concat([value]));
            });
          };
        }, function () {
          for (var _len4 = arguments.length, values = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            values[_key4] = arguments[_key4];
          }

          var context = mapContextToProps.apply(void 0, values.concat([props]));
          context = typeof context === 'object' ? context : {
            context: context
          };
          return React__default.createElement(Wrapped, _extends({}, props, context));
        })();
      };

      return SubscribeWrap;
    }(React.Component);

    hoistNonReactStatic(SubscribeWrap, Wrapped);
    return SubscribeWrap;
  };
}
var Subscribe =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(Subscribe, _React$PureComponent);

  function Subscribe() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto2 = Subscribe.prototype;

  _proto2.render = function render() {
    var _props = this.props,
        to = _props.to,
        select = _props.select,
        children = _props.children,
        render = _props.render,
        rest = _objectWithoutProperties(_props, ["to", "select", "children", "render"]);

    return React__default.createElement(subscribe(to, select)(function (props) {
      return render ? render(_objectSpread({}, props, rest, {
        children: children
      })) : children(_objectSpread({}, props, rest));
    }), rest);
  };

  return Subscribe;
}(React__default.PureComponent);
Subscribe.defaultProps = {
  to: ProviderContext,
  select: function select(props) {
    return props;
  }
};
process.env.NODE_ENV !== "production" ? Subscribe.propTypes = {
  to:
  /*#__PURE__*/
  PropTypes.oneOfType([
  /*#__PURE__*/
  PropTypes.arrayOf(
  /*#__PURE__*/
  PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func])), PropTypes.object, PropTypes.string, PropTypes.func]),
  select:
  /*#__PURE__*/
  PropTypes.oneOfType([PropTypes.func, PropTypes.string,
  /*#__PURE__*/
  PropTypes.arrayOf(PropTypes.string)]),
  children: PropTypes.func.isRequired
} : void 0;

function createStore(state, id) {
  if (id === void 0) {
    id = uuid();
  }

  var result = {
    id: id,
    initialState: _objectSpread({}, state),
    state: state,
    subscriptions: new Set(),
    context: createNamedContext(id),
    destroy: function destroy() {
      removeNamedContext(id);
      result.subscriptions.clear();
    },
    subscribe: function subscribe(callback) {
      result.subscriptions.add(callback);
      return function () {
        return result.subscriptions.delete(callback);
      };
    },
    getState: function getState() {
      return result.state;
    }
  };
  return result;
}

function getStateUpdateFunctions(state) {
  return Object.keys(state).filter(function (name) {
    return typeof state[name] === 'function';
  }).reduce(function (acc, name) {
    acc[name] = state[name];
    return acc;
  }, {
    setState: function setState(props) {
      return props;
    }
  });
}

var RenderPure =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(RenderPure, _React$PureComponent);

  function RenderPure() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = RenderPure.prototype;

  _proto.render = function render() {
    return this.props.children;
  };

  return RenderPure;
}(React__default.PureComponent);
var Provider =
/*#__PURE__*/
function (_React$PureComponent2) {
  _inheritsLoose(Provider, _React$PureComponent2);

  function Provider(props) {
    var _this;

    _this = _React$PureComponent2.call(this) || this;

    var store = props.store,
        children = props.children,
        id = props.id,
        state = _objectWithoutProperties(props, ["store", "children", "id"]);

    _this.store = store || createStore(state, id); // When no store is given, create context by id or refer to the default context

    if (!store) _this.store.context = id ? createNamedContext(id) : ProviderContext; // Overwrite the functions in store.state to update the state of this Provider

    var actions = getStateUpdateFunctions(_this.store.initialState);
    Object.assign(_this.store.state, Object.keys(actions).reduce(function (acc, name) {
      var _objectSpread2;

      return _objectSpread({}, acc, (_objectSpread2 = {}, _objectSpread2[name] = function () {
        var result = actions[name].apply(actions, arguments);
        var isFunc = typeof result === 'function';
        if (isFunc) result = result(_this.state);

        if (result.then) {
          return new Promise(function (res) {
            return Promise.resolve(result).then(function (state) {
              // Update store
              _this.store.state = _objectSpread({}, _this.store.state, state); // Call subscribers

              _this.store.subscriptions.forEach(function (callback) {
                return callback(state);
              }); // Update local state


              _this.setState(state, res);
            });
          });
        } else {
          // Update store in sync
          _this.store.state = _objectSpread({}, _this.store.state, result);

          _this.store.subscriptions.forEach(function (callback) {
            return callback(result);
          });

          _this.setState(result);

          return true;
        }
      }, _objectSpread2));
    }, {}));
    _this.state = _this.store.state;
    return _this;
  }

  var _proto2 = Provider.prototype;

  _proto2.componentWillUnmount = function componentWillUnmount() {
    if (this.props.id) removeNamedContext(this.props.id);
  };

  _proto2.render = function render() {
    return React__default.createElement(this.store.context.Provider, {
      value: this.state,
      children: React__default.createElement(RenderPure, {
        children: this.props.children
      })
    });
  };

  return Provider;
}(React__default.PureComponent);
process.env.NODE_ENV !== "production" ? Provider.propTypes = {
  id: PropTypes.string,
  state: PropTypes.object,
  store: PropTypes.object
} : void 0;

function moduleContext(initialState) {
  return function (Wrapped) {
    var context = undefined;

    var ModuleContext =
    /*#__PURE__*/
    function (_React$PureComponent) {
      _inheritsLoose(ModuleContext, _React$PureComponent);

      function ModuleContext() {
        return _React$PureComponent.apply(this, arguments) || this;
      }

      var _proto = ModuleContext.prototype;

      _proto.render = function render() {
        return React__default.createElement(Wrapped, _extends({}, this.props, {
          context: context
        }));
      };

      return ModuleContext;
    }(React__default.PureComponent);

    context = createNamedContext(ModuleContext, initialState);
    return ModuleContext;
  };
}

function namedContext(contextName, initialState) {
  return function (Wrapped) {
    return (
      /*#__PURE__*/
      function (_React$PureComponent) {
        _inheritsLoose(NamedContext, _React$PureComponent);

        function NamedContext(props) {
          var _this;

          _this = _React$PureComponent.call(this) || this;
          _this.name = typeof contextName === 'function' ? contextName(props) : contextName;
          _this.state = {
            context: createNamedContext(_this.name, initialState)
          };
          return _this;
        }

        var _proto = NamedContext.prototype;

        _proto.componentWillUnmount = function componentWillUnmount() {
          removeNamedContext(this.name);
        };

        _proto.render = function render() {
          return React__default.createElement(Wrapped, _extends({}, this.props, {
            context: this.state.context
          }));
        };

        return NamedContext;
      }(React__default.PureComponent)
    );
  };
}

function transformContext(context, transform) {
  return function (Wrapped) {
    return subscribe(context, transform)(
    /*#__PURE__*/
    function (_React$PureComponent) {
      _inheritsLoose(TransformContext, _React$PureComponent);

      function TransformContext() {
        return _React$PureComponent.apply(this, arguments) || this;
      }

      var _proto = TransformContext.prototype;

      _proto.render = function render() {
        return React__default.createElement(Wrapped, _extends({}, this.props, {
          context: resolveContext(context, this.props)
        }));
      };

      return TransformContext;
    }(React__default.PureComponent));
  };
}

exports.createStore = createStore;
exports.subscribe = subscribe;
exports.Subscribe = Subscribe;
exports.RenderPure = RenderPure;
exports.Provider = Provider;
exports.ProviderContext = ProviderContext;
exports.namedContext = namedContext;
exports.moduleContext = moduleContext;
exports.transformContext = transformContext;
exports.createNamedContext = createNamedContext;
exports.removeNamedContext = removeNamedContext;
exports.getNamedContext = getNamedContext;
exports.resolveContext = resolveContext;
