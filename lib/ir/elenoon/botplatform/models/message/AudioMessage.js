"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiConst_1 = require("../../constants/ApiConst");
const FileMessage_1 = require("./FileMessage");
class AudioMessage extends FileMessage_1.FileMessage {
    constructor(messageObjOrFileId, accessHash, name, fileSize, mimeType, captionText, duration) {
        super(messageObjOrFileId, accessHash, name, fileSize, mimeType, captionText);
        if (accessHash) {
            this._duration = duration;
        }
    }
    get duration() {
        return this._duration;
    }
    /**
     *
     * @return {{$type: string, fileId: string, accessHash: string, fileSize: string, name: string, mimeType: string, thumb: {width: any, height: any, thumb: any}[], ext: {$type: string, width: any, height: any}[]}}
     */
    getJsonObject() {
        let obj = super.getJsonObject();
        obj.ext = {
            $type: ApiConst_1.ApiConst.ExtTypes.Audio,
            duration: this._duration
        };
        return obj;
    }
    manipulateFromJsonObject(jsonObject) {
        super.manipulateFromJsonObject(jsonObject);
        let t = jsonObject.ext;
        if (t.duration)
            this._duration = t.duration;
    }
}
exports.AudioMessage = AudioMessage;
//# sourceMappingURL=AudioMessage.js.map