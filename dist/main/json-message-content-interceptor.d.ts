import { Interceptor, HttpRequestMessage } from "aurelia-http-client";
export declare class JsonMessageContentInterceptor implements Interceptor {
    request(message: HttpRequestMessage): HttpRequestMessage;
}
