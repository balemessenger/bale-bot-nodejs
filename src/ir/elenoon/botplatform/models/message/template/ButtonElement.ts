import {Element} from "./Element";

export class ButtonElement extends Element {

    public static get TYPE(): string {
        return "Button";
    }

    private _text: string;
    private _value: string;
    private _action: number;
    private _onAction: Function;

    constructor(text: string, value: string,action: number, onAction: Function) {
        super(ButtonElement.TYPE);
        this._text = text;
        this._value = value;
        this._action = action
        this._onAction = onAction;
    }

    get text(): string {
        return this._text;
    }

    get value(): string {
        return this._value;
    }
    get action(): number {
        return this._action;
    }

    getJsonObject(): any {
        let jsonObj = super.getJsonObject();
        jsonObj.data = {
            text: this._text,
            value: this._value,
            action: this._action
        };
        // FIXME: Redundant jsonObj huh?!
        return jsonObj.data;
    }

    manipulateFromJsonObject(jsonObject: any): void {
        super.manipulateFromJsonObject(jsonObject);
        this._text = jsonObject.data.text;
        this._value = jsonObject.data.value;
        this._action = jsonObject.data.action;
    }


    get onAction(): Function {
        return this._onAction;
    }

    set setOnAction(action: Function) {
        this._onAction = action;
    }
}