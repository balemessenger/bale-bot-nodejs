import {Peer} from "./Peer";

export class Group extends Peer {

    constructor(id: number, accessHash: string) {
        super("Group", id, accessHash);
    }
}