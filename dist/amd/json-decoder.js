define(["exports", "./patch"], function (exports, _patch) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.JsonDecoder = undefined;

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var JsonDecoder = exports.JsonDecoder = function () {
        function JsonDecoder() {
            var map = arguments.length <= 0 || arguments[0] === undefined ? new Map() : arguments[0];
            var rev = arguments.length <= 1 || arguments[1] === undefined ? new Map() : arguments[1];
            var identityProperty = arguments.length <= 2 || arguments[2] === undefined ? "@id" : arguments[2];
            var referenceProperty = arguments.length <= 3 || arguments[3] === undefined ? "@ref" : arguments[3];

            _classCallCheck(this, JsonDecoder);

            this.map = map;
            this.rev = rev;
            this.identityProperty = identityProperty;
            this.referenceProperty = referenceProperty;
        }

        JsonDecoder.prototype.getEntityMap = function getEntityMap() {
            return this.map;
        };

        JsonDecoder.prototype.setEntityMap = function setEntityMap(entityMap) {
            this.map = entityMap;
        };

        JsonDecoder.prototype.getRevertMap = function getRevertMap() {
            return this.rev;
        };

        JsonDecoder.prototype.setRevertMap = function setRevertMap(revertMap) {
            this.rev = revertMap;
        };

        JsonDecoder.prototype.diff = function diff(target) {
            var properties = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
            var patch = arguments.length <= 2 || arguments[2] === undefined ? new _patch.JsonPatch() : arguments[2];
            var prefix = arguments.length <= 3 || arguments[3] === undefined ? "/" : arguments[3];
            var seen = arguments.length <= 4 || arguments[4] === undefined ? new Set() : arguments[4];

            seen.add(target);
            var source = this.rev.get(target);
            if (properties.length == 0) {
                properties = Object.keys(target);
            }
            for (var _iterator = properties, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var property = _ref;

                if (Array.isArray(target[property])) {
                    var targetArray = target[property];
                    var sourceArray = source[property];
                    for (var _iterator2 = sourceArray, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                        var _ref2;

                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) break;
                            _ref2 = _iterator2[_i2++];
                        } else {
                            _i2 = _iterator2.next();
                            if (_i2.done) break;
                            _ref2 = _i2.value;
                        }

                        var item = _ref2;

                        var targetIndex = targetArray.indexOf(item);
                        var sourceIndex = sourceArray.indexOf(item);
                        if (targetIndex < 0) {
                            patch.remove(prefix + property, sourceIndex);
                        }
                    }
                    for (var _iterator3 = targetArray, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                        var _ref3;

                        if (_isArray3) {
                            if (_i3 >= _iterator3.length) break;
                            _ref3 = _iterator3[_i3++];
                        } else {
                            _i3 = _iterator3.next();
                            if (_i3.done) break;
                            _ref3 = _i3.value;
                        }

                        var _item = _ref3;

                        var _targetIndex = targetArray.indexOf(_item);
                        var _sourceIndex = sourceArray.indexOf(_item);
                        if (_sourceIndex < 0) {
                            patch.add(prefix + property, _item);
                        } else {
                            if (_targetIndex !== _sourceIndex) {}
                            if (!seen.has(_item) && this.rev.has(_item)) {
                                this.diff(_item, [], patch, prefix + property + "/" + _targetIndex + "/", seen);
                            }
                        }
                    }
                } else if (target[property] === source[property] && !seen.has(target[property]) && this.rev.has(target[property])) {
                    this.diff(target[property], [], patch, prefix + property + "/", seen);
                } else if (target[property] !== source[property]) {
                    patch.replace(prefix + property, target[property]);
                }
            }
            return patch;
        };

        JsonDecoder.prototype.decode = function decode(json) {
            return JSON.parse(json, this.reviver.bind(this));
        };

        JsonDecoder.prototype.reviver = function reviver(key, value) {
            if (value === null || Array.isArray(value) || (typeof value === "undefined" ? "undefined" : _typeof(value)) !== "object") {
                return value;
            } else {
                if (value.hasOwnProperty(this.identityProperty)) {
                    var identity = value[this.identityProperty];
                    var original = value;
                    if (this.map.has(identity)) {
                        value = this.assign(this.map.get(identity), original);
                        delete value[this.referenceProperty];
                    } else {
                        this.map.set(identity, value);
                    }
                    var rev = void 0;
                    if (!this.rev.has(value)) {
                        this.rev.set(value, this.buildRev(value));
                    } else {
                        Object.assign(this.rev.get(value), this.buildRev(original));
                    }
                    return value;
                } else if (value.hasOwnProperty(this.referenceProperty)) {
                    var _identity = value[this.referenceProperty];
                    if (this.map.has(_identity)) {
                        return this.map.get(_identity);
                    } else {
                        this.map.set(_identity, value);
                        return value;
                    }
                } else {
                    if (value !== null && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") {
                        this.rev.set(value, this.buildRev(value));
                    }
                    return value;
                }
            }
        };

        JsonDecoder.prototype.assign = function assign(target, source) {
            for (var property in source) {
                var sourceValue = source[property];
                var targetValue = target[property];
                if (Array.isArray(sourceValue)) {
                    if (!Array.isArray(targetValue)) {
                        target[property] = sourceValue;
                    } else {
                        for (var _iterator4 = sourceValue, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
                            var _ref4;

                            if (_isArray4) {
                                if (_i4 >= _iterator4.length) break;
                                _ref4 = _iterator4[_i4++];
                            } else {
                                _i4 = _iterator4.next();
                                if (_i4.done) break;
                                _ref4 = _i4.value;
                            }

                            var _item2 = _ref4;

                            var sourceIndex = sourceValue.indexOf(_item2);
                            if (_item2 !== targetValue[sourceIndex]) {
                                targetValue.splice(sourceIndex, 1, _item2);
                            }
                        }
                    }
                } else {
                    target[property] = sourceValue;
                }
            }
            return target;
        };

        JsonDecoder.prototype.buildRev = function buildRev(object) {
            var rev = {};
            for (var _iterator5 = Object.keys(object), _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
                var _ref5;

                if (_isArray5) {
                    if (_i5 >= _iterator5.length) break;
                    _ref5 = _iterator5[_i5++];
                } else {
                    _i5 = _iterator5.next();
                    if (_i5.done) break;
                    _ref5 = _i5.value;
                }

                var property = _ref5;

                if (Array.isArray(object[property])) {
                    rev[property] = object[property].slice();
                } else {
                    rev[property] = object[property];
                }
            }
            return rev;
        };

        return JsonDecoder;
    }();
});