import {Jsonable} from "../../utils/Jsonable";

import {Message} from "./Message";

export class PurchaseMessage extends Message {


    public static get TYPE(): string {
        return "PurchaseMessage";
    }

    private _msg: Message;
    private _accountNumber: string;
    private _amount: string;
    private _regexAmount: string;
    private _moneyRequestType: string;
    
    /**
     * @param msg
     * @param accountNumber
     * @param amount
     * @param moneyRequestType
     */

    constructor(msg: Message, accountNumber:string ,amount: string,moneyRequestType:string);
    constructor(msg: Message, accountNumber:string ,amount: string,moneyRequestType:string) {
        super();
        this._msg = msg;
        this._accountNumber = accountNumber;
        if(amount){
            this._amount = amount;
            this._regexAmount = "["+amount+"]";}
        else {
            this._amount = "0";
            this._regexAmount = "[]";
        }

        this._moneyRequestType = moneyRequestType;
    }


    get msg(): Message {
        return this._msg;
    }

    get accountNumber(): string {
        return this._accountNumber;
    }

    get amount(): string {
        return this._amount;
    }

    /**
     *
     * @return {{$type: string, text: string, elements: any[]}}
     */
    getJsonObject(): any {
        return {
            $type: PurchaseMessage.TYPE,
            msg: this._msg.getJsonObject(),
            accountNumber: this._accountNumber,
            amount:this._amount,
            regexAmount: this._regexAmount,
            moneyRequestType: {
                $type: this._moneyRequestType
            }

        };
    }


    manipulateFromJsonObject(jsonObject: any): void {
        this._msg = jsonObject.msg;
        this._accountNumber = jsonObject.accountNumber;
        this._amount = jsonObject.amount;
        this._regexAmount = jsonObject.regexAmount;
        this._moneyRequestType = jsonObject.moneyRequestType.$type;

    }
}