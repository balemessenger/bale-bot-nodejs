"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Request_1 = require("./Request");
const ApiConst_1 = require("../../constants/ApiConst");
const SDKConst_1 = require("../../constants/SDKConst");
/**
 * Created by emran on 5/24/17.
 */
class GetDifferenceRequest extends Request_1.Request {
    constructor(seq) {
        super(ApiConst_1.ApiConst.Services.Sequence_update);
        this.seq = seq;
    }
    getJsonObject() {
        let obj = super.getJsonObject();
        obj.body = {};
        obj.body.$type = "GetDifference";
        obj.body.seq = this.seq;
        obj.body.howMany = SDKConst_1.SDKConst.UPDATELIMIT.UPDATELIMIT;
        return obj;
    }
}
exports.GetDifferenceRequest = GetDifferenceRequest;
//# sourceMappingURL=GetDifferenceRequest.js.map