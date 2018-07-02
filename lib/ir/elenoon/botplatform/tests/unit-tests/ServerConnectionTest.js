"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServerConnection_1 = require("../../layers/implementation/ServerConnection");
const User_1 = require("../../models/User");
const SocketConnection_1 = require("../../layers/implementation/SocketConnection");
const TextMessage_1 = require("../../models/message/TextMessage");
const SendMessageRequest_1 = require("../../models/clientMessages/SendMessageRequest");
let chai = require("chai");
let expect = chai.expect;
let sinon = require("sinon");
describe('Layer 2: ServerConnection', () => {
    beforeEach(() => {
        sinon.stub(ServerConnection_1.ServerConnection.prototype, 'constructor', (token) => {
            //Stubs to avoid connecting...
        });
        let cb;
        sinon.stub(SocketConnection_1.SocketConnection.prototype, 'setOnReceive', (callback) => {
            cb = callback;
        });
        sinon.stub(SocketConnection_1.SocketConnection.prototype, 'send', (json) => {
            setTimeout(() => {
                cb(JSON.stringify({
                    $type: "Response",
                    id: JSON.parse(json).id,
                    body: {
                        date: "1469095703312"
                    }
                }));
            }, 200);
        });
    });
    afterEach(() => {
        ServerConnection_1.ServerConnection.prototype.constructor.restore();
        SocketConnection_1.SocketConnection.prototype.setOnReceive.restore();
        SocketConnection_1.SocketConnection.prototype.send.restore();
    });
    it("Tests 'send' and 'setOnResponse' function", (done) => {
        let serverConnection = new ServerConnection_1.ServerConnection("myToken");
        let req = new SendMessageRequest_1.SendMessageRequest(new TextMessage_1.TextMessage("my text message"), new User_1.User(123, "321"));
        serverConnection.setOnResponse((response) => {
            expect(response.id).to.be.ok;
            done();
        });
        serverConnection.send(req);
    });
});
//# sourceMappingURL=ServerConnectionTest.js.map