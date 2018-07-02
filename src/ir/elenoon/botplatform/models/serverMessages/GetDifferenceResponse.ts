import {Response} from "./Response";
import {ReceivedMessage} from "./ReceivedMessage";
import {ResponseModelFactory} from "../factories/ResponseModelFactory";
import {UnknownResponse} from "./UnknownResponse";
import {MessageStatusFactory} from "../factories/MessageStatusFactory";
import {ServerPacket} from "./ServerPacket";
/**
 * Created by emran on 5/24/17.
 */
export class GetDifferenceResponse extends Response {

    private _lastSeq: number;
    private _updates: any[];
    private _needMore: boolean;

    constructor(jsonPacket: string) {
        super(jsonPacket);

        let body = JSON.parse(jsonPacket).body;

        this._lastSeq = body.seq;
        this._updates = body.updates;

        // for (let update of body.updates) {
        //     let packet = JSON.stringify(update);
        //     let serverPacket = ResponseModelFactory.build(packet);
        //     if (!serverPacket || serverPacket instanceof UnknownResponse)
        //         serverPacket = MessageStatusFactory.build(packet);
        //
        //     if (!serverPacket)
        //         serverPacket = new ReceivedMessage(packet);
        //
        //     this._updates.push(serverPacket);
        // }

        this._needMore = body.needMore;
    }

    get lastSeq(): number {
        return this._lastSeq;
    }

    get updates(): ServerPacket[] {
        return this._updates;
    }

    get needMore(): boolean {
        return this._needMore;
    }
}