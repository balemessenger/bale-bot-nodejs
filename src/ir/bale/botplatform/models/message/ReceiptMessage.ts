/**
 * Created by elenoon on 7/24/17.
 */
import {Message} from "./Message";
import {ApiConst} from "../../constants/ApiConst";

export class ReceiptMessage extends Message{
    get transferInfo(): Map<string, any> {
        return this._transferInfo;
    }
    get type(): string {
        return this._type;
    }




    private _transferInfo:Map<string, any> = new Map<string, any>();
    private _type:string;
    constructor(message: any) {
        super();
        this.manipulateFromJsonObject(message);
    }
    getJsonObject(): any {
        return {};
    }
    manipulateFromJsonObject(jsonObject: any): void {
        var message = jsonObject.message;
        this._type = message.$type;
        this._transferInfo.set("msgUID","undefined")
        this._transferInfo.set("payer","undefined")
        this._transferInfo.set("receiver","undefined")
        this._transferInfo.set("traceNo","undefined")
        this._transferInfo.set("amount", "undefined")
        this._transferInfo.set("date","undefined")
        this._transferInfo.set("receiptType","undefined")
        var transferInfo =message.transferInfo
        for (var i=0;i<transferInfo.items.length;i++){
            if(transferInfo.items[i].value.value != null)
                this._transferInfo.set(transferInfo.items[i].key,transferInfo.items[i].value.value);
            else
                this._transferInfo.set(transferInfo.items[i].key,transferInfo.items[i].value.text);
        }


    }

}