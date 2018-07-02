"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Peer_1 = require("./Peer");
class User extends Peer_1.Peer {
    constructor(id, accessHash) {
        super("User", id, accessHash);
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map