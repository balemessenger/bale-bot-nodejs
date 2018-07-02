import {ServerPacket} from "../serverMessages/ServerPacket";
import {SendMessageResponse} from "../serverMessages/SendMessageResponse";
import {UnknownResponse} from "../serverMessages/UnknownResponse";
import {Response} from "../serverMessages/Response";
import {GetKeysResponse} from "../serverMessages/GetKeysResponse";
import {BotErrorResponse} from "../serverMessages/BotErrorResponse";
import {GetDifferenceResponse} from "../serverMessages/GetDifferenceResponse";
import {FileUploadLinkResponse} from "../serverMessages/FileUploadLinkResponse";
import {FileDownloadLinkResponse} from "../serverMessages/FileDownloadLinkResponse";

export class ResponseModelFactory {
    /**
     * Builds the corresponding ServerPacket class from the given json.
     * @param jsonPacket A json string that represents a response.
     * @return {Response} The corresponding ServerPacket class. Returns null if is not a ServerPacket or can't convert to any predefined Server class.
     */
    public static build(jsonPacket: string): Response {
        let objPacket = JSON.parse(jsonPacket);
        if (typeof objPacket === 'undefined') {
            return null;
        }
        if (ServerPacket.isResponse(jsonPacket)) {
            let body = objPacket.body;
            if (body.date != null) {
                return new SendMessageResponse(jsonPacket);
            } else if (body.value != null) {
                return new GetKeysResponse(jsonPacket);
            } else if(body.tag != null){
                return new BotErrorResponse(jsonPacket);
            } else if (body.seq != null) {
                return new GetDifferenceResponse(jsonPacket);
            } else if(body.fileId != null){
                return new FileUploadLinkResponse(jsonPacket);
            } else if(body.url != null){
                return new FileDownloadLinkResponse(jsonPacket);
            } else if (body.seq != null) {
                return new GetDifferenceResponse(jsonPacket);
            } else {
                return new UnknownResponse(jsonPacket);
            }
        }

        return null;
    }
}