export declare class JsonPatch {
    private operations;
    constructor(operations?: any[]);
    readonly length: number;
    add<T>(path: string, value: T): JsonPatch;
    remove(path: string): JsonPatch;
    replace<T>(path: string, value: T, serializer?: (value: T) => any): JsonPatch;
    copy(fromPath: string, toPath: string): JsonPatch;
    move(fromPath: string, toPath: string): JsonPatch;
    test<T>(path: string, value: T): JsonPatch;
    reset(): JsonPatch;
    getArray(): any[];
    toJSON(): any;
    static diff<T>(target: T, properties?: string[], patch?: JsonPatch, prefix?: string, separator?: string, wildcard?: string): JsonPatch;
}
