"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Response_1 = require("./Response");
/**
 * Default implementation for the response when it's unknown.
 */
class UnknownResponse extends Response_1.Response {
    /**
     * pass jsonPacket to parent class for calling @manipulateWithJson to fill necessary fields like as date
     * @param jsonPacket
     */
    constructor(jsonPacket) {
        super(jsonPacket);
    }
}
exports.UnknownResponse = UnknownResponse;
//# sourceMappingURL=UnknownResponse.js.map