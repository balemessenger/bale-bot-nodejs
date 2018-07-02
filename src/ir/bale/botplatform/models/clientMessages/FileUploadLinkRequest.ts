/**
 * Created by elenoon on 7/17/17.
 */
import {ApiConst} from "../../constants/ApiConst";
import {Request} from "./Request";

export class FileUploadLinkRequest extends Request {

    private _size: number;
    private _crc: string;
    private _fileType:string;

    /**
     *
     * @param fileId
     * @param accessHash
     * @param version The version of access hash.
     */
    constructor(size: number, crc: string,fileType:string) {
        super(ApiConst.Services.Files);
        this._size = size;
        this._crc = crc;
        this._fileType = fileType;

    }


    getJsonObject(): string {
        let requestObj = super.getJsonObject();
        requestObj.body = {};
        requestObj.body.$type = "GetFileUploadUrl";
        requestObj.body.size = this._size;
        requestObj.body.crc = this._crc;
        requestObj.body.isServer = false;
        requestObj.body.fileType = this._fileType;

        return requestObj;
    }
}