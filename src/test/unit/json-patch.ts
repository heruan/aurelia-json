import { TypeBinder, bind, generics, track, trackIterable } from "type-binder";
import { JsonPatch } from "../../main/json-patch";
import { JsonEncoder } from "../../main/json-encoder";

describe("json-patch", () => {

    class Foo {
        @track() a: number;
        b: number;
        @bind(Bar) @track() bar: Bar;
    }

    class Bar {
        @track() c: number;
    }

    it("produces valid patch", () => {
        let bar = new TypeBinder().bind({ c: 3 }, Bar);
        let foo = new TypeBinder().bind({ a: 1, b: 1, bar }, Foo);
        let patch = JsonPatch.diff(foo);
        expect(patch.length).toBe(0);
        foo.a = 2;
        foo.b = 2;
        patch = JsonPatch.diff(foo);
        expect(patch.toJSON()).toEqual([
            { op: 'test', path: '/a', value: 1 },
            { op: 'replace', path: '/a', value: 2 }
        ]);
        foo.bar.c = 4;
        patch = JsonPatch.diff(foo);
        expect(patch.toJSON()).toEqual([
            { op: 'test', path: '/a', value: 1 },
            { op: 'replace', path: '/a', value: 2 },
            { op: 'test', path: '/bar/c', value: 3 },
            { op: 'replace', path: '/bar/c', value: 4 }
        ]);
        foo.bar = new Bar();
        patch = JsonPatch.diff(foo, { a: true, bar: true });
        expect(patch.toJSON()).toEqual([
            { op: 'test', path: '/a', value: 1 },
            { op: 'replace', path: '/a', value: 2 },
            { op: 'test', path: '/bar', value: bar },
            { op: 'replace', path: '/bar', value: foo.bar }
        ]);
    });

    it("produces valid patch for iterables", () => {
        class Bag {
            @bind(Array)
            @trackIterable()
            numbers: number[];

            @bind(Set)
            @generics(Bar)
            @trackIterable()
            bars: Set<Bar>;

            @bind(Map)
            @generics(Foo, Bar)
            @trackIterable<[Foo, Bar], Map<Foo, Bar>>((v1, v2) => v1.every((v, i) => v === v2[i]))
            foobars: Map<Foo, Bar>;
        }

        let bag = new TypeBinder().bind({
            numbers: [ 1, 2, 3 ],
            bars: [ { c: 1 }, { c: 2 }, { c: 3 }],
            foobars: [
                [ { a: 1 }, { c: 1 } ],
                [ { a: 2 }, { c: 2 } ],
                [ { a: 3 }, { c: 3 } ]
            ]
        }, Bag);
        bag.numbers = [ 2, 3, 1 ];
        let foo = bag.foobars.keys().next().value;
        let bar = new Bar();
        bar.c = 4;
        bag.foobars.set(foo, bar);
        let patch = JsonPatch.diff(bag);
        expect(new JsonEncoder().encode(patch)).toBe(
            '[{"op":"test","path":"/numbers/0","value":1},' +
            '{"op":"move","from":"/numbers/0","path":"/numbers/2"},' +
            '{"op":"test","path":"/foobars/0","value":[{"a":1},{"c":1}]},' +
            '{"op":"replace","path":"/foobars/0","value":[{"a":1},{"c":4}]}]'
        );
    });

});
