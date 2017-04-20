"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var type_binder_1 = require("type-binder");
var JsonDecoder = (function () {
    function JsonDecoder(typeBinder) {
        if (typeBinder === void 0) { typeBinder = new type_binder_1.TypeBinder(); }
        this.typeBinder = typeBinder;
    }
    JsonDecoder.prototype.decode = function (json, type) {
        var generics = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            generics[_i - 2] = arguments[_i];
        }
        var object = JSON.parse(json);
        return type && typeof type["fromJSON"] === "function"
            ? type["fromJSON"](object, this, this.typeBinder)
            : (_a = this.typeBinder).bind.apply(_a, [object, type].concat(generics));
        var _a;
    };
    JsonDecoder.prototype.reviver = function (key, value) {
    };
    return JsonDecoder;
}());
JsonDecoder = __decorate([
    aurelia_dependency_injection_1.inject(type_binder_1.TypeBinder),
    __metadata("design:paramtypes", [type_binder_1.TypeBinder])
], JsonDecoder);
exports.JsonDecoder = JsonDecoder;

//# sourceMappingURL=json-decoder.js.map
