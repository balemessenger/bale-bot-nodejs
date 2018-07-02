import {Message} from "../message/Message";
import {ApiConst} from "../../constants/ApiConst";
import {FileMessage} from "../message/FileMessage";
import {TextMessage} from "../message/TextMessage";
import {AudioMessage} from "../message/AudioMessage";
import {PhotoMessage} from "../message/PhotoMessage";
import {VideoMessage} from "../message/VideoMessage";
import {TemplateMessage} from "../message/template/TemplateMessage";
import {TemplateResponseMessage} from "../message/template/TemplateResponseMessage";
import {StickerMessage} from "../message/StickerMessage";
import {ReceiptMessage} from "../message/ReceiptMessage";


export class MessageFactory {
    /**
     * Returns the corresponding message object from the given json.
     * @param message the message part of the received json.
     * @return {Message}
     */
    public static build(message: any): Message {

        switch (message.$type) {
            case ApiConst.MessageTypes.Text:
                return new TextMessage(message);
            case ApiConst.MessageTypes.TemplateResponse:
                return new TemplateResponseMessage(message);
            case ApiConst.MessageTypes.Sticker:
                return new StickerMessage(message);
            case ApiConst.MessageTypes.Documnet:
                // Check photo/video/audio...
                let mimeType: string = message.mimeType;

                if (!mimeType)
                    return new FileMessage(message);

                // Why try catch?
                // Because mimeType is unreliable unfortunately.
                try {
                    if (mimeType.startsWith(ApiConst.GeneralMimeTypes.Image))
                        return new PhotoMessage(message);
                    else if (mimeType.startsWith(ApiConst.GeneralMimeTypes.Audio))
                        return new AudioMessage(message);
                    else if (mimeType.startsWith(ApiConst.GeneralMimeTypes.Video))
                        return new VideoMessage(message);
                    else
                        return new FileMessage(message);
                } catch (e) {
                    return new FileMessage(message);
                }
            case ApiConst.MessageTypes.Template:
                return new TemplateResponseMessage(message);
            case ApiConst.MessageTypes.BankMessage:
                return new ReceiptMessage(message);
            default:
                return null;
        }
    }
}