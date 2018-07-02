"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../models/User");
var chai = require("chai");
var expect = chai.expect;
describe('User', function () {
    it('id and accessHash must be equal to 1 , \"2\"', function () {
        let user = new User_1.User(1, "2");
        expect(user.id).to.equal(1);
        expect(user.accessHash).to.equal("2");
    });
});
//# sourceMappingURL=UserTest.js.map