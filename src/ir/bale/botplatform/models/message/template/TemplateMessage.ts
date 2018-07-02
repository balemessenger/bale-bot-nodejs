import {Message} from "../Message";
import {SimpleTemplate} from "./SimpleTemplate";
import {ApiConst} from "../../../constants/ApiConst";
/**
 * Note that this class only represents outgoing template message from bot to a user. The response to it, is represented by {@link TemplateResponseMessage} separately.
 *
 */
export class TemplateMessage extends Message {

    public _templateMessageId: string;
    private _template: SimpleTemplate;

    private static tIdCounter: number = 0;

    /**
     *
     * @param template
     */
    constructor(template: SimpleTemplate) {
        super();
        this._template = template;
        TemplateMessage.tIdCounter++;
        this._templateMessageId = TemplateMessage.tIdCounter.toString();
    }

    /**
     *
     * @return {{$type: string, templateId: number, template: any}}
     */
    getJsonObject(): any {
        let elements = [];

        for (let el of this._template.elements)
            elements.push(el.getJsonObject());

        return {
            $type: ApiConst.MessageTypes.Template,
            templateMessageId: this._templateMessageId, //A unique identifier to trace the corresponding FatSeqUpdate of the user reaction
            generalMessage: this._template.generalMessage.getJsonObject(),
            btnList: elements
        };
    }

    /**
     * Manipulates current template message with the given jsonObject. Note that this class only represents outgoing template message from bot to a user.
     * In other words, this method is just useful for tasks like loading a saved TemplateMessage from a file...
     * @param jsonObject
     */
    manipulateFromJsonObject(jsonObject: any): void {
        this._templateMessageId = jsonObject.templateId;
        this._template = jsonObject.template;
    }


    get templateMessageId(): string {
        return this._templateMessageId;
    }

    get template() : SimpleTemplate {
        return this._template;
    }


    set setTemplateMessageId(value: string) {
        this._templateMessageId = value;
    }
}