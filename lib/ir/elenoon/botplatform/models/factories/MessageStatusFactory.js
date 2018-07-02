"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageReceivedStatus_1 = require("../serverMessages/MessageReceivedStatus");
const MessageReadStatus_1 = require("../serverMessages/MessageReadStatus");
/**
 * Created by emran on 3/2/17.
 */
class MessageStatusFactory {
    static build(jsonPacket) {
        let jsonObj = JSON.parse(jsonPacket);
        if (typeof jsonObj === 'undefined') {
            return null;
        }
        switch (jsonObj.body.$type) {
            case "BotReceivedUpdate":
                return new MessageReceivedStatus_1.MessageReceivedStatus(jsonPacket);
            case "BotReadUpdate":
                return new MessageReadStatus_1.MessageReadStatus(jsonPacket);
        }
        return null;
    }
}
exports.MessageStatusFactory = MessageStatusFactory;
//# sourceMappingURL=MessageStatusFactory.js.map