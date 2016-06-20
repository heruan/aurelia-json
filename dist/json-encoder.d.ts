export declare class JsonEncoder {
    private map;
    private identityProperty;
    private referenceProperty;
    constructor(map?: Map<Object, Object>, identityProperty?: string, referenceProperty?: string);
    encode(object: Object): string;
    replacer(key: string, value: any): any;
}
