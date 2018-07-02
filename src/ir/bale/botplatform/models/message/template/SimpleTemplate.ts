import {Jsonable} from "../../../utils/Jsonable";
import {Element} from "./Element";
import {Message} from "../Message";

export class SimpleTemplate implements Jsonable {

    public static get TYPE(): string {
        return "Simple";
    }

    private _generalMessage: Message;
    private _elements: Element[];
    private _responseType: string;

    /**
     * @param text
     * @param elements {Optional}
     */
    constructor(generalMessage: Message, elements?: Element[],responseType?: string) {
        this._generalMessage = generalMessage;
        if (elements != null)
            this._elements = elements;
        else
            this._elements = [];
        if(responseType != null){
            this._responseType = responseType;
        }else{
            this._responseType = "";
        }

    }

    public addElement(element: Element): void {
        this._elements.push(element);
    }

    public get generalMessage(): Message {
        return this._generalMessage;
    }

    public get elements(): Element[] {
        return this._elements;
    }
    public get responseType(): string {
        return this._responseType;
    }

    /**
     *
     * @return {{$type: string, text: string, elements: any[]}}
     */
    getJsonObject(): any {
        return {
            $type: SimpleTemplate.TYPE,
            text: this._generalMessage,
            elements: this._elements,
            responseType:this._responseType
        };
    }


    manipulateFromJsonObject(jsonObject: any): void {
        this._generalMessage = jsonObject.generalMessage;
        this._elements = jsonObject.elements;
        this._responseType = jsonObject.responseType;
    }
}