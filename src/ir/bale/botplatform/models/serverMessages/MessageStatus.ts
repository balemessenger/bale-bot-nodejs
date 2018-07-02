import {ServerPacket} from "./ServerPacket";
import {Peer} from "../Peer";
/**
 * Created by emran on 3/2/17.
 */
export abstract class MessageStatus extends ServerPacket {
    private _type: string;
    private _peer: Peer;
    private _startDate: number;

    constructor(jsonPacket: string) {
        super(jsonPacket);
        this._type = this.body.$type;
        this._peer = new Peer(this.body.peer.$type, this.body.peer.id, this.body.peer.accessHash);
        this._startDate = this.body.startDate;
    }

    get type(): string {
        return this._type;
    }

    get peer(): Peer {
        return this._peer;
    }

    get startDate(): number {
        return this._startDate;
    }

    abstract get statusDate(): number;
}