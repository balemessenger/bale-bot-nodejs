import {Sensitive} from "./Sensitive";
import {Message} from "../../models/message/Message";
import {TextMessage} from "../../models/message/TextMessage";
import {TemplateResponseMessage} from "../../models/message/template/TemplateResponseMessage"
 /**
 * A class that is sensitive to some regex or strings.
 */
export class TextMessageSensitive implements Sensitive {

    private keywords: string[] = [];
    private regex: RegExp;

    constructor(keywords: string[] | string | RegExp) {

        if (Array.isArray(keywords)) {
            let keys : any[] = keywords;
            for (let str of keywords) {
                this.keywords.push(str);
            }
            if(keys[0] instanceof RegExp) {
                this.regex = keys[0];
            }
        } else if (typeof keywords === 'string') {
            this.keywords.push(keywords);
        } else if (keywords instanceof RegExp) {
            this.regex = keywords;
        }
    }

    /**
     * Creates a simple RegExp object from a string, that matches with exactly that string.
     *
     * @param str The string to make to the type of RegExp.
     * @return {RegExp}
     */
    private toRegExp(str: string): RegExp {
        return new RegExp("\\b" + str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + "\\b");
    }

    /**
     * Checks if the given text matches any subscribed keyword
     * @param text
     * @return {boolean}
     */
    public match(message: Message): boolean {
        if (message instanceof TextMessage) {
            let txtMsg = <TextMessage>message;

            if (this.regex)
                if (this.regex.test(txtMsg.text))
                    return true;

            return this.find(txtMsg.text);
        }else if(message instanceof TemplateResponseMessage){
            let templateResponseMessage = <TemplateResponseMessage>message;

            if (this.regex)
                if (this.regex.test(templateResponseMessage.text))
                    return true;

            return this.find(templateResponseMessage.text);
        }

        return false;
    }

    public find(txt: string) {
        // Regex does not support persian "word matching".
        // ==> Have to test by ourselves
        for (let word of this.keywords) {
            let index = txt.indexOf(word);
            if (index === -1)
                continue;

            if (index > 0 && (index + word.length) < txt.length) {
                if (txt.charAt(index - 1) === ' ' && txt.charAt(index + word.length) === ' ')
                    return true;
            } else if (index === 0) {
                let ch = txt.charAt(index + word.length);
                if (!ch || ch === ' ')
                    return true;
            } else if ((index + word.length) === txt.length) {
                let ch = txt.charAt(index - 1);
                if (!ch || ch === ' ')
                    return true;
            }
        }

        return false;
    }
}