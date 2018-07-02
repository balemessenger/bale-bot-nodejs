import {ServerPacket} from "./ServerPacket";
import {User} from "../User";
import {Message} from "../message/Message";
import {MessageFactory} from "../factories/MessageFactory";
import {Peer} from "../Peer";
import {QuotedMessage} from "../message/QuotedMessage";

export class ReceivedMessage extends ServerPacket {

    protected _seq: string;
    protected _date: string;
    protected _randomId: string;
    protected _peer: Peer;
    protected _sender: Peer;
    protected _quotedMessage: QuotedMessage;

    private _message: Message;

    constructor(jsonPacket: string) {
        super(jsonPacket);

        let jsonObj = JSON.parse(jsonPacket);
        this._seq = jsonObj.seq;
        this._date = jsonObj.body.date;
        this._randomId = jsonObj.body.randomId;

        if (jsonObj.body.$type == "Message") {
            this._peer = new Peer(jsonObj.body.peer.$type,jsonObj.body.peer.id,jsonObj.body.peer.accessHash);
            this._sender = new Peer(jsonObj.body.sender.$type,jsonObj.body.sender.id,jsonObj.body.sender.accessHash);
            this._message = MessageFactory.build(jsonObj.body.message);
            if (jsonObj.body.quotedMessage) {
                this._quotedMessage = new QuotedMessage();
                this._quotedMessage.manipulateFromJsonObject(jsonObj.body.quotedMessage);
            }
        }
    }

    get seq(): string {
        return this._seq;
    }

    get date(): string {
        return this._date;
    }

    get randomId(): string {
        return this._randomId;
    }

    get peer(): User {//Peer type should be more general in the future.
        return this._peer;
    }

    get sender(): User {
        return this._sender;
    }

    get message(): Message {
        return this._message;
    }

    get quotedMessage(): QuotedMessage {
        return this._quotedMessage;
    }
}