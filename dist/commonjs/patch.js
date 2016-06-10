"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JsonPatch = exports.JsonPatch = function () {
    function JsonPatch() {
        var operations = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

        _classCallCheck(this, JsonPatch);

        this.operations = operations;
    }

    JsonPatch.prototype.add = function add(path, value) {
        var index = arguments.length <= 2 || arguments[2] === undefined ? -1 : arguments[2];

        this.operations.push({
            "op": "add",
            "path": path + "/" + (index >= 0 ? index : "-"),
            "value": value
        });
        return this;
    };

    JsonPatch.prototype.remove = function remove(path) {
        var index = arguments.length <= 1 || arguments[1] === undefined ? -1 : arguments[1];

        this.operations.push({
            "op": "remove",
            "path": path + "/" + index
        });
        return this;
    };

    JsonPatch.prototype.replace = function replace(path, value) {
        this.operations.push({
            "op": "replace",
            "path": path,
            "value": value
        });
        return this;
    };

    JsonPatch.prototype.copy = function copy(fromPath, toPath) {
        this.operations.push({
            "op": "copy",
            "from": fromPath,
            "path": toPath
        });
        return this;
    };

    JsonPatch.prototype.move = function move(fromPath, toPath) {
        this.operations.push({
            "op": "move",
            "from": fromPath,
            "path": toPath
        });
        return this;
    };

    JsonPatch.prototype.test = function test(path, value) {
        this.operations.push({
            "op": "test",
            "path": path,
            "value": value
        });
        return this;
    };

    JsonPatch.prototype.reset = function reset() {
        this.operations = [];
        return this;
    };

    JsonPatch.prototype.getArray = function getArray() {
        return this.operations;
    };

    JsonPatch.prototype.toJSON = function toJSON() {
        return this.getArray();
    };

    _createClass(JsonPatch, [{
        key: "length",
        get: function get() {
            return this.operations.length;
        }
    }]);

    return JsonPatch;
}();