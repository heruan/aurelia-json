"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var aurelia_http_utils_1 = require("aurelia-http-utils");
var json_encoder_1 = require("./json-encoder");
var json_decoder_1 = require("./json-decoder");
var JsonMessageInterceptor = (function () {
    function JsonMessageInterceptor(jsonDecoder) {
        this.jsonDecoder = jsonDecoder;
    }
    JsonMessageInterceptor.prototype.request = function (message) {
        var contentType = message.headers.get(aurelia_http_utils_1.HttpHeaders.CONTENT_TYPE);
        switch (contentType) {
            case aurelia_http_utils_1.MediaType.APPLICATION_JSON:
                var jsonEncoder = new json_encoder_1.JsonEncoder();
                message.replacer = jsonEncoder.replacer.bind(jsonEncoder);
                break;
            case aurelia_http_utils_1.MediaType.APPLICATION_JSON_PATCH:
                var patch = message.content;
                message.content = patch.getArray().map(function (op) {
                    var jsonEncoder = new json_encoder_1.JsonEncoder();
                    return JSON.parse(jsonEncoder.encode(op));
                });
                break;
        }
        return message;
    };
    JsonMessageInterceptor.prototype.response = function (message) {
        var contentType = message.headers.get(aurelia_http_utils_1.HttpHeaders.CONTENT_TYPE);
        if (contentType && contentType.match(new RegExp("^" + aurelia_http_utils_1.MediaType.APPLICATION_JSON))) {
            message.reviver = this.jsonDecoder.reviver.bind(this.jsonDecoder);
        }
        return message;
    };
    JsonMessageInterceptor = __decorate([
        aurelia_dependency_injection_1.autoinject, 
        __metadata('design:paramtypes', [json_decoder_1.JsonDecoder])
    ], JsonMessageInterceptor);
    return JsonMessageInterceptor;
}());
exports.JsonMessageInterceptor = JsonMessageInterceptor;
//# sourceMappingURL=message-interceptor.js.map