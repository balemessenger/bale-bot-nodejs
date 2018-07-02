import {TextMessage} from "../../models/message/TextMessage";
var chai = require("chai");
var expect = chai.expect;

describe('TextMessage', function () {
    it('constructor', function () {
        let m = new TextMessage("some text");
        expect(m.text).to.equal("some text");
    });

});