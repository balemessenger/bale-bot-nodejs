import {ApiConnection} from "./ApiConnection";
import {User} from "../../models/User";
import {TextMessageSensitive} from "../../utils/sensitive/TextMessageSensitive";
import {Message} from "../../models/message/Message";
import {TextMessage} from "../../models/message/TextMessage";
import {Conversation} from "../../utils/Conversation";
import {Sensitive} from "../../utils/sensitive/Sensitive";
import {SendMessageRequest} from "../../models/clientMessages/SendMessageRequest";
import {Request} from "../../models/clientMessages/Request";
import {Response} from "../../models/serverMessages/Response";
import {Peer} from "../../models/Peer";
import {ReceivedMessage} from "../../models/serverMessages/ReceivedMessage";
import {MessageReadStatus} from "../../models/serverMessages/MessageReadStatus";
import {MessageReceivedStatus} from "../../models/serverMessages/MessageReceivedStatus";
import {BalePromises} from "../../utils/BalePromises";
import {Logger} from "../../utils/Logger";
import {ApiConst} from "../../constants/ApiConst";
import {ReceiptMessage} from "../../models/message/ReceiptMessage";


import {FileDownloadLinkRequest} from "../../models/clientMessages/FileDownloadLinkRequest"
import {FileUploadLinkRequest} from "../../models/clientMessages/FileUploadLinkRequest"
const request: any = require('request');
const crc: any = require('crc-32');
const https = require('https');
const http = require('http');
const url = require('url');
/**
 * Interface for Developer to develop a NasimBot
 */
export class BaleBot {

    private _botToken: string;
    private _hearsPacks: HearsPack[];
    private _apiConnection: ApiConnection;
    private _conversations: Conversation[];
    private _userId:number;
    private _defaultCallback: (message: Message, responder: Responder, receivedMessage: ReceivedMessage) => void;
    private defaultTimeout: number = 5000;

    /**
     *
     * @param botToken The token of the bot.
     * @param {Optional} options The custom bot options.
     */
    constructor(botToken: string, options?: any) {
        this._botToken = botToken;
        this.checkOptions(options);
        this._apiConnection = new ApiConnection(botToken, options);
        this._hearsPacks = [];
        this._conversations = [];
        this.setOnMessage();


    }

    private checkOptions(options: any) {
        if (options) {
            if (options.log) {
                if (typeof options.log.level !== "undefined")
                    Logger.setLevel(options.log.level);
                if (typeof options.log.enabled !== "undefined")
                    Logger.logEnabled = options.log.enabled;
            }
            if(options.userId){
                this._userId = options.userId;
            }
            if (options.requestQueue) {
                if (typeof options.requestQueue.timeout !== "undefined")
                    this.defaultTimeout = options.requestQueue.timeout;
            }
            if(options.name){
                Logger.setName(options.name)
            }
        }

    }

    /**
     * Hears for a list of keywords or a {@link Sensitive Sensitive}
     * @param keywords
     * @param callback
     */
    public hears(keywords: string[] | RegExp[] | Sensitive, callback: (message: Message, responder: Responder, receivedMessage: ReceivedMessage) => void): void {
        let sensitive: Sensitive = Array.isArray(keywords) ? new TextMessageSensitive(<string[]>keywords) : keywords;

        this._hearsPacks.push(new HearsPack(sensitive, callback, this));
    }

    public setOnQuoted(callBack: Function): void {
        this._apiConnection.setOnQuoted(callBack);
    }

    public setConversation(conversation: Conversation): void {
        this._conversations.push(conversation);
    }
    public DownloadFile(fileId:string,fileAccessHash:string,fileType:string,file_name:String){
        let This = this;
        return new Promise(function (resolve, reject) {
            This.sendRequest(new FileDownloadLinkRequest(fileId, fileAccessHash,fileType)).then((response:any) => {
                console.log(response.url);
                if (response.url) {
                    var client = http;
                    if ((response.url).toString().indexOf("https") === 0) {
                        client = https;
                    }
                    var imgUrl = response.body.url + "?filename=" + file_name;
                    var options = url.parse(imgUrl);
                    options.rejectUnauthorized = false
                    client.get(options, function (response:any) {
                        var chunks:any = [];
                        response.on('data', function (chunk:any) {
                            chunks.push(chunk);
                        }).on('end', function () {
                            var buffer = Buffer.concat(chunks);
                            resolve(buffer)
                        });
                    });

            }else{
                    reject(response)
                }}).catch((err:any) => {
                reject(err)
            })
        });


    }
    public UploadFile(fileBuffer:any,fileType:string){
        let This = this;

        return new Promise(function (resolve, reject) {
            var crc32 = crc.buf(fileBuffer)
            var userId = ""
            This.sendRequest(new FileUploadLinkRequest(fileBuffer.byteLength,crc32.toString(),fileType)).then((response:any) => {
                console.log(response)
                if (response.url){
                    var fileId = response.fileId;
                    userId= response.userId

                var options = {
                    url: response.url,
                    headers: {
                        'filesize': fileBuffer.byteLength
                    },
                    body: fileBuffer
                };
                request.put(options, callback);
                function callback(error: any, response: any, body: any) {
                    console.log(response.headers);
                    if (!error && response.statusCode == 200) {
                        let response = {
                            fileId: fileId,
                            accessHash: userId.toString(),
                            version: 1
                        }
                        resolve(response)
                    } else {
                        console.log(body)
                        reject(body)

                    }
                }
            }else{
                    reject(response)
                }
            });
        });
    }

    /**
     * Sets a default callback to get called when no subscribed conversation or hears, matches with a message.
     * @param callback A default callback to handle messages.
     */
    public setDefaultCallback(callback: (message: Message, responder: Responder, receivedMessage: ReceivedMessage) => void): void {
        this._defaultCallback = callback;
    }

    /**
     * received message that user send for bot and check equal with which commands and call appropriate command callback
     */
    private setOnMessage(): void {
        this._apiConnection.setOnMessage((message: Message, sender: User, receivedMessage: ReceivedMessage) => {

            //Priority order of passing message:
            //
            //First priority: active conversations.
            //Second: start a new conversation
            //Third: check for hears

            //Search for active conversations if any.
            let activeConv: Conversation = null;
            for (let conv of this._conversations) {
                if (conv.isActive(sender)) {
                    activeConv = conv;
                    break;
                }
            }

            if (activeConv != null) {
                //An active bot is already unfinished. So pass the message to it to handle.
                activeConv.handleMessage(this, message, sender, receivedMessage);
            } else {
                //No active conversation. => Priority 2:
                let anyConvStarted: boolean = false;
                for (let conv of this._conversations) {
                    if (conv.canStart(message, sender)) {
                        conv.handleMessage(this, message, sender, receivedMessage);
                        anyConvStarted = true;
                        break;
                    }
                }

                if (!anyConvStarted) {
                    //No conversation matched the message. => Priority 3.
                    let anyHearsMatched: boolean = false;
                    for (let sensitivePack of this._hearsPacks) {
                        if (sensitivePack.callIfMatches(message, sender, receivedMessage)) {
                            anyHearsMatched = true;
                            break;
                        }
                    }

                    if (!anyHearsMatched) {
                        if (this._defaultCallback != null) {
                            //Default action
                            this._defaultCallback(message, new Responder(this, sender), receivedMessage);
                        }
                    }
                }
            }
        });
    }

    /**
     * Sends a message to the given user.
     * @param message send message with apiConnection.send
     * @param receiver
     * @param timeout (Optional)
     * @return
     */
    public send(message: Message, receiver: Peer, timeout?: number): BalePromises {
        return this.sendRequest(new SendMessageRequest(message, receiver), timeout);
    }




    /**
     * Sends a request to the server.
     * @param request
     * @param timeout (Optional)
     */
    public sendRequest(request: Request, timeout: number = this.defaultTimeout): BalePromises {
        return this._apiConnection.send(request, timeout);
    }

    /**
     * return botToken
     * @return {string}
     */
    get botToken(): string {
        return this._botToken;
    }
}

/**
 * implement replying to user
 */
export class Responder {

    private _peer: Peer;
    private bot: BaleBot;

    /**
     *
     * @param bot
     * @param peer
     */
    constructor(bot: BaleBot, peer: Peer) {
        this.bot = bot;
        this._peer = peer;
    }

    public reply(message: string): BalePromises;
    public reply(message: Message): BalePromises;

    /**
     * send message to peerUser
     * @param message
     */
    public reply(message: string | Message): BalePromises {

        let msg: Message;

        if (message instanceof Message)
            msg = message;
        else
            msg = new TextMessage(message);
        return this.bot.send(msg, this._peer);
    }

    get peer(): User {
        return this._peer;
    }
}

/**
 * Created by emran on 9/15/16
 */
export class HearsPack {

    private _sensitive: Sensitive;
    private _callback: (message: Message, responder: Responder, receivedMessage: ReceivedMessage) => void;
    private bot: BaleBot;

    public constructor(sensitive: Sensitive, callback: (message: Message, responder: Responder, receivedMessage: ReceivedMessage) => void, bot: BaleBot) {
        this._sensitive = sensitive;
        this._callback = callback;
        this.bot = bot;
    }

    get sensitive(): Sensitive {
        return this._sensitive;
    }

    get callback(): Function {
        return this._callback;
    }

    /**
     * Calls the proper callback if the corresponding sensitive matches.
     * @param message The message to check if matches.
     * @return {boolean} True if the callback called; false otherwise.
     */
    public callIfMatches(message: Message, sender: User, receivedMessage: ReceivedMessage): boolean {
        let result: boolean = this.sensitive.match(message);

        if (result)
            this.callback.call(this, message, new Responder(this.bot, sender), receivedMessage);

        return result;
    }


}
