const Platform = require("../index");
const Bot = Platform.BaleBot;
const TextMessage = Platform.TextMessage;
const User = Platform.User;

let bot = new Bot("Bot Token");
let msg = new TextMessage("Hi, I'm connected :)", new User(123 /*user id*/, "321" /*user access hash*/));
bot.send(msg);