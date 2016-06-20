import { Interceptor, HttpRequestMessage, HttpResponseMessage } from "aurelia-http-client";
import { JsonDecoder } from "./json-decoder";
export declare class JsonMessageInterceptor implements Interceptor {
    private jsonDecoder;
    constructor(jsonDecoder: JsonDecoder);
    request(message: HttpRequestMessage): HttpRequestMessage;
    response(message: HttpResponseMessage): HttpResponseMessage;
}
