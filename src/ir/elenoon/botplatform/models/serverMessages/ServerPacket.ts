/**
 * The top parent of all receiving messages from the server.
 */
export abstract class ServerPacket {
    private _id: string;
    private _body: any;

    /**
     * pass jsonPacket to @manipulateWithJson to fill necessary fields like as id
     * @param jsonPacket A json string to manipulate the instantiated object with.
     */
    public constructor(jsonPacket: string) {
        let jsonObj = JSON.parse(jsonPacket);
        this._id = jsonObj.id;
        this._body = jsonObj.body;
    }

    get id(): string {
        return this._id;
    }

    get body(): any {
        return this._body;
    }

    /**
     * Determines whether the type of the given jsonMsg is ResponseMessage or ReceivedMessage.
     * @param jsonPacket
     * @return {boolean} true if the given jsonPacket is in type of ResponseMessage; Otherwise false.
     * @throws '$type is not defined' when in jsonPacket $type field is not defined
     */
    public static isResponse(jsonPacket: string): boolean {
        let jsonObj = JSON.parse(jsonPacket);
        let isResponseBool: boolean = false;
        if (!(typeof jsonObj.$type === null)) {
            if (jsonObj.$type === 'Response')
                isResponseBool = true;
            else if (jsonObj.$type === 'FatSeqUpdate')
                isResponseBool = false;
            else {
                //return null;
                throw new Error("Invalid jsonPacket : $type is not valid");
            }
        }
        else {
            throw new Error("Invalid jsonPacket : $type is undefined");
        }
        return isResponseBool;
    }

    public static isReceivedMessage(jsonPacket: string): boolean {
        let jsonObj = JSON.parse(jsonPacket);
        return jsonObj.body.$type === 'Message';
    }
}