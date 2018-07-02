import {Message} from "./Message";
import {ApiConst} from "../../constants/ApiConst";

export class StickerMessage extends Message {

    public stickerId: number;
    public fastPreview: number[];
    public image512: any;
    public image256: any;
    public stickerCollectionId: number;
    public stickerCollectionAccessHash: string;


    constructor(stickerId: number, stickerCollectionId: number, stickerCollectionAccessHash: string, fastPreview: number[], image512: any);
    constructor(messageObj: any);

    constructor(messageObjOrStickerId: number | any, stickerCollectionId?: number, stickerCollectionAccessHash?: string, fastPreview?: number[], image512?: any) {
        super();
        if (stickerCollectionId) {
            //fileId
            this.stickerId = messageObjOrStickerId;
            this.stickerCollectionId = stickerCollectionId;
            this.stickerCollectionAccessHash = stickerCollectionAccessHash;
            this.fastPreview = fastPreview;
            this.image512 = image512;
            this.image256 = image512;
        } else {
            //messageObj
            this.manipulateFromJsonObject(messageObjOrStickerId);
        }
    }

    getJsonObject(): any {
        return {
            $type: ApiConst.MessageTypes.Sticker,
            stickerId: this.stickerId,
            fastPreview: this.fastPreview,
            image512: this.image512,
            image256: this.image256,
            stickerCollectionId: [this.stickerCollectionId],
            stickerCollectionAccessHash: [this.stickerCollectionAccessHash],
        };
    }

    manipulateFromJsonObject(jsonObject: any): void {
        this.stickerId = jsonObject.stickerId;
        this.fastPreview = jsonObject.fastPreview;
        this.image512 = jsonObject.image512;
        this.image256 = jsonObject.image256;
        this.stickerCollectionId = jsonObject.stickerCollectionId;
        this.stickerCollectionAccessHash = jsonObject.stickerCollectionAccessHash;
    }

}