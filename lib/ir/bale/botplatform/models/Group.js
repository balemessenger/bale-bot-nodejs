"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Peer_1 = require("./Peer");
class Group extends Peer_1.Peer {
    constructor(id, accessHash) {
        super("Group", id, accessHash);
    }
}
exports.Group = Group;
//# sourceMappingURL=Group.js.map