const Platform = require("../index");
const fs = require('fs')
const Bot = Platform.BaleBot;
const PhotoMessageSensitive = Platform.PhotoMessageSensitive;

let bot = new Bot("Bot Token");

bot.hears(new PhotoMessageSensitive(), (message, responder) => {
    bot.DownloadFile(message.fileId, message.accessHash, 'photo', message.name).then(response => {
        fs.writeFile("saved.png", response, function (err) {
            if (err) {
                return console.log(err);
            }
            responder.reply("File downloaded successfully.");
        });
    }).catch((err) => {
        response.reply("There is something wrong here.");
        console.log(err)
    });
});