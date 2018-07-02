import {Message} from "./Message";
import {Peer} from "../Peer";
import {ReceivedMessage} from "../serverMessages/ReceivedMessage";
import {MessageFactory} from "../factories/MessageFactory";
/**
 * Created by amin on 2/2/17.
 */
export class QuotedMessage extends Message {

    public messageId: string;
    public publicGroupId: string;
    public senderId: string;
    public messageDate: string;
    public message: Message;
    public peer: Peer;

    constructor();
    constructor(message: ReceivedMessage);

    constructor(message?: ReceivedMessage) {
        super();
        if (message) {
            this.messageId = message.randomId;
            this.peer = message.peer.getJsonObject();
        }
    }

    getJsonObject(): any {
        return {
            messageId: this.messageId,
            peer: this.peer
        };
    }


    manipulateFromJsonObject(jsonObject: any): void {
        if (jsonObject) {
            this.messageId = jsonObject.messageId;
            this.publicGroupId = jsonObject.publicGroupId;
            this.senderId = jsonObject.senderId;
            this.messageDate = jsonObject.messageDate;
            this.message = MessageFactory.build(jsonObject.message);
        }
    }
}