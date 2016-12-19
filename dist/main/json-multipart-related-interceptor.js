"use strict";
var aurelia_http_utils_1 = require("aurelia-http-utils");
var json_encoder_1 = require("./json-encoder");
var JsonMultipartRelatedInterceptor = (function () {
    function JsonMultipartRelatedInterceptor(contentType) {
        if (contentType === void 0) { contentType = aurelia_http_utils_1.ContentType.valueOf("application/json"); }
        this.contentType = contentType;
    }
    JsonMultipartRelatedInterceptor.prototype.request = function (message) {
        var multipartRelated = new aurelia_http_utils_1.MultipartRelated(this.contentType);
        var partId = 0;
        var encoder = new json_encoder_1.JsonEncoder().withSerializer(File, function (file) {
            multipartRelated.addPart(new aurelia_http_utils_1.Part(file, aurelia_http_utils_1.ContentType.valueOf(file.type)), (++partId).toString());
            return partId.toString();
        });
        multipartRelated.addRootPart(new aurelia_http_utils_1.Part(encoder.encode(message.content), this.contentType), "/");
        message.content = multipartRelated.toBlob();
        return message;
    };
    return JsonMultipartRelatedInterceptor;
}());
exports.JsonMultipartRelatedInterceptor = JsonMultipartRelatedInterceptor;

//# sourceMappingURL=json-multipart-related-interceptor.js.map
