import {ApiConst} from "../../constants/ApiConst";
import {Request} from "./Request";

export class FileDownloadLinkRequest extends Request {

    private _fileId: string;
    private _accessHash: string;
    private _fileStorageVersion: number;
    private _fileType:string;

    /**
     *
     * @param fileId
     * @param accessHash
     * @param version The version of access hash.
     */
    constructor(fileId: string, accessHash: string,fileType:string) {
        super(ApiConst.Services.Files);
        this._fileId = fileId;
        this._accessHash = accessHash;
        this._fileType = fileType;
    }


    /**
     * Sets the file storage version version of the current file message.
     * @param version
     */
    public setFileStorageVersion(version: number): void {
        this._fileStorageVersion = version;
    }

    /**
     * create JsonObject from this object and return it
     * @return {any}
     */
    getJsonObject(): string {
        let requestObj = super.getJsonObject();
        requestObj.body = {};
        requestObj.body.$type = "GetFileDownloadUrl";

        requestObj.body.fileId = this._fileId;
        requestObj.body.userId = this._accessHash;
        requestObj.body.fileVersion = !this._fileStorageVersion ? 1 : this._fileStorageVersion;
        requestObj.body.isServer = false;
        requestObj.body.isResumeUpload = false;
        requestObj.body.fileType = this._fileType;
        return requestObj;
    }
}