"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Response_1 = require("./Response");
class GetKeysResponse extends Response_1.Response {
    constructor(jsonPacket) {
        super(jsonPacket);
        this.manipulateWithJson(jsonPacket);
    }
    manipulateWithJson(jsonPacket) {
        let jsonObj = JSON.parse(jsonPacket);
        this._values = jsonObj.body.value;
    }
    get values() {
        return this._values;
    }
}
exports.GetKeysResponse = GetKeysResponse;
//# sourceMappingURL=GetKeysResponse.js.map