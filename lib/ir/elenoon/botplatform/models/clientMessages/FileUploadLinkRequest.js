"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by elenoon on 7/17/17.
 */
const ApiConst_1 = require("../../constants/ApiConst");
const Request_1 = require("./Request");
class FileUploadLinkRequest extends Request_1.Request {
    /**
     *
     * @param fileId
     * @param accessHash
     * @param version The version of access hash.
     */
    constructor(size, crc, fileType) {
        super(ApiConst_1.ApiConst.Services.Files);
        this._size = size;
        this._crc = crc;
        this._fileType = fileType;
    }
    getJsonObject() {
        let requestObj = super.getJsonObject();
        requestObj.body = {};
        requestObj.body.$type = "GetFileUploadUrl";
        requestObj.body.size = this._size;
        requestObj.body.crc = this._crc;
        requestObj.body.isServer = false;
        requestObj.body.fileType = this._fileType;
        return requestObj;
    }
}
exports.FileUploadLinkRequest = FileUploadLinkRequest;
//# sourceMappingURL=FileUploadLinkRequest.js.map