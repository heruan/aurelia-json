"use strict";
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
    JsonPatch.prototype.add = function (path, value, index) {
        if (index === void 0) { index = -1; }
        this.operations.push({
            "op": "add",
            "path": path + "/" + (index >= 0 ? index : "-"),
            "value": value
        });
        return this;
    };
    JsonPatch.prototype.remove = function (path, index) {
        if (index === void 0) { index = -1; }
        this.operations.push({
            "op": "remove",
            "path": path + "/" + index
        });
        return this;
    };
    JsonPatch.prototype.replace = function (path, value) {
        this.operations.push({
            "op": "replace",
            "path": path,
            "value": value
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
            "path": path,
            "value": value
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
    return JsonPatch;
}());
exports.JsonPatch = JsonPatch;
//# sourceMappingURL=patch.js.map