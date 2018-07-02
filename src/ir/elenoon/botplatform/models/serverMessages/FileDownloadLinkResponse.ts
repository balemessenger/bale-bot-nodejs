/**
 * Created by elenoon on 7/17/17.
 */
import {Response} from "./Response";

export class FileDownloadLinkResponse extends Response {

    private _url: string;

    constructor(jsonPacket: string) {
        super(jsonPacket);

        let body = JSON.parse(jsonPacket).body;
        this._url = body.url;
    }


    get url(): string {
        return this._url;
    }

}
