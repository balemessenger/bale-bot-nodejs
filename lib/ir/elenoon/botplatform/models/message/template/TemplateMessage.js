"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = require("../Message");
const ApiConst_1 = require("../../../constants/ApiConst");
/**
 * Note that this class only represents outgoing template message from bot to a user. The response to it, is represented by {@link TemplateResponseMessage} separately.
 *
 */
class TemplateMessage extends Message_1.Message {
    /**
     *
     * @param template
     */
    constructor(template) {
        super();
        this._template = template;
        TemplateMessage.tIdCounter++;
        this._templateMessageId = TemplateMessage.tIdCounter.toString();
    }
    /**
     *
     * @return {{$type: string, templateId: number, template: any}}
     */
    getJsonObject() {
        let elements = [];
        for (let el of this._template.elements)
            elements.push(el.getJsonObject());
        return {
            $type: ApiConst_1.ApiConst.MessageTypes.Template,
            templateMessageId: this._templateMessageId,
            generalMessage: this._template.generalMessage.getJsonObject(),
            btnList: elements
        };
    }
    /**
     * Manipulates current template message with the given jsonObject. Note that this class only represents outgoing template message from bot to a user.
     * In other words, this method is just useful for tasks like loading a saved TemplateMessage from a file...
     * @param jsonObject
     */
    manipulateFromJsonObject(jsonObject) {
        this._templateMessageId = jsonObject.templateId;
        this._template = jsonObject.template;
    }
    get templateMessageId() {
        return this._templateMessageId;
    }
    get template() {
        return this._template;
    }
    set setTemplateMessageId(value) {
        this._templateMessageId = value;
    }
}
TemplateMessage.tIdCounter = 0;
exports.TemplateMessage = TemplateMessage;
//# sourceMappingURL=TemplateMessage.js.map