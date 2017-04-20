import { FrameworkConfiguration } from "aurelia-framework";
import { Container } from "aurelia-dependency-injection";
import { HttpClient } from "aurelia-http-client";
import { JsonSchema } from "./json-schema";
import { JsonPatch } from "./json-patch";
import { JsonPointer } from "./json-pointer";
import { JsonEncoder } from "./json-encoder";
import { JsonDecoder } from "./json-decoder";
import { JsonMessageContentInterceptor } from "./json-message-content-interceptor";
import { JsonMultipartRelatedInterceptor } from "./json-multipart-related-interceptor";

export function configure(frameworkConfiguration: FrameworkConfiguration, pluginConfiguration: Function) {
    let container: Container = frameworkConfiguration.container;
    let httpClient: HttpClient = container.get(HttpClient);
    httpClient.configure(x => x.withInterceptor(new JsonMessageContentInterceptor()));
}

export { JsonSchema, JsonPatch, JsonPointer, JsonEncoder, JsonDecoder, JsonMessageContentInterceptor, JsonMultipartRelatedInterceptor };
export * from "./decorators";
