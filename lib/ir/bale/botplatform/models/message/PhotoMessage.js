"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileMessage_1 = require("./FileMessage");
const ApiConst_1 = require("../../constants/ApiConst");
class PhotoMessage extends FileMessage_1.FileMessage {
    constructor(messageObjOrFileId, accessHash, name, fileSize, mimeType, captionText, width, height, thumb) {
        super(messageObjOrFileId, accessHash, name, fileSize, mimeType, captionText);
        this._width = 80;
        this._height = 80;
        this._ext_width = 80;
        this._ext_height = 80;
        if (accessHash) {
            this._width = width;
            this._height = height;
            this._thumb = thumb;
        }
        else {
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
    /*
     get captionText(): string {
     return this._captionText;
     }

     set captionText(value: string) {
     this._captionText = value;
     }*/
    getJsonObject() {
        let obj = super.getJsonObject();
        obj.thumb = {
            width: this._width,
            height: this._height,
            thumb: this._thumb
        };
        obj.ext = {
            $type: ApiConst_1.ApiConst.ExtTypes.Photo,
            width: this._width,
            height: this._height,
        };
        return obj;
    }
    manipulateFromJsonObject(jsonObject) {
        super.manipulateFromJsonObject(jsonObject);
        let e = jsonObject.ext;
        this._ext_width = e.width;
        this._ext_height = e.height;
        let t = jsonObject.thumb;
        this._width = e.width;
        this._height = e.height;
        this._thumb = t.thumb;
    }
}
exports.PhotoMessage = PhotoMessage;
//# sourceMappingURL=PhotoMessage.js.map