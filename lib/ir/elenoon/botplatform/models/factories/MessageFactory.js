"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiConst_1 = require("../../constants/ApiConst");
const FileMessage_1 = require("../message/FileMessage");
const TextMessage_1 = require("../message/TextMessage");
const AudioMessage_1 = require("../message/AudioMessage");
const PhotoMessage_1 = require("../message/PhotoMessage");
const VideoMessage_1 = require("../message/VideoMessage");
const TemplateResponseMessage_1 = require("../message/template/TemplateResponseMessage");
const StickerMessage_1 = require("../message/StickerMessage");
const ReceiptMessage_1 = require("../message/ReceiptMessage");
class MessageFactory {
    /**
     * Returns the corresponding message object from the given json.
     * @param message the message part of the received json.
     * @return {Message}
     */
    static build(message) {
        switch (message.$type) {
            case ApiConst_1.ApiConst.MessageTypes.Text:
                return new TextMessage_1.TextMessage(message);
            case ApiConst_1.ApiConst.MessageTypes.TemplateResponse:
                return new TemplateResponseMessage_1.TemplateResponseMessage(message);
            case ApiConst_1.ApiConst.MessageTypes.Sticker:
                return new StickerMessage_1.StickerMessage(message);
            case ApiConst_1.ApiConst.MessageTypes.Documnet:
                // Check photo/video/audio...
                let mimeType = message.mimeType;
                if (!mimeType)
                    return new FileMessage_1.FileMessage(message);
                // Why try catch?
                // Because mimeType is unreliable unfortunately.
                try {
                    if (mimeType.startsWith(ApiConst_1.ApiConst.GeneralMimeTypes.Image))
                        return new PhotoMessage_1.PhotoMessage(message);
                    else if (mimeType.startsWith(ApiConst_1.ApiConst.GeneralMimeTypes.Audio))
                        return new AudioMessage_1.AudioMessage(message);
                    else if (mimeType.startsWith(ApiConst_1.ApiConst.GeneralMimeTypes.Video))
                        return new VideoMessage_1.VideoMessage(message);
                    else
                        return new FileMessage_1.FileMessage(message);
                }
                catch (e) {
                    return new FileMessage_1.FileMessage(message);
                }
            case ApiConst_1.ApiConst.MessageTypes.Template:
                return new TemplateResponseMessage_1.TemplateResponseMessage(message);
            case ApiConst_1.ApiConst.MessageTypes.BankMessage:
                return new ReceiptMessage_1.ReceiptMessage(message);
            default:
                return null;
        }
    }
}
exports.MessageFactory = MessageFactory;
//# sourceMappingURL=MessageFactory.js.map