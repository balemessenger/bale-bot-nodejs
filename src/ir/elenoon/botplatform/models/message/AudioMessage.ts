import {ApiConst} from "../../constants/ApiConst";
import {FileMessage} from "./FileMessage";

export class AudioMessage extends FileMessage {


    private _duration: number;

    constructor(fileId: string, accessHash: string, name: string, fileSize: number, mimeType: string, captionText: string, width: number, height: number, thumb: string);
    constructor(messageObj: any);

    constructor(messageObjOrFileId: string | any, accessHash?: string, name?: string, fileSize?: number, mimeType?: string, captionText?: string, duration?: number) {
        super(messageObjOrFileId, accessHash, name, fileSize, mimeType, captionText);
        if (accessHash) {
            this._duration = duration;
        }
    }

    public get duration(): number {
        return this._duration;
    }

    /**
     *
     * @return {{$type: string, fileId: string, accessHash: string, fileSize: string, name: string, mimeType: string, thumb: {width: any, height: any, thumb: any}[], ext: {$type: string, width: any, height: any}[]}}
     */
    getJsonObject(): any {
        let obj = super.getJsonObject();
        obj.ext = {
            $type: ApiConst.ExtTypes.Audio,
            duration: this._duration
        };

        return obj;
    }

    manipulateFromJsonObject(jsonObject: any): void {
        super.manipulateFromJsonObject(jsonObject);
        let t = jsonObject.ext;
        if (t.duration)
            this._duration = t.duration;
    }
}