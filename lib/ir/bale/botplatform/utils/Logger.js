"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SDKConst_1 = require("../constants/SDKConst");
let log4js = require('log4js');
let Gelf = require('gelf');
var graylog = new Gelf(SDKConst_1.SDKConst.GrayLogConfig.GrayLogConfig);
class Logger {
    static syslogConfig(enabled, tagName = 'BOT_SDK', hostname = 'localhost', port = 514, transport = 'socket') {
        if (!enabled) {
            log4js.configure({
                appenders: [
                    { type: 'console' }
                    //{ type: 'file', filename: 'logs/cheese.log', category: 'cheese' }
                ]
            });
        }
        else {
            log4js.configure({
                appenders: [
                    { type: 'console' },
                    {
                        type: "log4js-syslog-appender",
                        tag: tagName,
                        facility: "local0",
                        hostname: hostname,
                        port: port,
                        path: "/dev/log",
                        transport: transport
                    }
                ]
            });
        }
        global.logger_d6352481d = log4js.getLogger();
    }
    static setName(value) {
        this._name = value;
    }
    static setLevel(level = 'INFO') {
        global.logger_d6352481d.setLevel(level);
    }
    static log(data) {
        if (Logger.logEnabled)
            global.logger_d6352481d.info(data);
    } // INFO
    static debug(data) {
        if (Logger.logEnabled)
            global.logger_d6352481d.debug(data);
    } // DEBUG
    static error(data) {
        if (Logger.logEnabled)
            global.logger_d6352481d.error(data);
    } // ERROR
    static trace(data) {
        if (Logger.logEnabled)
            global.logger_d6352481d.trace(data);
    } // TRACE
    static warn(data) {
        if (Logger.logEnabled)
            global.logger_d6352481d.warn(data);
    } // WARN
    static fatal(data) {
        if (Logger.logEnabled)
            global.logger_d6352481d.fatal(data);
    } // FATAL
    static grayLog(tag, data) {
        if (Logger._name) {
            var message = {
                "host": this._name,
                "tag": tag,
                "full_message": data,
                "text": tag + ":" + data,
                "facility": this._name,
            };
            graylog.emit('gelf.log', message);
        }
    }
}
Logger.logEnabled = true;
exports.Logger = Logger;
Logger.syslogConfig(false);
Logger.setLevel();
//# sourceMappingURL=Logger.js.map