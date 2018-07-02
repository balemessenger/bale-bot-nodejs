import {Response} from "./Response";
/**
 * handle the sendMessage messages from server
 */
export class SendMessageResponse extends Response {
    /*
     serverJson :
     {"$type":"Response","id":"2","body":{"date":"1469095703312"}}
     */

    private _date: string;

    /**
     * pass jsonPacket to parent class for calling @manipulateWithJson to fill necessary fields like as date
     * @param jsonPacket
     */
    constructor(jsonPacket: string) {
        super(jsonPacket);

        this._date = JSON.parse(jsonPacket).body.date;
    }

    get date(): string {
        return this._date;
    }
}