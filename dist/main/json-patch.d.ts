export declare class JsonPatch {
    private operations;
    constructor(operations?: any[]);
    readonly length: number;
    add(path: string, value: any): JsonPatch;
    remove(path: string): JsonPatch;
    replace(path: string, value: any): JsonPatch;
    copy(fromPath: string, toPath: string): JsonPatch;
    move(fromPath: string, toPath: string): JsonPatch;
    test(path: string, value: any): JsonPatch;
    reset(): JsonPatch;
    getArray(): any[];
    toJSON(): any;
    static diff<T>(target: T, properties?: Object, patch?: JsonPatch, prefix?: string, separator?: string, wildcard?: string): JsonPatch;
}
