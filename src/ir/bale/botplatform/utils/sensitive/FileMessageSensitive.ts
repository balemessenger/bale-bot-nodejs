import {Sensitive} from "./Sensitive";
import {Message} from "../../models/message/Message";
import {FileMessage} from "../../models/message/FileMessage";

export class FileMessageSensitive implements Sensitive {

    match(message: Message): boolean {
        return message instanceof FileMessage;
    }
}