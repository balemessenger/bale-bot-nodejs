import {BotError} from "../../utils/BotError";

var chai = require("chai");
var expect = chai.expect;

describe('BotError', function () {
    it('must botError.type equal to BotError.ERROR_NET_DISCONNECT', function () {
        let botError = new BotError(new Error("EAI_AGAIN"));
        expect(botError.type).to.equal(BotError.ERROR_NET_DISCONNECT);
    });
    it('must botError.type equal to BotError.ERROR_SEND_BAD_MESSAGE', function () {
        let botError = new BotError(new Error("1011 internal error"));
        expect(botError.type).to.equal(BotError.ERROR_SEND_BAD_MESSAGE);
    });
    it('must botError.type equal to BotError.ERROR_BAD_TOKEN', function () {
        let botError = new BotError(new Error("unexpected server response (500)"));
        expect(botError.type).to.equal(BotError.ERROR_BAD_TOKEN);
    });
    it('must botError.type equal to BotError.ERROR_BAD_BASE_URL', function () {
        let botError = new BotError(new Error("ENOTFOUND"));
        expect(botError.type).to.equal(BotError.ERROR_BAD_BASE_URL);
    });
});
