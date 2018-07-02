import {Element} from "./Element";
import {Jsonable} from "../../../utils/Jsonable";

export class ListElement extends Element {

    public static get TYPE(): string {
        return "List";
    }

    private _title: string;
    private _items: ListItem[];

    constructor(title: string, items?: ListItem[]) {
        super(ListElement.TYPE);
        this._title = title;
        if (items != null)
            this._items = items;
        else
            this._items = [];
    }

    public addItem(item: ListItem) {
        this._items.push(item);
    }

    getJsonObject(): any {
        let jsonObj = super.getJsonObject();
        jsonObj.data.title = this._title;
        jsonObj.data.items = [];
        for (let item of this._items) {
            jsonObj.data.items.push(item.getJsonObject());
        }
        return jsonObj;
    }

    manipulateFromJsonObject(jsonObject: any): void {
        super.manipulateFromJsonObject(jsonObject);
        this._title = jsonObject.data.title;
        this._items = [];
        for (let item of jsonObject.data.items) {
            let listItem = new ListItem(null, null);
            listItem.manipulateFromJsonObject(item);
            this._items.push(listItem);
        }
    }
}

export class ListItem implements Jsonable {
    private _text: string;
    private _value: string;

    constructor(text: string, value: string) {
        this._text = text;
        this._value = value;
    }

    get text(): string {
        return this._text;
    }

    get value(): string {
        return this._value;
    }


    getJsonObject(): any {
        return {
            text: this._text,
            value: this._value
        };
    }

    manipulateFromJsonObject(jsonObject: any): void {
        this._text = jsonObject.text;
        this._value = jsonObject.value;
    }
}