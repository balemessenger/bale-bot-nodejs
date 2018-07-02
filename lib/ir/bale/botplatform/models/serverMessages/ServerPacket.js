"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The top parent of all receiving messages from the server.
 */
class ServerPacket {
    /**
     * pass jsonPacket to @manipulateWithJson to fill necessary fields like as id
     * @param jsonPacket A json string to manipulate the instantiated object with.
     */
    constructor(jsonPacket) {
        let jsonObj = JSON.parse(jsonPacket);
        this._id = jsonObj.id;
        this._body = jsonObj.body;
    }
    get id() {
        return this._id;
    }
    get body() {
        return this._body;
    }
    /**
     * Determines whether the type of the given jsonMsg is ResponseMessage or ReceivedMessage.
     * @param jsonPacket
     * @return {boolean} true if the given jsonPacket is in type of ResponseMessage; Otherwise false.
     * @throws '$type is not defined' when in jsonPacket $type field is not defined
     */
    static isResponse(jsonPacket) {
        let jsonObj = JSON.parse(jsonPacket);
        let isResponseBool = false;
        if (!(typeof jsonObj.$type === null)) {
            if (jsonObj.$type === 'Response')
                isResponseBool = true;
            else if (jsonObj.$type === 'FatSeqUpdate')
                isResponseBool = false;
            else {
                //return null;
                throw new Error("Invalid jsonPacket : $type is not valid");
            }
        }
        else {
            throw new Error("Invalid jsonPacket : $type is undefined");
        }
        return isResponseBool;
    }
    static isReceivedMessage(jsonPacket) {
        let jsonObj = JSON.parse(jsonPacket);
        return jsonObj.body.$type === 'Message';
    }
}
exports.ServerPacket = ServerPacket;
//# sourceMappingURL=ServerPacket.js.map