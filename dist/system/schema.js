"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _typeof, _createClass, JsonSchema;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [],
        execute: function () {
            _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
            };

            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("JsonSchema", JsonSchema = function (_Map) {
                _inherits(JsonSchema, _Map);

                function JsonSchema(schema) {
                    _classCallCheck(this, JsonSchema);

                    return _possibleConstructorReturn(this, _Map.call(this, JSON.parse(schema, JsonSchema.asMapReviver)));
                }

                JsonSchema.asMapReviver = function asMapReviver(key, value) {
                    if (value === null || Array.isArray(value) || (typeof value === "undefined" ? "undefined" : _typeof(value)) !== "object" || value instanceof Map) {
                        return value;
                    } else {
                        var map = new Map();
                        for (var k in value) {
                            map.set(k, value[k]);
                        }
                        return map;
                    }
                };

                JsonSchema.asMap = function asMap(schema) {
                    return JSON.parse(schema, JsonSchema.asMapReviver);
                };

                _createClass(JsonSchema, null, [{
                    key: Symbol.species,
                    get: function get() {
                        return Map;
                    }
                }]);

                return JsonSchema;
            }(Map));

            _export("JsonSchema", JsonSchema);
        }
    };
});