export declare function jsonIgnore(...properties: string[]): PropertyDecorator;
export declare function serializer<T>(serializer: (value: T) => any): PropertyDecorator;
