"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsonMessage_1 = require("./JsonMessage");
const ApiConst_1 = require("../../constants/ApiConst");
class LocationMessage extends JsonMessage_1.JsonMessage {
    constructor(messageObjOrFileId, longitude) {
        super();
        if (longitude){
            this._latitude = messageObjOrFileId;
            this._longitude = longitude;
        }
        else{
            this.manipulateFromJsonObject(messageObjOrFileId)
        }

    }


    get latitude() {
        return this._latitude;
    }

    get longitude() {
        return this._longitude;
    }

    getJsonObject() {
        return {
            "$type": ApiConst_1.ApiConst.MessageTypes.JsonMessage,
            "rawJson": JSON.stringify({
                "dataType": ApiConst_1.ApiConst.JsonTypes.Location,
                "data": {
                    "location": {
                        "latitude": this._latitude,
                        "longitude": this._longitude
                    }
                }
            })
        };
    }


    manipulateFromJsonObject(jsonObject) {
        this._latitude = jsonObject.location.latitude;
        this._longitude = jsonObject.location.longitude;
    }


}
exports.LocationMessage = LocationMessage;
//# sourceMappingURL=LocationMessage.js.map