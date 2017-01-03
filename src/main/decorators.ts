import * as metadataKeys from "./metadata-keys";

export function jsonIgnore(...properties: string[]): PropertyDecorator {
    return Reflect.metadata(metadataKeys.jsonIgnore, properties);
}

export function serializer<T>(serializer: (value: T) => any): PropertyDecorator {
    return Reflect.metadata(metadataKeys.serializer, serializer);
}
