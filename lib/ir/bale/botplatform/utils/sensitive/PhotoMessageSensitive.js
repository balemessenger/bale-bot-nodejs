"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PhotoMessage_1 = require("../../models/message/PhotoMessage");
class PhotoMessageSensitive {
    match(message) {
        if (message instanceof PhotoMessage_1.PhotoMessage)
            return true;
        else
            return false;
    }
}
exports.PhotoMessageSensitive = PhotoMessageSensitive;
//# sourceMappingURL=PhotoMessageSensitive.js.map