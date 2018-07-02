import {Request} from "./Request";
import {ApiConst} from "../../constants/ApiConst";

export class SetValueRequest extends Request {

    private _keyspace: string;
    private _key: string;
    private _value: string;


    constructor(keyspace: string,
                key: string,
                value: string) {
        super(ApiConst.Services.KeyValue);
        this._key = key;
        this._keyspace = keyspace;
        this._value = value;
    }


    getJsonObject(): any {
        let req = super.getJsonObject();
        req.body = {};
        req.body.$type = "SetValue";
        req.body.keyspace = this._keyspace;
        req.body.key = this._key;
        req.body.value = this._value;
        return req;
    }

}