import {FileMessage} from "./FileMessage";
import {ApiConst} from "../../constants/ApiConst";
export class VideoMessage extends FileMessage {

    private _width: number = 80;
    private _height: number = 80;
    private _thumb: string;
    private _duration: number;

    constructor(fileId: string, accessHash: string, name: string, fileSize: number, mimeType: string, captionText: string, width: number, height: number, thumb: string, duration: number);
    constructor(messageObjOrFileId: any);

    constructor(messageObjOrFileId: string | any, accessHash?: string, name?: string, fileSize?: number, mimeType?: string, captionText?: string, width?: number, height?: number, thumb?: string, duration?: number) {
        super(messageObjOrFileId, accessHash, name, fileSize, mimeType, captionText);
        if (accessHash) {
            this._width = width;
            this._height = height;
            this._thumb = thumb;
            this._duration  = duration;
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

    getJsonObject(): any {
        let obj = super.getJsonObject();
        obj.thumb = {
            width: this._width,
            height: this._height,
            thumb: this._thumb
        };
        obj.ext = {
            $type: ApiConst.ExtTypes.Video,
            width: this._width,
            height: this._height,
            duration: this._duration
        };

        return obj;
    }

    manipulateFromJsonObject(jsonObject: any): void {
        super.manipulateFromJsonObject(jsonObject);
        let t = jsonObject.thumb;
        if (t.width)
            this._width = t.width;
        if (t.height)
            this._height = t.height;
        if (t.thumb)
            this._thumb = t.thumb;
    }
}