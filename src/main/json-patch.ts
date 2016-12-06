import { binderPropertyTrackValue, binderPropertyEntriesValue, binderPropertyTrackCompare, binderPropertyEntriesCompare } from "type-binder";

export class JsonPatch {

    private operations: Object[];

    public constructor(operations = []) {
        this.operations = operations;
    }

    get length() {
        return this.operations.length;
    }

    public add(path: string, value: any): JsonPatch {
        this.operations.push({
            "op": "add",
            path,
            value
        });
        return this;
    }

    public remove(path: string): JsonPatch {
        this.operations.push({
            "op": "remove",
            path
        });
        return this;
    }

    public replace(path: string, value: any): JsonPatch {
        this.operations.push({
            "op": "replace",
            path,
            value
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
            path,
            value
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

    public static diff<T>(target: T, properties: Object = target, patch: JsonPatch = new JsonPatch(), prefix?: string, separator: string = "/", wildcard: string = "-"): JsonPatch {
        for (let key in properties) {
            let include = properties[key];
            if (include) {
                let currentValue = target[key];
                if (Reflect.hasMetadata(binderPropertyTrackValue, target, key)) {
                    let comparingCallback: (v1, v2) => boolean = Reflect.getMetadata(binderPropertyTrackCompare, target, key);
                    let originalValue = Reflect.getMetadata(binderPropertyTrackValue, target, key);
                    if (!comparingCallback(currentValue, originalValue)) {
                        let pointer = [prefix, key].join(separator);
                        patch.test(pointer, originalValue);
                        patch.replace([prefix, key].join(separator), currentValue);
                    } else if (currentValue !== null && typeof currentValue === "object") {
                        JsonPatch.diff(currentValue, include, patch, [prefix, key].join(separator), separator, wildcard);
                    }
                } else if (currentValue !== null && Reflect.hasMetadata(binderPropertyEntriesValue, target, key)) {
                    let comparingCallback: (v1, v2) => boolean = Reflect.getMetadata(binderPropertyEntriesCompare, target, key);
                    let originalEntries = <any[]> Reflect.getMetadata(binderPropertyEntriesValue, target, key);
                    let originalLength = originalEntries.length;
                    let originalTrack = originalEntries.slice();
                    let currentEntries = Array.from(currentValue);
                    let currentLength = currentEntries.length;
                    let addEntries = currentEntries.slice();
                    originalEntries.forEach(value => {
                        let index = originalTrack.indexOf(value);
                        let found = currentEntries.findIndex(item => comparingCallback(value, item));
                        let from = [prefix, key, index].join(separator);
                        if (found >= 0) {
                            let pointer = [prefix, key, found].join(separator);
                            if (found !== index) {
                                patch.test(from, value);
                                patch.move(from, pointer);
                                originalTrack.splice(index, 1);
                                originalTrack[found] = value;
                            }
                            addEntries.splice(addEntries.indexOf(currentEntries[found]), 1);
                        } else if (index < currentLength) {
                            patch.test(from, value);
                            patch.replace(from, currentEntries[index]);
                            originalTrack[index] = currentEntries[index];
                            addEntries.splice(addEntries.indexOf(currentEntries[index]), 1);
                        } else {
                            patch.test(from, value);
                            patch.remove(from);
                            originalTrack.splice(index, 1);
                        }
                    });
                    if (addEntries.length > 0) {
                        let path = [prefix, key, wildcard].join(separator);
                        addEntries.forEach(value => patch.add(path, value));
                    }
                }
            }
        }
        return patch;
    }

}
