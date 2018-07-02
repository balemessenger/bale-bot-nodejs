/**
 * Created by emran on 3/1/17.
 */
export class SDKConst {
    static get ERRORS(): {TIMED_OUT:string} {
        return {
            TIMED_OUT: "TIMED_OUT"
        }
    }
    static get UPDATECONFIG(): {UPDATECONFIG:string} {
        return {
            UPDATECONFIG: "realTime" // and you can choose realTime but may cause some message lost if your bot is offline
        }
    }
    static get UPDATELIMIT():{UPDATELIMIT:number} {
        return {
            UPDATELIMIT : 10        // if you use polling update you can limit your update that you received

        }
    }
    static get GrayLogConfig():{GrayLogConfig:any} {
        return {
            GrayLogConfig: {
                graylogPort: 12201,
                graylogHostname: '192.1.1.1',
                connection: 'wan',
                maxChunkSizeWan: 1420,
                maxChunkSizeLan: 8154
            }
        }
    }
}