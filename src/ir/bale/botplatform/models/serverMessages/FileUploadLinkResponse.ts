/**
 * Created by elenoon on 7/17/17.
 */
import {Response} from "./Response";

export class FileUploadLinkResponse extends Response {

    private _fileId: string;
    private _url: string;
    private _dup: boolean;
    private _userId:string;

    constructor(jsonPacket: string) {
        super(jsonPacket);

        let body = JSON.parse(jsonPacket).body;
        this._fileId = body.fileId;
        this._url = body.url;
        this._dup = body.dup;
        this._userId=body.userId;
    }


    get fileId(): string {
        return this._fileId;
    }

    get url(): string {
        return this._url;
    }


    get dup(): boolean {
        return this._dup;
    }
    get userId(): string {
        return this._userId;
    }
}