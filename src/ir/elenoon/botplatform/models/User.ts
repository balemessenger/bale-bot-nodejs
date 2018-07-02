import {Peer} from "./Peer";

export class User extends Peer {

    constructor(id: number, accessHash: string) {
        super("User", id, accessHash);
    }

}