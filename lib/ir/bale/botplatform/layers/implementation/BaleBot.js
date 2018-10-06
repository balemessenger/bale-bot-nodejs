"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiConnection_1 = require("./ApiConnection");
const TextMessageSensitive_1 = require("../../utils/sensitive/TextMessageSensitive");
const Message_1 = require("../../models/message/Message");
const TextMessage_1 = require("../../models/message/TextMessage");
const SendMessageRequest_1 = require("../../models/clientMessages/SendMessageRequest");
const Logger_1 = require("../../utils/Logger");
const FileDownloadLinkRequest_1 = require("../../models/clientMessages/FileDownloadLinkRequest");
const FileUploadLinkRequest_1 = require("../../models/clientMessages/FileUploadLinkRequest");
const CreateGroupRequest_1 = require("../../models/clientMessages/CreateGroupRequest");
const request = require('request');
const crc = require('crc-32');
const https = require('https');
const http = require('http');
const url = require('url');
/**
 * Interface for Developer to develop a NasimBot
 */
class BaleBot {
    /**
     *
     * @param botToken The token of the bot.
     * @param {Optional} options The custom bot options.
     */
    constructor(botToken, options) {
        this.defaultTimeout = 5000;
        this._botToken = botToken;
        this.checkOptions(options);
        this._apiConnection = new ApiConnection_1.ApiConnection(botToken, options);
        this._hearsPacks = [];
        this._conversations = [];
        this.setOnMessage();
    }
    checkOptions(options) {
        if (options) {
            if (options.log) {
                if (typeof options.log.level !== "undefined")
                    Logger_1.Logger.setLevel(options.log.level);
                if (typeof options.log.enabled !== "undefined")
                    Logger_1.Logger.logEnabled = options.log.enabled;
            }
            if (options.userId) {
                this._userId = options.userId;
            }
            if (options.requestQueue) {
                if (typeof options.requestQueue.timeout !== "undefined")
                    this.defaultTimeout = options.requestQueue.timeout;
            }
            if (options.name) {
                Logger_1.Logger.setName(options.name);
            }
        }
    }
    /**
     * Hears for a list of keywords or a {@link Sensitive Sensitive}
     * @param keywords
     * @param callback
     */
    hears(keywords, callback) {
        let sensitive = Array.isArray(keywords) ? new TextMessageSensitive_1.TextMessageSensitive(keywords) : keywords;
        this._hearsPacks.push(new HearsPack(sensitive, callback, this));
    }
    setOnQuoted(callBack) {
        this._apiConnection.setOnQuoted(callBack);
    }
    setConversation(conversation) {
        this._conversations.push(conversation);
    }
    DownloadFile(fileId, fileAccessHash, fileType, file_name) {
        let This = this;
        return new Promise(function (resolve, reject) {
            This.sendRequest(new FileDownloadLinkRequest_1.FileDownloadLinkRequest(fileId, fileAccessHash, fileType)).then((response) => {
                console.log(response.url);
                if (response.url) {
                    var client = http;
                    if ((response.url).toString().indexOf("https") === 0) {
                        client = https;
                    }
                    var imgUrl = response.body.url + "?filename=" + file_name;
                    var options = url.parse(imgUrl);
                    options.rejectUnauthorized = false;
                    client.get(options, function (response) {
                        var chunks = [];
                        response.on('data', function (chunk) {
                            chunks.push(chunk);
                        }).on('end', function () {
                            var buffer = Buffer.concat(chunks);
                            resolve(buffer);
                        });
                    });
                }
                else {
                    reject(response);
                }
            }).catch((err) => {
                reject(err);
            });
        });
    }
    UploadFile(fileBuffer, fileType) {
        let This = this;
        return new Promise(function (resolve, reject) {
            var crc32 = crc.buf(fileBuffer);
            var userId = "";
            This.sendRequest(new FileUploadLinkRequest_1.FileUploadLinkRequest(fileBuffer.byteLength, crc32.toString(), fileType)).then((response) => {
                console.log(response);
                if (response.url) {
                    var fileId = response.fileId;
                    userId = response.userId;
                    var options = {
                        url: response.url,
                        headers: {
                            'filesize': fileBuffer.byteLength
                        },
                        body: fileBuffer
                    };
                    request.put(options, callback);
                    function callback(error, response, body) {
                        console.log(response.headers);
                        if (!error && response.statusCode == 200) {
                            let response = {
                                fileId: fileId,
                                accessHash: userId.toString(),
                                version: 1
                            };
                            resolve(response);
                        }
                        else {
                            console.log(body);
                            reject(body);
                        }
                    }
                }
                else {
                    reject(response);
                }
            });
        });
    }
    /**
     * Sets a default callback to get called when no subscribed conversation or hears, matches with a message.
     * @param callback A default callback to handle messages.
     */
    setDefaultCallback(callback) {
        this._defaultCallback = callback;
    }
    /**
     * received message that user send for bot and check equal with which commands and call appropriate command callback
     */
    setOnMessage() {
        this._apiConnection.setOnMessage((message, sender, receivedMessage) => {
            //Priority order of passing message:
            //
            //First priority: active conversations.
            //Second: start a new conversation
            //Third: check for hears
            //Search for active conversations if any.
            let activeConv = null;
            for (let conv of this._conversations) {
                if (conv.isActive(sender)) {
                    activeConv = conv;
                    break;
                }
            }
            if (activeConv != null) {
                //An active bot is already unfinished. So pass the message to it to handle.
                activeConv.handleMessage(this, message, sender, receivedMessage);
            }
            else {
                //No active conversation. => Priority 2:
                let anyConvStarted = false;
                for (let conv of this._conversations) {
                    if (conv.canStart(message, sender)) {
                        conv.handleMessage(this, message, sender, receivedMessage);
                        anyConvStarted = true;
                        break;
                    }
                }
                if (!anyConvStarted) {
                    //No conversation matched the message. => Priority 3.
                    let anyHearsMatched = false;
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
    send(message, receiver, timeout) {
        return this.sendRequest(new SendMessageRequest_1.SendMessageRequest(message, receiver), timeout);
    }
    /**
     * Sends a request to the server.
     * @param request
     * @param timeout (Optional)
     */
    sendRequest(request, timeout = this.defaultTimeout) {
        return this._apiConnection.send(request, timeout);
    }
    /**
     * return botToken
     * @return {string}
     */
    get botToken() {
        return this._botToken;
    }
    createGroup(createGroup) {
        return this.sendRequest(new CreateGroupRequest_1.CreateGroupRequest(createGroup));
    }
}
exports.BaleBot = BaleBot;
/**
 * implement replying to user
 */
class Responder {
    /**
     *
     * @param bot
     * @param peer
     */
    constructor(bot, peer) {
        this.bot = bot;
        this._peer = peer;
    }
    /**
     * send message to peerUser
     * @param message
     */
    reply(message) {
        let msg;
        if (message instanceof Message_1.Message)
            msg = message;
        else
            msg = new TextMessage_1.TextMessage(message);
        return this.bot.send(msg, this._peer);
    }
    get peer() {
        return this._peer;
    }
}
exports.Responder = Responder;
/**
 * Created by emran on 9/15/16
 */
class HearsPack {
    constructor(sensitive, callback, bot) {
        this._sensitive = sensitive;
        this._callback = callback;
        this.bot = bot;
    }
    get sensitive() {
        return this._sensitive;
    }
    get callback() {
        return this._callback;
    }
    /**
     * Calls the proper callback if the corresponding sensitive matches.
     * @param message The message to check if matches.
     * @return {boolean} True if the callback called; false otherwise.
     */
    callIfMatches(message, sender, receivedMessage) {
        let result = this.sensitive.match(message);
        if (result)
            this.callback.call(this, message, new Responder(this.bot, sender), receivedMessage);
        return result;
    }
}
exports.HearsPack = HearsPack;
//# sourceMappingURL=BaleBot.js.map