export class JsonEncoder {

    private map: Map<Object, Object>;

    private identityProperty: string;

    private referenceProperty: string;

    public constructor(map: Map<Object, Object> = new Map<Object, Object>(), identityProperty: string = "@id", referenceProperty: string = "@ref") {
        this.map = map;
        this.identityProperty = identityProperty;
        this.referenceProperty = referenceProperty;
    }

    public encode(object: Object): string {
        return JSON.stringify(object, this.replacer.bind(this));
    }

    public replacer(key: string, value: any): any {
        if (value === null || Array.isArray(value) || typeof value !== "object") {
            return value;
        } else if (this.map.has(value)) {
            return this.map.get(value);
        } else if (value.hasOwnProperty(this.identityProperty)) {
            let identity = value[this.identityProperty];
            let ref = {};
            ref[this.referenceProperty] = identity;
            this.map.set(value, ref);
            return value;
        } else {
            return value;
        }
    }

}
