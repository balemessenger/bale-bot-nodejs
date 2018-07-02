const Platform = require("../../index");
const Bot = Platform.BaleBot;
const Conversation = Platform.Conversation;
const SimpleTemplate = Platform.SimpleTemplate;
const TemplateMessage = Platform.TemplateMessage;
const TextMessage = Platform.TextMessage;
const Button = Platform.ButtonElement;

let conv = new Conversation();
let bot = new Bot("Bot Token");


conv.startsWith(["/start"]).then((message, session, responder) => {
    //STATE 0
    let simpleTemplate = new SimpleTemplate(new TextMessage("Do you like ice cream?"),
        [new Button("YES", "YES", 1), new Button("NO", "NO", 1)], "1");
    let templateMessage = new TemplateMessage(simpleTemplate);
    responder.reply(templateMessage);
    //Go to the next state
    session.next();
}).then((message, session, responder) => {
    //STATE 1
    if (message.text == "YES") {
        responder.reply("Me too :)");
        //Ok. go to the next state...
        session.next();
    } else {
        responder.reply("I never say no to an ice cream :(");
        // Don't call session.next() to remain in the current state.
    }
});

// Within a conversation (when it's active and in some state other than first state) the user can finish it by sending a message. In this case: /end, /stop, or /by
conv.cancelsWith(["/end", "/stop", "/bye"], (message, session, responder) => {
    responder.reply("OK. bye!");
});

bot.setConversation(conv);