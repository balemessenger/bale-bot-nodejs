import {Request} from "./Request";
import {ApiConst} from "../../constants/ApiConst";
import {SDKConst} from "../../constants/SDKConst"
/**
 * Created by emran on 5/24/17.
 */
export class GetDifferenceRequest extends Request {

    private seq: number;

    public constructor(seq: number) {
        super(ApiConst.Services.Sequence_update);
        this.seq = seq;
    }

    public getJsonObject() {
        let obj = super.getJsonObject();
        obj.body = {};
        obj.body.$type = "GetDifference";
        obj.body.seq = this.seq;
        obj.body.howMany = SDKConst.UPDATELIMIT.UPDATELIMIT;
        return obj;
    }
}