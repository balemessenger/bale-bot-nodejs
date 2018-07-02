"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServerConnection_1 = require("./ServerConnection");
const BalePromises_1 = require("../../utils/BalePromises");
const PromisePack_1 = require("../../utils/PromisePack");
const SendMessageRequest_1 = require("../../models/clientMessages/SendMessageRequest");
const SendMessageResponse_1 = require("../../models/serverMessages/SendMessageResponse");
const TemplateMessage_1 = require("../../models/message/template/TemplateMessage");
const TemplateResponseMessage_1 = require("../../models/message/template/TemplateResponseMessage");
/**
 * Layer 3 implementation.
 */
class ApiConnection {
    /**
     * @param botToken The token of the bot.
     * @param options
     */
    constructor(botToken, options) {
        this.templateMessages = [];
        this.responsePromises = [];
        this.receivedPromises = [];
        this.readPromises = [];
        this._serverConnection = new ServerConnection_1.ServerConnection(botToken, options);
        this._serverConnection.setOnResponse((response) => {
            //foreach on responseResolves.
            for (let i = 0; i < this.responsePromises.length; i++) {
                let responsePromise = this.responsePromises[i];
                // response.identifier is of type Request.
                if (responsePromise.identifier.id == response.id) {
                    //The gotten response is for this promise pack. so call the corresponding resolve.
                    if (response instanceof SendMessageResponse_1.SendMessageResponse) {
                        this.updateReadAndReceivedIdentifiers(responsePromise.identifier.randomId, response.date);
                        response.rid = responsePromise.identifier.randomId;
                    }
                    responsePromise.resolve(response);
                    //remove item
                    this.responsePromises.splice(i, 1);
                    break;
                }
            }
        });
        this._serverConnection.setOnMessageStatus((status) => {
            if (status.type === 'BotReceivedUpdate') {
                // receivedPromises
                for (let i = 0; i < this.receivedPromises.length; i++) {
                    let receivedPromise = this.receivedPromises[i];
                    // receivedPromise.identifier is the corresponding "date"
                    if (receivedPromise.identifier === status.startDate) {
                        receivedPromise.resolve(status);
                        // remove item
                        this.receivedPromises.splice(i, 1);
                        break;
                    }
                }
            }
            else {
                // readPromises
                for (let i = 0; i < this.readPromises.length; i++) {
                    let readPromise = this.readPromises[i];
                    // receivedPromise.identifier is the corresponding "date"
                    if (readPromise.identifier === status.startDate) {
                        readPromise.resolve(status);
                        // remove item
                        this.readPromises.splice(i, 1);
                        break;
                    }
                }
            }
        });
    }
    /**
     * Sends a request to the server and returns its server response within the returned promise.
     * @param request The request object to send.
     * @param timeout (Optional)
     * @return The promises of "send", "request response"
     * @example
     * send(new SendMessageRequest(...)).then((resp: ResponsePacket)=> {
     *      //use resp
     * });
     */
    send(request, timeout) {
        let sendPromise = this._serverConnection.send(request, timeout);
        let responsePromise = new Promise((resolve, reject) => {
            this.responsePromises.push(new PromisePack_1.PromisePack(request, resolve, reject));
        });
        let receivedPromise = null;
        let readPromise = null;
        if (request instanceof SendMessageRequest_1.SendMessageRequest) {
            let sendMessageRequest = request;
            receivedPromise = new Promise((resolve, reject) => {
                this.receivedPromises.push(new PromisePack_1.PromisePack(sendMessageRequest.randomId, resolve, reject));
            });
            readPromise = new Promise((resolve, reject) => {
                this.readPromises.push(new PromisePack_1.PromisePack(sendMessageRequest.randomId, resolve, reject));
            });
            if (request.message instanceof TemplateMessage_1.TemplateMessage) {
                let message = request.message;
                this.templateMessages[message.templateMessageId] = {
                    templateId: message.templateMessageId,
                    elements: message.template.elements
                };
            }
        }
        let promises = new BalePromises_1.BalePromises(sendPromise, responsePromise, receivedPromise, readPromise);
        return promises;
    }
    /**
     * As in the read and received updates we just have "date" so we need the date as an identifier (instead of unreachable randomId).
     * @param randomId
     * @param date
     */
    updateReadAndReceivedIdentifiers(randomId, date) {
        for (let pack of this.receivedPromises) {
            if (pack.identifier === randomId) {
                pack.identifier = date;
                break;
            }
        }
        for (let pack of this.readPromises) {
            if (pack.identifier === randomId) {
                pack.identifier = date;
                break;
            }
        }
    }
    /**
     * Sets a callback to receive all {@link Message Message}s.
     * @param callback
     */
    setOnMessage(callback) {
        this._serverConnection.setOnMessage((receivedMessage) => {
            if (receivedMessage.message instanceof TemplateResponseMessage_1.TemplateResponseMessage) {
                let tempResMessage = receivedMessage.message;
                let temp = this.templateMessages[tempResMessage.templateId];
                if (temp) {
                    let tempButtonElems = temp.elements;
                    let element = null;
                    for (let i = 0; i < tempButtonElems.length; i++) {
                        if (tempButtonElems[i].value == tempResMessage.text) {
                            element = tempButtonElems[i];
                            break;
                        }
                    }
                    if (element && element.onAction) {
                        element.onAction.call(this, tempResMessage);
                    }
                    else {
                        callback.call(this, receivedMessage.message, receivedMessage.peer, receivedMessage);
                    }
                }
                else {
                    callback.call(this, receivedMessage.message, receivedMessage.peer, receivedMessage);
                }
            }
            else
                callback.call(this, receivedMessage.message, receivedMessage.peer, receivedMessage);
        });
    }
    setOnQuoted(callBack) {
        this._serverConnection.setOnQuoted(callBack);
    }
}
exports.ApiConnection = ApiConnection;
//# sourceMappingURL=ApiConnection.js.map