export class JsonEncoder {
    constructor(map = new Map(), identityProperty = "@id", referenceProperty = "@ref") {
        this.map = map;
        this.identityProperty = identityProperty;
        this.referenceProperty = referenceProperty;
    }
    encode(object) {
        return JSON.stringify(object, this.replacer.bind(this));
    }
    replacer(key, value) {
        if (value === null || Array.isArray(value) || typeof value !== "object") {
            return value;
        }
        else if (this.map.has(value)) {
            return this.map.get(value);
        }
        else if (value.hasOwnProperty(this.identityProperty)) {
            let identity = value[this.identityProperty];
            let ref = {};
            ref[this.referenceProperty] = identity;
            this.map.set(value, ref);
            return value;
        }
        else {
            return value;
        }
    }
}
//# sourceMappingURL=json-encoder.js.map