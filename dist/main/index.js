"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
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
var json_message_content_interceptor_1 = require("./json-message-content-interceptor");
exports.JsonMessageContentInterceptor = json_message_content_interceptor_1.JsonMessageContentInterceptor;
var json_multipart_related_interceptor_1 = require("./json-multipart-related-interceptor");
exports.JsonMultipartRelatedInterceptor = json_multipart_related_interceptor_1.JsonMultipartRelatedInterceptor;
function configure(frameworkConfiguration, pluginConfiguration) {
    var container = frameworkConfiguration.container;
    var httpClient = container.get(aurelia_http_client_1.HttpClient);
    httpClient.configure(function (x) { return x.withInterceptor(new json_message_content_interceptor_1.JsonMessageContentInterceptor()); });
}
exports.configure = configure;
__export(require("./decorators"));

//# sourceMappingURL=index.js.map
