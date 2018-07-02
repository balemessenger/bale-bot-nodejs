import {Message} from "./Message";
import {ApiConst} from "../../constants/ApiConst";

export class FileMessage extends Message {

    private _fileId: string;
    private _accessHash: string;
    private _name: string;
    private _fileSize: number;
    private _mimeType: string;
    private _fileStorageVersion: number;
    private _captionText: string;

    constructor(fileId: string, accessHash: string, name: string, fileSize: number, mimeType: string, captionText: string);
    constructor(messageObj: any);

    constructor(messageObjOrFileId: string | any, accessHash?: string, name?: string, fileSize?: number, mimeType?: string, captionText?: string) {
        super();
        if (accessHash) {
            //fileId
            this._fileId = messageObjOrFileId;
            this._accessHash = accessHash;
            this._name = name;
            this._fileSize = fileSize;
            this._mimeType = mimeType;
            this._captionText = captionText;
        } else {
            //messageObj
            this.manipulateFromJsonObject(messageObjOrFileId);
        }
    }

    get fileId(): string {
        return this._fileId;
    }

    get accessHash(): string {
        return this._accessHash;
    }

    get name(): string {
        return this._name;
    }

    get fileSize(): number {
        return this._fileSize;
    }

    get mimeType(): string {
        return this._mimeType;
    }


    get fileStorageVersion(): number {
        return this._fileStorageVersion;
    }

    get captionText(): string {
        return this._captionText;
    }

    set captionText(value: string) {
        this._captionText = value;
    }

    /**
     * Sets the file storage version version of the current file message.
     * @param version
     */
    public setFileStorageVersion(version: number): void {
        this._fileStorageVersion = version;
    }

    getJsonObject(): any {
        return {
            $type: ApiConst.MessageTypes.Documnet,
            fileId: this._fileId,
            accessHash: this._accessHash,
            fileSize: this._fileSize.toString(),
            name: this._name,
            mimeType: this._mimeType,
            thumb: null,
            ext: null,
            caption: {
                $type: "Text",
                text: this._captionText
            },
            checkSum: "checkSum",
            algorithm: "algorithm",
            fileStorageVersion: !this._fileStorageVersion ? 1 : this._fileStorageVersion,
        };
    }

    manipulateFromJsonObject(jsonObject: any): void {
        if (jsonObject.caption.text)
            this._captionText = jsonObject.caption.text
        else
            this._captionText = ""
        if (jsonObject.fileId)
            this._fileId = jsonObject.fileId;
        if (jsonObject.accessHash)
            this._accessHash = jsonObject.accessHash;
        if (jsonObject.name)
            this._name = jsonObject.name;
        if (jsonObject.fileSize)
            this._fileSize = jsonObject.fileSize;
        if (jsonObject.mimeType)
            this._mimeType = jsonObject.mimeType;
        if (jsonObject.fileStorageVersion !== undefined)
            this._fileStorageVersion = jsonObject.fileStorageVersion;
        else
            this._fileStorageVersion = 1;
    }
}