"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Request_1 = require("./Request");
const ApiConst_1 = require("../../constants/ApiConst");
class GetValueRequest extends Request_1.Request {
    constructor(keyspace, key) {
        super(ApiConst_1.ApiConst.Services.KeyValue);
        this._key = key;
        this._keyspace = keyspace;
    }
    getJsonObject() {
        let req = super.getJsonObject();
        req.body = {};
        req.body.$type = "GetValue";
        req.body.keyspace = this._keyspace;
        req.body.key = this._key;
        return req;
    }
}
exports.GetValueRequest = GetValueRequest;
//# sourceMappingURL=GetValueRequest.js.map