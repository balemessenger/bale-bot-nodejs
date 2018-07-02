import {ServerPacket} from "./ServerPacket";

export abstract class Response extends ServerPacket {
    public rid:string;

    //Polymorphism holder! For Response abstraction.
}