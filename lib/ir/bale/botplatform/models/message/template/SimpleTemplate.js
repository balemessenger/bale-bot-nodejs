"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleTemplate {
    static get TYPE() {
        return "Simple";
    }
    /**
     * @param text
     * @param elements {Optional}
     */
    constructor(generalMessage, elements, responseType) {
        this._generalMessage = generalMessage;
        if (elements != null)
            this._elements = elements;
        else
            this._elements = [];
        if (responseType != null) {
            this._responseType = responseType;
        }
        else {
            this._responseType = "";
        }
    }
    addElement(element) {
        this._elements.push(element);
    }
    get generalMessage() {
        return this._generalMessage;
    }
    get elements() {
        return this._elements;
    }
    get responseType() {
        return this._responseType;
    }
    /**
     *
     * @return {{$type: string, text: string, elements: any[]}}
     */
    getJsonObject() {
        return {
            $type: SimpleTemplate.TYPE,
            text: this._generalMessage,
            elements: this._elements,
            responseType: this._responseType
        };
    }
    manipulateFromJsonObject(jsonObject) {
        this._generalMessage = jsonObject.generalMessage;
        this._elements = jsonObject.elements;
        this._responseType = jsonObject.responseType;
    }
}
exports.SimpleTemplate = SimpleTemplate;
//# sourceMappingURL=SimpleTemplate.js.map