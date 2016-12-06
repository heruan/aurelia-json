import * as metadataKeys from "./metadata-keys";

export class JsonEncoder {

    public static START_OBJECT: string = "{";

    public static END_OBJECT: string = "}";

    public static START_ARRAY: string = "[";

    public static END_ARRAY: string = "]";

    public static START_STRING: string = '"';

    public static END_STRING: string = '"';

    public static VALUE_NULL: string = "null";

    public static VALUE_TRUE: string = "true";

    public static VALUE_FALSE: string = "false";

    public static DEFINITION: string = ":";

    public static SEPARATOR: string = ",";

    private serializers: Map<any, (value: any) => string> = new Map<any, (value: any) => string>();

    public encode(value: any, ignore: string[] = []): string {
        if (value === null) {
            return JsonEncoder.VALUE_NULL;
        } else if (typeof value === "boolean") {
            return value ? JsonEncoder.VALUE_TRUE : JsonEncoder.VALUE_FALSE;
        } else if (typeof value === "number") {
            return value.toString();
        } else if (typeof value === "string") {
            return JsonEncoder.START_STRING + value + JsonEncoder.END_STRING;
        } else if (typeof value["toJSON"] === "function") {
            return this.encode(value.toJSON(), ignore);
        } else if (typeof value[Symbol.iterator] === "function") {
            let json = JsonEncoder.START_ARRAY;
            json += Array.from(value, item => this.encode(item, ignore)).join(JsonEncoder.SEPARATOR);
            json += JsonEncoder.END_ARRAY;
            return json;
        } else {
            let prototype = Object.getPrototypeOf(value);
            let serializer = this.serializers.get(value.constructor);
            if (serializer) {
                return serializer(value);
            }
            let json = JsonEncoder.START_OBJECT;
            let properties: { key: string, value: any, ignore: string[] }[] = [];
            for (let key in value) {
                let jsonIgnore: string[] = Reflect.getMetadata(metadataKeys.jsonIgnore, prototype, key);
                if (ignore.indexOf(key) < 0) {
                    properties.push({ key, value: value[key], ignore: jsonIgnore || [] });
                }
            }
            json += properties.map(property =>
                JsonEncoder.START_STRING + property.key + JsonEncoder.END_STRING +
                JsonEncoder.DEFINITION + this.encode(property.value, property.ignore)
            ).join(JsonEncoder.SEPARATOR) + JsonEncoder.END_OBJECT;
            return json;
        }
    }

    public withSerializer<T>(type: new(...args: any[]) => T, serializer: (value: T) => string): JsonEncoder {
        this.serializers.set(type, serializer);
        return this;
    }

}
