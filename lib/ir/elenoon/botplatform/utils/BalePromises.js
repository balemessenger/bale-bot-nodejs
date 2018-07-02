"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by emran on 3/2/17.
 */
class BalePromises {
    constructor(sendPromise, responsePromise, receivedPromise, readPromise) {
        this._sendPromise = sendPromise;
        this._responsePromise = responsePromise;
        this._receivedPromise = receivedPromise;
        this._readPromise = readPromise;
    }
    get sendPromise() {
        return this._sendPromise;
    }
    get responsePromise() {
        return this._responsePromise;
    }
    get receivedPromise() {
        return this._receivedPromise;
    }
    get readPromise() {
        return this._readPromise;
    }
    /**
     * For backward compatibility. Acts as responsePromise.then method
     * @param cb
     * @return {Promise<void>}
     */
    then(cb) {
        return this.responsePromise.then(cb);
    }
    /**
     * For backward compatibility. Acts as responsePromise.then method
     * @param cb
     * @return {Promise<void>}
     */
    catch(cb) {
        return this.responsePromise.catch(cb);
    }
}
exports.BalePromises = BalePromises;
//# sourceMappingURL=BalePromises.js.map