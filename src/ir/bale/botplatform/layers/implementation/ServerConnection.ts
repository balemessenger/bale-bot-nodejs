import {SocketConnection} from "./SocketConnection";
import {Request} from "../../models/clientMessages/Request";
import {ServerPacket} from "../../models/serverMessages/ServerPacket";
import {ResponseModelFactory} from "../../models/factories/ResponseModelFactory";
import {Connection} from "../interfaces/Connection";
import {Response} from "../../models/serverMessages/Response";
import {ReceivedMessage} from "../../models/serverMessages/ReceivedMessage";
import Timer = NodeJS.Timer;
import {PromisePack} from "../../utils/PromisePack";
import {SDKConst} from "../../constants/SDKConst";
import {MessageStatusFactory} from "../../models/factories/MessageStatusFactory";
import {MessageStatus} from "../../models/serverMessages/MessageStatus";
import {Logger} from "../../utils/Logger";
import {stat} from "fs";
import {GetDifferenceResponse} from "../../models/serverMessages/GetDifferenceResponse";
import {GetDifferenceRequest} from "../../models/clientMessages/GetDifferenceRequest";
import {SequenceUtil} from "../../utils/SequenceUtil";
const Logger_1 = require("../../utils/Logger");
/**
 * Layer 2 implementation.
 *
 */
export class ServerConnection {
    public static get POLLING_INTERVAL(): number {
        return 1000;
    }

    private _socketConnection: Connection;
    private onMessageCB: Function;
    private onMessageStatusCB: Function;
    private onResponseCB: Function;
    private onQuotedCB: Function;
    private _queue: SendQueue;

    /**
     *
     * @param botToken The token of the bot.
     * @param options
     */
    public constructor(botToken: string, options?: any) {
        let socketDataHandler = (packet: string) => {
            if (ServerPacket.isResponse(packet)) {
                let response = <Response>ResponseModelFactory.build(packet);
                if (response instanceof GetDifferenceResponse && SDKConst.UPDATECONFIG.UPDATECONFIG == "polling") {
                    let updates = (<GetDifferenceResponse>response).updates;
                    for (let update of updates) {
                        //socketDataHandler(JSON.stringify(update));
                        if(ServerPacket.isReceivedMessage(JSON.stringify(update))) {
                            let receivedMessage = new ReceivedMessage(JSON.stringify(update));
                            this.handleReceivedMessage(receivedMessage);


                        }
                        SequenceUtil.setLastSeqNumber(Number((<ReceivedMessage>update).seq)).then((seq: number) => {
                        });
                    }
                    SequenceUtil.setLastSeqNumber(response.lastSeq).then((seq: number) => {
                    }).catch((err) => {
                        Logger.error("Unable to access seq number file. error: " + err);
                        Logger.grayLog("seqNumber","Unable to access seq number" + err);
                    });
                } else
                    this.onResponseCB(response);
            } else {
                if (ServerPacket.isReceivedMessage(packet) && SDKConst.UPDATECONFIG.UPDATECONFIG == "realTime") {
                    let receivedMessage = new ReceivedMessage(packet);
                    this.handleReceivedMessage(receivedMessage);
                } else {
                    let status = MessageStatusFactory.build(packet);
                    if (status)
                        this.onMessageStatusCB(status);
                }
            }
        };

        this._socketConnection = new SocketConnection(botToken, socketDataHandler, options);

        this._queue = new SendQueue(this._socketConnection);

        this.checkOptions(options);
        if(SDKConst.UPDATECONFIG.UPDATECONFIG == "polling")
            this.startPollingService();
    }

    private handleReceivedMessage(receivedMessage: ReceivedMessage) {
        if (receivedMessage.quotedMessage) {
            if (this.onQuotedCB)
                this.onQuotedCB(receivedMessage);
            else
                this.onMessageCB(receivedMessage);
        } else
            this.onMessageCB(receivedMessage);
    }

    private startPollingService() {
        let poller = () => {
            SequenceUtil.getLastSeqNumber().then((seq: number) => {
                this.send(new GetDifferenceRequest(seq)).then(() => {
                    setTimeout(poller, ServerConnection.POLLING_INTERVAL);
                }).catch((err)=>{
                    setTimeout(poller, ServerConnection.POLLING_INTERVAL);
                })

            }).catch((err: any) => {
                Logger.error("Unable to access seq number file. error: " + err);
                Logger.grayLog("seqNumber","Unable to access seq number" + err)
            });
        };

        setTimeout(poller, ServerConnection.POLLING_INTERVAL);
    }

    private checkOptions(options: any) {
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
    public send(request: Request, timeout?: number): Promise<any> {
        let promise = this._queue.push(request, timeout);
        this._queue.start();
        return promise;
    }

    /**
     *
     * @param callback A callback that gets called when a message is received from the end-user. The callback should be like this: function(message: ReceivedMessage).
     */
    public setOnMessage(callback: Function): void {
        this.onMessageCB = callback;
    }

    public setOnMessageStatus(callback: (status: MessageStatus) => void): void {
        this.onMessageStatusCB = callback;
    }

    /**
     *
     * @param callback A callback that gets called when a response is received from the server. The callback should be like this: function(response: ResponsePacket)
     */
    public setOnResponse(callback: Function): void {
        this.onResponseCB = callback;
    }

    public setOnQuoted(callBack: Function): void {
        this.onQuotedCB = callBack;
    }
}

export class SendQueue {

    private items: PromisePack[];
    private connection: Connection;
    private isStarted: boolean = false;
    private nextTryTimer: Timer = null;

    public queueFetchInterval: number = 0;
    public requestRetryInterval: number = 0;
    public requestMaxRetryTime: number = 30000;

    public constructor(connection: Connection, maxRetryTime?: number, queueFetchInterval?: number, retryInterval?: number) {
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
    public start(): void {
        if (this.isStarted)
        // SendQueue is already started.
            return;

        this.isStarted = true;

        let This: SendQueue = this;

        let runner = function () {
            if (This.items.length > 0) {
                let item = This.items.shift();
                (<any>item).firstTryTime = new Date().getTime();
                trySendRequest(item);
            } else
                This.isStarted = false;
        };

        let trySendRequest = function (item: PromisePack) {
            This.connection.send(item.identifier.toJson(), item.timeout).then(() => {
                setTimeout(runner, This.queueFetchInterval);
                item.resolve(null);
            }).catch((err) => {
                let currentTime = new Date().getTime();
                if (currentTime - (<any>item).firstTryTime < item.timeout) {
                    setTimeout(trySendRequest, This.requestRetryInterval, item);
                } else {
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
    public stop(): void {
        if (this.nextTryTimer != null)
            clearTimeout(this.nextTryTimer);

        this.isStarted = false;
    }

    /**
     * Pushes the given request to the send queue.
     * @param request
     * @param {number} timeout (Optional)
     */
    public push(request: Request, timeout: number = this.requestMaxRetryTime): Promise<any> {
        let This = this;
        let promise =  new Promise((resolve, reject) => {
            This.items.push(new PromisePack(request, resolve, reject, timeout));
        });

        promise.catch(() => {
            // Dummy catch callback to avoid unhandled promise rejection exception. God damn it!
        });

        return promise;
    }
}