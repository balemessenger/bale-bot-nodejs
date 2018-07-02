export class ApiConst {
    /**
     * The url to the Nasim webservice
     * @type {string}
     */
    static BASE_API_URL: string = "wss://api.bale.ai/v1/bots/";

    /**
     * Services in Nasim bot api
     * @type {{Messaging: string; File: string}}
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
        Sequence_update:"sequence-update"
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
        BankMessage :'BankMessage'
    }

    static GeneralMimeTypes: any = {
        Image: 'image',
        Audio: 'audio',
        Video: 'video'
    }
}