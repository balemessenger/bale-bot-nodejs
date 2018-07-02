import ErrnoException = NodeJS.ErrnoException;
/**
 * Created by emran on 5/24/17.
 */

const fs = require('fs')
export class SequenceUtil {

    public static get SEQ_FILE_PATH(): string {
        return "./.BaleSeqNumber";
    }

    static getLastSeqNumber(): Promise<number> {
        return new Promise((resolve, reject) => {
            fs.exists(SequenceUtil.SEQ_FILE_PATH, (exists: boolean) => {
                if (exists)
                    fs.readFile(SequenceUtil.SEQ_FILE_PATH, (err: any, data: any) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        var response = (data.toString()).replace("\n","")
                        resolve(response);
                    });
                else {
                    fs.writeFile(SequenceUtil.SEQ_FILE_PATH, "0", {}, (err: ErrnoException) => {
                        if (err)
                            reject(err);
                        else
                            resolve(0);
                    })
                }
            });

        });
    }

    static setLastSeqNumber(seqNum: any): Promise<any>{
        return new Promise((resolve, reject) => {
        fs.writeFile(SequenceUtil.SEQ_FILE_PATH, seqNum.toString(), {}, (err: ErrnoException) => {
            if (err)
                reject(err);
            else
                resolve(seqNum.toString());
        })
    });

}}