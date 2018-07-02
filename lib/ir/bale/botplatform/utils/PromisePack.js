"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by emran on 3/1/17.
 */
class PromisePack {
    constructor(identifier, resolve, reject, timeout) {
        this.identifier = identifier;
        this.resolve = resolve;
        this.reject = reject;
        if (timeout)
            this.timeout = timeout;
    }
}
exports.PromisePack = PromisePack;
//# sourceMappingURL=PromisePack.js.map