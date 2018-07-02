import {ServerConnection} from "../../layers/implementation/ServerConnection";
import {User} from "../../models/User";
import {SocketConnection} from "../../layers/implementation/SocketConnection";
import {TextMessage} from "../../models/message/TextMessage";
import {SendMessageRequest} from "../../models/clientMessages/SendMessageRequest";
import {Response} from "../../models/serverMessages/Response";

let chai = require("chai");
let expect = chai.expect;
let sinon = require("sinon");

describe('Layer 2: ServerConnection', () => {

    beforeEach(()=> {
        sinon.stub(ServerConnection.prototype, 'constructor', (token: string) => {
            //Stubs to avoid connecting...
        });

        let cb: Function;

        sinon.stub(SocketConnection.prototype, 'setOnReceive', (callback: Function) => {
            cb = callback;
        });

        sinon.stub(SocketConnection.prototype, 'send', (json: string) => {

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
        (<any> ServerConnection.prototype.constructor).restore();

        (<any> SocketConnection.prototype.setOnReceive).restore();

        (<any> SocketConnection.prototype.send).restore();
    });

    it("Tests 'send' and 'setOnResponse' function", (done) => {
        let serverConnection = new ServerConnection("myToken");

        let req = new SendMessageRequest(new TextMessage("my text message"), new User(123, "321"));

        serverConnection.setOnResponse((response: Response) => {
            expect(response.id).to.be.ok;
            done();
        });

        serverConnection.send(req);
    });
});