import {Response} from "./Response";

/**
 * Default implementation for the response when it's unknown.
 */
export class UnknownResponse extends Response {

    /**
     * pass jsonPacket to parent class for calling @manipulateWithJson to fill necessary fields like as date
     * @param jsonPacket
     */
    constructor(jsonPacket: string) {
        super(jsonPacket);
    }
}