import {TextMessageSensitive} from "../../utils/sensitive/TextMessageSensitive";
var chai = require("chai");
var expect = chai.expect;

describe('Sensitive', function () {
    it('Sensitive Constructor', function () {
        let sen = new TextMessageSensitive(['a', 'b']);
    });
});