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
var type_binder_1 = require("type-binder");
var json_patch_1 = require("../../main/json-patch");
var json_encoder_1 = require("../../main/json-encoder");
describe("json-patch", function () {
    var Foo = (function () {
        function Foo() {
        }
        return Foo;
    }());
    __decorate([
        type_binder_1.track(),
        __metadata("design:type", Number)
    ], Foo.prototype, "a", void 0);
    __decorate([
        type_binder_1.bind(Bar), type_binder_1.track(),
        __metadata("design:type", Bar)
    ], Foo.prototype, "bar", void 0);
    var Bar = (function () {
        function Bar() {
        }
        return Bar;
    }());
    __decorate([
        type_binder_1.track(),
        __metadata("design:type", Number)
    ], Bar.prototype, "c", void 0);
    it("produces valid patch", function () {
        var bar = new type_binder_1.TypeBinder().bind({ c: 3 }, Bar);
        var foo = new type_binder_1.TypeBinder().bind({ a: 1, b: 1, bar: bar }, Foo);
        var patch = json_patch_1.JsonPatch.diff(foo);
        expect(patch.length).toBe(0);
        foo.a = 2;
        foo.b = 2;
        patch = json_patch_1.JsonPatch.diff(foo);
        expect(patch.toJSON()).toEqual([
            { op: 'test', path: '/a', value: 1 },
            { op: 'replace', path: '/a', value: 2 }
        ]);
        foo.bar.c = 4;
        patch = json_patch_1.JsonPatch.diff(foo);
        expect(patch.toJSON()).toEqual([
            { op: 'test', path: '/a', value: 1 },
            { op: 'replace', path: '/a', value: 2 },
            { op: 'test', path: '/bar/c', value: 3 },
            { op: 'replace', path: '/bar/c', value: 4 }
        ]);
        foo.bar = new Bar();
        patch = json_patch_1.JsonPatch.diff(foo, { a: true, bar: true });
        expect(patch.toJSON()).toEqual([
            { op: 'test', path: '/a', value: 1 },
            { op: 'replace', path: '/a', value: 2 },
            { op: 'test', path: '/bar', value: bar },
            { op: 'replace', path: '/bar', value: foo.bar }
        ]);
    });
    it("produces valid patch for iterables", function () {
        var Bag = (function () {
            function Bag() {
            }
            return Bag;
        }());
        __decorate([
            type_binder_1.bind(Array),
            type_binder_1.trackIterable(),
            __metadata("design:type", Array)
        ], Bag.prototype, "numbers", void 0);
        __decorate([
            type_binder_1.bind(Set),
            type_binder_1.generics(Bar),
            type_binder_1.trackIterable(),
            __metadata("design:type", Set)
        ], Bag.prototype, "bars", void 0);
        __decorate([
            type_binder_1.bind(Map),
            type_binder_1.generics(Foo, Bar),
            type_binder_1.trackIterable(function (v1, v2) { return v1.every(function (v, i) { return v === v2[i]; }); }),
            __metadata("design:type", Map)
        ], Bag.prototype, "foobars", void 0);
        var bag = new type_binder_1.TypeBinder().bind({
            numbers: [1, 2, 3],
            bars: [{ c: 1 }, { c: 2 }, { c: 3 }],
            foobars: [
                [{ a: 1 }, { c: 1 }],
                [{ a: 2 }, { c: 2 }],
                [{ a: 3 }, { c: 3 }]
            ]
        }, Bag);
        bag.numbers = [2, 3, 1];
        var foo = bag.foobars.keys().next().value;
        var bar = new Bar();
        bar.c = 4;
        bag.foobars.set(foo, bar);
        var patch = json_patch_1.JsonPatch.diff(bag);
        expect(new json_encoder_1.JsonEncoder().encode(patch)).toBe('[{"op":"test","path":"/numbers/0","value":1},' +
            '{"op":"move","from":"/numbers/0","path":"/numbers/2"},' +
            '{"op":"test","path":"/foobars/0","value":[{"a":1},{"c":1}]},' +
            '{"op":"replace","path":"/foobars/0","value":[{"a":1},{"c":4}]}]');
    });
});
