"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageStatus_1 = require("./MessageStatus");
/**
 * Created by emran on 3/2/17.
 */
class MessageReceivedStatus extends MessageStatus_1.MessageStatus {
    constructor(jsonPacket) {
        super(jsonPacket);
        this._receivedDate = this.body.receivedDate;
    }
    get statusDate() {
        return this._receivedDate;
    }
}
exports.MessageReceivedStatus = MessageReceivedStatus;
//# sourceMappingURL=MessageReceivedStatus.js.map