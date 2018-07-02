"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiConst {
}
/**
 * The url to the Nasim webservice
 * @type {string}
 */
ApiConst.BASE_API_URL = "wss://api.bale.ai/v1/bots/";
/**
 * Services in Nasim bot api
 * @type {{Messaging: string; File: string}}
 */
ApiConst.Services = {
    Messaging: 'messaging',
    Files: 'files',
    Stickers: 'stickers',
    Users: 'users',
    KeyValue: 'keyvalue',
    Bots: 'bots',
    WebHooks: 'webhooks',
    Dialogs: 'dialogs',
    Monitor: 'monitor',
    Sequence_update: "sequence-update"
};
ApiConst.ExtTypes = {
    Photo: 'Photo',
    Video: 'Video',
    Audio: 'Voice'
};
ApiConst.MessageTypes = {
    Text: 'Text',
    Documnet: 'Document',
    Sticker: 'Sticker',
    Template: 'TemplateMessage',
    TemplateResponse: 'TemplateMessageResponse',
    PurchaseMessage: 'PurchaseMessage',
    BankMessage: 'BankMessage'
};
ApiConst.GeneralMimeTypes = {
    Image: 'image',
    Audio: 'audio',
    Video: 'video'
};
exports.ApiConst = ApiConst;
//# sourceMappingURL=ApiConst.js.map