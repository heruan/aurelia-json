import {autoinject} from "aurelia-dependency-injection";
import {Interceptor, HttpRequestMessage, HttpResponseMessage} from "aurelia-http-client";
import {HttpHeaders, MediaType} from "aurelia-http-utils";
import {JsonEncoder} from "./json-encoder";
import {JsonDecoder} from "./json-decoder";
import {JsonPatch} from "./patch";

@autoinject
export class JsonMessageInterceptor implements Interceptor {

    private jsonDecoder: JsonDecoder;

    public constructor(jsonDecoder: JsonDecoder) {
        this.jsonDecoder = jsonDecoder;
    }

    public request(message: HttpRequestMessage): HttpRequestMessage {
        let contentType = message.headers.get(HttpHeaders.CONTENT_TYPE);
        switch (contentType) {
            case MediaType.APPLICATION_JSON_PATCH:
            let patch: JsonPatch = message.content;
            message.content = patch.getArray().map(op => {
                let jsonEncoder = new JsonEncoder();
                return JSON.parse(jsonEncoder.encode(op));
            });
            break;
            case MediaType.APPLICATION_JSON:
            default:
            let jsonEncoder = new JsonEncoder();
            message.replacer = jsonEncoder.replacer.bind(jsonEncoder);
        }

        return message;
    }

    public response(message: HttpResponseMessage): HttpResponseMessage {
        let contentType = message.headers.get(HttpHeaders.CONTENT_TYPE);
        if (contentType && contentType.match(new RegExp(`^${MediaType.APPLICATION_JSON}`))) {
            message.reviver = this.jsonDecoder.reviver.bind(this.jsonDecoder);
        }
        return message;
    }

}
