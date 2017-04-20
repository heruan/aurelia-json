"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_http_utils_1 = require("aurelia-http-utils");
var json_encoder_1 = require("./json-encoder");
var JsonMessageContentInterceptor = (function () {
    function JsonMessageContentInterceptor() {
    }
    JsonMessageContentInterceptor.prototype.request = function (message) {
        if (message.headers.has(aurelia_http_utils_1.HttpHeaders.CONTENT_TYPE) && message.headers.get(aurelia_http_utils_1.HttpHeaders.CONTENT_TYPE).startsWith("application/json")) {
            message.content = new json_encoder_1.JsonEncoder().encode(message.content);
        }
        return message;
    };
    return JsonMessageContentInterceptor;
}());
exports.JsonMessageContentInterceptor = JsonMessageContentInterceptor;

//# sourceMappingURL=json-message-content-interceptor.js.map
