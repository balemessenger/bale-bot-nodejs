"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsonMessage_1 = require("./JsonMessage");
const ApiConst_1 = require("../../constants/ApiConst");
class ContactMessage extends JsonMessage_1.JsonMessage {
    constructor(messageObjOrFileId, emails, phones) {
        super();
        if (emails){
            this._name = messageObjOrFileId;
            if ((!!emails) && (emails.constructor === Array))
                this._emails = emails.map(String);
            else
                this._emails = [emails.toString()];

            if ((!!phones) && (phones.constructor === Array)){
                this._phones = phones.map(String);}
            else
                this._phones = [ phones.toString().replace(" ","") ];

            console.log(this)
        }
        else{
            this.manipulateFromJsonObject(messageObjOrFileId)
        }

    }


    get name() {
        return this._name;
    }

    get emails() {
        return this._emails;
    }
    get phones() {
        return this._phones;
    }

    getJsonObject() {

        return {
            "$type": ApiConst_1.ApiConst.MessageTypes.JsonMessage,
            "rawJson": JSON.stringify({
                "dataType": ApiConst_1.ApiConst.JsonTypes.Contact,
                "data": {
                    "contact": {
                        "name": this._name,
                        "emails": this._emails,
                        "phones": this._phones
                    }
                }
            })
        };
    }


    manipulateFromJsonObject(jsonObject) {
        this._name = jsonObject.contact.name;
        this._emails = jsonObject.contact.emails;
        this._phones = jsonObject.contact.phones;
    }


}
exports.ContactMessage = ContactMessage;
//# sourceMappingURL=ContactMessage.js.map