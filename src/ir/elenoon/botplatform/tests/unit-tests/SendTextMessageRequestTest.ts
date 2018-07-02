import {User} from "../../models/User";
import {TextMessage} from "../../models/message/TextMessage";
import {SendMessageRequest} from "../../models/clientMessages/SendMessageRequest";

var chai = require("chai");
var expect = chai.expect;

describe('SendTextMessageRequest', function () {
    it('It should return correct string request!', function () {
        let correctJson = {//sendTextMessage request
            "$type": "Request",
            "id": "1",
            "service": "messaging",
            "body": {
                "$type": "SendMessage",
                "peer": {"$type": "User", "id": 1374, "accessHash": "741115"},
                "randomId": "873982463663745257",
                "message": {"$type": "Text", "text": "MyMessage"}
            }
        };
        let user = new User(1374, "741115");
        let textMsgReq = JSON.parse(new SendMessageRequest(new TextMessage("MyMessage"), user).toJson());
        expect(textMsgReq.$type).to.equal(correctJson.$type);
        expect(textMsgReq.service).to.equal(correctJson.service);
        expect(textMsgReq.body.$type).to.equal(correctJson.body.$type);
        expect(JSON.stringify(textMsgReq.body.receiver)).to.equal(JSON.stringify(correctJson.body.peer));
        expect(JSON.stringify(textMsgReq.body.message)).to.equal(JSON.stringify(correctJson.body.message));
    });
    it('It should return real random randomId!', function () {
        let user = new User(1374, "741115");
        let user2 = new User(1374, "131415");
        let textMsgReq = new SendMessageRequest(new TextMessage("MyMessage"), user);
        let textMsgReq2 = new SendMessageRequest(new TextMessage("MyMessage2"), user2);
        expect(textMsgReq.randomId).to.not.equal(textMsgReq2.randomId);
    });
    it('It should return real random id!', function () {
        let user = new User(1374, "741115");
        let user2 = new User(1374, "131415");
        let textMsgReq = JSON.parse(new SendMessageRequest(new TextMessage("MyMessage"), user).toJson());
        let textMsgReq2 = JSON.parse(new SendMessageRequest(new TextMessage("MyMessage2"), user2).toJson());
        expect(textMsgReq.id).to.not.equal(textMsgReq2.id);
    });
});