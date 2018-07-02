"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServerPacket_1 = require("../serverMessages/ServerPacket");
const SendMessageResponse_1 = require("../serverMessages/SendMessageResponse");
const UnknownResponse_1 = require("../serverMessages/UnknownResponse");
const GetKeysResponse_1 = require("../serverMessages/GetKeysResponse");
const BotErrorResponse_1 = require("../serverMessages/BotErrorResponse");
const GetDifferenceResponse_1 = require("../serverMessages/GetDifferenceResponse");
const FileUploadLinkResponse_1 = require("../serverMessages/FileUploadLinkResponse");
const FileDownloadLinkResponse_1 = require("../serverMessages/FileDownloadLinkResponse");
class ResponseModelFactory {
    /**
     * Builds the corresponding ServerPacket class from the given json.
     * @param jsonPacket A json string that represents a response.
     * @return {Response} The corresponding ServerPacket class. Returns null if is not a ServerPacket or can't convert to any predefined Server class.
     */
    static build(jsonPacket) {
        let objPacket = JSON.parse(jsonPacket);
        if (typeof objPacket === 'undefined') {
            return null;
        }
        if (ServerPacket_1.ServerPacket.isResponse(jsonPacket)) {
            let body = objPacket.body;
            if (body.date != null) {
                return new SendMessageResponse_1.SendMessageResponse(jsonPacket);
            }
            else if (body.value != null) {
                return new GetKeysResponse_1.GetKeysResponse(jsonPacket);
            }
            else if (body.tag != null) {
                return new BotErrorResponse_1.BotErrorResponse(jsonPacket);
            }
            else if (body.seq != null) {
                return new GetDifferenceResponse_1.GetDifferenceResponse(jsonPacket);
            }
            else if (body.fileId != null) {
                return new FileUploadLinkResponse_1.FileUploadLinkResponse(jsonPacket);
            }
            else if (body.url != null) {
                return new FileDownloadLinkResponse_1.FileDownloadLinkResponse(jsonPacket);
            }
            else if (body.seq != null) {
                return new GetDifferenceResponse_1.GetDifferenceResponse(jsonPacket);
            }
            else {
                return new UnknownResponse_1.UnknownResponse(jsonPacket);
            }
        }
        return null;
    }
}
exports.ResponseModelFactory = ResponseModelFactory;
//# sourceMappingURL=ResponseModelFactory.js.map