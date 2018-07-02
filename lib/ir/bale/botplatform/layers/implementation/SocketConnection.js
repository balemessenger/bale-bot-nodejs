"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiConst_1 = require("../../constants/ApiConst");
const Logger_1 = require("../../utils/Logger");
const ReconnectingWebSocket_1 = require("./ReconnectingWebSocket");
class SocketConnection {
    /**
     * construct class with botToken
     * @param botToken
     * @param callback
     * @param options
     */
    constructor(botToken, callback, options) {
        this._isOnline = false;
        this.botToken = botToken;
        this.onReceiveCallBack = callback;
        this.connect(options);
    }
    /**
     * connect to server and set callback for handling Errors
     * @returns {Promise<any>}
     * */
    connect(options) {
        this._reconnectingWebSocket = new ReconnectingWebSocket_1.ReconnectingWebSocket(ApiConst_1.ApiConst.BASE_API_URL + this.botToken, []);
        if (options) {
            if (options.socket && typeof options.socket.reconnectInterval !== "undefined")
                this._reconnectingWebSocket.reconnectInterval = options.socket.reconnectInterval;
        }
        else
            this._reconnectingWebSocket.reconnectInterval = 2500;
        this._reconnectingWebSocket.onopen = (e) => {
            this._reconnectingWebSocket.reconnectInterval = 2500;
            Logger_1.Logger.log('Socket Connected!');
            Logger_1.Logger.grayLog("socket", "ok");
        };
        this._reconnectingWebSocket.onmessage = (data) => {
            Logger_1.Logger.trace('Received on socket: ' + data);
            this.onReceiveCallBack(data);
        };
        this._reconnectingWebSocket.onconnecting = () => {
            if (this._reconnectingWebSocket.reconnectInterval < 30000) {
                this._reconnectingWebSocket.reconnectInterval *= 2;
                this._reconnectingWebSocket.reconnectInterval += this._reconnectingWebSocket.reconnectInterval * Math.random() / 10;
            }
            Logger_1.Logger.log('Connecting...');
            Logger_1.Logger.grayLog("socket", "trying");
        };
        this._reconnectingWebSocket.onerror = (e) => {
            Logger_1.Logger.error('Socket error: ' + e);
            Logger_1.Logger.grayLog("socket", "ERROR " + e);
        };
        this._reconnectingWebSocket.connect();
    }
    /**
     * @inheritDoc
     */
    send(jsonString, timeout) {
        Logger_1.Logger.trace("Sending on socket: " + jsonString);
        if (timeout)
            return new Promise((resolve, reject) => {
                let fulfilled = false;
                this._reconnectingWebSocket.send(jsonString).then(() => {
                    if (fulfilled)
                        return;
                    fulfilled = true;
                    resolve();
                }).catch((err) => {
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
    setOnReceive(callback) {
        this.onReceiveCallBack = callback;
    }
}
exports.SocketConnection = SocketConnection;
//# sourceMappingURL=SocketConnection.js.map