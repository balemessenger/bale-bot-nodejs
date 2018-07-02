import {Response} from "./Response";
/**
 * Created by amin on 3/2/17.
 */
export class BotErrorResponse extends Response {

    public code: string;
    public tag: string;
    public data: string;
    public retryIn: string;

    constructor(jsonPacket: string) {
        super(jsonPacket);
        let jsonObj = JSON.parse(jsonPacket);
        this.code = jsonObj.body.code;
        this.tag = jsonObj.body.tag;
        this.data = jsonObj.body.data;
        this.retryIn = jsonObj.body.retryIn;
    }
}