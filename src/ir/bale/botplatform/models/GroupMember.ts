/**
 * Created by zaaferani on 2018-08-16
 */
export class GroupMember {

    public user_id: string;
    public invite_user_id: string;
    public member_since: string;
    public is_admin: boolean;


    constructor(user_id: string, invite_user_id?: string, member_since?: string, is_admin?: boolean);
    constructor(user_id: any, invite_user_id?: string, member_since?: string, is_admin?: boolean);
    constructor(user_id: string | any, invite_user_id: string, member_since: string, is_admin: boolean) {
        if (typeof user_id == 'string') {
            this.user_id = user_id;
            this.invite_user_id = invite_user_id;
            this.member_since = member_since;
            this.is_admin = is_admin;
        } else {
            let jsonObj = user_id;
            this.user_id = jsonObj.user_id;
            this.invite_user_id = jsonObj.invite_user_id;
            this.member_since = jsonObj.member_since;
            this.is_admin = jsonObj.is_admin;
        }
    }

    getJsonObject(): any {
        return {
            "userId": this.user_id,
            "inviteUserId": this.invite_user_id,
            "memberSince": this.member_since,
            "isAdmin": this.is_admin,
        };
    }
}