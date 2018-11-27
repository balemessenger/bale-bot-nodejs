"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = require("./Message");
const ApiConst_1 = require("../../constants/ApiConst");
class FileMessage extends Message_1.Message {
    constructor(messageObjOrFileId, accessHash, name, fileSize, mimeType, captionText) {
        super();
        if (accessHash) {
            //fileId
            this._fileId = messageObjOrFileId;
            this._accessHash = accessHash;
            this._name = name;
            this._fileSize = fileSize;
            this._mimeType = mimeType;
            this._captionText = captionText;
        }
        else {
            //messageObj
            this.manipulateFromJsonObject(messageObjOrFileId);
        }
    }
    get fileId() {
        return this._fileId;
    }
    get accessHash() {
        return this._accessHash;
    }
    get name() {
        return this._name;
    }
    get fileSize() {
        return this._fileSize;
    }
    get mimeType() {
        return this._mimeType;
    }
    get fileStorageVersion() {
        return this._fileStorageVersion;
    }
    get captionText() {
        return this._captionText;
    }
    set captionText(value) {
        this._captionText = value;
    }
    /**
     * Sets the file storage version version of the current file message.
     * @param version
     */
    setFileStorageVersion(version) {
        this._fileStorageVersion = version;
    }
    getJsonObject() {
        return {
            $type: ApiConst_1.ApiConst.MessageTypes.Documnet,
            fileId: this._fileId,
            accessHash: this._accessHash,
            fileSize: this._fileSize.toString(),
            name: this._name,
            mimeType: this._mimeType,
            thumb: null,
            ext: null,
            caption: {
                $type: "Text",
                text: this._captionText
            },
            checkSum: "checkSum",
            algorithm: "algorithm",
            fileStorageVersion: !this._fileStorageVersion ? 1 : this._fileStorageVersion,
        };
    }
    manipulateFromJsonObject(jsonObject) {
        if (jsonObject.caption.text)
            this._captionText = jsonObject.caption.text;
        else
            this._captionText = "";
        if (jsonObject.fileId)
            this._fileId = jsonObject.fileId;
        if (jsonObject.accessHash)
            this._accessHash = jsonObject.accessHash;
        if (jsonObject.name)
            this._name = jsonObject.name;
        if (jsonObject.fileSize)
            this._fileSize = jsonObject.fileSize;
        if (jsonObject.mimeType)
            this._mimeType = jsonObject.mimeType;
        if (jsonObject.duration)
            this._duration = jsonObject.duration;
        if (jsonObject.fileStorageVersion !== undefined)
            this._fileStorageVersion = jsonObject.fileStorageVersion;
        else
            this._fileStorageVersion = 1;
    }
}
exports.FileMessage = FileMessage;
//# sourceMappingURL=FileMessage.js.map