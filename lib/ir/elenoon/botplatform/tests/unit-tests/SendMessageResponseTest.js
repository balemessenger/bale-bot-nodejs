"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SendMessageResponse_1 = require("../../models/serverMessages/SendMessageResponse");
var expect = require('chai').expect;
describe('SendMessageResponse', function () {
    let correctSendMsgResponse = { "$type": "Response", "id": "2", "body": { "date": "1469095703312" } };
    it("It should return correct Response Message object from server", function () {
        let msgResponse = new SendMessageResponse_1.SendMessageResponse(JSON.stringify(correctSendMsgResponse));
        expect(msgResponse.date).to.equal(correctSendMsgResponse.body.date);
        expect(msgResponse.id).to.equal(correctSendMsgResponse.id);
    });
});
//# sourceMappingURL=SendMessageResponseTest.js.map