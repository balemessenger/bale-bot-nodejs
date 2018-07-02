"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = require("./Message");
const ApiConst_1 = require("../../constants/ApiConst");
class StickerMessage extends Message_1.Message {
    constructor(messageObjOrStickerId, stickerCollectionId, stickerCollectionAccessHash, fastPreview, image512) {
        super();
        if (stickerCollectionId) {
            //fileId
            this.stickerId = messageObjOrStickerId;
            this.stickerCollectionId = stickerCollectionId;
            this.stickerCollectionAccessHash = stickerCollectionAccessHash;
            this.fastPreview = fastPreview;
            this.image512 = image512;
            this.image256 = image512;
        }
        else {
            //messageObj
            this.manipulateFromJsonObject(messageObjOrStickerId);
        }
    }
    getJsonObject() {
        return {
            $type: ApiConst_1.ApiConst.MessageTypes.Sticker,
            stickerId: this.stickerId,
            fastPreview: this.fastPreview,
            image512: this.image512,
            image256: this.image256,
            stickerCollectionId: [this.stickerCollectionId],
            stickerCollectionAccessHash: [this.stickerCollectionAccessHash],
        };
    }
    manipulateFromJsonObject(jsonObject) {
        this.stickerId = jsonObject.stickerId;
        this.fastPreview = jsonObject.fastPreview;
        this.image512 = jsonObject.image512;
        this.image256 = jsonObject.image256;
        this.stickerCollectionId = jsonObject.stickerCollectionId;
        this.stickerCollectionAccessHash = jsonObject.stickerCollectionAccessHash;
    }
}
exports.StickerMessage = StickerMessage;
//# sourceMappingURL=StickerMessage.js.map