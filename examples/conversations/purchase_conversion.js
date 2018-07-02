const Platform = require("../../index");
const Bot = Platform.BaleBot;
const Conversation = Platform.Conversation;
const PurchaseMessage = Platform.PurchaseMessage;
const PhotoMessage = Platform.PhotoMessage;
const MoneyRequestType=Platform.MoneyRequestType;
let conv = new Conversation();

let bot = new Bot("Bot Token");


conv.startsWith(["/start"]).then((message, session, responder) => {
    //STATE 0
    responder.reply("Send me a photo");
    //Go to the next state
    session.next();
}).then((message, session, responder) => {
    //STATE 1
    if (message instanceof PhotoMessage) {
        let purchaseMessage = new PurchaseMessage(message, '6037991067471130', '10000', new MoneyRequestType().normal);
        bot.send(purchaseMessage, responder.peer).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        });
        session.reset();
    } else {
        responder.reply("Ops... ,Send me a photo");
        // Don't call session.next() to remain in the current state.
    }
});

// Within a conversation (when it's active and in some state other than first state) the user can finish it by sending a message. In this case: /end, /stop, or /by
conv.cancelsWith(["/end", "/stop", "/bye"], (message, session, responder) => {
    responder.reply("OK. bye!");
});

bot.setConversation(conv);