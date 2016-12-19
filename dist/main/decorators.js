"use strict";
var metadataKeys = require("./metadata-keys");
function jsonIgnore() {
    var properties = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        properties[_i] = arguments[_i];
    }
    return Reflect.metadata(metadataKeys.jsonIgnore, properties);
}
exports.jsonIgnore = jsonIgnore;

//# sourceMappingURL=decorators.js.map
