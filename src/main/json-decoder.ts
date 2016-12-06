
import { inject } from "aurelia-dependency-injection";
import { TypeBinder } from "type-binder";

@inject(TypeBinder)
export class JsonDecoder {

    private typeBinder: TypeBinder;

    public constructor(typeBinder: TypeBinder = new TypeBinder()) {
        this.typeBinder = typeBinder;
    }

    public decode<T>(json: string, type: new(...args) => T, ...generics: any[]): T {
        let object = JSON.parse(json);
        return this.typeBinder.bind(object, type, ...generics);
    }

    public reviver(key: string, value: any): any {
        
    }

}
