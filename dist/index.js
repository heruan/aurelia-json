"use strict";
var aurelia_http_client_1 = require("aurelia-http-client");
var schema_1 = require("./schema");
exports.JsonSchema = schema_1.JsonSchema;
var patch_1 = require("./patch");
exports.JsonPatch = patch_1.JsonPatch;
var pointer_1 = require("./pointer");
exports.JsonPointer = pointer_1.JsonPointer;
var json_encoder_1 = require("./json-encoder");
exports.JsonEncoder = json_encoder_1.JsonEncoder;
var json_decoder_1 = require("./json-decoder");
exports.JsonDecoder = json_decoder_1.JsonDecoder;
var message_interceptor_1 = require("./message-interceptor");
exports.JsonMessageInterceptor = message_interceptor_1.JsonMessageInterceptor;
function configure(frameworkConfiguration, pluginConfiguration) {
    var container = frameworkConfiguration.container;
    var httpClient = container.get(aurelia_http_client_1.HttpClient);
    var jsonDecoder = new json_decoder_1.JsonDecoder();
    container.registerTransient(json_encoder_1.JsonEncoder);
    container.registerInstance(json_decoder_1.JsonDecoder, jsonDecoder);
    httpClient.configure(function (requestBuilder) {
        requestBuilder.withInterceptor(new message_interceptor_1.JsonMessageInterceptor(jsonDecoder));
    });
    if (pluginConfiguration) {
        pluginConfiguration(jsonDecoder);
    }
}
exports.configure = configure;
//# sourceMappingURL=index.js.map