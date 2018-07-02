import {Request} from "./Request";
import {ApiConst} from "../../constants/ApiConst";

export class GetValueRequest extends Request {

    private _keyspace: string;
    private _key: string;

    constructor(keyspace: string,
                key: string) {
        super(ApiConst.Services.KeyValue);
        this._key = key;
        this._keyspace = keyspace;
    }


    getJsonObject(): any {
        let req = super.getJsonObject();
        req.body = {};
        req.body.$type = "GetValue";
        req.body.keyspace = this._keyspace;
        req.body.key = this._key;
        return req;
    }

}