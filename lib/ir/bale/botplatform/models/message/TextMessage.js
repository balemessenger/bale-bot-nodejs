"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = require("./Message");
const ApiConst_1 = require("../../constants/ApiConst");
class TextMessage extends Message_1.Message {
    /**
     * set user in parent user field
     * @param text
     */
    constructor(textOrMessage) {
        super();
        if (textOrMessage != null) {
            if (typeof textOrMessage === "string")
                this._text = textOrMessage;
            else
                this.manipulateFromJsonObject(textOrMessage);
        }
    }
    get text() {
        return this._text;
    }
    getJsonObject() {
        return {
            $type: ApiConst_1.ApiConst.MessageTypes.Text,
            text: this._text
        };
    }
    manipulateFromJsonObject(jsonObject) {
        this._text = jsonObject.text;
    }
}
exports.TextMessage = TextMessage;
//# sourceMappingURL=TextMessage.js.map