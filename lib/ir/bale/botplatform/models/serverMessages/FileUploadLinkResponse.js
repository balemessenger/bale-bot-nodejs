"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by elenoon on 7/17/17.
 */
const Response_1 = require("./Response");
class FileUploadLinkResponse extends Response_1.Response {
    constructor(jsonPacket) {
        super(jsonPacket);
        let body = JSON.parse(jsonPacket).body;
        this._fileId = body.fileId;
        this._url = body.url;
        this._dup = body.dup;
        this._userId = body.userId;
    }
    get fileId() {
        return this._fileId;
    }
    get url() {
        return this._url;
    }
    get dup() {
        return this._dup;
    }
    get userId() {
        return this._userId;
    }
}
exports.FileUploadLinkResponse = FileUploadLinkResponse;
//# sourceMappingURL=FileUploadLinkResponse.js.map