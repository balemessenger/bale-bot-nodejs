"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServerPacket_1 = require("./ServerPacket");
const Peer_1 = require("../Peer");
/**
 * Created by emran on 3/2/17.
 */
class MessageStatus extends ServerPacket_1.ServerPacket {
    constructor(jsonPacket) {
        super(jsonPacket);
        this._type = this.body.$type;
        this._peer = new Peer_1.Peer(this.body.peer.$type, this.body.peer.id, this.body.peer.accessHash);
        this._startDate = this.body.startDate;
    }
    get type() {
        return this._type;
    }
    get peer() {
        return this._peer;
    }
    get startDate() {
        return this._startDate;
    }
}
exports.MessageStatus = MessageStatus;
//# sourceMappingURL=MessageStatus.js.map