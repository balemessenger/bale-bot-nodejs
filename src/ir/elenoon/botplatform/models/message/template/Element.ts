import {Jsonable} from "../../../utils/Jsonable";

export abstract class Element implements Jsonable {

    private _type: string;

    constructor(type: string) {
        this._type = type;
    }

    get type(): string {
        return this._type;
    }

    public getJsonObject(): any {
        return {
            $type: this._type,
            data: {}
        }
    }

    public manipulateFromJsonObject(jsonObject: any): void {
        this._type = jsonObject.$type;
    }
}