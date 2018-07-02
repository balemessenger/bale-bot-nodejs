"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileMessage_1 = require("../../models/message/FileMessage");
class FileMessageSensitive {
    match(message) {
        return message instanceof FileMessage_1.FileMessage;
    }
}
exports.FileMessageSensitive = FileMessageSensitive;
//# sourceMappingURL=FileMessageSensitive.js.map