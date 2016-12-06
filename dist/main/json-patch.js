"use strict";
var type_binder_1 = require("type-binder");
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
    JsonPatch.prototype.replace = function (path, value) {
        this.operations.push({
            "op": "replace",
            path: path,
            value: value
        });
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
    JsonPatch.diff = function (target, properties, patch, prefix, separator, wildcard) {
        if (properties === void 0) { properties = target; }
        if (patch === void 0) { patch = new JsonPatch(); }
        if (separator === void 0) { separator = "/"; }
        if (wildcard === void 0) { wildcard = "-"; }
        var _loop_1 = function (key) {
            var include = properties[key];
            if (include) {
                var currentValue = target[key];
                if (Reflect.hasMetadata(type_binder_1.binderPropertyTrackValue, target, key)) {
                    var comparingCallback = Reflect.getMetadata(type_binder_1.binderPropertyTrackCompare, target, key);
                    var originalValue = Reflect.getMetadata(type_binder_1.binderPropertyTrackValue, target, key);
                    if (!comparingCallback(currentValue, originalValue)) {
                        var pointer = [prefix, key].join(separator);
                        patch.test(pointer, originalValue);
                        patch.replace([prefix, key].join(separator), currentValue);
                    }
                    else if (currentValue !== null && typeof currentValue === "object") {
                        JsonPatch.diff(currentValue, include, patch, [prefix, key].join(separator), separator, wildcard);
                    }
                }
                else if (currentValue !== null && Reflect.hasMetadata(type_binder_1.binderPropertyEntriesValue, target, key)) {
                    var comparingCallback_1 = Reflect.getMetadata(type_binder_1.binderPropertyEntriesCompare, target, key);
                    var originalEntries = Reflect.getMetadata(type_binder_1.binderPropertyEntriesValue, target, key);
                    var originalLength = originalEntries.length;
                    var originalTrack_1 = originalEntries.slice();
                    var currentEntries_1 = Array.from(currentValue);
                    var currentLength_1 = currentEntries_1.length;
                    var addEntries_1 = currentEntries_1.slice();
                    originalEntries.forEach(function (value) {
                        var index = originalTrack_1.indexOf(value);
                        var found = currentEntries_1.findIndex(function (item) { return comparingCallback_1(value, item); });
                        var from = [prefix, key, index].join(separator);
                        if (found >= 0) {
                            var pointer = [prefix, key, found].join(separator);
                            if (found !== index) {
                                patch.test(from, value);
                                patch.move(from, pointer);
                                originalTrack_1.splice(index, 1);
                                originalTrack_1[found] = value;
                            }
                            addEntries_1.splice(addEntries_1.indexOf(currentEntries_1[found]), 1);
                        }
                        else if (index < currentLength_1) {
                            patch.test(from, value);
                            patch.replace(from, currentEntries_1[index]);
                            originalTrack_1[index] = currentEntries_1[index];
                            addEntries_1.splice(addEntries_1.indexOf(currentEntries_1[index]), 1);
                        }
                        else {
                            patch.test(from, value);
                            patch.remove(from);
                            originalTrack_1.splice(index, 1);
                        }
                    });
                    if (addEntries_1.length > 0) {
                        var path_1 = [prefix, key, wildcard].join(separator);
                        addEntries_1.forEach(function (value) { return patch.add(path_1, value); });
                    }
                }
            }
        };
        for (var key in properties) {
            _loop_1(key);
        }
        return patch;
    };
    return JsonPatch;
}());
exports.JsonPatch = JsonPatch;
