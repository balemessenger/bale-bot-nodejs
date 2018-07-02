"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by elenoon on 7/24/17.
 */
const Message_1 = require("./Message");
class ReceiptMessage extends Message_1.Message {
    constructor(message) {
        super();
        this._transferInfo = new Map();
        this.manipulateFromJsonObject(message);
    }
    get transferInfo() {
        return this._transferInfo;
    }
    get type() {
        return this._type;
    }
    getJsonObject() {
        return {};
    }
    manipulateFromJsonObject(jsonObject) {
        var message = jsonObject.message;
        this._type = message.$type;
        this._transferInfo.set("msgUID", "undefined");
        this._transferInfo.set("payer", "undefined");
        this._transferInfo.set("receiver", "undefined");
        this._transferInfo.set("traceNo", "undefined");
        this._transferInfo.set("amount", "undefined");
        this._transferInfo.set("date", "undefined");
        this._transferInfo.set("receiptType", "undefined");
        var transferInfo = message.transferInfo;
        for (var i = 0; i < transferInfo.items.length; i++) {
            if (transferInfo.items[i].value.value != null)
                this._transferInfo.set(transferInfo.items[i].key, transferInfo.items[i].value.value);
            else
                this._transferInfo.set(transferInfo.items[i].key, transferInfo.items[i].value.text);
        }
    }
}
exports.ReceiptMessage = ReceiptMessage;
//# sourceMappingURL=ReceiptMessage.js.map