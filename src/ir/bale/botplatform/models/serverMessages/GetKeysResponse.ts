import {Response} from "./Response";

export class GetKeysResponse extends Response {

    private _values: string[];

    constructor(jsonPacket: string) {
        super(jsonPacket);
        this.manipulateWithJson(jsonPacket);
    }

    protected manipulateWithJson(jsonPacket: string): void {
        let jsonObj = JSON.parse(jsonPacket);
        this._values = jsonObj.body.value;
    }

    get values(): string[] {
        return this._values;
    }
}