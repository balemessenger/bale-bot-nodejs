import {Element} from "./Element";

export class DateElement extends Element {

    public static get TYPE(): string {
        return "Date";
    }

    constructor() {
        super(DateElement.TYPE);
    }
}