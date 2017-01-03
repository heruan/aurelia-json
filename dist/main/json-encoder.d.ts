export declare class JsonEncoder {
    static START_OBJECT: string;
    static END_OBJECT: string;
    static START_ARRAY: string;
    static END_ARRAY: string;
    static START_STRING: string;
    static END_STRING: string;
    static VALUE_NULL: string;
    static VALUE_TRUE: string;
    static VALUE_FALSE: string;
    static DEFINITION: string;
    static SEPARATOR: string;
    private serializers;
    encode(value: any, ignore?: string[]): string;
    withSerializer<T>(serializer: (value: T) => string, ...types: (new (...args: any[]) => T)[]): JsonEncoder;
}
