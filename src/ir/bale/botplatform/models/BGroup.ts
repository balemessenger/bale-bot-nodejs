/**
 * Created by zaaferani on 2018-08-16
 */
import {Avatar} from "./Avatar";
import {GroupMember} from "./GroupMember";

export class BGroup {

    private _id: string;
    private _accessHash: string;
    private _title: string;
    private _is_member: boolean;
    private _creator_user_id: string;
    private _members: GroupMember[];
    private _about: string;
    private _avatar: Avatar;

    constructor(id: string, accessHash?: string, title?: string, is_member?: boolean, creator_user_id?: string, members?: GroupMember[], about?: string, avatar?: Avatar);
    constructor(id: any, accessHash?: string, title?: string, is_member?: boolean, creator_user_id?: string, members?: GroupMember[], about?: string, avatar?: Avatar);
    constructor(id: string | any, accessHash: string, title: string, is_member: boolean, creator_user_id: string, members: GroupMember[], about: string, avatar: Avatar) {
        if (typeof id == 'string') {
            this._id = id;
            this._accessHash = accessHash;
            this._title = title;
            this._is_member = is_member;
            this._creator_user_id = creator_user_id;
            this._members = members;
            this._about = about;
            this._avatar = avatar;
        } else {
            let jsonObj = id;
            this._id = jsonObj.id;
            this._accessHash = jsonObj.accessHash;
            this._title = jsonObj.title;
            this._is_member = jsonObj.is_member;
            this._creator_user_id = jsonObj.creator_user_id;
            this._members = jsonObj.members;
            this._about = jsonObj.about;
            this._avatar = jsonObj.avatar;
        }
    }

    getJsonObject(): any {
        return {
            "id": this.id,
            "accessHash": this.accessHash,
            "title": this.title,
            "isMember": this.is_member,
            "creatorUserId": this.creator_user_id,
            "members": this.members,
            "about": this.about,
            "avatar": this.avatar,
        };
    }

    get id(): string {
        return this._id;
    }

    get accessHash(): string {
        return this._accessHash;
    }

    get title(): string {
        return this._title;
    }

    get is_member(): boolean {
        return this._is_member;
    }

    get creator_user_id(): string {
        return this._creator_user_id;
    }

    get members(): GroupMember[] {
        return this._members;
    }

    get about(): string {
        return this._about;
    }

    get avatar(): Avatar {
        return this._avatar;
    }
}