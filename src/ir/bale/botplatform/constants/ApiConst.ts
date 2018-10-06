export class ApiConst {
    /**
     * The url to the Nasim webservice
     * @type {string}
     */
    static BASE_API_URL: string = "wss://api.bale.ai/v1/bots/";

    /**
     * Services in Nasim bot api
     * @type {{Messaging: string File: string}}
     */
    static Services: any = {
        Messaging: 'messaging',
        Files: 'files',
        Stickers: 'stickers',
        Users: 'users',
        KeyValue: 'keyvalue',
        Bots: 'bots',
        WebHooks: 'webhooks',
        Dialogs: 'dialogs',
        Monitor: 'monitor',
        Sequence_update:"sequence-update",
        groups:"groups"
    };

    static ExtTypes: any = {
        Photo: 'Photo',
        Video: 'Video',
        Audio: 'Voice'
    };

    static MessageTypes: any = {
        Text: 'Text',
        Documnet: 'Document',
        Sticker: 'Sticker',
        Template: 'TemplateMessage',
        TemplateResponse: 'TemplateMessageResponse',
        PurchaseMessage: 'PurchaseMessage',
        BankMessage :'BankMessage',
        Json :'Json'
    };

    static GeneralMimeTypes: any = {
        Image: 'image',
        Audio: 'audio',
        Video: 'video'
    };

    static RequestType: any = {
        get_file_download_url : "GetFileDownloadUrl",
        get_file_upload_url : "GetFileUploadUrl",

        create_group : "CreateGroup",
        get_group_api_struct : "GetGroupApiStruct",
        invite_user : "InviteUser",

        send_message : "SendMessage",

        get_difference : "GetDifference",
        get_last_seq : "GetLastSeq",
    };
}