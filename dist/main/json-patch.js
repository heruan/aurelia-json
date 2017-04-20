"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_binder_1 = require("type-binder");
var metadataKeys = require("./metadata-keys");
var JsonPatch = (function () {
    function JsonPatch(operations) {
        if (operations === void 0) { operations = []; }
        this.operations = operations;
    }
    Object.defineProperty(JsonPatch.prototype, "length", {
        get: function () {
            return this.operations.length;
        },
        enumerable: true,
        configurable: true
    });
    JsonPatch.prototype.add = function (path, value) {
        this.operations.push({
            "op": "add",
            path: path,
            value: value
        });
        return this;
    };
    JsonPatch.prototype.remove = function (path) {
        this.operations.push({
            "op": "remove",
            path: path
        });
        return this;
    };
    JsonPatch.prototype.replace = function (path, value, serializer) {
        var op = {
            "op": "replace",
            path: path,
            value: value
        };
        Reflect.defineMetadata(metadataKeys.serializer, serializer, op, "value");
        this.operations.push(op);
        return this;
    };
    JsonPatch.prototype.copy = function (fromPath, toPath) {
        this.operations.push({
            "op": "copy",
            "from": fromPath,
            "path": toPath
        });
        return this;
    };
    JsonPatch.prototype.move = function (fromPath, toPath) {
        this.operations.push({
            "op": "move",
            "from": fromPath,
            "path": toPath
        });
        return this;
    };
    JsonPatch.prototype.test = function (path, value) {
        this.operations.push({
            "op": "test",
            path: path,
            value: value
        });
        return this;
    };
    JsonPatch.prototype.reset = function () {
        this.operations = [];
        return this;
    };
    JsonPatch.prototype.getArray = function () {
        return this.operations;
    };
    JsonPatch.prototype.toJSON = function () {
        return this.getArray();
    };
    JsonPatch.diff = function (target, properties, patch, prefix, separator, wildcard, seen) {
        if (properties === void 0) { properties = Object.keys(target); }
        if (patch === void 0) { patch = new JsonPatch(); }
        if (separator === void 0) { separator = "/"; }
        if (wildcard === void 0) { wildcard = "-"; }
        if (seen === void 0) { seen = new Set(); }
        seen.add(target);
        var _loop_1 = function (key) {
            var currentValue = target[key];
            if (Reflect.hasMetadata(type_binder_1.binderPropertyTrackValue, target, key)) {
                var comparingCallback = Reflect.getMetadata(type_binder_1.binderPropertyTrackCompare, target, key);
                var originalValue = Reflect.getMetadata(type_binder_1.binderPropertyTrackValue, target, key);
                if (!comparingCallback(currentValue, originalValue)) {
                    var pointer = [prefix, key].join(separator);
                    // patch.test(pointer, originalValue);
                    patch.replace([prefix, key].join(separator), currentValue);
                }
                else if (currentValue !== null && typeof currentValue === "object" && !seen.has(currentValue)) {
                    JsonPatch.diff(currentValue, Object.keys(currentValue), patch, [prefix, key].join(separator), separator, wildcard, seen);
                }
            }
            else if (currentValue !== null && Reflect.hasMetadata(type_binder_1.binderPropertyEntriesValue, target, key)) {
                var trackingCallback = Reflect.getMetadata(type_binder_1.binderPropertyEntries, target, key);
                var comparingCallback_1 = Reflect.getMetadata(type_binder_1.binderPropertyEntriesCompare, target, key);
                var originalEntries = Reflect.getMetadata(type_binder_1.binderPropertyEntriesValue, target, key);
                var currentEntries_1 = trackingCallback(currentValue);
                originalEntries.forEach(function (value, index) {
                    var pointer = [prefix, key, index].join(separator);
                    if (index >= currentEntries_1.length) {
                        // patch.test(pointer, value);
                        patch.remove(pointer);
                    }
                    else if (!comparingCallback_1(value, currentEntries_1[index])) {
                        // patch.test(pointer, value);
                        patch.replace(pointer, currentEntries_1[index], Reflect.getMetadata(metadataKeys.serializer, target, key));
                    }
                    else if (value !== null && typeof value === "object" && !seen.has(value)) {
                        JsonPatch.diff(value, Object.keys(value), patch, pointer, separator, wildcard, seen);
                    }
                });
                if (currentEntries_1.length > originalEntries.length) {
                    var path_1 = [prefix, key, wildcard].join(separator);
                    currentEntries_1.slice(originalEntries.length).forEach(function (value) { return patch.add(path_1, value); });
                }
            }
        };
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var key = properties_1[_i];
            _loop_1(key);
        }
        return patch;
    };
    return JsonPatch;
}());
exports.JsonPatch = JsonPatch;

//# sourceMappingURL=json-patch.js.map
