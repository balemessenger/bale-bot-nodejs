import {ServerConnection} from "../../layers/implementation/ServerConnection";
import {Request} from "../../models/clientMessages/Request";
import {SendMessageResponse} from "../../models/serverMessages/SendMessageResponse";
import {ApiConnection} from "../../layers/implementation/ApiConnection";
import {User} from "../../models/User";
import {Message} from "../../models/message/Message";
import {TextMessage} from "../../models/message/TextMessage";
import {SendMessageRequest} from "../../models/clientMessages/SendMessageRequest";
import {Response} from "../../models/serverMessages/Response";
import {ReceivedMessage} from "../../models/serverMessages/ReceivedMessage";


let chai = require("chai");
let expect = chai.expect;
let sinon = require("sinon");

describe("Layer 3: ApiConnection", () => {
    beforeEach(() => {
        sinon.stub(ServerConnection.prototype, 'constructor', (token: string) => {
            //Stubs to avoid connecting...
        });

        let responseCB: Function;
        let messageCB: Function;

        sinon.stub(ServerConnection.prototype, 'setOnResponse', (callback: Function) => {
            responseCB = callback;
        });

        sinon.stub(ServerConnection.prototype, 'setOnMessage', (callback: Function) => {
            messageCB = callback;

            let obj = {
                "$type": "FatSeqUpdate",
                "seq": 241,
                "body": {
                    "$type": "Message",
                    "peer": {
                        "$type": "User",
                        "id": 1472433338,
                        "accessHash": "4475107066909916083"
                    },
                    "sender": {
                        "$type": "User",
                        "id": 1472433338,
                        "accessHash": "4475107066909916083"
                    },
                    "date": "1472887337280",
                    "randomId": "-6066865252084846679",
                    "message": {
                        "$type": "Text",
                        "text": "asdf"
                    }
                }
            };

            setTimeout(() => {
                callback(new ReceivedMessage(JSON.stringify(obj)));
            }, 0);
        });

        sinon.stub(ServerConnection.prototype, 'send', (req: Request) => {
            setTimeout(() => {

                let obj = {
                    $type: "Response",
                    id: req.id,
                    body: {
                        date: "1469095703312"
                    }
                };
                responseCB(new SendMessageResponse(JSON.stringify(obj)))
            }, 0);
        });
    });

    afterEach(() => {
        (<any> ServerConnection.prototype.constructor).restore();

        (<any> ServerConnection.prototype.setOnResponse).restore();

        (<any> ServerConnection.prototype.setOnMessage).restore();

        (<any> ServerConnection.prototype.send).restore();
    });

    it("Tests 'send' function", (done) => {
        let apiConnection = new ApiConnection("myToken");

        let req = new SendMessageRequest(new TextMessage("my text message"), new User(123, "321"));

        // expect(req.id).to.equal("req.id");

        apiConnection.send(req).then((resp: Response) => {
            // expect(resp.id).to.equal("resp.id");
            expect(resp.id).to.equal(req.id);
            done();
        });
    });

    it("Tests 'setOnMessage' function", (done) => {
        let apiConnection = new ApiConnection("myToken");

        apiConnection.setOnMessage((msg: Message) => {
            expect(msg).to.be.ok;
            done();
        });
    });
});