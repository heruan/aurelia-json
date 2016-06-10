export class JsonSchema extends Map {
    constructor(schema) {
        super(JSON.parse(schema, JsonSchema.asMapReviver));
    }
    static get [Symbol.species]() { return Map; }
    static asMapReviver(key, value) {
        if (value === null || Array.isArray(value) || typeof value !== "object" || value instanceof Map) {
            return value;
        }
        else {
            let map = new Map();
            for (let k in value) {
                map.set(k, value[k]);
            }
            return map;
        }
    }
    static asMap(schema) {
        return JSON.parse(schema, JsonSchema.asMapReviver);
    }
}
//# sourceMappingURL=schema.js.map