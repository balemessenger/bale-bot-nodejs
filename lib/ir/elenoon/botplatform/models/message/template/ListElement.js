"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Element_1 = require("./Element");
class ListElement extends Element_1.Element {
    static get TYPE() {
        return "List";
    }
    constructor(title, items) {
        super(ListElement.TYPE);
        this._title = title;
        if (items != null)
            this._items = items;
        else
            this._items = [];
    }
    addItem(item) {
        this._items.push(item);
    }
    getJsonObject() {
        let jsonObj = super.getJsonObject();
        jsonObj.data.title = this._title;
        jsonObj.data.items = [];
        for (let item of this._items) {
            jsonObj.data.items.push(item.getJsonObject());
        }
        return jsonObj;
    }
    manipulateFromJsonObject(jsonObject) {
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
exports.ListElement = ListElement;
class ListItem {
    constructor(text, value) {
        this._text = text;
        this._value = value;
    }
    get text() {
        return this._text;
    }
    get value() {
        return this._value;
    }
    getJsonObject() {
        return {
            text: this._text,
            value: this._value
        };
    }
    manipulateFromJsonObject(jsonObject) {
        this._text = jsonObject.text;
        this._value = jsonObject.value;
    }
}
exports.ListItem = ListItem;
//# sourceMappingURL=ListElement.js.map