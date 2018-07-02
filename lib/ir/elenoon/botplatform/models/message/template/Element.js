"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Element {
    constructor(type) {
        this._type = type;
    }
    get type() {
        return this._type;
    }
    getJsonObject() {
        return {
            $type: this._type,
            data: {}
        };
    }
    manipulateFromJsonObject(jsonObject) {
        this._type = jsonObject.$type;
    }
}
exports.Element = Element;
//# sourceMappingURL=Element.js.map