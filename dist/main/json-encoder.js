"use strict";
var metadataKeys = require("./metadata-keys");
var JsonEncoder = (function () {
    function JsonEncoder() {
        this.serializers = new Map();
    }
    JsonEncoder.prototype.encode = function (value, ignore) {
        var _this = this;
        if (ignore === void 0) { ignore = []; }
        if (value === null) {
            return JsonEncoder.VALUE_NULL;
        }
        else if (typeof value === "boolean") {
            return value ? JsonEncoder.VALUE_TRUE : JsonEncoder.VALUE_FALSE;
        }
        else if (typeof value === "number") {
            return value.toString();
        }
        else if (typeof value === "string") {
            return JsonEncoder.START_STRING + value + JsonEncoder.END_STRING;
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
        else {
            var prototype = Object.getPrototypeOf(value);
            var serializer = this.serializers.get(value.constructor);
            if (serializer) {
                return serializer(value);
            }
            var json = JsonEncoder.START_OBJECT;
            var properties = [];
            for (var key in value) {
                var jsonIgnore = Reflect.getMetadata(metadataKeys.jsonIgnore, prototype, key);
                if (ignore.indexOf(key) < 0) {
                    properties.push({ key: key, value: value[key], ignore: jsonIgnore || [] });
                }
            }
            json += properties.map(function (property) {
                return JsonEncoder.START_STRING + property.key + JsonEncoder.END_STRING +
                    JsonEncoder.DEFINITION + _this.encode(property.value, property.ignore);
            }).join(JsonEncoder.SEPARATOR) + JsonEncoder.END_OBJECT;
            return json;
        }
    };
    JsonEncoder.prototype.withSerializer = function (type, serializer) {
        this.serializers.set(type, serializer);
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
