
import {Message} from "../../models/message/Message";

export interface Sensitive{

    match(message: Message): boolean;
}