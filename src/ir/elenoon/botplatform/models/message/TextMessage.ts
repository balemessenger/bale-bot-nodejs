import {Message} from "./Message";
import {ApiConst} from "../../constants/ApiConst";

export class TextMessage extends Message {

    private _text: string;

    constructor();
    constructor(text: string);
    constructor(messageObj: any);

    /**
     * set user in parent user field
     * @param text
     */
    constructor(textOrMessage?: string | any) {
        super();
        if (textOrMessage != null) {
            if (typeof textOrMessage === "string")
                this._text = textOrMessage;
            else
                this.manipulateFromJsonObject(textOrMessage);
        }
    }

    get text(): string {
        return this._text;
    }

    getJsonObject(): any {
        return {
            $type: ApiConst.MessageTypes.Text,
            text: this._text
        };
    }

    manipulateFromJsonObject(jsonObject: any): void {
        this._text = jsonObject.text;
    }
}
