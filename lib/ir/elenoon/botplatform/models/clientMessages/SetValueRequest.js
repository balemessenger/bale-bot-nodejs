"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Request_1 = require("./Request");
const ApiConst_1 = require("../../constants/ApiConst");
class SetValueRequest extends Request_1.Request {
    constructor(keyspace, key, value) {
        super(ApiConst_1.ApiConst.Services.KeyValue);
        this._key = key;
        this._keyspace = keyspace;
        this._value = value;
    }
    getJsonObject() {
        let req = super.getJsonObject();
        req.body = {};
        req.body.$type = "SetValue";
        req.body.keyspace = this._keyspace;
        req.body.key = this._key;
        req.body.value = this._value;
        return req;
    }
}
exports.SetValueRequest = SetValueRequest;
//# sourceMappingURL=SetValueRequest.js.map