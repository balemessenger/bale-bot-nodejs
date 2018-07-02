import {Message} from "../Message";
import {ApiConst} from "../../../constants/ApiConst";
/**
 * This class is representing incoming template message inputs from user. It's not designed to be sent from a bot to a user.
 */
export class TemplateResponseMessage extends Message {

    private _templateMessageResponseId: number;
    private _text: string;

    /**
     *
     * @param message Received message json object.
     */
    constructor(message: any) {
        super();
        this.manipulateFromJsonObject(message);
    }

    get templateId(): number {
        return this._templateMessageResponseId;
    }

    get text(): string {
        return this._text;
    }

    getJsonObject(): any {
        return {
            $type: ApiConst.MessageTypes.templateMessageResponse,
            templateMessageResponseId: this._templateMessageResponseId,
            text: this._text
        }
    }

    manipulateFromJsonObject(jsonObject: any): void {
        this._templateMessageResponseId = jsonObject.templateMessageResponseId;
        this._text = jsonObject.textMessage;
    }

}