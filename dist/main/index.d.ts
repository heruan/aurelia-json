import { FrameworkConfiguration } from "aurelia-framework";
import { JsonSchema } from "./json-schema";
import { JsonPatch } from "./json-patch";
import { JsonPointer } from "./json-pointer";
import { JsonEncoder } from "./json-encoder";
import { JsonDecoder } from "./json-decoder";
import { JsonMultipartRelatedInterceptor } from "./json-multipart-related-interceptor";
export declare function configure(frameworkConfiguration: FrameworkConfiguration, pluginConfiguration: Function): void;
export { JsonSchema, JsonPatch, JsonPointer, JsonEncoder, JsonDecoder, JsonMultipartRelatedInterceptor };
export * from "./decorators";
