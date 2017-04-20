import { Interceptor, HttpRequestMessage, HttpResponseMessage } from "aurelia-http-client";
import { MultipartRelated, Part, ContentType, HttpHeaders } from "aurelia-http-utils";
import { JsonEncoder } from "./json-encoder";

export class JsonMessageContentInterceptor implements Interceptor {

    public request(message: HttpRequestMessage): HttpRequestMessage {
        if (message.headers.has(HttpHeaders.CONTENT_TYPE) && message.headers.get(HttpHeaders.CONTENT_TYPE).startsWith("application/json")) {
            message.content = new JsonEncoder().encode(message.content);
        }
        return message;
    }

}
