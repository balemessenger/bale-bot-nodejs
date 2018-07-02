"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServerConnection_1 = require("../../layers/implementation/ServerConnection");
const SendMessageResponse_1 = require("../../models/serverMessages/SendMessageResponse");
const ApiConnection_1 = require("../../layers/implementation/ApiConnection");
const User_1 = require("../../models/User");
const TextMessage_1 = require("../../models/message/TextMessage");
const SendMessageRequest_1 = require("../../models/clientMessages/SendMessageRequest");
const ReceivedMessage_1 = require("../../models/serverMessages/ReceivedMessage");
let chai = require("chai");
let expect = chai.expect;
let sinon = require("sinon");
describe("Layer 3: ApiConnection", () => {
    beforeEach(() => {
        sinon.stub(ServerConnection_1.ServerConnection.prototype, 'constructor', (token) => {
            //Stubs to avoid connecting...
        });
        let responseCB;
        let messageCB;
        sinon.stub(ServerConnection_1.ServerConnection.prototype, 'setOnResponse', (callback) => {
            responseCB = callback;
        });
        sinon.stub(ServerConnection_1.ServerConnection.prototype, 'setOnMessage', (callback) => {
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
                callback(new ReceivedMessage_1.ReceivedMessage(JSON.stringify(obj)));
            }, 0);
        });
        sinon.stub(ServerConnection_1.ServerConnection.prototype, 'send', (req) => {
            setTimeout(() => {
                let obj = {
                    $type: "Response",
                    id: req.id,
                    body: {
                        date: "1469095703312"
                    }
                };
                responseCB(new SendMessageResponse_1.SendMessageResponse(JSON.stringify(obj)));
            }, 0);
        });
    });
    afterEach(() => {
        ServerConnection_1.ServerConnection.prototype.constructor.restore();
        ServerConnection_1.ServerConnection.prototype.setOnResponse.restore();
        ServerConnection_1.ServerConnection.prototype.setOnMessage.restore();
        ServerConnection_1.ServerConnection.prototype.send.restore();
    });
    it("Tests 'send' function", (done) => {
        let apiConnection = new ApiConnection_1.ApiConnection("myToken");
        let req = new SendMessageRequest_1.SendMessageRequest(new TextMessage_1.TextMessage("my text message"), new User_1.User(123, "321"));
        // expect(req.id).to.equal("req.id");
        apiConnection.send(req).then((resp) => {
            // expect(resp.id).to.equal("resp.id");
            expect(resp.id).to.equal(req.id);
            done();
        });
    });
    it("Tests 'setOnMessage' function", (done) => {
        let apiConnection = new ApiConnection_1.ApiConnection("myToken");
        apiConnection.setOnMessage((msg) => {
            expect(msg).to.be.ok;
            done();
        });
    });
});
//# sourceMappingURL=ApiConnectionTest.js.map