export class JsonPatch {
    constructor(operations = []) {
        this.operations = operations;
    }
    get length() {
        return this.operations.length;
    }
    add(path, value, index = -1) {
        this.operations.push({
            "op": "add",
            "path": `${path}/${index >= 0 ? index : "-"}`,
            "value": value
        });
        return this;
    }
    remove(path, index = -1) {
        this.operations.push({
            "op": "remove",
            "path": `${path}/${index}`
        });
        return this;
    }
    replace(path, value) {
        this.operations.push({
            "op": "replace",
            "path": path,
            "value": value
        });
        return this;
    }
    copy(fromPath, toPath) {
        this.operations.push({
            "op": "copy",
            "from": fromPath,
            "path": toPath
        });
        return this;
    }
    move(fromPath, toPath) {
        this.operations.push({
            "op": "move",
            "from": fromPath,
            "path": toPath
        });
        return this;
    }
    test(path, value) {
        this.operations.push({
            "op": "test",
            "path": path,
            "value": value
        });
        return this;
    }
    reset() {
        this.operations = [];
        return this;
    }
    getArray() {
        return this.operations;
    }
    toJSON() {
        return this.getArray();
    }
}
//# sourceMappingURL=patch.js.map