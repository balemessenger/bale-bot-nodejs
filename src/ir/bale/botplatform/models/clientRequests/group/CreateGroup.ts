import {Jsonable} from "../../../utils/Jsonable";
import {ApiConst} from "../../../constants/ApiConst";

export class CreateGroup implements Jsonable {

    private _title: string;

    constructor(title: string) {
        this._title = title;
    }

    public getJsonObject(): any {
        return {
            "$type": ApiConst.RequestType.create_group,
            "title": this._title,
        }
    };

    public manipulateFromJsonObject(jsonObject: any): void {
        this._title = jsonObject.title
    };
}