import {SDKConst} from "../constants/SDKConst";
let log4js = require('log4js');
let Gelf = require('gelf')
var graylog = new Gelf(SDKConst.GrayLogConfig.GrayLogConfig);
export class Logger {

    private static _name:string

    public static syslogConfig(enabled: boolean,
                               tagName: string = 'BOT_SDK',
                               hostname: string = 'localhost',
                               port: number = 514,
                               transport: string = 'socket') {
        if (!enabled) {
            log4js.configure({
                appenders: [
                    {type: 'console'}
                    //{ type: 'file', filename: 'logs/cheese.log', category: 'cheese' }
                ]
            });
        } else {
            log4js.configure({
                appenders: [
                    {type: 'console'},
                    {
                        type: "log4js-syslog-appender",
                        tag: tagName,
                        facility: "local0",
                        hostname: hostname,
                        port: port, // For UDP transport
                        path: "/dev/log", // For TCP (socket) transport
                        transport: transport
                    }
                ]
            });
        }

        (<any>global).logger_d6352481d = log4js.getLogger();
    }
    public static setName(value: string) {
        this._name = value;
    }
    public static setLevel(level: string = 'INFO') {
        (<any>global).logger_d6352481d.setLevel(level);
    }

    public static logEnabled = true;

    public static log(data: any) {
        if (Logger.logEnabled)
            (<any>global).logger_d6352481d.info(data);
    } // INFO

    public static debug(data: any) {
        if (Logger.logEnabled)
            (<any>global).logger_d6352481d.debug(data);
    } // DEBUG

    public static error(data: any) {
        if (Logger.logEnabled)
            (<any>global).logger_d6352481d.error(data);
    } // ERROR

    public static trace(data: any) {
        if (Logger.logEnabled)
            (<any>global).logger_d6352481d.trace(data);
    } // TRACE
    public static warn(data: any) {
        if (Logger.logEnabled)
            (<any>global).logger_d6352481d.warn(data);
    } // WARN
    public static fatal(data: any) {
        if (Logger.logEnabled)
            (<any>global).logger_d6352481d.fatal(data);
    } // FATAL
    public static grayLog(tag:any,data:any){
        if(Logger._name){
            var message = {
                "host": this._name,
                "tag": tag,
                "full_message":data,
                "text":tag+":"+data,
                "facility": this._name,
            };
            graylog.emit('gelf.log', message)
        }

    }

}

Logger.syslogConfig(false);
Logger.setLevel();