"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var JsonSchema = (function (_super) {
    __extends(JsonSchema, _super);
    function JsonSchema(schema) {
        return _super.call(this, JSON.parse(schema, JsonSchema.asMapReviver)) || this;
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

//# sourceMappingURL=json-schema.js.map
