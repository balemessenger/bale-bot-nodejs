"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SocketConnection_1 = require("./SocketConnection");
const ServerPacket_1 = require("../../models/serverMessages/ServerPacket");
const ResponseModelFactory_1 = require("../../models/factories/ResponseModelFactory");
const ReceivedMessage_1 = require("../../models/serverMessages/ReceivedMessage");
const PromisePack_1 = require("../../utils/PromisePack");
const SDKConst_1 = require("../../constants/SDKConst");
const MessageStatusFactory_1 = require("../../models/factories/MessageStatusFactory");
const Logger_2 = require("../../utils/Logger");
const GetDifferenceResponse_1 = require("../../models/serverMessages/GetDifferenceResponse");
const GetDifferenceRequest_1 = require("../../models/clientMessages/GetDifferenceRequest");
const SequenceUtil_1 = require("../../utils/SequenceUtil");
const Logger_1 = require("../../utils/Logger");
/**
 * Layer 2 implementation.
 *
 */
class ServerConnection {
    static get POLLING_INTERVAL() {
        return 1000;
    }
    /**
     *
     * @param botToken The token of the bot.
     * @param options
     */
    constructor(botToken, options) {
        let socketDataHandler = (packet) => {
            if (ServerPacket_1.ServerPacket.isResponse(packet)) {
                let response = ResponseModelFactory_1.ResponseModelFactory.build(packet);
                if (response instanceof GetDifferenceResponse_1.GetDifferenceResponse && SDKConst_1.SDKConst.UPDATECONFIG.UPDATECONFIG == "polling") {
                    let updates = response.updates;
                    for (let update of updates) {
                        //socketDataHandler(JSON.stringify(update));
                        if (ServerPacket_1.ServerPacket.isReceivedMessage(JSON.stringify(update))) {
                            let receivedMessage = new ReceivedMessage_1.ReceivedMessage(JSON.stringify(update));
                            this.handleReceivedMessage(receivedMessage);
                        }
                        SequenceUtil_1.SequenceUtil.setLastSeqNumber(Number(update.seq)).then((seq) => {
                        });
                    }
                    SequenceUtil_1.SequenceUtil.setLastSeqNumber(response.lastSeq).then((seq) => {
                    }).catch((err) => {
                        Logger_2.Logger.error("Unable to access seq number file. error: " + err);
                        Logger_2.Logger.grayLog("seqNumber", "Unable to access seq number" + err);
                    });
                }
                else
                    this.onResponseCB(response);
            }
            else {
                if (ServerPacket_1.ServerPacket.isReceivedMessage(packet) && SDKConst_1.SDKConst.UPDATECONFIG.UPDATECONFIG == "realTime") {
                    let receivedMessage = new ReceivedMessage_1.ReceivedMessage(packet);
                    this.handleReceivedMessage(receivedMessage);
                }
                else {
                    let status = MessageStatusFactory_1.MessageStatusFactory.build(packet);
                    if (status)
                        this.onMessageStatusCB(status);
                }
            }
        };
        this._socketConnection = new SocketConnection_1.SocketConnection(botToken, socketDataHandler, options);
        this._queue = new SendQueue(this._socketConnection);
        this.checkOptions(options);
        if (SDKConst_1.SDKConst.UPDATECONFIG.UPDATECONFIG == "polling")
            this.startPollingService();
    }
    handleReceivedMessage(receivedMessage) {
        if (receivedMessage.quotedMessage) {
            if (this.onQuotedCB)
                this.onQuotedCB(receivedMessage);
            else
                this.onMessageCB(receivedMessage);
        }
        else
            this.onMessageCB(receivedMessage);
    }
    startPollingService() {
        let poller = () => {
            SequenceUtil_1.SequenceUtil.getLastSeqNumber().then((seq) => {
                this.send(new GetDifferenceRequest_1.GetDifferenceRequest(seq)).then(() => {
                    setTimeout(poller, ServerConnection.POLLING_INTERVAL);
                }).catch((err) => {
                    setTimeout(poller, ServerConnection.POLLING_INTERVAL);
                });
            }).catch((err) => {
                Logger_2.Logger.error("Unable to access seq number file. error: " + err);
                Logger_2.Logger.grayLog("seqNumber", "Unable to access seq number" + err);
            });
        };
        setTimeout(poller, ServerConnection.POLLING_INTERVAL);
    }
    checkOptions(options) {
        if (options) {
            if (options.requestQueue) {
                if (typeof options.requestQueue.fetchInterval !== "undefined")
                    this._queue.queueFetchInterval = options.requestQueue.fetchInterval;
                if (typeof options.requestQueue.retryInterval !== "undefined")
                    this._queue.requestRetryInterval = options.requestQueue.retryInterval;
                if (typeof options.requestQueue.timeout !== "undefined")
                    this._queue.requestMaxRetryTime = options.requestQueue.timeout;
            }
        }
    }
    /**
     * Sends a request to the server as an object.
     * @param request The request object to send to the server.
     * @param timeout (Optional)
     * @return {Promise<any>}
     */
    send(request, timeout) {
        let promise = this._queue.push(request, timeout);
        this._queue.start();
        return promise;
    }
    /**
     *
     * @param callback A callback that gets called when a message is received from the end-user. The callback should be like this: function(message: ReceivedMessage).
     */
    setOnMessage(callback) {
        this.onMessageCB = callback;
    }
    setOnMessageStatus(callback) {
        this.onMessageStatusCB = callback;
    }
    /**
     *
     * @param callback A callback that gets called when a response is received from the server. The callback should be like this: function(response: ResponsePacket)
     */
    setOnResponse(callback) {
        this.onResponseCB = callback;
    }
    setOnQuoted(callBack) {
        this.onQuotedCB = callBack;
    }
}
exports.ServerConnection = ServerConnection;
class SendQueue {
    constructor(connection, maxRetryTime, queueFetchInterval, retryInterval) {
        this.isStarted = false;
        this.nextTryTimer = null;
        this.queueFetchInterval = 0;
        this.requestRetryInterval = 0;
        this.requestMaxRetryTime = 30000;
        this.items = [];
        this.connection = connection;
        if (queueFetchInterval)
            this.queueFetchInterval = queueFetchInterval;
        if (retryInterval)
            this.requestRetryInterval = retryInterval;
        if (maxRetryTime)
            this.requestMaxRetryTime = maxRetryTime;
    }
    /**
     * Starts checking the queued request and send if connection is ok.
     * @throws Exception on trying to start an already started queue.
     */
    start() {
        if (this.isStarted)
            // SendQueue is already started.
            return;
        this.isStarted = true;
        let This = this;
        let runner = function () {
            if (This.items.length > 0) {
                let item = This.items.shift();
                item.firstTryTime = new Date().getTime();
                trySendRequest(item);
            }
            else
                This.isStarted = false;
        };
        let trySendRequest = function (item) {
            This.connection.send(item.identifier.toJson(), item.timeout).then(() => {
                setTimeout(runner, This.queueFetchInterval);
                item.resolve(null);
            }).catch((err) => {
                let currentTime = new Date().getTime();
                if (currentTime - item.firstTryTime < item.timeout) {
                    setTimeout(trySendRequest, This.requestRetryInterval, item);
                }
                else {
                    setTimeout(runner, This.queueFetchInterval);
                    item.reject(err);
                }
            });
            // if (!This.connection.send(item.identifier.toJson())) {
            //     let currentTime = new Date().getTime();
            //     if (currentTime - (<any>item).firstTryTime < This.requestMaxRetryTime) {
            //         setTimeout(trySendRequest, This.requestRetryInterval, item);
            //     } else {
            //         setTimeout(runner, This.queueFetchInterval);
            //         item.reject(SDKConst.ERRORS.TIMED_OUT);
            //     }
            // } else {
            //     setTimeout(runner, This.queueFetchInterval);
            //     item.resolve(null);
            // }
        };
        setImmediate(runner); // this timeout is set to start the runner
    }
    /**
     * Stops the queue checking process. Does nothing if the process is already stopped.
     */
    stop() {
        if (this.nextTryTimer != null)
            clearTimeout(this.nextTryTimer);
        this.isStarted = false;
    }
    /**
     * Pushes the given request to the send queue.
     * @param request
     * @param {number} timeout (Optional)
     */
    push(request, timeout = this.requestMaxRetryTime) {
        let This = this;
        let promise = new Promise((resolve, reject) => {
            This.items.push(new PromisePack_1.PromisePack(request, resolve, reject, timeout));
        });
        promise.catch(() => {
            // Dummy catch callback to avoid unhandled promise rejection exception. God damn it!
        });
        return promise;
    }
}
exports.SendQueue = SendQueue;
//# sourceMappingURL=ServerConnection.js.map