export class JsonSchema extends Map<string, any> {

    public static asMapReviver(key, value) {
        if (value === null || Array.isArray(value) || typeof value !== "object" || value instanceof Map) {
            return value;
        } else {
            let map = new Map();
            for (let k in value) {
                map.set(k, value[k]);
            }
            return map;
        }
    }

    public static asMap(schema: string): Map<string, any> {
        return JSON.parse(schema, JsonSchema.asMapReviver);
    }

    public constructor(schema: string) {
        super(JSON.parse(schema, JsonSchema.asMapReviver));
    }

}
