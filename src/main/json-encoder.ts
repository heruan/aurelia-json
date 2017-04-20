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
        if (value === null || value === undefined) {
            return JsonEncoder.VALUE_NULL;
        }
        let prototype = Object.getPrototypeOf(value);
        if (typeof value === "boolean") {
            return value ? JsonEncoder.VALUE_TRUE : JsonEncoder.VALUE_FALSE;
        } else if (typeof value === "number") {
            return value.toString();
        } else if (typeof value === "string") {
            return JSON.stringify(value);
        } else if (typeof value["toJSON"] === "function") {
            return this.encode(value.toJSON(), ignore);
        } else if (typeof value[Symbol.iterator] === "function") {
            let json = JsonEncoder.START_ARRAY;
            json += Array.from(value, item => this.encode(item, ignore)).join(JsonEncoder.SEPARATOR);
            json += JsonEncoder.END_ARRAY;
            return json;
        } else if (this.serializers.has(value.constructor)) {
            return this.serializers.get(value.constructor)(value);
        } else {
            let json = JsonEncoder.START_OBJECT;
            let properties: { key: string, value: any, ignore: string[] }[] = [];
            for (let key of Object.keys(value)) {
                let jsonIgnore: string[] = Reflect.getMetadata(metadataKeys.jsonIgnore, prototype, key);
                if (ignore.indexOf(key) < 0) {
                    properties.push({ key, value: value[key], ignore: jsonIgnore || [] });
                }
            }
            json += properties.map(property => {
                let key = JsonEncoder.START_STRING + property.key + JsonEncoder.END_STRING;
                let value;
                if (property.value === null || property.value === undefined) {
                    value = JsonEncoder.VALUE_NULL;
                } else if (Reflect.hasMetadata(metadataKeys.serializer, prototype, property.key)) {
                    let serializer = Reflect.getMetadata(metadataKeys.serializer, prototype, property.key);
                    value = this.encode(serializer(property.value));
                } else {
                    value = this.encode(property.value, property.ignore);
                }
                return key + JsonEncoder.DEFINITION + value;
            }).join(JsonEncoder.SEPARATOR) + JsonEncoder.END_OBJECT;
            return json;
        }
    }

    public withSerializer<T>(serializer: (value: T) => string, ...types: (new(...args: any[]) => T)[]): JsonEncoder {
        types.forEach(type => this.serializers.set(type, serializer));
        return this;
    }

}
