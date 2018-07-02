const Platform = require("../index");
const Bot = Platform.BaleBot;

let bot = new Bot("Bot Token");

bot.hears(["hello", "Hi"], (message, responder) => {
    //The user said something like hello!
});

bot.setDefaultCallback((message, responder) => {
    //The user said something unexpected!
});