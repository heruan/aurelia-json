import { TypeBinder, bind, generics, track } from "type-binder";
import { JsonEncoder } from "../../main/json-encoder";
import { jsonIgnore } from "../../main/decorators";

describe("json-encoder", () => {

    it("encodes an object to JSON", () => {

        class Foo {
            @jsonIgnore("bar")
            foo;
            @jsonIgnore("boo")
            items: Set<Object>;
        }

        let encoder = new JsonEncoder();
        let object = {"id":1,"items":[{"item":1,"boo":null},{"item":2}],"foo":{"bar":true,"baz":123}};
        let foo = new TypeBinder().bind(object, Foo);
        let json = encoder.encode(foo);
        expect(json).toBe('{"id":1,"items":[{"item":1},{"item":2}],"foo":{"baz":123}}');
    });

});
