import {Request} from "./Request";
import {User} from "../User";
import {ApiConst} from "../../constants/ApiConst";
import {Message} from "../message/Message";
import {QuotedMessage} from "../message/QuotedMessage";

export class SendMessageRequest extends Request {
    // private _user: User;

    private _message: Message;
    private _randomId: string;
    private _receiver: User;
    private _quotedMessage: QuotedMessage;

    /**
     * use user to fill json in @getJsonObject method
     * @param message
     */
    constructor(message: Message, receiver: User, quotedMessage ?: QuotedMessage) {
        super(ApiConst.Services.Messaging);
        this._message = message;
        this._receiver = receiver;
        this._quotedMessage = quotedMessage;
        //randomId must be long.it means must be less than 18446744073709551615.
        this._randomId = this.generateRandomId();
    }

    private generateRandomId(): string {
        return Math.floor(Math.random() * 1800000).toString() + Math.floor(Math.random() * 4000000).toString() + Math.floor(Math.random() * 55000).toString();
    }

    get receiver(): User {
        return this._receiver;
    }

    /**
     * The message field of the request.
     * @return {Message}
     */
    get message(): Message {
        return this._message;
    }

    /**
     *
     * @returns {string}  that is randomId field of send message request
     * @private
     */
    get randomId(): string {
        return this._randomId;
    }

    /**
     * add body field (that having $type , receiver and randomId fields) to requestObj
     * @returns {any} that is final text message request
     */
    protected getJsonObject(): any {
        let requestObj = super.getJsonObject();
        requestObj.body = {};
        requestObj.body.$type = "SendMessage";
        requestObj.body.peer = this.receiver.getJsonObject();
        requestObj.body.randomId = this._randomId;
        requestObj.body.message = this._message.getJsonObject();
        if(this._quotedMessage)
            requestObj.body.quotedMessage = this._quotedMessage.getJsonObject();
        return requestObj;
    }
}