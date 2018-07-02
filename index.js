/**
 * Created by amin on 9/6/16.
 */

exports.BaleBot = require("./lib/ir/bale/botplatform/layers/implementation/BaleBot").BaleBot;

/**Message models*/
exports.TextMessage = require("./lib/ir/bale/botplatform/models/message/TextMessage").TextMessage;
exports.FileMessage = require("./lib/ir/bale/botplatform/models/message/FileMessage").FileMessage;
exports.PhotoMessage = require("./lib/ir/bale/botplatform/models/message/PhotoMessage").PhotoMessage;
exports.VideoMessage = require("./lib/ir/bale/botplatform/models/message/VideoMessage").VideoMessage;
exports.AudioMessage = require("./lib/ir/bale/botplatform/models/message/AudioMessage").AudioMessage;
exports.StickerMessage = require("./lib/ir/bale/botplatform/models/message/StickerMessage").StickerMessage;
exports.QuotedMessage = require("./lib/ir/bale/botplatform/models/message/QuotedMessage").QuotedMessage;
exports.ReceiptMessage = require("./lib/ir/bale/botplatform/models/message/ReceiptMessage").ReceiptMessage;
// template messages
exports.TemplateMessage = require("./lib/ir/bale/botplatform/models/message/template/TemplateMessage").TemplateMessage;
exports.SimpleTemplate = require("./lib/ir/bale/botplatform/models/message/template/SimpleTemplate").SimpleTemplate;
exports.ButtonElement = require("./lib/ir/bale/botplatform/models/message/template/ButtonElement").ButtonElement;
exports.PurchaseMessage = require("./lib/ir/bale/botplatform/models/message/PurchaseMessage").PurchaseMessage;
exports.User = require("./lib/ir/bale/botplatform/models/User").User;
exports.Group = require("./lib/ir/bale/botplatform/models/Group").Group;
exports.MoneyRequestType = require("./lib/ir/bale/botplatform/models/MoneyRequestType").MoneyRequestType;

/** Conversation models */
exports.Conversation = require("./lib/ir/bale/botplatform/utils/Conversation").Conversation;

/** Sensitives **/
exports.PhotoMessageSensitive = require("./lib/ir/bale/botplatform/utils/sensitive/PhotoMessageSensitive").PhotoMessageSensitive;
exports.FileMessageSensitive = require("./lib/ir/bale/botplatform/utils/sensitive/FileMessageSensitive").FileMessageSensitive;
exports.TextMessageSensitive = require("./lib/ir/bale/botplatform/utils/sensitive/TextMessageSensitive").TextMessageSensitive;

/** Requests **/
exports.SendMessageRequest = require("./lib/ir/bale/botplatform/models/clientMessages/SendMessageRequest").SendMessageRequest;
exports.GetKeysRequest = require("./lib/ir/bale/botplatform/models/clientMessages/GetKeysRequest").GetKeysRequest;
exports.SetValueRequest = require("./lib/ir/bale/botplatform/models/clientMessages/SetValueRequest").SetValueRequest;
exports.GetValueRequest = require("./lib/ir/bale/botplatform/models/clientMessages/GetValueRequest").GetValueRequest;
exports.DeleteValueRequest = require("./lib/ir/bale/botplatform/models/clientMessages/DeleteValueRequest").DeleteValueRequest;


/** Other */
exports.SDKConst = require("./lib/ir/bale/botplatform/constants/SDKConst").SDKConst;
exports.Logger = require("./lib/ir/bale/botplatform/utils/Logger").Logger;
