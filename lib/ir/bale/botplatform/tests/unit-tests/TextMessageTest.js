"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TextMessage_1 = require("../../models/message/TextMessage");
var chai = require("chai");
var expect = chai.expect;
describe('TextMessage', function () {
    it('constructor', function () {
        let m = new TextMessage_1.TextMessage("some text");
        expect(m.text).to.equal("some text");
    });
});
//# sourceMappingURL=TextMessageTest.js.map