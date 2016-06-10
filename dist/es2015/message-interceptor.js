var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject } from "aurelia-dependency-injection";
import { HttpHeaders, MediaType } from "http-utils";
import { JsonEncoder } from "./json-encoder";
import { JsonDecoder } from "./json-decoder";
export let JsonMessageInterceptor = class JsonMessageInterceptor {
    constructor(jsonDecoder) {
        this.jsonDecoder = jsonDecoder;
    }
    request(message) {
        let contentType = message.headers.get(HttpHeaders.CONTENT_TYPE);
        switch (contentType) {
            case MediaType.APPLICATION_JSON:
                let jsonEncoder = new JsonEncoder();
                message.replacer = jsonEncoder.replacer.bind(jsonEncoder);
                break;
            case MediaType.APPLICATION_JSON_PATCH:
                let patch = message.content;
                message.content = patch.getArray().map(op => {
                    let jsonEncoder = new JsonEncoder();
                    return JSON.parse(jsonEncoder.encode(op));
                });
                break;
        }
        return message;
    }
    response(message) {
        let contentType = message.headers.get(HttpHeaders.CONTENT_TYPE);
        if (contentType && contentType.match(new RegExp(`^${MediaType.APPLICATION_JSON}`))) {
            message.reviver = this.jsonDecoder.reviver.bind(this.jsonDecoder);
        }
        return message;
    }
};
JsonMessageInterceptor = __decorate([
    autoinject, 
    __metadata('design:paramtypes', [JsonDecoder])
], JsonMessageInterceptor);
//# sourceMappingURL=message-interceptor.js.map