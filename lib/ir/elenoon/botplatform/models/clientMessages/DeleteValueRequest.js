"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiConst_1 = require("../../constants/ApiConst");
const Request_1 = require("./Request");
class DeleteValueRequest extends Request_1.Request {
    constructor(keyspace, key) {
        super(ApiConst_1.ApiConst.Services.KeyValue);
        this._key = key;
        this._keyspace = keyspace;
    }
    getJsonObject() {
        let req = super.getJsonObject();
        req.body = {};
        req.body.$type = "DeleteValue";
        req.body.keyspace = this._keyspace;
        req.body.key = this._key;
        return req;
    }
    toJson() {
        return JSON.stringify(this.getJsonObject());
    }
}
exports.DeleteValueRequest = DeleteValueRequest;
//# sourceMappingURL=DeleteValueRequest.js.map