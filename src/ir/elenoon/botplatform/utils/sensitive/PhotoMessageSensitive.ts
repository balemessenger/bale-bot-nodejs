import {Sensitive} from "./Sensitive";
import {Message} from "../../models/message/Message";
import {PhotoMessage} from "../../models/message/PhotoMessage";

export class PhotoMessageSensitive implements Sensitive {

    match(message: Message): boolean {
        if (message instanceof PhotoMessage)
            return true;
        else
            return false;
    }

}