const Platform = require("../index");
const Bot = Platform.BaleBot;
let options = {
    log: {
        enabled: true,
        level: "DEBUG" // other options: "TRACE", "DEBUG", "WARN", "ERROR", "FATAL"
    },
    requestQueue: {
        fetchInterval: 0, // in ms. the time between sending two consecutive requests.
        retryInterval: 0, // in ms. the time to wait before resending a failed request.
        timeout: 3000, // in ms. the time period to try for sending each request. if the request failed again after this time it will be rejected with the "TIME_OUT" message.
    },
    socket: {
        reconnectInterval: 3000 // in ms. when the socket disconnects, waits as much as this time and the tries to reconnect.
    }
};

let bot = new Bot("Bot Token", options);

