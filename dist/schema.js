"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JsonSchema = (function (_super) {
    __extends(JsonSchema, _super);
    function JsonSchema(schema) {
        _super.call(this, JSON.parse(schema, JsonSchema.asMapReviver));
    }
    JsonSchema.asMapReviver = function (key, value) {
        if (value === null || Array.isArray(value) || typeof value !== "object" || value instanceof Map) {
            return value;
        }
        else {
            var map = new Map();
            for (var k in value) {
                map.set(k, value[k]);
            }
            return map;
        }
    };
    JsonSchema.asMap = function (schema) {
        return JSON.parse(schema, JsonSchema.asMapReviver);
    };
    return JsonSchema;
}(Map));
exports.JsonSchema = JsonSchema;
//# sourceMappingURL=schema.js.map