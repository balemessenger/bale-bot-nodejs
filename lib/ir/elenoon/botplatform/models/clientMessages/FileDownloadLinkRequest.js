"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiConst_1 = require("../../constants/ApiConst");
const Request_1 = require("./Request");
class FileDownloadLinkRequest extends Request_1.Request {
    /**
     *
     * @param fileId
     * @param accessHash
     * @param version The version of access hash.
     */
    constructor(fileId, accessHash, fileType) {
        super(ApiConst_1.ApiConst.Services.Files);
        this._fileId = fileId;
        this._accessHash = accessHash;
        this._fileType = fileType;
    }
    /**
     * Sets the file storage version version of the current file message.
     * @param version
     */
    setFileStorageVersion(version) {
        this._fileStorageVersion = version;
    }
    /**
     * create JsonObject from this object and return it
     * @return {any}
     */
    getJsonObject() {
        let requestObj = super.getJsonObject();
        requestObj.body = {};
        requestObj.body.$type = "GetFileDownloadUrl";
        requestObj.body.fileId = this._fileId;
        requestObj.body.userId = this._accessHash;
        requestObj.body.fileVersion = !this._fileStorageVersion ? 1 : this._fileStorageVersion;
        requestObj.body.isServer = false;
        requestObj.body.isResumeUpload = false;
        requestObj.body.fileType = this._fileType;
        return requestObj;
    }
}
exports.FileDownloadLinkRequest = FileDownloadLinkRequest;
//# sourceMappingURL=FileDownloadLinkRequest.js.map