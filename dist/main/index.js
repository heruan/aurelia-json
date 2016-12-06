"use strict";
var aurelia_http_client_1 = require("aurelia-http-client");
var json_schema_1 = require("./json-schema");
exports.JsonSchema = json_schema_1.JsonSchema;
var json_patch_1 = require("./json-patch");
exports.JsonPatch = json_patch_1.JsonPatch;
var json_pointer_1 = require("./json-pointer");
exports.JsonPointer = json_pointer_1.JsonPointer;
var json_encoder_1 = require("./json-encoder");
exports.JsonEncoder = json_encoder_1.JsonEncoder;
var json_decoder_1 = require("./json-decoder");
exports.JsonDecoder = json_decoder_1.JsonDecoder;
var json_multipart_related_interceptor_1 = require("./json-multipart-related-interceptor");
exports.JsonMultipartRelatedInterceptor = json_multipart_related_interceptor_1.JsonMultipartRelatedInterceptor;
function configure(frameworkConfiguration, pluginConfiguration) {
    var container = frameworkConfiguration.container;
    var httpClient = container.get(aurelia_http_client_1.HttpClient);
    var jsonDecoder = new json_decoder_1.JsonDecoder();
    container.registerTransient(json_encoder_1.JsonEncoder);
    container.registerInstance(json_decoder_1.JsonDecoder, jsonDecoder);
    if (pluginConfiguration) {
        pluginConfiguration(jsonDecoder);
    }
}
exports.configure = configure;
