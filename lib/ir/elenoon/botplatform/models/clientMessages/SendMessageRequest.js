"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Request_1 = require("./Request");
const ApiConst_1 = require("../../constants/ApiConst");
class SendMessageRequest extends Request_1.Request {
    /**
     * use user to fill json in @getJsonObject method
     * @param message
     */
    constructor(message, receiver, quotedMessage) {
        super(ApiConst_1.ApiConst.Services.Messaging);
        this._message = message;
        this._receiver = receiver;
        this._quotedMessage = quotedMessage;
        //randomId must be long.it means must be less than 18446744073709551615.
        this._randomId = this.generateRandomId();
    }
    generateRandomId() {
        return Math.floor(Math.random() * 1800000).toString() + Math.floor(Math.random() * 4000000).toString() + Math.floor(Math.random() * 55000).toString();
    }
    get receiver() {
        return this._receiver;
    }
    /**
     * The message field of the request.
     * @return {Message}
     */
    get message() {
        return this._message;
    }
    /**
     *
     * @returns {string}  that is randomId field of send message request
     * @private
     */
    get randomId() {
        return this._randomId;
    }
    /**
     * add body field (that having $type , receiver and randomId fields) to requestObj
     * @returns {any} that is final text message request
     */
    getJsonObject() {
        let requestObj = super.getJsonObject();
        requestObj.body = {};
        requestObj.body.$type = "SendMessage";
        requestObj.body.peer = this.receiver.getJsonObject();
        requestObj.body.randomId = this._randomId;
        requestObj.body.message = this._message.getJsonObject();
        if (this._quotedMessage)
            requestObj.body.quotedMessage = this._quotedMessage.getJsonObject();
        return requestObj;
    }
}
exports.SendMessageRequest = SendMessageRequest;
//# sourceMappingURL=SendMessageRequest.js.map