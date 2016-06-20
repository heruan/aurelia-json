"use strict";
var patch_1 = require("./patch");
var JsonDecoder = (function () {
    function JsonDecoder(map, rev, identityProperty, referenceProperty) {
        if (map === void 0) { map = new Map(); }
        if (rev === void 0) { rev = new Map(); }
        if (identityProperty === void 0) { identityProperty = "@id"; }
        if (referenceProperty === void 0) { referenceProperty = "@ref"; }
        this.map = map;
        this.rev = rev;
        this.identityProperty = identityProperty;
        this.referenceProperty = referenceProperty;
    }
    JsonDecoder.prototype.getEntityMap = function () {
        return this.map;
    };
    JsonDecoder.prototype.setEntityMap = function (entityMap) {
        this.map = entityMap;
    };
    JsonDecoder.prototype.getRevertMap = function () {
        return this.rev;
    };
    JsonDecoder.prototype.setRevertMap = function (revertMap) {
        this.rev = revertMap;
    };
    JsonDecoder.prototype.diff = function (target, properties, patch, prefix, seen) {
        if (properties === void 0) { properties = []; }
        if (patch === void 0) { patch = new patch_1.JsonPatch(); }
        if (prefix === void 0) { prefix = "/"; }
        if (seen === void 0) { seen = new Set(); }
        seen.add(target);
        var source = this.rev.get(target);
        if (properties.length == 0) {
            properties = Object.keys(target);
        }
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var property = properties_1[_i];
            if (Array.isArray(target[property])) {
                var targetArray = target[property];
                var sourceArray = source[property];
                for (var _a = 0, sourceArray_1 = sourceArray; _a < sourceArray_1.length; _a++) {
                    var item = sourceArray_1[_a];
                    var targetIndex = targetArray.indexOf(item);
                    var sourceIndex = sourceArray.indexOf(item);
                    if (targetIndex < 0) {
                        patch.remove(prefix + property, sourceIndex);
                    }
                }
                for (var _b = 0, targetArray_1 = targetArray; _b < targetArray_1.length; _b++) {
                    var item = targetArray_1[_b];
                    var targetIndex = targetArray.indexOf(item);
                    var sourceIndex = sourceArray.indexOf(item);
                    if (sourceIndex < 0) {
                        patch.add(prefix + property, item);
                    }
                    else {
                        if (targetIndex !== sourceIndex) {
                        }
                        if (!seen.has(item) && this.rev.has(item)) {
                            this.diff(item, [], patch, (prefix + property) + "/" + targetIndex + "/", seen);
                        }
                    }
                }
            }
            else if (target[property] === source[property] && !seen.has(target[property]) && this.rev.has(target[property])) {
                this.diff(target[property], [], patch, (prefix + property) + "/", seen);
            }
            else if (target[property] !== source[property]) {
                patch.replace(prefix + property, target[property]);
            }
        }
        return patch;
    };
    JsonDecoder.prototype.decode = function (json) {
        return JSON.parse(json, this.reviver.bind(this));
    };
    JsonDecoder.prototype.reviver = function (key, value) {
        if (value === null || Array.isArray(value) || typeof value !== "object") {
            return value;
        }
        else {
            if (value.hasOwnProperty(this.identityProperty)) {
                var identity = value[this.identityProperty];
                var original = value;
                if (this.map.has(identity)) {
                    value = this.assign(this.map.get(identity), original);
                    delete value[this.referenceProperty];
                }
                else {
                    this.map.set(identity, value);
                }
                var rev = void 0;
                if (!this.rev.has(value)) {
                    this.rev.set(value, this.buildRev(value));
                }
                else {
                    Object.assign(this.rev.get(value), this.buildRev(original));
                }
                return value;
            }
            else if (value.hasOwnProperty(this.referenceProperty)) {
                var identity = value[this.referenceProperty];
                if (this.map.has(identity)) {
                    return this.map.get(identity);
                }
                else {
                    this.map.set(identity, value);
                    return value;
                }
            }
            else {
                if (value !== null && typeof value === "object") {
                    this.rev.set(value, this.buildRev(value));
                }
                return value;
            }
        }
    };
    JsonDecoder.prototype.assign = function (target, source) {
        for (var property in source) {
            var sourceValue = source[property];
            var targetValue = target[property];
            if (Array.isArray(sourceValue)) {
                if (!Array.isArray(targetValue)) {
                    target[property] = sourceValue;
                }
                else
                    for (var _i = 0, sourceValue_1 = sourceValue; _i < sourceValue_1.length; _i++) {
                        var item = sourceValue_1[_i];
                        var sourceIndex = sourceValue.indexOf(item);
                        if (item !== targetValue[sourceIndex]) {
                            targetValue.splice(sourceIndex, 1, item);
                        }
                    }
            }
            else {
                target[property] = sourceValue;
            }
        }
        return target;
    };
    JsonDecoder.prototype.buildRev = function (object) {
        var rev = {};
        for (var _i = 0, _a = Object.keys(object); _i < _a.length; _i++) {
            var property = _a[_i];
            if (Array.isArray(object[property])) {
                rev[property] = object[property].slice();
            }
            else {
                rev[property] = object[property];
            }
        }
        return rev;
    };
    return JsonDecoder;
}());
exports.JsonDecoder = JsonDecoder;
//# sourceMappingURL=json-decoder.js.map