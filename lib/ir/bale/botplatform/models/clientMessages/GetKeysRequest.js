"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Request_1 = require("./Request");
const ApiConst_1 = require("../../constants/ApiConst");
class GetKeysRequest extends Request_1.Request {
    constructor(keyspace) {
        super(ApiConst_1.ApiConst.Services.KeyValue);
        this._keyspace = keyspace;
    }
    getJsonObject() {
        let req = super.getJsonObject();
        req.body = {};
        req.body.$type = "GetKeys";
        req.body.keyspace = this._keyspace;
        return req;
    }
}
exports.GetKeysRequest = GetKeysRequest;
//# sourceMappingURL=GetKeysRequest.js.map