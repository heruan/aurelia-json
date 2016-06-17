"use strict";
var JsonEncoder = (function () {
    function JsonEncoder(map, identityProperty, referenceProperty) {
        if (map === void 0) { map = new Map(); }
        if (identityProperty === void 0) { identityProperty = "@id"; }
        if (referenceProperty === void 0) { referenceProperty = "@ref"; }
        this.map = map;
        this.identityProperty = identityProperty;
        this.referenceProperty = referenceProperty;
    }
    JsonEncoder.prototype.encode = function (object) {
        return JSON.stringify(object, this.replacer.bind(this));
    };
    JsonEncoder.prototype.replacer = function (key, value) {
        if (value === null || Array.isArray(value) || typeof value !== "object") {
            return value;
        }
        else if (this.map.has(value)) {
            return this.map.get(value);
        }
        else if (value.hasOwnProperty(this.identityProperty)) {
            var identity = value[this.identityProperty];
            var ref = {};
            ref[this.referenceProperty] = identity;
            this.map.set(value, ref);
            return value;
        }
        else {
            return value;
        }
    };
    return JsonEncoder;
}());
exports.JsonEncoder = JsonEncoder;
//# sourceMappingURL=json-encoder.js.map