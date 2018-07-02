"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Response_1 = require("./Response");
/**
 * handle the sendMessage messages from server
 */
class SendMessageResponse extends Response_1.Response {
    /**
     * pass jsonPacket to parent class for calling @manipulateWithJson to fill necessary fields like as date
     * @param jsonPacket
     */
    constructor(jsonPacket) {
        super(jsonPacket);
        this._date = JSON.parse(jsonPacket).body.date;
    }
    get date() {
        return this._date;
    }
}
exports.SendMessageResponse = SendMessageResponse;
//# sourceMappingURL=SendMessageResponse.js.map