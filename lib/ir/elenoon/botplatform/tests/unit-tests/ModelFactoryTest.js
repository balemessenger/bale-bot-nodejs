"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseModelFactory_1 = require("../../models/factories/ResponseModelFactory");
const SendMessageResponse_1 = require("../../models/serverMessages/SendMessageResponse");
const ReceivedMessage_1 = require("../../models/serverMessages/ReceivedMessage");
var expect = require('chai').expect;
describe('ModelFactory', function () {
    //SendMessageResponse
    it('It should return SendMessageResponse object', function () {
        let testJson = { "$type": "Response", "id": "2", "body": { "date": "1469095703312" } };
        let bool = ResponseModelFactory_1.ResponseModelFactory.build(JSON.stringify(testJson)) instanceof SendMessageResponse_1.SendMessageResponse;
        expect(bool).to.equal(true);
    });
    //ReceivedTextMessage
    it('It should return ReceivedTextMessage object', function () {
        let testJson = {
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
        let isInstanceOf = ResponseModelFactory_1.ResponseModelFactory.build(JSON.stringify(testJson)) instanceof ReceivedMessage_1.ReceivedMessage;
        expect(isInstanceOf).to.equal(true);
    });
    //Invalid
    it('It should throw new Error if json is not valid', function () {
        //an invalid JSON
        let testJson = { "$type": "folan", "id": "2", "body": { "date": "1469095703312" } };
        expect(function () {
            ResponseModelFactory_1.ResponseModelFactory.build(JSON.stringify(testJson));
        }).to.throw(Error);
    });
});
//# sourceMappingURL=ModelFactoryTest.js.map