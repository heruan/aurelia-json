import * as metadataKeys from "./metadata-keys";

export function jsonIgnore(...properties: string[]): PropertyDecorator {
    return Reflect.metadata(metadataKeys.jsonIgnore, properties);
}
