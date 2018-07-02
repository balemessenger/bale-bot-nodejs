export abstract class Request {

    private static idCounter = 1;// id:1 is reserved!
    protected _id: string;
    protected _service: string;

    /**
     * service can be like as 'messaging'
     * @param service
     */
    constructor(service: string) {
        this._service = service;
        Request.idCounter++; // id:1 is reserved!
        this._id = Request.idCounter.toString();

    }

    get id(): string {
        return this._id;
    }

    get service(): string {
        return this._service;
    }

    /**
     * id and service have initialized in in constructor
     * @returns {{id: string, service: string}} that is similar in the all of requests and this object will complete in request sub classes
     */
    protected getJsonObject(): any {
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
    toJson(): string {
        return JSON.stringify(this.getJsonObject());
    }

}