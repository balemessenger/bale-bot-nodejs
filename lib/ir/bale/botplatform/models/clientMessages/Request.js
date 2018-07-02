"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Request {
    /**
     * service can be like as 'messaging'
     * @param service
     */
    constructor(service) {
        this._service = service;
        Request.idCounter++; // id:1 is reserved!
        this._id = Request.idCounter.toString();
    }
    get id() {
        return this._id;
    }
    get service() {
        return this._service;
    }
    /**
     * id and service have initialized in in constructor
     * @returns {{id: string, service: string}} that is similar in the all of requests and this object will complete in request sub classes
     */
    getJsonObject() {
        let requestObj = {
            $type: "Request",
            id: this.id,
            service: this.service,
            body: {}
        };
        return requestObj;
    }
    /**
     * Returns an standard json string for sending to the server.
     */
    toJson() {
        return JSON.stringify(this.getJsonObject());
    }
}
Request.idCounter = 1; // id:1 is reserved!
exports.Request = Request;
//# sourceMappingURL=Request.js.map