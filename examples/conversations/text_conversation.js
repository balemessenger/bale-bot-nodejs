const Platform = require("../../index");
const Bot = Platform.BaleBot;
const Conversation = Platform.Conversation;

let bot = new Bot("Bot Token");
let conv = new Conversation();

conv.startsWith(["/start"]).then((message, session, responder) => {
    //STATE 0
    //The first state definitely matches with the "starts with" sensitive. In this case: "/start"
    responder.reply("OK. Whats your name?");
    //Go to the next state
    session.next();
}).then((message, session, responder) => {
    //STATE 1
    if (message.text.length < 7) {
        responder.reply("It's a Nice name *" + message.text+"*");
        //Ok. go to the next state...
        session.next();
    } else {
        responder.reply("What a long name! Give me a shorter name! :|");
        // Don't call session.next() to remain in the current state.
    }
});

// Within a conversation (when it's active and in some state other than first state) the user can finish it by sending a message. In this case: /end, /stop, or /by
conv.cancelsWith(["/end", "/stop", "/bye"], (message, session, responder) => {
    responder.reply("OK. bye!");
});

bot.setConversation(conv);