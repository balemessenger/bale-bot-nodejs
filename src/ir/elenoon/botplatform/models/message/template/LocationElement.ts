import {Element} from "./Element";

export class LocationElement extends Element {

    public static get TYPE(): string {
        return "Location";
    }

    constructor() {
        super(LocationElement.TYPE);
    }
}