export declare class JsonSchema extends Map<string, any> {
    static [Symbol.species]: MapConstructor;
    static asMapReviver(key: any, value: any): any;
    static asMap(schema: string): Map<string, any>;
    constructor(schema: string);
}
