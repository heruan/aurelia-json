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
var json_encoder_1 = require("../../main/json-encoder");
var decorators_1 = require("../../main/decorators");
describe("json-encoder", function () {
    it("encodes an object to JSON", function () {
        var Foo = (function () {
            function Foo() {
            }
            return Foo;
        }());
        __decorate([
            decorators_1.jsonIgnore("bar"),
            __metadata("design:type", Object)
        ], Foo.prototype, "foo", void 0);
        __decorate([
            decorators_1.jsonIgnore("boo"),
            __metadata("design:type", Set)
        ], Foo.prototype, "items", void 0);
        var encoder = new json_encoder_1.JsonEncoder();
        var foo = new Foo();
        foo.id = 1;
        foo.foo = { "bar": true, "baz": 123 };
        foo.items = new Set([{ "item": 1, "boo": null }, { "item": 2 }]);
        var json = encoder.encode(foo);
        expect(json).toBe('{"id":1,"foo":{"baz":123},"items":[{"item":1},{"item":2}]}');
    });
});

//# sourceMappingURL=json-encoder.js.map
