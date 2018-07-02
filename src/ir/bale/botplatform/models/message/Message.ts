import {Jsonable} from "../../utils/Jsonable";

export abstract class Message implements Jsonable{

    public abstract getJsonObject(): any;

    /**
     *
     * @param jsonObject
     * @example
     * {
     *      $type: 'Text',
     *      text: 'salam'
     * }
     */
    public abstract manipulateFromJsonObject(jsonObject: any): void;
}