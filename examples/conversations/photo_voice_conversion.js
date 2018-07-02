const Platform = require("../../index");
const Bot = Platform.BaleBot;
const Conversation = Platform.Conversation;
const AudioMessage = Platform.AudioMessage;
const PhotoMessageSensitive = Platform.PhotoMessageSensitive;

let conv = new Conversation();

let bot = new Bot("Bot Token");


conv.startsWith(new PhotoMessageSensitive()).then((message, session, responder) => {
    //STATE 0
    responder.reply("Photo received successfully\nSend me a voice message too.");
    //Go to the next state
    session.next();
}).then((message, session, responder) => {
    //STATE 1
    if (message instanceof AudioMessage) {
        responder.reply("Voice received successfully\n*Good bye. *");
        session.reset();
    } else {
        responder.reply("Ops... ,Send me a Voice man.");
        // Don't call session.next() to remain in the current state.
    }
});

// Within a conversation (when it's active and in some state other than first state) the user can finish it by sending a message. In this case: /end, /stop, or /by
conv.cancelsWith(["/end", "/stop", "/bye"], (message, session, responder) => {
    responder.reply("OK. bye!");
});

bot.setConversation(conv);