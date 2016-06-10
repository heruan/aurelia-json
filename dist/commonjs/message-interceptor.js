"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JsonMessageInterceptor = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _aureliaDependencyInjection = require("aurelia-dependency-injection");

var _httpUtils = require("http-utils");

var _jsonEncoder = require("./json-encoder");

var _jsonDecoder = require("./json-decoder");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var JsonMessageInterceptor = exports.JsonMessageInterceptor = function () {
    function JsonMessageInterceptor(jsonDecoder) {
        _classCallCheck(this, JsonMessageInterceptor);

        this.jsonDecoder = jsonDecoder;
    }

    JsonMessageInterceptor.prototype.request = function request(message) {
        var contentType = message.headers.get(_httpUtils.HttpHeaders.CONTENT_TYPE);
        switch (contentType) {
            case _httpUtils.MediaType.APPLICATION_JSON:
                var jsonEncoder = new _jsonEncoder.JsonEncoder();
                message.replacer = jsonEncoder.replacer.bind(jsonEncoder);
                break;
            case _httpUtils.MediaType.APPLICATION_JSON_PATCH:
                var patch = message.content;
                message.content = patch.getArray().map(function (op) {
                    var jsonEncoder = new _jsonEncoder.JsonEncoder();
                    return JSON.parse(jsonEncoder.encode(op));
                });
                break;
        }
        return message;
    };

    JsonMessageInterceptor.prototype.response = function response(message) {
        var contentType = message.headers.get(_httpUtils.HttpHeaders.CONTENT_TYPE);
        if (contentType && contentType.match(new RegExp("^" + _httpUtils.MediaType.APPLICATION_JSON))) {
            message.reviver = this.jsonDecoder.reviver.bind(this.jsonDecoder);
        }
        return message;
    };

    return JsonMessageInterceptor;
}();
exports.JsonMessageInterceptor = JsonMessageInterceptor = __decorate([_aureliaDependencyInjection.autoinject, __metadata('design:paramtypes', [_jsonDecoder.JsonDecoder])], JsonMessageInterceptor);