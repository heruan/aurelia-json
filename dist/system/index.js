"use strict";

System.register(["aurelia-http-client", "./schema", "./patch", "./pointer", "./json-encoder", "./json-decoder", "./message-interceptor"], function (_export, _context) {
    "use strict";

    var HttpClient, JsonSchema, JsonPatch, JsonPointer, JsonEncoder, JsonDecoder, JsonMessageInterceptor;
    return {
        setters: [function (_aureliaHttpClient) {
            HttpClient = _aureliaHttpClient.HttpClient;
        }, function (_schema) {
            JsonSchema = _schema.JsonSchema;
        }, function (_patch) {
            JsonPatch = _patch.JsonPatch;
        }, function (_pointer) {
            JsonPointer = _pointer.JsonPointer;
        }, function (_jsonEncoder) {
            JsonEncoder = _jsonEncoder.JsonEncoder;
        }, function (_jsonDecoder) {
            JsonDecoder = _jsonDecoder.JsonDecoder;
        }, function (_messageInterceptor) {
            JsonMessageInterceptor = _messageInterceptor.JsonMessageInterceptor;
        }],
        execute: function () {
            function configure(frameworkConfiguration, pluginConfiguration) {
                var container = frameworkConfiguration.container;
                var httpClient = container.get(HttpClient);
                var jsonDecoder = new JsonDecoder();
                container.registerTransient(JsonEncoder);
                container.registerInstance(JsonDecoder, jsonDecoder);
                httpClient.configure(function (requestBuilder) {
                    requestBuilder.withInterceptor(new JsonMessageInterceptor(jsonDecoder));
                });
                if (pluginConfiguration) {
                    pluginConfiguration(jsonDecoder);
                }
            }

            _export("configure", configure);

            _export("JsonSchema", JsonSchema);

            _export("JsonPatch", JsonPatch);

            _export("JsonPointer", JsonPointer);

            _export("JsonEncoder", JsonEncoder);

            _export("JsonDecoder", JsonDecoder);

            _export("JsonMessageInterceptor", JsonMessageInterceptor);
        }
    };
});