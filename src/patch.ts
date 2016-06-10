export class JsonPatch {

    private operations: Object[];

    public constructor(operations = []) {
        this.operations = operations;
    }

    get length() {
        return this.operations.length;
    }

    public add(path: string, value: any, index: number = -1): JsonPatch {
        this.operations.push({
            "op": "add",
            "path": `${path}/${index >= 0 ? index : "-"}`,
            "value": value
        });
        return this;
    }

    public remove(path: string, index: number = -1): JsonPatch {
        this.operations.push({
            "op": "remove",
            "path": `${path}/${index}`
        });
        return this;
    }

    public replace(path: string, value: any): JsonPatch {
        this.operations.push({
            "op": "replace",
            "path": path,
            "value": value
        });
        return this;
    }

    public copy(fromPath: string, toPath: string): JsonPatch {
        this.operations.push({
            "op": "copy",
            "from": fromPath,
            "path": toPath
        });
        return this;
    }

    public move(fromPath: string, toPath: string): JsonPatch {
        this.operations.push({
            "op": "move",
            "from": fromPath,
            "path": toPath
        });
        return this;
    }

    public test(path: string, value: any): JsonPatch {
        this.operations.push({
            "op": "test",
            "path": path,
            "value": value
        });
        return this;
    }

    public reset(): JsonPatch {
        this.operations = [];
        return this;
    }

    public getArray(): any[] {
        return this.operations;
    }

    public toJSON(): any {
        return this.getArray();
    }

}
