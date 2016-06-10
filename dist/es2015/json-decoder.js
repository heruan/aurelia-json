import { JsonPatch } from "./patch";
export class JsonDecoder {
    constructor(map = new Map(), rev = new Map(), identityProperty = "@id", referenceProperty = "@ref") {
        this.map = map;
        this.rev = rev;
        this.identityProperty = identityProperty;
        this.referenceProperty = referenceProperty;
    }
    getEntityMap() {
        return this.map;
    }
    setEntityMap(entityMap) {
        this.map = entityMap;
    }
    getRevertMap() {
        return this.rev;
    }
    setRevertMap(revertMap) {
        this.rev = revertMap;
    }
    diff(target, properties = [], patch = new JsonPatch(), prefix = "/", seen = new Set()) {
        seen.add(target);
        let source = this.rev.get(target);
        if (properties.length == 0) {
            properties = Object.keys(target);
        }
        for (let property of properties) {
            if (Array.isArray(target[property])) {
                let targetArray = target[property];
                let sourceArray = source[property];
                for (let item of sourceArray) {
                    let targetIndex = targetArray.indexOf(item);
                    let sourceIndex = sourceArray.indexOf(item);
                    if (targetIndex < 0) {
                        patch.remove(prefix + property, sourceIndex);
                    }
                }
                for (let item of targetArray) {
                    let targetIndex = targetArray.indexOf(item);
                    let sourceIndex = sourceArray.indexOf(item);
                    if (sourceIndex < 0) {
                        patch.add(prefix + property, item);
                    }
                    else {
                        if (targetIndex !== sourceIndex) {
                        }
                        if (!seen.has(item) && this.rev.has(item)) {
                            this.diff(item, [], patch, `${prefix + property}/${targetIndex}/`, seen);
                        }
                    }
                }
            }
            else if (target[property] === source[property] && !seen.has(target[property]) && this.rev.has(target[property])) {
                this.diff(target[property], [], patch, `${prefix + property}/`, seen);
            }
            else if (target[property] !== source[property]) {
                patch.replace(prefix + property, target[property]);
            }
        }
        return patch;
    }
    decode(json) {
        return JSON.parse(json, this.reviver.bind(this));
    }
    reviver(key, value) {
        if (value === null || Array.isArray(value) || typeof value !== "object") {
            return value;
        }
        else {
            if (value.hasOwnProperty(this.identityProperty)) {
                let identity = value[this.identityProperty];
                let original = value;
                if (this.map.has(identity)) {
                    value = this.assign(this.map.get(identity), original);
                    delete value[this.referenceProperty];
                }
                else {
                    this.map.set(identity, value);
                }
                let rev;
                if (!this.rev.has(value)) {
                    this.rev.set(value, this.buildRev(value));
                }
                else {
                    Object.assign(this.rev.get(value), this.buildRev(original));
                }
                return value;
            }
            else if (value.hasOwnProperty(this.referenceProperty)) {
                let identity = value[this.referenceProperty];
                if (this.map.has(identity)) {
                    return this.map.get(identity);
                }
                else {
                    this.map.set(identity, value);
                    return value;
                }
            }
            else {
                if (value !== null && typeof value === "object") {
                    this.rev.set(value, this.buildRev(value));
                }
                return value;
            }
        }
    }
    assign(target, source) {
        for (let property in source) {
            let sourceValue = source[property];
            let targetValue = target[property];
            if (Array.isArray(sourceValue)) {
                if (!Array.isArray(targetValue)) {
                    target[property] = sourceValue;
                }
                else
                    for (let item of sourceValue) {
                        let sourceIndex = sourceValue.indexOf(item);
                        if (item !== targetValue[sourceIndex]) {
                            targetValue.splice(sourceIndex, 1, item);
                        }
                    }
            }
            else {
                target[property] = sourceValue;
            }
        }
        return target;
    }
    buildRev(object) {
        let rev = {};
        for (let property of Object.keys(object)) {
            if (Array.isArray(object[property])) {
                rev[property] = object[property].slice();
            }
            else {
                rev[property] = object[property];
            }
        }
        return rev;
    }
}
//# sourceMappingURL=json-decoder.js.map