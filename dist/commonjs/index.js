"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JsonMessageInterceptor = exports.JsonDecoder = exports.JsonEncoder = exports.JsonPointer = exports.JsonPatch = exports.JsonSchema = undefined;
exports.configure = configure;

var _aureliaHttpClient = require("aurelia-http-client");

var _schema = require("./schema");

var _patch = require("./patch");

var _pointer = require("./pointer");

var _jsonEncoder = require("./json-encoder");

var _jsonDecoder = require("./json-decoder");

var _messageInterceptor = require("./message-interceptor");

function configure(frameworkConfiguration, pluginConfiguration) {
    var container = frameworkConfiguration.container;
    var httpClient = container.get(_aureliaHttpClient.HttpClient);
    var jsonDecoder = new _jsonDecoder.JsonDecoder();
    container.registerTransient(_jsonEncoder.JsonEncoder);
    container.registerInstance(_jsonDecoder.JsonDecoder, jsonDecoder);
    httpClient.configure(function (requestBuilder) {
        requestBuilder.withInterceptor(new _messageInterceptor.JsonMessageInterceptor(jsonDecoder));
    });
    if (pluginConfiguration) {
        pluginConfiguration(jsonDecoder);
    }
}
exports.JsonSchema = _schema.JsonSchema;
exports.JsonPatch = _patch.JsonPatch;
exports.JsonPointer = _pointer.JsonPointer;
exports.JsonEncoder = _jsonEncoder.JsonEncoder;
exports.JsonDecoder = _jsonDecoder.JsonDecoder;
exports.JsonMessageInterceptor = _messageInterceptor.JsonMessageInterceptor;