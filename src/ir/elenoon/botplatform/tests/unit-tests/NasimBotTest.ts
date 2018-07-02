import {BaleBot} from "../../layers/implementation/BaleBot";
import {ApiConnection} from "../../layers/implementation/ApiConnection";
import {TextMessage} from "../../models/message/TextMessage";
import {Request} from "../../models/clientMessages/Request";
import {User} from "../../models/User";

var chai = require("chai");
var expect = chai.expect;
let sinon = require("sinon");

describe('Layer 5: NasimBot test', function () {

    beforeEach(()=> {
        sinon.stub(ApiConnection.prototype, 'constructor', (token: string) => {
            //Stubs to avoid connecting...
        });

        sinon.stub(ApiConnection.prototype, 'send', (r: Request) => {
            return "message sent";
        });
    });

    afterEach(() => {
        (<any> ApiConnection.prototype.constructor).restore();

        (<any> ApiConnection.prototype.send).restore();
    });

    it('NasimBot constructor', function () {
        let bot = new BaleBot("yourToken");
        expect(bot.botToken).to.equal("yourToken");
        // expect(bot.sensitivePacks.length).to.equal(0);
    });

    // it('NasimBot hears', function () {
    //     let bot = new NasimBot("yourToken");
    //     bot.hears(['a', 'b'], () => {});
    //     expect(bot.sensitivePacks.length).to.equal(1);
    // });

    it('NasimBot send', function () {
        let bot = new BaleBot("yourToken");
        let result = bot.send(new TextMessage("text"), new User(123, "123"));
        expect(result).to.equal("message sent");
    });
});
