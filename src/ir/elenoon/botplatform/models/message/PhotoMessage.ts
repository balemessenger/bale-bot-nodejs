import {FileMessage} from "./FileMessage";
import {ApiConst} from "../../constants/ApiConst";

export class PhotoMessage extends FileMessage {

    private _width: number = 80;
    private _height: number = 80;
    private _ext_width: number = 80;
    private _ext_height: number = 80;
    private _thumb: string;


    constructor(fileId: string, accessHash: string, name: string, fileSize: number, mimeType: string, captionText: string, width: number, height: number, thumb: string);
    constructor(messageObj: any);

    constructor(messageObjOrFileId: string | any, accessHash?: string, name?: string, fileSize?: number, mimeType?: string, captionText?: string, width?: number, height?: number, thumb?: string) {
        super(messageObjOrFileId, accessHash, name, fileSize, mimeType, captionText);
        if (accessHash) {
            this._width = width;
            this._height = height;
            this._thumb = thumb;

        } else {
            this.manipulateFromJsonObject(messageObjOrFileId);
        }
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get thumb(): string {
        return this._thumb;
    }

    /*
     get captionText(): string {
     return this._captionText;
     }

     set captionText(value: string) {
     this._captionText = value;
     }*/

    getJsonObject(): any {
        let obj = super.getJsonObject();
        obj.thumb = {
            width: this._width,
            height: this._height,
            thumb: this._thumb
        };
        obj.ext = {
            $type: ApiConst.ExtTypes.Photo,
            width: this._width,
            height: this._height,
        };
        return obj;
    }

    manipulateFromJsonObject(jsonObject: any): void {
        super.manipulateFromJsonObject(jsonObject);
        let e = jsonObject.ext;
        this._ext_width = e.width;
        this._ext_height = e.height;
        let t = jsonObject.thumb;
        this._width = e.width;
        this._height = e.height;
        this._thumb = t.thumb;
    }

}