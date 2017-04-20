"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadataKeys = require("./metadata-keys");
var JsonEncoder = (function () {
    function JsonEncoder() {
        this.serializers = new Map();
    }
    JsonEncoder.prototype.encode = function (value, ignore) {
        var _this = this;
        if (ignore === void 0) { ignore = []; }
        if (value === null || value === undefined) {
            return JsonEncoder.VALUE_NULL;
        }
        var prototype = Object.getPrototypeOf(value);
        if (typeof value === "boolean") {
            return value ? JsonEncoder.VALUE_TRUE : JsonEncoder.VALUE_FALSE;
        }
        else if (typeof value === "number") {
            return value.toString();
        }
        else if (typeof value === "string") {
            return JSON.stringify(value);
        }
        else if (typeof value["toJSON"] === "function") {
            return this.encode(value.toJSON(), ignore);
        }
        else if (typeof value[Symbol.iterator] === "function") {
            var json = JsonEncoder.START_ARRAY;
            json += Array.from(value, function (item) { return _this.encode(item, ignore); }).join(JsonEncoder.SEPARATOR);
            json += JsonEncoder.END_ARRAY;
            return json;
        }
        else if (this.serializers.has(value.constructor)) {
            return this.serializers.get(value.constructor)(value);
        }
        else {
            var json = JsonEncoder.START_OBJECT;
            var properties = [];
            for (var _i = 0, _a = Object.keys(value); _i < _a.length; _i++) {
                var key = _a[_i];
                var jsonIgnore = Reflect.getMetadata(metadataKeys.jsonIgnore, prototype, key);
                if (ignore.indexOf(key) < 0) {
                    properties.push({ key: key, value: value[key], ignore: jsonIgnore || [] });
                }
            }
            json += properties.map(function (property) {
                var key = JsonEncoder.START_STRING + property.key + JsonEncoder.END_STRING;
                var value;
                if (property.value === null || property.value === undefined) {
                    value = JsonEncoder.VALUE_NULL;
                }
                else if (Reflect.hasMetadata(metadataKeys.serializer, prototype, property.key)) {
                    var serializer = Reflect.getMetadata(metadataKeys.serializer, prototype, property.key);
                    value = _this.encode(serializer(property.value));
                }
                else {
                    value = _this.encode(property.value, property.ignore);
                }
                return key + JsonEncoder.DEFINITION + value;
            }).join(JsonEncoder.SEPARATOR) + JsonEncoder.END_OBJECT;
            return json;
        }
    };
    JsonEncoder.prototype.withSerializer = function (serializer) {
        var _this = this;
        var types = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            types[_i - 1] = arguments[_i];
        }
        types.forEach(function (type) { return _this.serializers.set(type, serializer); });
        return this;
    };
    return JsonEncoder;
}());
JsonEncoder.START_OBJECT = "{";
JsonEncoder.END_OBJECT = "}";
JsonEncoder.START_ARRAY = "[";
JsonEncoder.END_ARRAY = "]";
JsonEncoder.START_STRING = '"';
JsonEncoder.END_STRING = '"';
JsonEncoder.VALUE_NULL = "null";
JsonEncoder.VALUE_TRUE = "true";
JsonEncoder.VALUE_FALSE = "false";
JsonEncoder.DEFINITION = ":";
JsonEncoder.SEPARATOR = ",";
exports.JsonEncoder = JsonEncoder;

//# sourceMappingURL=json-encoder.js.map
