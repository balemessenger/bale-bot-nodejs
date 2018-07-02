import {ApiConst} from "../../constants/ApiConst";
import {Connection} from "../interfaces/Connection";
import {Logger} from "../../utils/Logger";
import {ReconnectingWebSocket} from "./ReconnectingWebSocket";
import ErrnoException = NodeJS.ErrnoException;


export class SocketConnection implements Connection {

    private onReceiveCallBack: (jsonPacket: string) => void;

    /**
     * token of developer bot got from bot father
     */
    private botToken: string;

    private _reconnectingWebSocket: any;//ReconnectingWebSocket

    /**
     * construct class with botToken
     * @param botToken
     * @param callback
     * @param options
     */
    constructor(botToken: string, callback: (jsonPacket: string) => void, options?: any) {
        this.botToken = botToken;
        this.onReceiveCallBack = callback;
        this.connect(options);
    }

    private _isOnline: boolean = false;

    /**
     * connect to server and set callback for handling Errors
     * @returns {Promise<any>}
     * */
    private connect(options: any): void {
        this._reconnectingWebSocket = new ReconnectingWebSocket(ApiConst.BASE_API_URL + this.botToken, []);
        if (options) {
            if (options.socket && typeof options.socket.reconnectInterval !== "undefined")
                this._reconnectingWebSocket.reconnectInterval = options.socket.reconnectInterval;
        } else
            this._reconnectingWebSocket.reconnectInterval = 2500;
        this._reconnectingWebSocket.onopen = (e: any) => {
            this._reconnectingWebSocket.reconnectInterval = 2500;
            Logger.log('Socket Connected!');
            Logger.grayLog("socket","ok")
        };
        this._reconnectingWebSocket.onmessage = (data: string) => {
            Logger.trace('Received on socket: ' + data);
            this.onReceiveCallBack(data);
        };

        this._reconnectingWebSocket.onconnecting = () => {
            if (this._reconnectingWebSocket.reconnectInterval < 30000) {
                this._reconnectingWebSocket.reconnectInterval *= 2;
                this._reconnectingWebSocket.reconnectInterval += this._reconnectingWebSocket.reconnectInterval * Math.random() / 10
            }
            Logger.log('Connecting...');
            Logger.grayLog("socket","trying")
        };

        this._reconnectingWebSocket.onerror = (e: any) => {
            Logger.error('Socket error: ' + e);
            Logger.grayLog("socket","ERROR "+e)

        };

        this._reconnectingWebSocket.connect();
    }

    /**
     * @inheritDoc
     */
    public send(jsonString: string, timeout?: number): Promise<any> {
        Logger.trace("Sending on socket: " + jsonString);
        if (timeout)
            return new Promise((resolve, reject) => {

                let fulfilled = false;

                this._reconnectingWebSocket.send(jsonString).then(() => {
                    if (fulfilled)
                        return;
                    fulfilled = true;
                    resolve();
                }).catch((err: any) => {
                    if (fulfilled)
                        return;
                    fulfilled = true;
                    reject(err);
                });


                setTimeout(() => {
                    if (fulfilled)
                        return;
                    fulfilled = true;
                    this._reconnectingWebSocket.refresh(() => {
                        reject(new Error("TIMEOUT after " + timeout + "ms"));
                    });
                }, timeout);
            });
        else
            return this._reconnectingWebSocket.send(jsonString);
    }

    /**
     * set callback to on message receive from socket
     * @param callback on message recived callback
     * @return {void}
     */
    public setOnReceive(callback: (jsonPacket: string) => void): void {
        this.onReceiveCallBack = callback;
    }
}
