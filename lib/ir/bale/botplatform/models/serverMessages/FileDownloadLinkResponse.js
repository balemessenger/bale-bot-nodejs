"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by elenoon on 7/17/17.
 */
const Response_1 = require("./Response");
class FileDownloadLinkResponse extends Response_1.Response {
    constructor(jsonPacket) {
        super(jsonPacket);
        let body = JSON.parse(jsonPacket).body;
        this._url = body.url;
    }
    get url() {
        return this._url;
    }
}
exports.FileDownloadLinkResponse = FileDownloadLinkResponse;
//# sourceMappingURL=FileDownloadLinkResponse.js.map