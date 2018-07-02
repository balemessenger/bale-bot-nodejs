import {ServerConnection} from "./ServerConnection";
import {Request} from "../../models/clientMessages/Request";
import {Message} from "../../models/message/Message";
import {ReceivedMessage} from "../../models/serverMessages/ReceivedMessage";
import {Response} from "../../models/serverMessages/Response";
import {User} from "../../models/User";
import {MessageStatus} from "../../models/serverMessages/MessageStatus";
import {MessageReadStatus} from "../../models/serverMessages/MessageReadStatus";
import {MessageReceivedStatus} from "../../models/serverMessages/MessageReceivedStatus";
import {BalePromises} from "../../utils/BalePromises";
import {PromisePack} from "../../utils/PromisePack";
import {SendMessageRequest} from "../../models/clientMessages/SendMessageRequest";
import {SendMessageResponse} from "../../models/serverMessages/SendMessageResponse";
import {TemplateMessage} from "../../models/message/template/TemplateMessage";
import {TemplateResponseMessage} from "../../models/message/template/TemplateResponseMessage";
import {ButtonElement} from "../../models/message/template/ButtonElement";
/**
 * Layer 3 implementation.
 */
export class ApiConnection {

    private _serverConnection: ServerConnection;

    private templateMessages: any = [];
    private responsePromises: Array<PromisePack> = [];
    private receivedPromises: Array<PromisePack> = [];
    private readPromises: Array<PromisePack> = [];


    /**
     * @param botToken The token of the bot.
     * @param options
     */
    public constructor(botToken: string, options?: any) {

        this._serverConnection = new ServerConnection(botToken, options);

        this._serverConnection.setOnResponse((response: Response) => {
                //foreach on responseResolves.
                for (let i = 0; i < this.responsePromises.length; i++) {
                    let responsePromise = this.responsePromises[i];
                    // response.identifier is of type Request.
                    if (responsePromise.identifier.id == response.id) {
                        //The gotten response is for this promise pack. so call the corresponding resolve.
                        if (response instanceof SendMessageResponse) {
                            this.updateReadAndReceivedIdentifiers(responsePromise.identifier.randomId, response.date);
                            response.rid = responsePromise.identifier.randomId;
                        }
                        responsePromise.resolve(response);

                        //remove item
                        this.responsePromises.splice(i, 1);
                        break;
                    }
                }
            }
        );

        this._serverConnection.setOnMessageStatus((status: MessageStatus) => {
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
            } else {
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
    public send(request: Request, timeout?: number): BalePromises {
        let sendPromise = this._serverConnection.send(request, timeout);
        let responsePromise = new Promise<Response>((resolve, reject) => {
            this.responsePromises.push(new PromisePack(request, resolve, reject));
        });
        let receivedPromise = null;
        let readPromise = null;
        if (request instanceof SendMessageRequest ) {
            let sendMessageRequest = <SendMessageRequest>request;
            receivedPromise = new Promise<MessageReceivedStatus>((resolve, reject) => {
                this.receivedPromises.push(new PromisePack(sendMessageRequest.randomId, resolve, reject));
            });
            readPromise = new Promise<MessageReadStatus>((resolve, reject) => {
                this.readPromises.push(new PromisePack(sendMessageRequest.randomId, resolve, reject));
            });

            if (request.message instanceof TemplateMessage) {
                let message: TemplateMessage = request.message;
                this.templateMessages[message.templateMessageId] = {
                    templateId: message.templateMessageId,
                    elements: message.template.elements
                };
            }
        }

        let promises = new BalePromises(
            sendPromise,
            responsePromise,
            receivedPromise,
            readPromise
        );

        return promises;
    }

    /**
     * As in the read and received updates we just have "date" so we need the date as an identifier (instead of unreachable randomId).
     * @param randomId
     * @param date
     */
    private updateReadAndReceivedIdentifiers(randomId: string, date: string) {
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
    public setOnMessage(callback: (message: Message, sender: User, receivedMessage: ReceivedMessage) => void) {
        this._serverConnection.setOnMessage((receivedMessage: ReceivedMessage) => {
            if (receivedMessage.message instanceof TemplateResponseMessage) {
                let tempResMessage: TemplateResponseMessage = receivedMessage.message;
                let temp = this.templateMessages[tempResMessage.templateId];
                if (temp) {
                    let tempButtonElems: ButtonElement[] = temp.elements;

                    let element = null;
                    for (let i = 0; i < tempButtonElems.length; i++) {
                        if (tempButtonElems[i].value == tempResMessage.text) {
                            element = tempButtonElems[i];
                            break;
                        }
                    }
                    if (element && element.onAction) {
                        element.onAction.call(this, tempResMessage);
                    } else {
                        callback.call(this, receivedMessage.message, receivedMessage.peer, receivedMessage);
                    }
                } else {
                    callback.call(this, receivedMessage.message, receivedMessage.peer, receivedMessage);
                }
            } else
                callback.call(this, receivedMessage.message, receivedMessage.peer, receivedMessage);
        });
    }

    public setOnQuoted(callBack: Function): void {
        this._serverConnection.setOnQuoted(callBack);
    }
}
