const Platform = require("../../index");
const Bot = Platform.BaleBot;
const Conversation = Platform.Conversation;
const PhotoMessage = Platform.PhotoMessage;
const SimpleTemplate = Platform.SimpleTemplate;
const TemplateMessage = Platform.TemplateMessage;
const TextMessage = Platform.TextMessage;
const Button = Platform.ButtonElement;
const fs = require('fs');

let conv = new Conversation();

let bot = new Bot("Bot token");


conv.startsWith(["/start"]).then((message, session, responder) => {
    //STATE 0
    let simpleTemplate = new SimpleTemplate(new TextMessage("Click below to get a file."),
        [new Button("Send me", "Send me", 1)], "1");
    let templateMessage = new TemplateMessage(simpleTemplate);
    responder.reply(templateMessage);
    session.next();
}).then((message, session, responder) => {
    //STATE 1
    fs.readFile('bale.jpeg', function (err, imageBuffer) {
        bot.UploadFile(imageBuffer, 'file').then(response => {
            var thumbBuffer = new Buffer(imageBuffer).toString('base64');
            let fileId = response.fileId;
            let fileAccessHash = response.accessHash;
            var photoMsg = new PhotoMessage(fileId, fileAccessHash.toString(), 'name.jpg', 10000, 'image/jpeg', 'caption', 300, 200, thumbBuffer);
            console.log(photoMsg);
            responder.reply(photoMsg).then((res) => {
                console.log("upload was successful")
            }).catch((err) => {
                console.log(err)
            });
        });
    });
    session.reset();

});

// Within a conversation (when it's active and in some state other than first state) the user can finish it by sending a message. In this case: /end, /stop, or /by
conv.cancelsWith(["/end", "/stop", "/bye"], (message, session, responder) => {
    responder.reply("OK. bye!");
});

bot.setConversation(conv);