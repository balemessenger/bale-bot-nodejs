export interface Jsonable {
    getJsonObject(): any;
    manipulateFromJsonObject(jsonObject: any): void;
}