"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = require("./Message");
const MessageFactory_1 = require("../factories/MessageFactory");
/**
 * Created by amin on 2/2/17.
 */
class QuotedMessage extends Message_1.Message {
    constructor(message) {
        super();
        if (message) {
            this.messageId = message.randomId;
            this.peer = message.peer.getJsonObject();
        }
    }
    getJsonObject() {
        return {
            messageId: this.messageId,
            peer: this.peer
        };
    }
    manipulateFromJsonObject(jsonObject) {
        if (jsonObject) {
            this.messageId = jsonObject.messageId;
            this.publicGroupId = jsonObject.publicGroupId;
            this.senderId = jsonObject.senderId;
            this.messageDate = jsonObject.messageDate;
            this.message = MessageFactory_1.MessageFactory.build(jsonObject.message);
        }
    }
}
exports.QuotedMessage = QuotedMessage;
//# sourceMappingURL=QuotedMessage.js.map