import {Request} from "./Request";
import {ApiConst} from "../../constants/ApiConst";

export class GetKeysRequest extends Request {

    private _keyspace: string;

    constructor(keyspace: string) {
        super(ApiConst.Services.KeyValue);
        this._keyspace = keyspace;
    }


    getJsonObject(): any {
        let req = super.getJsonObject();
        req.body = {};
        req.body.$type = "GetKeys";
        req.body.keyspace = this._keyspace;
        return req;
    }

}