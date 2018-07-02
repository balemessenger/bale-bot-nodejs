export interface Connection {

    /**
     *
     * @param jsonString string of message json
     * @param timeout {number} {Optional} the timeout of the request. the request is not resolved or rejected during this period, then it will rejected
     *
     * @returns {Promise<any>} If connection is stable sends message and resolves when the message is flushed successfully; otherwise rejects.
     */
    send(jsonString: string, timeout?:number): Promise<any>;

    /**
     * set callback to on message receive from socket
     * @param callback on message recived callback
     * @return {void}
     */
    setOnReceive(callback: (data: string) => void): void;
}