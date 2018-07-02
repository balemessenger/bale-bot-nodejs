export class Peer {

    private $type: string;
    private _id: number;
    private _accessHash: string;
    private _name: string;
    private _sex: string;
    private _about: string;
    private _avatar: string;
    private _username: string;
    private _isBot: boolean;
    private _contactRecords: string[];
    private _timeZone: string;
    private _preferredLanguages: string[];
    private _botCommands: any[];

    constructor($typeOrjsonObject: any, id?: number, accessHash?: string);
    constructor($typeOrjsonObject: string, id?: number, accessHash?: string);

    constructor($typeOrjsonObject: string | any, id?: number, accessHash?: string) {
        if (typeof $typeOrjsonObject == 'string') {
            this.$type = $typeOrjsonObject;
            this._id = id;
            this._accessHash = accessHash;
        } else {
            let jsonObj = $typeOrjsonObject;
            this.$type = jsonObj.body.peer.$type;
            this._id = jsonObj.body.peer.id;
            this._accessHash = jsonObj.body.peer.accessHash;
            this._name = jsonObj.users[0][1].name;
            this._sex = jsonObj.users[0][1].sex;
            this._about = jsonObj.users[0][1].about;
            this._avatar = jsonObj.users[0][1].avatar;
            this._username = jsonObj.users[0][1].username;
            this._isBot = jsonObj.users[0][1].isBot;
            this._contactRecords = jsonObj.users[0][1].contactRecords;
            this._timeZone = jsonObj.users[0][1].timeZone;
            this._preferredLanguages = jsonObj.users[0][1].preferredLanguages;
            this._botCommands = jsonObj.users[0][1].botCommands;
        }
    }

    get id(): number {
        return this._id;
    }

    get accessHash(): string {
        return this._accessHash;
    }

    getJsonObject(): any {
        let json = {
            '$type': this.$type,
            'id': this._id,
            'accessHash': this._accessHash
        };
        return json;
    }


    get name(): string {
        return this._name;
    }

    get sex(): string {
        return this._sex;
    }

    get about(): string {
        return this._about;
    }

    get avatar(): string {
        return this._avatar;
    }

    get username(): string {
        return this._username;
    }

    get isBot(): boolean {
        return this._isBot;
    }

    get contactRecords(): string[] {
        return this._contactRecords;
    }

    get timeZone(): string {
        return this._timeZone;
    }

    get preferredLanguages(): string[] {
        return this._preferredLanguages;
    }

    get botCommands(): any[] {
        return this._botCommands;
    }
}