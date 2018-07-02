import {MessageStatus} from "./MessageStatus";
/**
 * Created by emran on 3/2/17.
 */
export class MessageReceivedStatus extends MessageStatus {

    private _receivedDate: number;

    constructor(jsonPacket:string){
        super(jsonPacket);

        this._receivedDate = this.body.receivedDate;
    }

    get statusDate(): number {
        return this._receivedDate;
    }

}