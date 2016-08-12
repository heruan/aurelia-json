import {inject} from "aurelia-dependency-injection";
import {JsonDecoder} from "./json-decoder";
import {JsonEncoder} from "./json-encoder";

@inject(JsonDecoder)
export class JsonMapper {

    private jsonDecoder: JsonDecoder;

    public constructor(jsonDecoder: JsonDecoder) {
        this.jsonDecoder = jsonDecoder;
    }

}
