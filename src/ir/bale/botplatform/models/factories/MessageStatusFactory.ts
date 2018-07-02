import {MessageStatus} from "../serverMessages/MessageStatus";
import {MessageReceivedStatus} from "../serverMessages/MessageReceivedStatus";
import {MessageReadStatus} from "../serverMessages/MessageReadStatus";
/**
 * Created by emran on 3/2/17.
 */
export class MessageStatusFactory {
    public static build(jsonPacket: string): MessageStatus {
        let jsonObj = JSON.parse(jsonPacket);
        if (typeof jsonObj === 'undefined') {
            return null;
        }

        switch (jsonObj.body.$type) {
            case "BotReceivedUpdate":
                return new MessageReceivedStatus(jsonPacket);
            case "BotReadUpdate":
                return new MessageReadStatus(jsonPacket);
        }

        return null;
    }
}