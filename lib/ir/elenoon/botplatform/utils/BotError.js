"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * wrapper class for socket Error
 */
class BotError {
    /**
     * detect type of BotError from err.message
     * @param err an Error object that have a message field
     */
    constructor(err) {
        this.handleError(err);
    }
    handleError(err) {
        let message = err.message;
        if (message.includes(BotError.ERROR_NET_DISCONNECT)) {
            this._type = BotError.ERROR_NET_DISCONNECT;
            this._description = "Enternet not found!";
        }
        else if (message.includes(BotError.ERROR_SEND_BAD_MESSAGE)) {
            this._type = BotError.ERROR_SEND_BAD_MESSAGE;
            this._description = "You sent a bad structed message!";
        }
        else if (message.includes(BotError.ERROR_BAD_TOKEN)) {
            this._type = BotError.ERROR_BAD_TOKEN;
            this._description = "Server cannot process the request for an unknown reason\nMaybe Your BotToken is incorrect!";
        }
        else if (message.includes(BotError.ERROR_BAD_BASE_URL)) {
            this._type = BotError.ERROR_BAD_BASE_URL;
            this._description = "ERROR BAD BASE URL";
        }
        else if (message.includes(BotError.ERROR_SELF_SIGNED)) {
            this._type = BotError.ERROR_SELF_SIGNED;
            this._description = "ERROR SELF SIGNED";
        }
        else if (message.includes(BotError.ERROR_SERVICE_UNAVAILABLE)) {
            this._type = BotError.ERROR_SERVICE_UNAVAILABLE;
            this._description = " Service Unavailable!!\n The server is currently unable to handle the request due to a temporary overloading or maintenance of the server";
        }
        else if (message.includes(BotError.ERROR_SOCKET_HANG_UP)) {
            this._type = BotError.ERROR_SOCKET_HANG_UP;
            this._description = " Service Unavailable!!\n The server is currently unable to handle the request due to a temporary overloading or maintenance of the server";
        }
        else {
            this._description = err.toString();
        }
    }
    get type() {
        return this._type;
    }
    get description() {
        return this._description;
    }
}
BotError.ERROR_NET_DISCONNECT = "EAI_AGAIN";
BotError.ERROR_SEND_BAD_MESSAGE = "internal error";
BotError.ERROR_BAD_TOKEN = "unexpected server response (500)";
BotError.ERROR_SERVICE_UNAVAILABLE = "unexpected server response (503)";
BotError.ERROR_BAD_BASE_URL = "ENOTFOUND";
BotError.ERROR_SELF_SIGNED = "self signed certificate";
BotError.ERROR_SOCKET_HANG_UP = "socket hang up";
exports.BotError = BotError;
//# sourceMappingURL=BotError.js.map