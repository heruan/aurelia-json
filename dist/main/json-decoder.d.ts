import { TypeBinder } from "type-binder";
export declare class JsonDecoder {
    private typeBinder;
    constructor(typeBinder?: TypeBinder);
    decode<T>(json: string, type: new (...args) => T, ...generics: any[]): T;
    reviver(key: string, value: any): any;
}
