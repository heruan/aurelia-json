import { FrameworkConfiguration } from "aurelia-framework";
import { JsonSchema } from "./schema";
import { JsonPatch } from "./patch";
import { JsonPointer } from "./pointer";
import { JsonEncoder } from "./json-encoder";
import { JsonDecoder } from "./json-decoder";
import { JsonMessageInterceptor } from "./message-interceptor";
export declare function configure(frameworkConfiguration: FrameworkConfiguration, pluginConfiguration: Function): void;
export { JsonSchema, JsonPatch, JsonPointer, JsonEncoder, JsonDecoder, JsonMessageInterceptor };
