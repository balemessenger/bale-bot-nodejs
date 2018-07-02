"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = require("./Message");
class PurchaseMessage extends Message_1.Message {
    static get TYPE() {
        return "PurchaseMessage";
    }
    constructor(msg, accountNumber, amount, moneyRequestType) {
        super();
        this._msg = msg;
        this._accountNumber = accountNumber;
        if (amount) {
            this._amount = amount;
            this._regexAmount = "[" + amount + "]";
        }
        else {
            this._amount = "0";
            this._regexAmount = "[]";
        }
        this._moneyRequestType = moneyRequestType;
    }
    get msg() {
        return this._msg;
    }
    get accountNumber() {
        return this._accountNumber;
    }
    get amount() {
        return this._amount;
    }
    /**
     *
     * @return {{$type: string, text: string, elements: any[]}}
     */
    getJsonObject() {
        return {
            $type: PurchaseMessage.TYPE,
            msg: this._msg.getJsonObject(),
            accountNumber: this._accountNumber,
            amount: this._amount,
            regexAmount: this._regexAmount,
            moneyRequestType: {
                $type: this._moneyRequestType
            }
        };
    }
    manipulateFromJsonObject(jsonObject) {
        this._msg = jsonObject.msg;
        this._accountNumber = jsonObject.accountNumber;
        this._amount = jsonObject.amount;
        this._regexAmount = jsonObject.regexAmount;
        this._moneyRequestType = jsonObject.moneyRequestType.$type;
    }
}
exports.PurchaseMessage = PurchaseMessage;
//# sourceMappingURL=PurchaseMessage.js.map