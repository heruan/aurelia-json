import { Interceptor, HttpRequestMessage } from "aurelia-http-client";
import { ContentType } from "aurelia-http-utils";
export declare class JsonMultipartRelatedInterceptor implements Interceptor {
    private contentType;
    constructor(contentType?: ContentType);
    request(message: HttpRequestMessage): HttpRequestMessage;
}
