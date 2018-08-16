import {Request} from "./Request";
import {ApiConst} from "../../constants/ApiConst";
import {CreateGroup} from "../clientRequests/group/CreateGroup";

export class CreateGroupRequest extends Request {
    // private _user: User;

    private _createGroup: CreateGroup;
    private _randomId: string;

    /**
     * use user to fill json in @getJsonObject method
     * @param createGroup
     */
    constructor(createGroup: CreateGroup) {
        super(ApiConst.Services.groups);
        this._createGroup = createGroup;
        //randomId must be long.it means must be less than 18446744073709551615.
        this._randomId = this.generateRandomId();
    }

    private generateRandomId(): string {
        return Math.floor(Math.random() * 1800000).toString() + Math.floor(Math.random() * 4000000).toString() + Math.floor(Math.random() * 55000).toString();
    }


    /**
     * The createGroup field of the request.
     * @return {Message}
     */
    get createGroup(): CreateGroup {
        return this._createGroup;
    }

    /**
     *
     * @returns {string}  that is randomId field of send createGroup request
     * @private
     */
    get randomId(): string {
        return this._randomId;
    }

    /**
     * add body field (randomId fields) to requestObj
     * @returns {any} that is final text createGroup request
     */
    protected getJsonObject(): any {
        let requestObj = super.getJsonObject();
        requestObj.body = {};
        requestObj.body.randomId = this._randomId;
        requestObj.body.createGroup = this._createGroup.getJsonObject();
        return requestObj;
    }
}