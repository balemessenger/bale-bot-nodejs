"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Peer {
    constructor($typeOrjsonObject, id, accessHash) {
        if (typeof $typeOrjsonObject == 'string') {
            this.$type = $typeOrjsonObject;
            this._id = id;
            this._accessHash = accessHash;
        }
        else {
            let jsonObj = $typeOrjsonObject;
            this.$type = jsonObj.body.peer.$type;
            this._id = jsonObj.body.peer.id;
            this._accessHash = jsonObj.body.peer.accessHash;
            this._name = jsonObj.users[0][1].name;
            this._sex = jsonObj.users[0][1].sex;
            this._about = jsonObj.users[0][1].about;
            this._avatar = jsonObj.users[0][1].avatar;
            this._username = jsonObj.users[0][1].username;
            this._isBot = jsonObj.users[0][1].isBot;
            this._contactRecords = jsonObj.users[0][1].contactRecords;
            this._timeZone = jsonObj.users[0][1].timeZone;
            this._preferredLanguages = jsonObj.users[0][1].preferredLanguages;
            this._botCommands = jsonObj.users[0][1].botCommands;
        }
    }
    get id() {
        return this._id;
    }
    get accessHash() {
        return this._accessHash;
    }
    getJsonObject() {
        let json = {
            '$type': this.$type,
            'id': this._id,
            'accessHash': this._accessHash
        };
        return json;
    }
    get name() {
        return this._name;
    }
    get sex() {
        return this._sex;
    }
    get about() {
        return this._about;
    }
    get avatar() {
        return this._avatar;
    }
    get username() {
        return this._username;
    }
    get isBot() {
        return this._isBot;
    }
    get contactRecords() {
        return this._contactRecords;
    }
    get timeZone() {
        return this._timeZone;
    }
    get preferredLanguages() {
        return this._preferredLanguages;
    }
    get botCommands() {
        return this._botCommands;
    }
}
exports.Peer = Peer;
//# sourceMappingURL=Peer.js.map