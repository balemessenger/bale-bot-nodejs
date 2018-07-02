"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageStatus_1 = require("./MessageStatus");
/**
 * Created by emran on 3/2/17.
 */
class MessageReadStatus extends MessageStatus_1.MessageStatus {
    constructor(jsonPacket) {
        super(jsonPacket);
        this._readDate = this.body.readDate;
    }
    get statusDate() {
        return this._readDate;
    }
}
exports.MessageReadStatus = MessageReadStatus;
//# sourceMappingURL=MessageReadStatus.js.map