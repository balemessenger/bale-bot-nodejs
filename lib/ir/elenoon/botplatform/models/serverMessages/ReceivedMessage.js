"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServerPacket_1 = require("./ServerPacket");
const MessageFactory_1 = require("../factories/MessageFactory");
const Peer_1 = require("../Peer");
const QuotedMessage_1 = require("../message/QuotedMessage");
class ReceivedMessage extends ServerPacket_1.ServerPacket {
    constructor(jsonPacket) {
        super(jsonPacket);
        let jsonObj = JSON.parse(jsonPacket);
        this._seq = jsonObj.seq;
        this._date = jsonObj.body.date;
        this._randomId = jsonObj.body.randomId;
        if (jsonObj.body.$type == "Message") {
            this._peer = new Peer_1.Peer(jsonObj.body.peer.$type, jsonObj.body.peer.id, jsonObj.body.peer.accessHash);
            this._sender = new Peer_1.Peer(jsonObj.body.sender.$type, jsonObj.body.sender.id, jsonObj.body.sender.accessHash);
            this._message = MessageFactory_1.MessageFactory.build(jsonObj.body.message);
            if (jsonObj.body.quotedMessage) {
                this._quotedMessage = new QuotedMessage_1.QuotedMessage();
                this._quotedMessage.manipulateFromJsonObject(jsonObj.body.quotedMessage);
            }
        }
    }
    get seq() {
        return this._seq;
    }
    get date() {
        return this._date;
    }
    get randomId() {
        return this._randomId;
    }
    get peer() {
        return this._peer;
    }
    get sender() {
        return this._sender;
    }
    get message() {
        return this._message;
    }
    get quotedMessage() {
        return this._quotedMessage;
    }
}
exports.ReceivedMessage = ReceivedMessage;
//# sourceMappingURL=ReceivedMessage.js.map