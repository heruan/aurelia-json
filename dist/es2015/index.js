import { HttpClient } from "aurelia-http-client";
import { JsonSchema } from "./schema";
import { JsonPatch } from "./patch";
import { JsonPointer } from "./pointer";
import { JsonEncoder } from "./json-encoder";
import { JsonDecoder } from "./json-decoder";
import { JsonMessageInterceptor } from "./message-interceptor";
export function configure(frameworkConfiguration, pluginConfiguration) {
    let container = frameworkConfiguration.container;
    let httpClient = container.get(HttpClient);
    let jsonDecoder = new JsonDecoder();
    container.registerTransient(JsonEncoder);
    container.registerInstance(JsonDecoder, jsonDecoder);
    httpClient.configure(requestBuilder => {
        requestBuilder.withInterceptor(new JsonMessageInterceptor(jsonDecoder));
    });
    if (pluginConfiguration) {
        pluginConfiguration(jsonDecoder);
    }
}
export { JsonSchema, JsonPatch, JsonPointer, JsonEncoder, JsonDecoder, JsonMessageInterceptor };
//# sourceMappingURL=index.js.map