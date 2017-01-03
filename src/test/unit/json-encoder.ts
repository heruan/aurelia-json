import { TypeBinder, bind, generics, track } from "type-binder";
import { JsonEncoder } from "../../main/json-encoder";
import { jsonIgnore } from "../../main/decorators";

describe("json-encoder", () => {

    it("encodes an object to JSON", () => {

        class Foo {
            id;
            @jsonIgnore("bar")
            foo;
            @jsonIgnore("boo")
            items: Set<Object>;
        }

        let encoder = new JsonEncoder();
        let foo = new Foo();
        foo.id = 1;
        foo.foo = {"bar":true,"baz":123};
        foo.items = new Set([{"item":1,"boo":null},{"item":2}]);
        let json = encoder.encode(foo);
        expect(json).toBe('{"id":1,"foo":{"baz":123},"items":[{"item":1},{"item":2}]}');

    });

});
