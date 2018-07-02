import {MessageStatus} from "./MessageStatus";
/**
 * Created by emran on 3/2/17.
 */
export class MessageReadStatus extends MessageStatus {

    private _readDate: number;

    constructor(jsonPacket:string){
        super(jsonPacket);

        this._readDate = this.body.readDate;
    }

    get statusDate(): number {
        return this._readDate;
    }

}