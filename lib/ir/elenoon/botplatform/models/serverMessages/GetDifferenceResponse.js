"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Response_1 = require("./Response");
/**
 * Created by emran on 5/24/17.
 */
class GetDifferenceResponse extends Response_1.Response {
    constructor(jsonPacket) {
        super(jsonPacket);
        let body = JSON.parse(jsonPacket).body;
        this._lastSeq = body.seq;
        this._updates = body.updates;
        // for (let update of body.updates) {
        //     let packet = JSON.stringify(update);
        //     let serverPacket = ResponseModelFactory.build(packet);
        //     if (!serverPacket || serverPacket instanceof UnknownResponse)
        //         serverPacket = MessageStatusFactory.build(packet);
        //
        //     if (!serverPacket)
        //         serverPacket = new ReceivedMessage(packet);
        //
        //     this._updates.push(serverPacket);
        // }
        this._needMore = body.needMore;
    }
    get lastSeq() {
        return this._lastSeq;
    }
    get updates() {
        return this._updates;
    }
    get needMore() {
        return this._needMore;
    }
}
exports.GetDifferenceResponse = GetDifferenceResponse;
//# sourceMappingURL=GetDifferenceResponse.js.map