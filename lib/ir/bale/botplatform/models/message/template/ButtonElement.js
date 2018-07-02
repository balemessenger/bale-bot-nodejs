"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Element_1 = require("./Element");
class ButtonElement extends Element_1.Element {
    static get TYPE() {
        return "Button";
    }
    constructor(text, value, action, onAction) {
        super(ButtonElement.TYPE);
        this._text = text;
        this._value = value;
        this._action = action;
        this._onAction = onAction;
    }
    get text() {
        return this._text;
    }
    get value() {
        return this._value;
    }
    get action() {
        return this._action;
    }
    getJsonObject() {
        let jsonObj = super.getJsonObject();
        jsonObj.data = {
            text: this._text,
            value: this._value,
            action: this._action
        };
        // FIXME: Redundant jsonObj huh?!
        return jsonObj.data;
    }
    manipulateFromJsonObject(jsonObject) {
        super.manipulateFromJsonObject(jsonObject);
        this._text = jsonObject.data.text;
        this._value = jsonObject.data.value;
        this._action = jsonObject.data.action;
    }
    get onAction() {
        return this._onAction;
    }
    set setOnAction(action) {
        this._onAction = action;
    }
}
exports.ButtonElement = ButtonElement;
//# sourceMappingURL=ButtonElement.js.map