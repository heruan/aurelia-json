import { binderPropertyTrackValue, binderPropertyEntriesValue, binderPropertyTrackCompare, binderPropertyEntries, binderPropertyEntriesCompare } from "type-binder";
import * as metadataKeys from "./metadata-keys";

export class JsonPatch {

    private operations: Object[];

    public constructor(operations = []) {
        this.operations = operations;
    }

    get length() {
        return this.operations.length;
    }

    public add<T>(path: string, value: T): JsonPatch {
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

    public replace<T>(path: string, value: T, serializer?: (value: T) => any): JsonPatch {
        let op = {
            "op": "replace",
            path,
            value
        };
        Reflect.defineMetadata(metadataKeys.serializer, serializer, op, "value");
        this.operations.push(op);
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

    public test<T>(path: string, value: T): JsonPatch {
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

    public static diff<T>(target: T, properties: string[] = Object.keys(target), patch: JsonPatch = new JsonPatch(), prefix?: string, separator: string = "/", wildcard: string = "-"): JsonPatch {
        for (let key of properties) {
            let currentValue = target[key];
            if (Reflect.hasMetadata(binderPropertyTrackValue, target, key)) {
                let comparingCallback: (v1, v2) => boolean = Reflect.getMetadata(binderPropertyTrackCompare, target, key);
                let originalValue = Reflect.getMetadata(binderPropertyTrackValue, target, key);
                if (!comparingCallback(currentValue, originalValue)) {
                    let pointer = [prefix, key].join(separator);
                    // patch.test(pointer, originalValue);
                    patch.replace([prefix, key].join(separator), currentValue);
                } else if (currentValue !== null && typeof currentValue === "object") {
                    JsonPatch.diff(currentValue, Object.keys(currentValue), patch, [prefix, key].join(separator), separator, wildcard);
                }
            } else if (currentValue !== null && Reflect.hasMetadata(binderPropertyEntriesValue, target, key)) {
                let trackingCallback: <I extends Iterable<V>, V>(iterable: I) => V[] = Reflect.getMetadata(binderPropertyEntries, target, key);
                let comparingCallback: (v1, v2) => boolean = Reflect.getMetadata(binderPropertyEntriesCompare, target, key);
                let originalEntries = <any[]> Reflect.getMetadata(binderPropertyEntriesValue, target, key);
                let currentEntries = trackingCallback(currentValue);
                originalEntries.forEach((value, index) => {
                    let pointer = [prefix, key, index].join(separator);
                    if (index >= currentEntries.length) {
                        // patch.test(pointer, value);
                        patch.remove(pointer);
                    } else if (!comparingCallback(value, currentEntries[index])) {
                        // patch.test(pointer, value);
                        patch.replace(pointer, currentEntries[index], Reflect.getMetadata(metadataKeys.serializer, target, key));
                    } else if (value !== null && typeof value === "object") {
                        JsonPatch.diff(value, Object.keys(value), patch, pointer, separator, wildcard);
                    }
                });
                if (currentEntries.length > originalEntries.length) {
                    let path = [prefix, key, wildcard].join(separator);
                    currentEntries.slice(originalEntries.length).forEach(value => patch.add(path, value));
                }
            }
        }
        return patch;
    }

}
