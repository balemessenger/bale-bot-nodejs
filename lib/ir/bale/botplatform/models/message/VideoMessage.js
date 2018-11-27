"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileMessage_1 = require("./FileMessage");
const ApiConst_1 = require("../../constants/ApiConst");
class VideoMessage extends FileMessage_1.FileMessage {
    constructor(messageObjOrFileId, accessHash, name, fileSize, mimeType, captionText, width, height, thumb, duration) {
        super(messageObjOrFileId, accessHash, name, fileSize, mimeType, captionText);
        this._width = 80;
        this._height = 80;
        if (accessHash) {
            this._width = width;
            this._height = height;
            this._thumb = thumb;
            this._duration = duration;
        }
        else{
            this.manipulateFromJsonObject(messageObjOrFileId);
        }
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get thumb() {
        return this._thumb;
    }
    get duration() {
        return this._duration;
    }
    getJsonObject() {
        let obj = super.getJsonObject();
        obj.thumb = {
            width: this._width,
            height: this._height,
            thumb: this._thumb
        };
        obj.ext = {
            $type: ApiConst_1.ApiConst.ExtTypes.Video,
            width: this._width,
            height: this._height,
            duration: this._duration
        };
        return obj;
    }
    manipulateFromJsonObject(jsonObject) {
        super.manipulateFromJsonObject(jsonObject);
        let e = jsonObject.ext;
        let t = jsonObject.thumb;
        if (t.width)
            this._width = t.width;
        if (t.height)
            this._height = t.height;
        if (e.duration)
            this._duration = e.duration;
        if (t.thumb)
            this._thumb = t.thumb;

    }
}
exports.VideoMessage = VideoMessage;
//# sourceMappingURL=VideoMessage.js.map