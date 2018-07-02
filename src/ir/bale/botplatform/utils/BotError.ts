/**
 * wrapper class for socket Error
 */
export class BotError {

    static ERROR_NET_DISCONNECT: string = "EAI_AGAIN";
    static ERROR_SEND_BAD_MESSAGE: string = "internal error";
    static ERROR_BAD_TOKEN: string = "unexpected server response (500)";
    static ERROR_SERVICE_UNAVAILABLE: string = "unexpected server response (503)";
    static ERROR_BAD_BASE_URL: string = "ENOTFOUND";
    static ERROR_SELF_SIGNED: string = "self signed certificate";
    static ERROR_SOCKET_HANG_UP: string = "socket hang up";

    /**
     * represent type of Error can have value of :
     * ERROR_NET_DISCONNECT,
     * ERROR_SEND_BAD_MESSAGE,
     * ERROR_BAD_TOKEN,
     * ERROR_BAD_BASE_URL
     */
    private _type: string;
    private _description: string;

    /**
     * detect type of BotError from err.message
     * @param err an Error object that have a message field
     */
    constructor(err: Error) {
        this.handleError(err);
    }

    public handleError(err: Error): void {
        let message: string = err.message;
        if (message.includes(BotError.ERROR_NET_DISCONNECT)) {
            this._type = BotError.ERROR_NET_DISCONNECT;
            this._description = "Enternet not found!";
        } else if (message.includes(BotError.ERROR_SEND_BAD_MESSAGE)) {
            this._type = BotError.ERROR_SEND_BAD_MESSAGE;
            this._description = "You sent a bad structed message!";
        } else if (message.includes(BotError.ERROR_BAD_TOKEN)) {
            this._type = BotError.ERROR_BAD_TOKEN;
            this._description = "Server cannot process the request for an unknown reason\nMaybe Your BotToken is incorrect!";
        } else if (message.includes(BotError.ERROR_BAD_BASE_URL)) {
            this._type = BotError.ERROR_BAD_BASE_URL;
            this._description = "ERROR BAD BASE URL";
        } else if(message.includes(BotError.ERROR_SELF_SIGNED)) {
            this._type = BotError.ERROR_SELF_SIGNED;
            this._description = "ERROR SELF SIGNED";
        } else if(message.includes(BotError.ERROR_SERVICE_UNAVAILABLE)) {
            this._type = BotError.ERROR_SERVICE_UNAVAILABLE;
            this._description = " Service Unavailable!!\n The server is currently unable to handle the request due to a temporary overloading or maintenance of the server";
        } else if(message.includes(BotError.ERROR_SOCKET_HANG_UP)) {
            this._type = BotError.ERROR_SOCKET_HANG_UP;
            this._description = " Service Unavailable!!\n The server is currently unable to handle the request due to a temporary overloading or maintenance of the server";
        } else {
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
