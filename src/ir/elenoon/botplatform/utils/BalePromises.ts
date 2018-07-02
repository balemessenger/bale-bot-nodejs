import {Response} from "../models/serverMessages/Response";
import {MessageReceivedStatus} from "../models/serverMessages/MessageReceivedStatus";
import {MessageReadStatus} from "../models/serverMessages/MessageReadStatus";
/**
 * Created by emran on 3/2/17.
 */
export class BalePromises {
    private _sendPromise: Promise<any>;
    private _responsePromise: Promise<Response>;
    private _receivedPromise: Promise<MessageReceivedStatus>;
    private _readPromise: Promise<MessageReadStatus>;

    constructor(sendPromise: Promise<any>, responsePromise: Promise<Response>, receivedPromise: Promise<MessageReceivedStatus>, readPromise: Promise<MessageReadStatus>) {
        this._sendPromise = sendPromise;
        this._responsePromise = responsePromise;
        this._receivedPromise = receivedPromise;
        this._readPromise = readPromise;
    }

    get sendPromise(): Promise<any> {
        return this._sendPromise;
    }

    get responsePromise(): Promise<Response> {
        return this._responsePromise;
    }

    get receivedPromise(): Promise<MessageReceivedStatus> {
        return this._receivedPromise;
    }

    get readPromise(): Promise<MessageReadStatus> {
        return this._readPromise;
    }

    /**
     * For backward compatibility. Acts as responsePromise.then method
     * @param cb
     * @return {Promise<void>}
     */
    public then(cb: (data: any) => void): any {
        return this.responsePromise.then(cb);
    }

    /**
     * For backward compatibility. Acts as responsePromise.then method
     * @param cb
     * @return {Promise<void>}
     */
    public catch(cb: (data: any) => void): any {
        return this.responsePromise.catch(cb);
    }
}