/**
 * Created by emran on 3/1/17.
 */
export class PromisePack {
    public identifier: any;
    public resolve: (data: any) => void;
    public reject: (data: any) => void;
    public timeout: number;

    constructor(identifier: any, resolve: (data: any) => void, reject: (data: any) => void);
    constructor(identifier: any, resolve: (data: any) => void, reject: (data: any) => void, timeout: number);

    constructor(identifier: any, resolve: (data: any) => void, reject: (data: any) => void, timeout?: number) {
        this.identifier = identifier;
        this.resolve = resolve;
        this.reject = reject;
        if (timeout)
            this.timeout = timeout;
    }
}