"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaleBot_1 = require("../../layers/implementation/BaleBot");
const ApiConnection_1 = require("../../layers/implementation/ApiConnection");
const TextMessage_1 = require("../../models/message/TextMessage");
const User_1 = require("../../models/User");
var chai = require("chai");
var expect = chai.expect;
let sinon = require("sinon");
describe('Layer 5: NasimBot test', function () {
    beforeEach(() => {
        sinon.stub(ApiConnection_1.ApiConnection.prototype, 'constructor', (token) => {
            //Stubs to avoid connecting...
        });
        sinon.stub(ApiConnection_1.ApiConnection.prototype, 'send', (r) => {
            return "message sent";
        });
    });
    afterEach(() => {
        ApiConnection_1.ApiConnection.prototype.constructor.restore();
        ApiConnection_1.ApiConnection.prototype.send.restore();
    });
    it('NasimBot constructor', function () {
        let bot = new BaleBot_1.BaleBot("yourToken");
        expect(bot.botToken).to.equal("yourToken");
        // expect(bot.sensitivePacks.length).to.equal(0);
    });
    // it('NasimBot hears', function () {
    //     let bot = new NasimBot("yourToken");
    //     bot.hears(['a', 'b'], () => {});
    //     expect(bot.sensitivePacks.length).to.equal(1);
    // });
    it('NasimBot send', function () {
        let bot = new BaleBot_1.BaleBot("yourToken");
        let result = bot.send(new TextMessage_1.TextMessage("text"), new User_1.User(123, "123"));
        expect(result).to.equal("message sent");
    });
});
//# sourceMappingURL=NasimBotTest.js.map