"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _typeof, JsonEncoder;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
            };

            _export("JsonEncoder", JsonEncoder = function () {
                function JsonEncoder() {
                    var map = arguments.length <= 0 || arguments[0] === undefined ? new Map() : arguments[0];
                    var identityProperty = arguments.length <= 1 || arguments[1] === undefined ? "@id" : arguments[1];
                    var referenceProperty = arguments.length <= 2 || arguments[2] === undefined ? "@ref" : arguments[2];

                    _classCallCheck(this, JsonEncoder);

                    this.map = map;
                    this.identityProperty = identityProperty;
                    this.referenceProperty = referenceProperty;
                }

                JsonEncoder.prototype.encode = function encode(object) {
                    return JSON.stringify(object, this.replacer.bind(this));
                };

                JsonEncoder.prototype.replacer = function replacer(key, value) {
                    if (value === null || Array.isArray(value) || (typeof value === "undefined" ? "undefined" : _typeof(value)) !== "object") {
                        return value;
                    } else if (this.map.has(value)) {
                        return this.map.get(value);
                    } else if (value.hasOwnProperty(this.identityProperty)) {
                        var identity = value[this.identityProperty];
                        var ref = {};
                        ref[this.referenceProperty] = identity;
                        this.map.set(value, ref);
                        return value;
                    } else {
                        return value;
                    }
                };

                return JsonEncoder;
            }());

            _export("JsonEncoder", JsonEncoder);
        }
    };
});