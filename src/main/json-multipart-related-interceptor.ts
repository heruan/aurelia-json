import { Interceptor, HttpRequestMessage, HttpResponseMessage } from "aurelia-http-client";
import { MultipartRelated, Part, ContentType, HttpHeaders } from "aurelia-http-utils";
import { JsonEncoder } from "./json-encoder";

export class JsonMultipartRelatedInterceptor implements Interceptor {

    private contentType: ContentType;

    public constructor(contentType: ContentType = ContentType.valueOf("application/json")) {
        this.contentType = contentType;
    }

    public request(message: HttpRequestMessage): HttpRequestMessage {
        let multipartRelated = new MultipartRelated(this.contentType);
        let partId = 0;
        let encoder = new JsonEncoder().withSerializer<Blob>(blob => {
            multipartRelated.addPart(new Part(blob, ContentType.valueOf(blob.type)), (++partId).toString());
            return partId.toString();
        }, Blob, File);
        multipartRelated.addRootPart(new Part(encoder.encode(message.content), this.contentType), "/");
        message.content = multipartRelated.toBlob();
        return message;
    }

}
