import { JsonPatch } from "./patch";
export declare class JsonDecoder {
    private map;
    private rev;
    private identityProperty;
    private referenceProperty;
    constructor(map?: Map<string, any>, rev?: Map<Object, Object>, identityProperty?: string, referenceProperty?: string);
    getEntityMap(): Map<string, Object>;
    setEntityMap(entityMap: Map<string, Object>): void;
    getRevertMap(): Map<Object, Object>;
    setRevertMap(revertMap: Map<Object, Object>): void;
    diff(target: Object, properties?: string[], patch?: JsonPatch, prefix?: string, seen?: Set<Object>): JsonPatch;
    decode(json: string): Object;
    reviver(key: string, value: any): any;
    private assign(target, source);
    private buildRev(object);
}
