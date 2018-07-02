"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Response_1 = require("./Response");
/**
 * Created by amin on 3/2/17.
 */
class BotErrorResponse extends Response_1.Response {
    constructor(jsonPacket) {
        super(jsonPacket);
        let jsonObj = JSON.parse(jsonPacket);
        this.code = jsonObj.body.code;
        this.tag = jsonObj.body.tag;
        this.data = jsonObj.body.data;
        this.retryIn = jsonObj.body.retryIn;
    }
}
exports.BotErrorResponse = BotErrorResponse;
//# sourceMappingURL=BotErrorResponse.js.map