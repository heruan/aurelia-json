export declare class JsonPatch {
    private operations;
    constructor(operations?: any[]);
    add(path: string, value: any, index?: number): JsonPatch;
    remove(path: string, index?: number): JsonPatch;
    replace(path: string, value: any): JsonPatch;
    copy(fromPath: string, toPath: string): JsonPatch;
    move(fromPath: string, toPath: string): JsonPatch;
    test(path: string, value: any): JsonPatch;
    reset(): JsonPatch;
    getArray(): any[];
    toJSON(): any;
}
