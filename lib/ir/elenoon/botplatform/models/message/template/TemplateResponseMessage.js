"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = require("../Message");
const ApiConst_1 = require("../../../constants/ApiConst");
/**
 * This class is representing incoming template message inputs from user. It's not designed to be sent from a bot to a user.
 */
class TemplateResponseMessage extends Message_1.Message {
    /**
     *
     * @param message Received message json object.
     */
    constructor(message) {
        super();
        this.manipulateFromJsonObject(message);
    }
    get templateId() {
        return this._templateMessageResponseId;
    }
    get text() {
        return this._text;
    }
    getJsonObject() {
        return {
            $type: ApiConst_1.ApiConst.MessageTypes.templateMessageResponse,
            templateMessageResponseId: this._templateMessageResponseId,
            text: this._text
        };
    }
    manipulateFromJsonObject(jsonObject) {
        this._templateMessageResponseId = jsonObject.templateMessageResponseId;
        this._text = jsonObject.textMessage;
    }
}
exports.TemplateResponseMessage = TemplateResponseMessage;
//# sourceMappingURL=TemplateResponseMessage.js.map