const Platform = require("../index");
const Bot = Platform.BaleBot;

let bot = new Bot("Bot Token");

bot.hears(["name?", "name", "/name"], (message, responder) => {
    responder.reply("My name is sample bot!").then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    });
});