"use strict";

System.register(["aurelia-dependency-injection", "http-utils", "./json-encoder", "./json-decoder"], function (_export, _context) {
    "use strict";

    var autoinject, HttpHeaders, MediaType, JsonEncoder, JsonDecoder, _typeof, __decorate, __metadata, JsonMessageInterceptor;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaDependencyInjection) {
            autoinject = _aureliaDependencyInjection.autoinject;
        }, function (_httpUtils) {
            HttpHeaders = _httpUtils.HttpHeaders;
            MediaType = _httpUtils.MediaType;
        }, function (_jsonEncoder) {
            JsonEncoder = _jsonEncoder.JsonEncoder;
        }, function (_jsonDecoder) {
            JsonDecoder = _jsonDecoder.JsonDecoder;
        }],
        execute: function () {
            _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
            };

            __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
                var c = arguments.length,
                    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                    d;
                if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                }return c > 3 && r && Object.defineProperty(target, key, r), r;
            };

            __metadata = undefined && undefined.__metadata || function (k, v) {
                if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };

            _export("JsonMessageInterceptor", JsonMessageInterceptor = function () {
                function JsonMessageInterceptor(jsonDecoder) {
                    _classCallCheck(this, JsonMessageInterceptor);

                    this.jsonDecoder = jsonDecoder;
                }

                JsonMessageInterceptor.prototype.request = function request(message) {
                    var contentType = message.headers.get(HttpHeaders.CONTENT_TYPE);
                    switch (contentType) {
                        case MediaType.APPLICATION_JSON:
                            var jsonEncoder = new JsonEncoder();
                            message.replacer = jsonEncoder.replacer.bind(jsonEncoder);
                            break;
                        case MediaType.APPLICATION_JSON_PATCH:
                            var patch = message.content;
                            message.content = patch.getArray().map(function (op) {
                                var jsonEncoder = new JsonEncoder();
                                return JSON.parse(jsonEncoder.encode(op));
                            });
                            break;
                    }
                    return message;
                };

                JsonMessageInterceptor.prototype.response = function response(message) {
                    var contentType = message.headers.get(HttpHeaders.CONTENT_TYPE);
                    if (contentType && contentType.match(new RegExp("^" + MediaType.APPLICATION_JSON))) {
                        message.reviver = this.jsonDecoder.reviver.bind(this.jsonDecoder);
                    }
                    return message;
                };

                return JsonMessageInterceptor;
            }());

            _export("JsonMessageInterceptor", JsonMessageInterceptor);

            _export("JsonMessageInterceptor", JsonMessageInterceptor = __decorate([autoinject, __metadata('design:paramtypes', [JsonDecoder])], JsonMessageInterceptor));
        }
    };
});